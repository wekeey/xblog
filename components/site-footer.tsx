import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent border-border/40 border-t group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container min-h-(--footer-height) py-6 sm:py-8">
          {/* Main footer content */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Copyright and ICP info */}
            <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <div className="text-muted-foreground text-sm">
                © {currentYear} {siteConfig.copyright}. All rights reserved.
              </div>
              {siteConfig.icp?.number && (
                <div className="text-muted-foreground text-xs">
                  <a
                    href={siteConfig.icp.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {siteConfig.icp.number}
                  </a>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-col items-center gap-4 sm:items-end">
              <div className="flex items-center gap-4">
                {siteConfig.links.github && (
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="GitHub"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
                {siteConfig.links.twitter && (
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Twitter"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
              <div className="text-muted-foreground text-xs">
                Built with{" "}
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Next.js
                </a>
                {" · "}
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
