import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://www.actualsize.com",
  output: "hybrid",
  adapter: vercel({
    imageService: true,
    // Using Vercel's image service since images on server-rendered pages currently receive a 404 error without it
    webAnalytics: {
      enabled: true,
    },
  }),
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
    sentry({
      dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
      sourceMapsUploadOptions: {
        project: "example-project",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
});
