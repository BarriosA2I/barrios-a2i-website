#!/usr/bin/env python3
"""
Test Discovery Pipeline - Trinity Ragnarok System
Sends test queries through the Neural Core WebSocket and verifies leads in Supabase
"""

import asyncio
import websockets
import json
import aiohttp
from datetime import datetime
import uuid

# Configuration
WS_URL = "wss://web-production-43c7.up.railway.app/ws/antigravity"
SUPABASE_URL = "https://vdzvywmmtjvdxscwjppp.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkenZ5d21tdGp2ZHhzY3dqcHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDI5MjcsImV4cCI6MjA2OTYxODkyN30.NVF5QdDWzWgMpNMzhyDKMhEYZ4_vAEXjfCHjKYgNMVA"

# Test queries - rich discovery data
TEST_QUERIES = [
    {
        "query": "I run a dental practice with 15 employees. We're losing 10 hours a week on insurance verification and appointment reminders. Currently using Dentrix but it's not cutting it. Budget around $5k/month for the right solution. Need this fixed ASAP.",
        "session_id": f"test_dental_{datetime.now().strftime('%H%M%S')}",
        "expected": {"industry": "Dental", "urgency": "high", "min_score": 8}
    },
    {
        "query": "Manufacturing company with 50 employees. Our inventory management is a nightmare - we lose 20 hours weekly tracking parts manually in spreadsheets. Using QuickBooks but need full automation. Looking to invest $8k/month.",
        "session_id": f"test_manufacturing_{datetime.now().strftime('%H%M%S')}",
        "expected": {"industry": "Manufacturing", "urgency": "medium", "min_score": 7}
    },
    {
        "query": "Insurance agency owner here. My team of 8 agents spends half their day on claims processing and policy verification. We use Salesforce but it's not integrated with anything. Ready to spend serious money to fix this.",
        "session_id": f"test_insurance_{datetime.now().strftime('%H%M%S')}",
        "expected": {"industry": "Insurance", "urgency": "medium", "min_score": 7}
    },
    {
        "query": "Real estate agency with 20 realtors. Lead follow-up is killing us - we're missing hot leads because nobody responds fast enough. Need AI to qualify and respond to leads 24/7. Budget is flexible for the right solution.",
        "session_id": f"test_realestate_{datetime.now().strftime('%H%M%S')}",
        "expected": {"industry": "Real Estate", "urgency": "high", "min_score": 8}
    },
    {
        "query": "Just curious about what automation can do for a small business. Maybe 5 employees. Exploring options.",
        "session_id": f"test_exploratory_{datetime.now().strftime('%H%M%S')}",
        "expected": {"industry": "Unknown", "urgency": "low", "min_score": 3}
    }
]

async def send_query(query_data: dict) -> dict:
    """Send a query through WebSocket and get response"""
    print(f"\n📤 Sending query: {query_data['query'][:60]}...")

    try:
        async with websockets.connect(WS_URL) as ws:
            # Send query
            message = {
                "type": "query",
                "query": query_data["query"],
                "session_id": query_data["session_id"]
            }
            await ws.send(json.dumps(message))

            # Collect responses
            response_text = ""
            while True:
                try:
                    response = await asyncio.wait_for(ws.recv(), timeout=30)
                    data = json.loads(response)

                    if data.get("type") == "stream":
                        response_text += data.get("content", "")
                    elif data.get("type") == "complete":
                        print(f"✅ Response received ({len(response_text)} chars)")
                        return {
                            "success": True,
                            "response": response_text,
                            "session_id": query_data["session_id"]
                        }
                    elif data.get("type") == "error":
                        print(f"❌ Error: {data.get('message')}")
                        return {"success": False, "error": data.get("message")}

                except asyncio.TimeoutError:
                    print("⏱️ Timeout waiting for response")
                    return {"success": False, "error": "timeout"}

    except Exception as e:
        print(f"❌ Connection error: {e}")
        return {"success": False, "error": str(e)}


async def check_supabase_leads() -> list:
    """Check Supabase for recent leads"""
    print("\n🔍 Checking Supabase for leads...")

    async with aiohttp.ClientSession() as session:
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        }

        url = f"{SUPABASE_URL}/rest/v1/discovery_leads?order=created_at.desc&limit=10"

        async with session.get(url, headers=headers) as response:
            if response.status == 200:
                leads = await response.json()
                print(f"📊 Found {len(leads)} recent leads")
                return leads
            else:
                error = await response.text()
                print(f"❌ Supabase error: {response.status} - {error}")
                return []


async def run_full_test():
    """Run complete test suite"""
    print("=" * 60)
    print("🚀 TRINITY RAGNAROK - DISCOVERY PIPELINE TEST")
    print("=" * 60)
    print(f"⏰ Started at: {datetime.now().isoformat()}")
    print(f"🌐 WebSocket: {WS_URL}")
    print(f"📊 Supabase: {SUPABASE_URL}")

    # Get initial lead count
    initial_leads = await check_supabase_leads()
    initial_count = len(initial_leads)
    print(f"\n📈 Initial lead count: {initial_count}")

    # Send test queries
    print("\n" + "=" * 60)
    print("📤 SENDING TEST QUERIES")
    print("=" * 60)

    results = []
    for i, query_data in enumerate(TEST_QUERIES, 1):
        print(f"\n[{i}/{len(TEST_QUERIES)}] Testing: {query_data['expected']['industry']}")
        result = await send_query(query_data)
        result["expected"] = query_data["expected"]
        results.append(result)
        await asyncio.sleep(2)  # Brief delay between queries

    # Wait for leads to be saved
    print("\n⏳ Waiting 5 seconds for leads to be saved...")
    await asyncio.sleep(5)

    # Check final lead count
    final_leads = await check_supabase_leads()
    final_count = len(final_leads)
    new_leads = final_count - initial_count

    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)

    successful = sum(1 for r in results if r.get("success"))
    print(f"✅ Queries successful: {successful}/{len(TEST_QUERIES)}")
    print(f"📈 New leads in Supabase: {new_leads}")

    if new_leads > 0:
        print("\n🎯 NEW LEADS DETECTED:")
        for lead in final_leads[:new_leads]:
            score = lead.get("qualification_score", 0)
            industry = lead.get("industry", "Unknown")
            urgency = lead.get("urgency", "unknown")
            print(f"  • Score {score}/10 | {industry} | Urgency: {urgency}")

    print("\n" + "=" * 60)
    if new_leads == len(TEST_QUERIES):
        print("🎉 ALL TESTS PASSED - Discovery Pipeline Working!")
    elif new_leads > 0:
        print(f"⚠️ PARTIAL SUCCESS - {new_leads}/{len(TEST_QUERIES)} leads captured")
    else:
        print("❌ NO LEADS CAPTURED - Check backend configuration")
    print("=" * 60)

    return results, final_leads


if __name__ == "__main__":
    asyncio.run(run_full_test())
