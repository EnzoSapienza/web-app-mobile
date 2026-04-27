import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/web-app-mobile/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: [
        'favicon.svg',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png',
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/web-app-mobile/index.html',
        navigateFallbackAllowlist: [/^\/web-app-mobile/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.hostname === 'api.artic.edu' &&
              /^\/api\/v1\/artworks\/\d+$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'artworks-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.hostname === 'www.artic.edu' &&
              url.pathname.startsWith('/iiif/2/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'artworks-images-cache',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: false,
    }),
  ],
});
