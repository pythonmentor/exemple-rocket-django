import { defineConfig } from "vite";
import path from "path";
import topLevelAwait from "vite-plugin-top-level-await";


/**
 * Return an asset file path pattern determined from file type.
 */
const assetFileNames = (assetInfo) => {
  const extType = assetInfo.name.split(".").pop();
  let assetType = "js";
  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
    assetType = "images";
  } else if (extType === "css") {
    assetType = "css";
  } else if (/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i.test(extType)) {
    assetType = "fonts";
  }
  return `${assetType}/[name]-[hash][extname]`;
};

// Configuration entry point
export default defineConfig({
  plugins: [
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  publicDir: path.resolve(__dirname, "public/"),
  base: "/static/",
  server: {
    open: false,
  },
  build: {
    outDir: path.resolve(__dirname, "./static/dist"),
    manifest: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./static/assets/index.js")
      },
      output: {
        assetFileNames,
        entryFileNames: "js/[name]-[hash].js",
      }
    },
  },
});
