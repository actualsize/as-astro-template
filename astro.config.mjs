import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
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
  ],
  redirects: {
    "/admin/[...slug]": "/admin",
  },
});
