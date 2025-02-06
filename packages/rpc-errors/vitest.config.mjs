import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        testTimeout: 50000,
        hookTimeout: 50000,
    },
});
