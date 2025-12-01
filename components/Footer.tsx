import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#02050A] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-neon-cyan/20 rounded border border-neon-cyan/50 flex items-center justify-center text-neon-cyan font-bold text-xs font-mono">
              A2I
            </div>
            <span className="font-bold text-xl">
              BARRIOS <span className="text-neon-gold">A2I</span>
            </span>
          </div>
          <p className="text-gray-500 max-w-xs text-sm">
            Premium AI engineering and architecture.
            <br />Alienated 2 Innovated.
          </p>
        </div>
        
        {/* Links */}
        <div className="flex gap-12 text-sm text-gray-400">
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold">Services</span>
            <Link href="#capabilities" className="hover:text-neon-cyan transition-colors">Automation</Link>
            <Link href="#capabilities" className="hover:text-neon-cyan transition-colors">Development</Link>
            <Link href="#capabilities" className="hover:text-neon-cyan transition-colors">Consulting</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold">Company</span>
            <Link href="#" className="hover:text-neon-cyan transition-colors">About</Link>
            <Link href="#contact" className="hover:text-neon-cyan transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-bold">Legal</span>
            <Link href="#" className="hover:text-neon-cyan transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-neon-cyan transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600 font-mono">
        © 2025 BARRIOS A2I. ALL SYSTEMS OPERATIONAL.
      </div>
    </footer>
  );
}
