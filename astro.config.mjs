import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "<YOUR-SITE>",
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
});
