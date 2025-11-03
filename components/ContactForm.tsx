'use client';

export default function ContactForm() {
  return (
    <div className="space-y-4 p-8 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Contact Us Directly</h3>

      <p className="text-slate-300 mb-4">
        We&apos;re currently updating our backend. Please reach out directly:
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-400 mb-1">📧 Email:</p>
          <a
            href="mailto:alienation2innovation@gmail.com"
            className="text-cyan-300 hover:text-cyan-200 font-semibold break-all"
          >
            alienation2innovation@gmail.com
          </a>
        </div>

        <div>
          <p className="text-sm text-slate-400 mb-1">📞 Phone:</p>
          <a
            href="tel:+13049191193"
            className="text-cyan-300 hover:text-cyan-200 font-semibold"
          >
            +1 (304) 919-1193
          </a>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        We typically respond within 24 hours.
      </p>
    </div>
  );
}
