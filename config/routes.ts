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
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      // {
      //   path: '/system/attendance',
      //   name: 'attendance',
      //   component: './System/Attendance',
      // },
      {
        path: '/system/authorization',
        name: '用户管理',
        component: './System/Authorization',
      },
      {
        path: '/system/dormConfig',
        name: '宿舍配置',
        component: './System/DormConfig',
      },
      // {
      //   path: '/system/approval',
      //   name: 'approval',
      //   component: './System/Review',
      // },
    ],
  },
  {
    path: '/students',
    name: '学生管理',
    icon: 'team',
    access: 'canAdmin',
    component: './Students',
  },
  {
    path: '/apartment',
    name: '住宿管理',
    icon: 'home',
    component: './Apartment',
  },
  {
    path: '/service',
    name: '维修管理',
    icon: 'tool',
    component: './Service',
  },
  {
    path: '/utility',
    name: '水电费管理',
    icon: 'payCircle',
    component: './Utility',
  },
  {
    path: '/discipline',
    name: '违纪管理',
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
