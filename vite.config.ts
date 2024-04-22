import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-plugin-pages-sitemap';
import axios from 'axios';

const queryParams = {
  limit: 100,
  offset: 0,
  min_price: undefined,
  max_price: undefined,
  brand: [],
  color: [],
  memory: [],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages({
      onRoutesGenerated: async (routes) => {
        try {
          const response = await axios.get(`https://turan-backend.online/products/`, { params: queryParams });
          const products = response.data;
          const dynamicRoutes = products.map((product: any) => `/product/${product.id}`);
          generateSitemap({ routes: [...routes, ...dynamicRoutes], changefreq: 'daily' });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
    }),
    react()
  ],
  server: {
    port: 3000
  }
});