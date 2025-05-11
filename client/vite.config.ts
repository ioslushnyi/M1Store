import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcrt from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5151,
  },
  plugins: [react(), mkcrt()],
});
