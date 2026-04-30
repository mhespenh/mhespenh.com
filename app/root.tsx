import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useEffect } from "react";
import globalStyles from "~/globals.css";
import { pageview } from "~/lib/google-analytics";
import { Navigation } from "~/scenes/navigation";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
  { rel: "icon", href: "/favicon.ico?v=0" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
  },
];

export const meta: MetaFunction = () => [{ title: "mhespenh.com" }];

export const loader = async () => {
  return json({
    gaTrackingId: process.env.GA_TRACKING_ID,
    umamiScriptUrl: process.env.UMAMI_SCRIPT_URL,
    umamiWebsiteId: process.env.UMAMI_WEBSITE_ID,
  });
};

export default function App() {
  const location = useLocation();
  const { gaTrackingId, umamiScriptUrl, umamiWebsiteId } =
    useLoaderData<typeof loader>();
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (isProd && gaTrackingId) {
      pageview(location.pathname, gaTrackingId);
    }
  }, [isProd, location, gaTrackingId]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isProd && (
          <script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
          ></script>
        )}
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden transition-colors duration-300">
        {process.env.NODE_ENV !== "production" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        <Navigation />
        {/* Background Ambient Gradients */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-50 dark:opacity-100">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[50%] bg-purple-400/40 dark:bg-purple-900/70 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[60%] bg-blue-400/20 dark:bg-blue-900/20 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
        </div>
        <main className="max-w-[1280px] mx-auto px-6 pt-32 pb-24 flex flex-col gap-24 relative">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="w-full py-12 border-t border-border bg-background mt-auto relative z-10">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-6">
            <div className="text-xs uppercase font-medium tracking-widest text-muted-foreground">
              © 2024 mhespenh.com. Built with precision.
            </div>
            <div className="flex gap-6 text-xs uppercase font-medium tracking-widest text-muted-foreground">
              <a
                href="https://github.com/mhespenh"
                className="hover:text-foreground transition-colors hover:translate-y-[-2px]"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mhespenh"
                className="hover:text-foreground transition-colors hover:translate-y-[-2px]"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/mhespenh"
                className="hover:text-foreground transition-colors hover:translate-y-[-2px]"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
