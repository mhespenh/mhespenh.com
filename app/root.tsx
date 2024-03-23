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
          <>
            <script
              defer
              src={umamiScriptUrl}
              data-website-id={umamiWebsiteId}
            ></script>
            <script
              defer
              data-domain="mhespenh.com"
              src="http://plausible.mhespenh.com/js/script.js"
            ></script>
          </>
        )}
        <Meta />
        <Links />
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
        <Navigation />
        <div
          className="
            pt-32 
            ml-3 mr-3
            md:ml-auto md:mr-auto md:max-w-3xl
            min-h-screen
          "
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
