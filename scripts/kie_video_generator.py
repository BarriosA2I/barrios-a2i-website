#!/usr/bin/env python3
"""
================================================================================
KIE.AI VIDEO GENERATOR
================================================================================
Generate videos using kie.ai API (Veo 3, Runway, Kling models)
NO BROWSER NEEDED - Direct API calls
================================================================================

SETUP:
    1. Get API key from https://kie.ai
    2. Set environment variable: set KIE_API_KEY=your-key
    3. Run: python kie_video_generator.py

================================================================================
"""

import asyncio
import aiohttp
import json
import os
import time
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, Any

# =============================================================================
# CONFIGURATION
# =============================================================================

KIE_API_KEY = os.getenv("KIE_API_KEY", "")
KIE_BASE_URL = "https://api.kie.ai/api/v1"
OUTPUT_DIR = Path("./public/assets")

# Available models on kie.ai
MODELS = {
    "veo3": "veo-3-generate",           # Google Veo 3
    "veo3_fast": "veo-3-fast-generate", # Veo 3 Fast (cheaper/faster)
    "runway": "runway-duration-5-generate",  # Runway
    "kling": "kling-v2-1-standard-5s",  # Kling 2.1
}

# Default model to use
DEFAULT_MODEL = "veo3_fast"

# The 3 portal background videos
VIDEOS = [
    {
        "id": "ragnarok_memory_loop",
        "filename": "ragnarok_memory_loop.mp4",
        "prompt": "Abstract neural network visualization floating in dark space. Glowing cyan blue nodes connected by pulsing light threads. Data particles flow between nodes like fireflies. Nodes gently expand and contract in a breathing rhythm. Camera slowly orbits the structure. Dark background with subtle depth fog. Cinematic lighting, high contrast. No text, no UI elements. Seamless loop animation. Professional quality, 4K cinematic.",
        "aspect_ratio": "16:9",
        "duration": 5
    },
    {
        "id": "ragnarok_agents_loop",
        "filename": "ragnarok_agents_loop.mp4",
        "prompt": "Multiple glowing emerald green orbs moving purposefully through dark 3D space. Each orb leaves a fading light trail showing its path. Orbs occasionally converge, exchange small light particles, then disperse to new destinations. AI agents collaborating visualization. Subtle geometric grid visible in background. Tron aesthetic but organic. Camera follows the swarm. Seamless loop. Cinematic quality.",
        "aspect_ratio": "16:9",
        "duration": 5
    },
    {
        "id": "ragnarok_dashboard_loop",
        "filename": "ragnarok_dashboard_loop.mp4",
        "prompt": "Futuristic holographic data dashboard floating in dark space. Glowing amber gold bar charts and line graphs that pulse and update. Holographic pie charts rotating slowly. Data streams flowing upward as light particles. Iron Man JARVIS style interface aesthetic. Everything floating with subtle parallax movement. Dark background, volumetric lighting. No readable text. Seamless loop. Cinematic 4K quality.",
        "aspect_ratio": "16:9",
        "duration": 5
    }
]

# =============================================================================
# KIE.AI API CLIENT
# =============================================================================

class KieAI:
    """kie.ai API client for video generation"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    async def generate_video_veo3(
        self,
        prompt: str,
        aspect_ratio: str = "16:9",
        model: str = "veo-3-fast-generate",
        duration: int = 5
    ) -> Dict[str, Any]:
        """Generate video using Veo 3.1 API"""

        url = f"{KIE_BASE_URL}/veo/generate"  # Correct endpoint: /veo not /veo3

        payload = {
            "prompt": prompt,
            "aspectRatio": aspect_ratio,
            "model": model,
            "duration": duration
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=self.headers, json=payload) as resp:
                if resp.status == 200:
                    return await resp.json()
                else:
                    error_text = await resp.text()
                    return {"error": f"HTTP {resp.status}: {error_text}"}

    async def generate_video_runway(
        self,
        prompt: str,
        aspect_ratio: str = "16:9",
        duration: int = 5,
        quality: str = "720p"
    ) -> Dict[str, Any]:
        """Generate video using Runway API"""

        url = f"{KIE_BASE_URL}/runway/generate"

        payload = {
            "prompt": prompt,
            "duration": duration,
            "quality": quality,
            "aspectRatio": aspect_ratio,
            "waterMark": "",  # No watermark
            "callBackUrl": "https://httpbin.org/post"  # Dummy callback (we poll instead)
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=self.headers, json=payload) as resp:
                if resp.status == 200:
                    return await resp.json()
                else:
                    error_text = await resp.text()
                    return {"error": f"HTTP {resp.status}: {error_text}"}

    async def generate_video_kling(
        self,
        prompt: str,
        aspect_ratio: str = "16:9",
        duration: int = 5
    ) -> Dict[str, Any]:
        """Generate video using Kling 2.1 API"""

        url = f"{KIE_BASE_URL}/kling/generate"

        # Duration options: 5 or 10
        dur = "5s" if duration <= 5 else "10s"
        model = f"kling-v2-1-standard-{dur}"

        payload = {
            "prompt": prompt,
            "model": model,
            "aspectRatio": aspect_ratio,
            "cfgScale": 0.5  # How closely to follow prompt
        }

        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=self.headers, json=payload) as resp:
                if resp.status == 200:
                    return await resp.json()
                else:
                    error_text = await resp.text()
                    return {"error": f"HTTP {resp.status}: {error_text}"}

    async def get_task_status(self, task_id: str, model_type: str = "runway") -> Dict[str, Any]:
        """Check status of a generation task"""

        # Different endpoints for different models
        endpoints = {
            "veo3": f"{KIE_BASE_URL}/veo/record-info",  # Correct endpoint for Veo
            "runway": f"{KIE_BASE_URL}/runway/record-detail",
            "kling": f"{KIE_BASE_URL}/kling/record-detail"
        }

        url = endpoints.get(model_type, endpoints["runway"])

        async with aiohttp.ClientSession() as session:
            async with session.get(
                url,
                headers=self.headers,
                params={"taskId": task_id}
            ) as resp:
                if resp.status == 200:
                    return await resp.json()
                else:
                    error_text = await resp.text()
                    return {"error": f"HTTP {resp.status}: {error_text}"}

    async def wait_for_video(
        self,
        task_id: str,
        model_type: str = "veo3",
        max_wait: int = 600,
        poll_interval: int = 10
    ) -> Optional[str]:
        """Poll until video is ready, return video URL"""

        start_time = time.time()

        while time.time() - start_time < max_wait:
            status = await self.get_task_status(task_id, model_type)

            if "error" in status:
                print(f"      Warning: Status check error: {status['error']}")
                await asyncio.sleep(poll_interval)
                continue

            # Check various status fields (API response format may vary)
            task_status = status.get("status") or status.get("data", {}).get("status")

            if task_status == "completed" or task_status == "success":
                # Get video URL
                video_url = (
                    status.get("videoUrl") or
                    status.get("data", {}).get("videoUrl") or
                    status.get("data", {}).get("output", {}).get("video")
                )
                if video_url:
                    return video_url

            elif task_status == "failed" or task_status == "error":
                error_msg = status.get("message") or status.get("data", {}).get("message")
                print(f"      ERROR: Generation failed: {error_msg}")
                return None

            # Still processing
            elapsed = int(time.time() - start_time)
            print(f"      Generating... ({elapsed}s)")
            await asyncio.sleep(poll_interval)

        print(f"      Warning: Timeout after {max_wait}s")
        return None

    async def download_video(self, url: str, output_path: Path) -> bool:
        """Download video file"""

        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                if resp.status == 200:
                    output_path.parent.mkdir(parents=True, exist_ok=True)
                    with open(output_path, "wb") as f:
                        f.write(await resp.read())
                    return True
                else:
                    print(f"      ERROR: Download failed: HTTP {resp.status}")
                    return False


# =============================================================================
# MAIN GENERATOR
# =============================================================================

async def generate_portal_videos(
    model_type: str = "veo3",
    use_fast: bool = True
):
    """Generate all 3 portal background videos"""

    print("\n" + "="*60)
    print("KIE.AI VIDEO GENERATOR")
    print("   Barrios A2I Portal Backgrounds")
    print("="*60)
    print(f"   Model: {model_type}")
    print(f"   Output: {OUTPUT_DIR}")
    print("="*60)

    # Check API key
    if not KIE_API_KEY:
        print("\nERROR: KIE_API_KEY not set!")
        print("\nSETUP:")
        print("   1. Go to https://kie.ai")
        print("   2. Sign up and get your API key")
        print("   3. Run: set KIE_API_KEY=your-key-here")
        print("   4. Run this script again")
        return

    # Initialize client
    kie = KieAI(KIE_API_KEY)

    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    results = []

    for video in VIDEOS:
        print(f"\n{'='*60}")
        print(f"VIDEO: {video['id']}")
        print(f"{'='*60}")
        print(f"   Prompt: {video['prompt'][:80]}...")

        # Submit generation request
        print(f"   Submitting to kie.ai ({model_type})...")

        if model_type == "veo3":
            model = "veo-3-fast-generate" if use_fast else "veo-3-generate"
            response = await kie.generate_video_veo3(
                prompt=video["prompt"],
                aspect_ratio=video["aspect_ratio"],
                model=model,
                duration=video["duration"]
            )
        elif model_type == "runway":
            response = await kie.generate_video_runway(
                prompt=video["prompt"],
                aspect_ratio=video["aspect_ratio"],
                duration=video["duration"]
            )
        elif model_type == "kling":
            response = await kie.generate_video_kling(
                prompt=video["prompt"],
                aspect_ratio=video["aspect_ratio"],
                duration=video["duration"]
            )
        else:
            print(f"   ERROR: Unknown model: {model_type}")
            continue

        # Check for errors
        if "error" in response:
            print(f"   ERROR: API Error: {response['error']}")
            results.append({"id": video["id"], "status": "api_error", "error": response["error"]})
            continue

        # Get task ID
        task_id = response.get("taskId") or response.get("data", {}).get("taskId")

        if not task_id:
            print(f"   ERROR: No task ID in response")
            print(f"      Response: {json.dumps(response, indent=2)[:500]}")
            results.append({"id": video["id"], "status": "no_task_id"})
            continue

        print(f"   OK: Task submitted: {task_id}")
        print(f"   Waiting for generation (2-5 minutes)...")

        # Wait for completion
        video_url = await kie.wait_for_video(task_id, model_type)

        if video_url:
            print(f"   OK: Video ready!")
            print(f"   Downloading...")

            output_path = OUTPUT_DIR / video["filename"]

            if await kie.download_video(video_url, output_path):
                size = output_path.stat().st_size / (1024 * 1024)
                print(f"   OK: Saved: {output_path} ({size:.1f} MB)")
                results.append({
                    "id": video["id"],
                    "status": "completed",
                    "path": str(output_path),
                    "url": video_url
                })
            else:
                print(f"   Warning: Download failed")
                results.append({
                    "id": video["id"],
                    "status": "download_failed",
                    "url": video_url
                })
        else:
            results.append({"id": video["id"], "status": "generation_failed"})

        # Brief pause between requests
        if video != VIDEOS[-1]:
            print("\n   Waiting 5s before next video...")
            await asyncio.sleep(5)

    # Summary
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)

    completed = [r for r in results if r["status"] == "completed"]
    failed = [r for r in results if r["status"] != "completed"]

    print(f"   Completed: {len(completed)}/{len(VIDEOS)}")

    if completed:
        print(f"\n   Files:")
        for r in completed:
            print(f"      - {r['path']}")

        print("\n   DEPLOY:")
        print("      git add public/assets/")
        print('      git commit -m "Add kie.ai portal videos"')
        print("      git push")

    if failed:
        print(f"\n   Failed ({len(failed)}):")
        for r in failed:
            print(f"      - {r['id']}: {r['status']}")
            if r.get("url"):
                print(f"        Manual: {r['url']}")

    # Save results
    results_path = OUTPUT_DIR / "kie_generation_results.json"
    with open(results_path, "w") as f:
        json.dump({
            "generated_at": datetime.now().isoformat(),
            "model": model_type,
            "results": results
        }, f, indent=2)

    print(f"\n   Results: {results_path}")


# =============================================================================
# CLI
# =============================================================================

def main():
    import argparse

    parser = argparse.ArgumentParser(description="Generate videos using kie.ai API")
    parser.add_argument(
        "--model", "-m",
        choices=["veo3", "runway", "kling"],
        default="veo3",
        help="AI model to use (default: veo3)"
    )
    parser.add_argument(
        "--fast", "-f",
        action="store_true",
        default=True,
        help="Use fast/cheaper model variant (default: True)"
    )
    parser.add_argument(
        "--quality", "-q",
        action="store_true",
        help="Use quality/slower model variant"
    )
    parser.add_argument(
        "--output", "-o",
        type=str,
        default="./public/assets",
        help="Output directory"
    )

    args = parser.parse_args()

    global OUTPUT_DIR
    OUTPUT_DIR = Path(args.output)

    use_fast = not args.quality

    asyncio.run(generate_portal_videos(
        model_type=args.model,
        use_fast=use_fast
    ))


if __name__ == "__main__":
    main()
