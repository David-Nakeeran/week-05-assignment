import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hotel: resolve(__dirname, "hotel-page.html"),
        form: resolve(__dirname, "form-page.html"),
        confirmation: resolve(__dirname, "confirmation-page.html"),
      },
    },
  },
});
