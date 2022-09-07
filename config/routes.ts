export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      {
        path: '/system/attendance',
        name: 'attendance',
        component: './System/Attendance',
      },
      {
        path: '/system/authorization',
        name: 'authorization',
        component: './System/Authorization',
      },
      {
        path: '/system/dormConfig',
        name: 'dormConfig',
        component: './System/DormConfig',
      },
      {
        path: '/system/approval',
        name: 'approval',
        component: './System/Review',
      },
    ],
  },
  {
    path: '/students',
    name: 'students',
    icon: 'team',
    access: 'canAdmin',
    component: './Students',
  },
  {
    path: '/apartment',
    name: 'apartment',
    icon: 'home',
    component: './Apartment',
  },
  {
    path: '/service',
    name: 'service',
    icon: 'tool',
    component: './Service',
  },
  {
    path: '/utility',
    name: 'utility',
    icon: 'payCircle',
    component: './Utility',
  },
  {
    path: '/discipline',
    name: 'discipline',
    icon: 'warning',
    component: './Discipline',
  },
  // {
  //   path: '/report',
  //   name: 'report',
  //   icon: 'AreaChart',
  //   component: './Report',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
