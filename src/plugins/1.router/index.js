import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupGuards } from './guards'

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    
    return route
  }
  
  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }
    
    return { top: 0 }
  },
  extendRoutes: pages => [
    ...[  {
      path: '/',
      name: 'index',
      redirect: to => {
        // TODO: Get type from backend
        const userData = useCookie('userData')
        const userRole = userData.value?.role
        if (userRole === 'admin')
          return { name: 'dashboards-crm' }
        if (userRole === 'client')
          return { name: 'access-control' }
        
        return { name: 'login', query: to.query }
      },
    }],
    ...[...pages, ...[
      {
        path:'/productos-lista',
        name: 'productos',
        component: () => import('@/pages/products.vue'),
        meta: {
          not_authenticate: false,
        }
      }
    ]].map(route => recursiveLayouts(route)),
  ],
})

setupGuards(router)
export { router }
export default function (app) {
  app.use(router)
}
