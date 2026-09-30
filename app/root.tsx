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
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  },
];

// Applied before first paint so the page never renders the light theme and then flips.
const themeInitScript = `
  try {
    var mode = localStorage.getItem("theme") || "system";
    var dark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
`;

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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
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
        <div className="flex min-h-screen flex-col items-center px-4 pb-24 pt-4">
          <Navigation />
          <div className="w-full max-w-3xl pt-28">
            <Outlet />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
