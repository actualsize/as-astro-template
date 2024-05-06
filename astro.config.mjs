import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://www.actualsize.com",
  // TODO: replace site URL
  image: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
  integrations: [
    tailwind(),
    sanity({
      projectId: "<YOUR-PROJECT-ID>",
      dataset: "<YOUR-DATASET-NAME>",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
    sitemap(),
  ],
  redirects: {
    "/admin/[...slug]": "/admin",
  },
  output: "hybrid",
  adapter: vercel({
    imageService: true,
    // Using Vercel's image service since images on server-rendered pages currently receive a 404 error without it
    webAnalytics: {
      enabled: true,
    },
  }),
});
