import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/config/site.ts";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  site: site.siteUrl,
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
    }),
  ],
});
