/// <reference types="vitest" />
/// <reference types="vite/client" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
	root: '.',
	base: '/wwt-frontend-tech-task/',

	server: {
		port: 3000,
		host: true,
		strictPort: true,
		hmr: {
			port: 3010
		}
	},

	plugins: [
		react(),
		svgr({
			include: '**/*.svg'
		}),
		tsconfigPaths(),
		tailwindcss(),
		viteStaticCopy({
			targets: [{ src: 'src/shared/temp/filterData.json', dest: 'shared/temp' }]
		})
	],

	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['setupTest.ts'],
		coverage: {
			provider: 'istanbul'
		}
	}
}))
