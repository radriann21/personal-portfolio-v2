// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://adrianrangel.dev',
    output: 'static',
    compressHTML: true,
    integrations: [sitemap()],
    build: {
        inlineStylesheets: 'auto'
    },
    vite: {
        plugins: [tailwindcss()],
        build: {
            cssCodeSplit: true,
            minify: 'esbuild',
            rollupOptions: {
                output: {
                    manualChunks: {
                        'anime': ['animejs']
                    }
                }
            }
        }
    }
});
