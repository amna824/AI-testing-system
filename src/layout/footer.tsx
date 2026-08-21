import { ScanEye } from "lucide-react";

const FOOTER_LINKS = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Developers: ["Docs", "CLI reference", "SDK", "Status"],
  Company: ["About", "Blog", "Careers", "Contact"],
};

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .32.22.7.83.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.5 22H1.3l8.1-9.3L1 2h7l4.9 6.1L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[#D5DACD] bg-[#0A192F]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8C5A3C] text-[#FAF6F0]">
                <ScanEye size={18} strokeWidth={2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-[#FAF6F0]">
                AutoTest<span className="text-[#8C5A3C]">.ai</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#D5DACD]/60">
              AI-generated, self-healing QA suites — run on real cloud browsers, replayed
              in full.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#D5DACD]/70 transition-colors hover:border-[#8C5A3C]/50 hover:text-[#FAF6F0]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#D5DACD]/70 transition-colors hover:border-[#8C5A3C]/50 hover:text-[#FAF6F0]"
              >
                <XIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D5DACD]/40">
                  {heading}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#D5DACD]/70 transition-colors hover:text-[#8C5A3C]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-[#D5DACD]/40">
            © {new Date().getFullYear()} AutoTest.ai — All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-[#D5DACD]/40 hover:text-[#D5DACD]/70">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-[#D5DACD]/40 hover:text-[#D5DACD]/70">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}