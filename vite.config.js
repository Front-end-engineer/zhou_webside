import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// AutoImport({
//   resolvers: [ElementPlusResolver()],
//   imports: [
//     "vue",
//     "uni-app",
//     "vue-i18n",
//     // {
//     //   // 自动导入 Pinia 相关函数
//     //   pinia: [
//     //     "defineStore", // import { defineStore } from 'pinia'
//     //     "storeToRefs", // import { storeToRefs } from 'pinia'
//     //   ],
//     //   // // 或者直接导入整个 Pinia API
//     //   // 'pinia': ['*']
//     // },
//   ],
// }),
export default defineConfig({
  base: "./",
  plugins: [
    uni(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        "vue",
        "uni-app",
        "vue-i18n",
        {
          // 自动导入 Pinia 相关函数
          pinia: [
            "defineStore", // import { defineStore } from 'pinia'
            "storeToRefs", // import { storeToRefs } from 'pinia'
          ],
        },
      ],
      dirs: ["src/stores"],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  // server: {
  //   proxy: {
  //     // 将以 /api 开头的请求代理到 http://localhost:3000
  //     "/api": {
  //       target: "http://192.168.0.129:8082",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id || typeof id !== "string") return "vendor";
          // 统一路径分隔符
          const normalizedId = id.replace(/\\/g, "/");

          if (!normalizedId.includes("node_modules")) return;
          // 处理 @scope/package 和普通包
          const match = normalizedId.match(
            /node_modules\/(@[^/]+\/[^/]+|[^/]+)/
          );
          return match ? `vendor-${match[1].replace("@", "")}` : "vendor";
        },
      },
    },
  },
  // 覆盖颜色
  css: {
    preprocessorOptions: {
      scss: {
        // 这里的路径要和刚刚写的 index.scss 文件路径一致
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
        silenceDeprecations: ["legacy-js-api"], // 去掉sass警告
      },
    },
  },
});
