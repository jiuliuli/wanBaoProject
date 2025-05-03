import { defineConfig } from '@umijs/max';
import { routes } from './src/components/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  routes: [
    {
      path: '/',
      component: '@/layouts/MainLayout',
      routes: routes,
    },
  ],
  npmClient: 'pnpm',
  // 代理配置，用于解决开发环境中的跨域问题
  proxy: {
    '/v1': {
      target: 'http://121.89.81.112:3000',
      changeOrigin: true,
    },
  },
});
