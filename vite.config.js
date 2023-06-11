import { defineConfig } from 'vite';
import { resolve } from 'path';

const rootDir = resolve(__dirname);

export default defineConfig({
	// Opțional: Directorul public în care se află resursele statice, cum ar fi imagini sau fișiere font
	publicDir: './public',

	// Opțional: Configurații suplimentare, cum ar fi plugin-uri sau ajustări ale comportamentului Vite
	plugins: [],

	// Directorul de ieșire (dist) în care vor fi generate fișierele optimizate
	build: {
		outDir: resolve('./', 'dist'), // Directorul de ieșire

		rollupOptions: {
			input: {
				'index-html': resolve(__dirname, 'index.html'),
				main: resolve(__dirname, 'main.js'),
				// admin: resolve(__dirname, 'src/pages/admin/admin.js'),
				'admin-html': resolve(__dirname, 'src/pages/admin/admin.html'),
				// cart: resolve(__dirname, 'src/pages/cart/cart.js'),
				'cart-html': resolve(__dirname, 'src/pages/cart/cart.html'),
				details: resolve(__dirname, 'src/pages/details/details.js'),
				'details-html': resolve(__dirname, 'src/pages/details/details.html'),
			},
		},
	},
});
