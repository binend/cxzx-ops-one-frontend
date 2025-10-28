import { ref } from "vue";

export interface Application {
  id: number;
  name: string;
  status: "normal" | "warning" | "error";
  statusText: string;
  cpu: number;
  memory: number;
  icon?: string;
}

export function useMonitoring() {
  const loading = ref(true);
  const bgCanvas = ref<HTMLCanvasElement>();

  // 应用数据
  const dmzApps = ref<Application[]>([
    {
      id: 1,
      name: "MinIO前置机",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 45
    },
    {
      id: 2,
      name: "MinIO后置机",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 50
    }
  ]);

  const mrsApps = ref<Application[]>([
    {
      id: 6,
      name: "HDFS",
      status: "normal",
      statusText: "正常",
      cpu: 65,
      memory: 75
    },
    {
      id: 7,
      name: "YARN",
      status: "normal",
      statusText: "正常",
      cpu: 60,
      memory: 70
    },
    {
      id: 8,
      name: "Spark",
      icon: "⚡",
      status: "normal",
      statusText: "正常",
      cpu: 65,
      memory: 75
    },
    {
      id: 9,
      name: "Kafka",
      icon: "📨",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 45
    },
    {
      id: 10,
      name: "Flink",
      icon: "🔄",
      status: "error",
      statusText: "错误",
      cpu: 95,
      memory: 90
    },
    {
      id: 11,
      name: "HBase",
      icon: "🗄️",
      status: "normal",
      statusText: "正常",
      cpu: 55,
      memory: 60
    },
    {
      id: 12,
      name: "Hive",
      icon: "🍯",
      status: "warning",
      statusText: "警告",
      cpu: 80,
      memory: 85
    },
    {
      id: 30,
      name: "ClickHouse",
      status: "normal",
      statusText: "正常",
      cpu: 60,
      memory: 70
    },
    {
      id: 31,
      name: "ElasticSearch",
      status: "normal",
      statusText: "正常",
      cpu: 75,
      memory: 65
    }
  ]);

  const technicalPlatformApps = ref<Application[]>([
    {
      id: 40,
      name: "中台统一认证门户",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 41,
      name: "智能搜索工具",
      status: "normal",
      statusText: "正常",
      cpu: 55,
      memory: 60
    },
    {
      id: 42,
      name: "AI中台",
      status: "normal",
      statusText: "正常",
      cpu: 70,
      memory: 75
    },
    {
      id: 43,
      name: "数据中台",
      status: "warning",
      statusText: "警告",
      cpu: 80,
      memory: 85
    },
    {
      id: 44,
      name: "能力中心",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 45
    },
    {
      id: 45,
      name: "知识中台",
      status: "normal",
      statusText: "正常",
      cpu: 50,
      memory: 55
    },
    {
      id: 46,
      name: "知识管理工具",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 40
    },
    {
      id: 47,
      name: "智能辅助写作工具",
      status: "normal",
      statusText: "正常",
      cpu: 30,
      memory: 35
    },
    {
      id: 48,
      name: "产业培育调度",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 49,
      name: "业务中台系统",
      status: "normal",
      statusText: "正常",
      cpu: 60,
      memory: 65
    },
    {
      id: 50,
      name: "产业链管理系统",
      status: "normal",
      statusText: "正常",
      cpu: 55,
      memory: 60
    }
  ]);

  const ecsApps = ref<Application[]>([
    {
      id: 51,
      name: "开源采集工具",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 45
    },
    {
      id: 52,
      name: "数据治理系统",
      status: "warning",
      statusText: "警告",
      cpu: 75,
      memory: 80
    },
    {
      id: 53,
      name: "数据资产运营系统",
      status: "normal",
      statusText: "正常",
      cpu: 65,
      memory: 70
    },
    {
      id: 54,
      name: "数据可视化工具",
      status: "normal",
      statusText: "正常",
      cpu: 50,
      memory: 55
    },
    {
      id: 55,
      name: "智能感知工具",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 56,
      name: "专家协同工具",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 40
    },
    {
      id: 57,
      name: "数据可信系统",
      status: "error",
      statusText: "错误",
      cpu: 90,
      memory: 95
    },
    {
      id: 58,
      name: "数据沙箱工具",
      status: "normal",
      statusText: "正常",
      cpu: 30,
      memory: 35
    }
  ]);

  // 腾讯TKE应用组
  const tkeApps = ref<Application[]>([
    {
      id: 101,
      name: "移动数字服务",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 102,
      name: "产业大脑",
      status: "normal",
      statusText: "正常",
      cpu: 65,
      memory: 70
    },
    {
      id: 103,
      name: "重大科技设施",
      status: "normal",
      statusText: "正常",
      cpu: 55,
      memory: 60
    },
    {
      id: 104,
      name: "产业招商",
      status: "warning",
      statusText: "警告",
      cpu: 75,
      memory: 80
    },
    {
      id: 105,
      name: "产业监测",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 45
    },
    {
      id: 106,
      name: "产业指数",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 40
    },
    {
      id: 107,
      name: "产业政策",
      status: "normal",
      statusText: "正常",
      cpu: 30,
      memory: 35
    },
    {
      id: 108,
      name: "研究辅助工作台",
      status: "normal",
      statusText: "正常",
      cpu: 50,
      memory: 55
    },
    {
      id: 109,
      name: "产业人才",
      status: "normal",
      statusText: "正常",
      cpu: 42,
      memory: 48
    },
    {
      id: 110,
      name: "技术供需对接",
      status: "warning",
      statusText: "警告",
      cpu: 68,
      memory: 72
    },
    {
      id: 111,
      name: "产业头条",
      status: "normal",
      statusText: "正常",
      cpu: 38,
      memory: 42
    },
    {
      id: 112,
      name: "产业地图",
      status: "normal",
      statusText: "正常",
      cpu: 46,
      memory: 51
    },
    {
      id: 113,
      name: "产业项目评审",
      status: "normal",
      statusText: "正常",
      cpu: 52,
      memory: 58
    },
    {
      id: 114,
      name: "成果转化项目监测",
      status: "error",
      statusText: "错误",
      cpu: 88,
      memory: 92
    },
    {
      id: 115,
      name: "政当时",
      status: "normal",
      statusText: "正常",
      cpu: 33,
      memory: 38
    },
    {
      id: 116,
      name: "产业信息驾驶舱",
      status: "normal",
      statusText: "正常",
      cpu: 71,
      memory: 76
    }
  ]);

  // ECS应用组
  const newEcsApps = ref<Application[]>([
    {
      id: 201,
      name: "DIKI产业智脑分析平台",
      status: "normal",
      statusText: "正常",
      cpu: 78,
      memory: 82
    },
    {
      id: 202,
      name: "平台门户管理",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 203,
      name: "统一身份认证",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 40
    },
    {
      id: 204,
      name: "开源资讯分析平台",
      status: "normal",
      statusText: "正常",
      cpu: 62,
      memory: 67
    },
    {
      id: 205,
      name: "填鸭问卷",
      status: "warning",
      statusText: "警告",
      cpu: 58,
      memory: 63
    },
    {
      id: 206,
      name: "智能感知工具",
      status: "normal",
      statusText: "正常",
      cpu: 41,
      memory: 46
    },
    {
      id: 207,
      name: "智能调研工具",
      status: "normal",
      statusText: "正常",
      cpu: 37,
      memory: 42
    },
    {
      id: 208,
      name: "专家协同工具",
      status: "normal",
      statusText: "正常",
      cpu: 44,
      memory: 49
    }
  ]);

  const cloudApps = ref<Application[]>([
    {
      id: 25,
      name: "K8s集群",
      icon: "☸️",
      status: "normal",
      statusText: "正常",
      cpu: 65,
      memory: 70
    },
    {
      id: 26,
      name: "Docker容器",
      icon: "🐳",
      status: "normal",
      statusText: "正常",
      cpu: 45,
      memory: 50
    },
    {
      id: 27,
      name: "对象存储",
      icon: "📦",
      status: "normal",
      statusText: "正常",
      cpu: 30,
      memory: 35
    },
    {
      id: 28,
      name: "CDN加速",
      icon: "🚀",
      status: "normal",
      statusText: "正常",
      cpu: 25,
      memory: 30
    },
    {
      id: 29,
      name: "负载均衡",
      icon: "⚖️",
      status: "warning",
      statusText: "警告",
      cpu: 80,
      memory: 75
    },
    {
      id: 30,
      name: "数据库RDS",
      icon: "🗄️",
      status: "normal",
      statusText: "正常",
      cpu: 55,
      memory: 60
    },
    {
      id: 31,
      name: "缓存服务",
      icon: "💾",
      status: "normal",
      statusText: "正常",
      cpu: 40,
      memory: 45
    },
    {
      id: 32,
      name: "API网关",
      icon: "🌐",
      status: "normal",
      statusText: "正常",
      cpu: 35,
      memory: 40
    }
  ]);

  // 背景动画
  const initBackgroundAnimation = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 200, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // 连线效果
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 200, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // 响应窗口大小变化
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  // 3D鼠标跟踪
  const add3DMouseTracking = (
    zonesContainer: HTMLElement,
    zoneGrid: HTMLElement
  ) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = zonesContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 10; // -10deg to 10deg
      const rotateX = (y - 0.5) * -10; // -10deg to 10deg

      zoneGrid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      zoneGrid.style.transform = "rotateX(2deg) rotateY(0deg)";
    };

    zonesContainer.addEventListener("mousemove", handleMouseMove);
    zonesContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      zonesContainer.removeEventListener("mousemove", handleMouseMove);
      zonesContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  // 模拟数据更新
  const simulateDataUpdate = () => {
    const updateAppStatus = (apps: Application[]) => {
      apps.forEach(app => {
        // 随机更新CPU和内存使用率
        app.cpu = Math.max(
          10,
          Math.min(95, app.cpu + (Math.random() - 0.5) * 10)
        );
        app.memory = Math.max(
          10,
          Math.min(95, app.memory + (Math.random() - 0.5) * 8)
        );

        // 随机更新状态
        if (Math.random() < 0.05) {
          // 5%概率改变状态
          const statuses: Array<"normal" | "warning" | "error"> = [
            "normal",
            "warning",
            "error"
          ];
          app.status = statuses[Math.floor(Math.random() * statuses.length)];
          app.statusText =
            app.status === "normal"
              ? "正常"
              : app.status === "warning"
                ? "警告"
                : "错误";
        }
      });
    };

    updateAppStatus(dmzApps.value);
    updateAppStatus(mrsApps.value);
    updateAppStatus(technicalPlatformApps.value);
    updateAppStatus(ecsApps.value);
    updateAppStatus(tkeApps.value);
    updateAppStatus(newEcsApps.value);
    updateAppStatus(cloudApps.value);
  };

  return {
    loading,
    bgCanvas,
    dmzApps,
    mrsApps,
    technicalPlatformApps,
    ecsApps,
    tkeApps,
    newEcsApps,
    cloudApps,
    initBackgroundAnimation,
    simulateDataUpdate,
    add3DMouseTracking
  };
}
