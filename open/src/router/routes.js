
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/initial', component: () => import('pages/InitialRedditsPage.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/AuthPage.vue'), name: "LoginPage" }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes


// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/HomePage.vue') },
//       { path: '/recipe', component: () => import('pages/RecipePage.vue') }
//     ]
//   },
//   {
//     path: '/login',
//     component: () => import('layouts/AuthLayout.vue'),
//     children: [{ path: '', component: () => import('pages/AuthPage.vue'), name: "LoginPage" }]
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   }
// ]

// export default routes
