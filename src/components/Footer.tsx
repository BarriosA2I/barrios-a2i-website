import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a0a1e] border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Barrios A2I</h3>
            <p className="text-slate-400 text-sm">
              Automated operations. Engineered attention.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#pricing" className="hover:text-[#00C2FF]">Websites</Link></li>
              <li><Link href="#pricing" className="hover:text-[#00C2FF]">Video Production</Link></li>
              <li><Link href="#pricing" className="hover:text-[#00C2FF]">AI Automation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="mailto:hello@barriosa2i.com" className="hover:text-[#00C2FF]">hello@barriosa2i.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Barrios A2I. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
