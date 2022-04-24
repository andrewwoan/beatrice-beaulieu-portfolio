import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[ext]",
                chunkFileNames: "assets/[name].[ext]",
                entryFileNames: "assets/[name].js",
            },
        },
    },
    server: {
        proxy: {
            "/foo": "http://localhost:5000",
            "/api": {
                target: "https://localhost:5000",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
});
