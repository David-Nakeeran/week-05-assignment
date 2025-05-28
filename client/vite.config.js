import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hotel: resolve(__dirname, "hotel-page/index.html"),
        form: resolve(__dirname, "form-page/index.html"),
        confirmation: resolve(__dirname, "confirmation-page/index.html"),
      },
    },
  },
});
