import { setupI18nRoutes } from '@/modules/i18n'
import { RouterOptions } from 'vite-ssg'
import { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

const env = import.meta.env

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    ...(env.VITE_IS_LANDING === 'true'
      ? {
          redirect: {
            name: 'Landing'
          }
        }
      : {
          component: () => import('@/pages/Home.vue')
        }),
    meta: {
      order: 0
    }
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('@/pages/Landing.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('@/pages/Guide.vue'),
    meta: {
      order: 0,
      hidden: env.VITE_SHOW_GUIDE !== 'true'
    }
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('@/pages/Session.vue'),
    children: [
      {
        path: ':sessionId',
        name: 'SessionDetail',
        component: () => import('@/pages/Session.vue')
      }
    ],
    meta: {
      order: 1,
      hidden: env.VITE_SHOW_SESSION !== 'true'
    }
  },
  {
    path: '/sponsorship',
    name: 'Sponsorship',
    component: () => import('@/pages/Sponsorship.vue'),
    meta: {
      order: 1,
      hidden: env.VITE_SHOW_SPONSORSHIP !== 'true'
    }
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('@/pages/Room.vue'),
    meta: {
      order: 2,
      hidden: env.VITE_SHOW_ROOM !== 'true'
    }
  },
  {
    path: '/topics',
    name: 'Topics',
    component: () => import('@/pages/Topics.vue'),
    meta: {
      order: 3,
      hidden: env.VITE_SHOW_TOPIC !== 'true'
    }
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/pages/Map.vue'),
    meta: {
      order: 3,
      hidden: env.VITE_SHOW_MAP !== 'true'
    }
  },
  {
    path: '/venue',
    name: 'Venue',
    component: () => import('@/pages/Venue.vue'),
    meta: {
      order: 4,
      hidden: env.VITE_SHOW_VENUE !== 'true'
    }
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: () => import('@/pages/Sponsor.vue'),
    meta: {
      order: 5,
      hidden: env.VITE_SHOW_SPONSOR !== 'true'
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/pages/Community.vue'),
    meta: {
      order: 7,
      hidden: env.VITE_SHOW_COMMUNITY !== 'true'
    }
  },
  {
    path: '/fringe',
    name: 'Fringe',
    component: () => import('@/pages/Fringe.vue'),
    meta: {
      order: 8,
      hidden: env.VITE_SHOW_FRINGE !== 'true'
    }
  },
  {
    path: '/staff',
    name: 'Staff',
    component: () => import('@/pages/Staff.vue'),
    meta: {
      order: 9,
      hidden: env.VITE_SHOW_STAFF !== 'true'
    }
  },
  {
    name: 'NotFound',
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

export const pageRouteNameList = routes.filter(r => !isNaN(Number(r.meta?.order)))
  .sort((a, b) => Number(a.meta?.order) - Number(b.meta?.order))
  .filter((r) => r.meta?.hidden !== true)
  .map(r => r.name?.toString() ?? '')

export const routerOptions: RouterOptions = {
  base: import.meta.env.BASE_URL,
  routes: setupI18nRoutes(routes),
  scrollBehavior: ((): RouterScrollBehavior => {
    const toTreatAsSame = ['Session', 'SessionDetail']
    const savedPosition: Record<'top' | 'left', number> = {
      top: 0,
      left: 0
    }
    const savePosition = (top: number, left: number) => {
      Object.assign(savedPosition, { top, left })
    }
    return (to, from) => {
      if (to.hash) {
        return {
          el: `[name=${to.hash}]`,
          behavior: 'smooth'
        }
      }

      const { scrollX, scrollY } = window
      savePosition(scrollY, scrollX)
      if (to.name === from.name ||
        (toTreatAsSame.includes(to.name?.toString() ?? '') &&
        toTreatAsSame.includes(from.name?.toString() ?? ''))
      ) {
        return savedPosition
      }
      return {
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
    }
  })()
}
