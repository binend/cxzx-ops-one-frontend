export default {
  path: "/monitoring",
  redirect: "/monitoring/index",
  name: "Monitoring",
  meta: {
    title: "运维监控",
    icon: "ri:monitor-line",
    rank: 8
  },
  children: [
    {
      path: "/monitoring/index",
      name: "MonitoringIndex",
      component: () => import("@/views/monitoring/index.vue"),
      meta: {
        title: "3D运维监控",
        icon: "ri:dashboard-3-line"
      }
    }
  ]
} as RouteConfigs;
