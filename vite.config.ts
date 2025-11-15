import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// for g
// export default defineConfig({
//   plugins: [react()],
//   base: "/ManishwedsAayu.github.io"
// })
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => ({
  // server: {
  //   host: "::",
  //   port: 8080,
  // },
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
