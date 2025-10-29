<template>
  <div class="monitoring-container">
    <!-- 加载动画 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner" />
      <div>正在加载产业平台运维系统...</div>
    </div>

    <!-- Canvas背景动画 -->
    <canvas ref="bgCanvas" class="background-animation" />

    <!-- 3D悬浮统计信息栏 -->
    <div class="stats-bar">
      <div class="stats-container">
        <div class="stat-item" @click="handleStatClick('total')">
          <div class="stat-value">总数: {{ totalApps }}</div>
          <div class="stat-label">应用总数</div>
        </div>
        <div
          class="stat-item"
          :class="{ 'stat-running': runningApps > 0 }"
          @click="handleStatClick('running')"
        >
          <div class="stat-value">运行: {{ runningApps }}</div>
          <div class="stat-label">运行中</div>
        </div>
        <div
          class="stat-item"
          :class="{ 'stat-warning': warningApps > 0 }"
          @click="handleStatClick('warning')"
        >
          <div class="stat-value">警告: {{ warningApps }}</div>
          <div class="stat-label">警告</div>
        </div>
        <div
          class="stat-item"
          :class="{ 'stat-error': errorApps > 0 }"
          @click="handleStatClick('error')"
        >
          <div class="stat-value">错误: {{ errorApps }}</div>
          <div class="stat-label">错误</div>
        </div>
      </div>
    </div>

    <!-- 区域容器 -->
    <div ref="zonesContainer" class="zones-container">
      <div ref="zoneGrid" class="zone-grid">
        <!-- 第一行：中台区域 + 应用区域 -->
        <div class="zone-row two-columns">
          <!-- 中台区域 -->
          <div class="zone zone-middle">
            <div class="zone-header">
              <div>
                <div class="zone-title">中台区域</div>
                <!-- <div class="zone-description">业务能力共享中心</div> -->
              </div>
            </div>

            <!-- 技术中台分组 -->
            <div class="middle-section">
              <div class="section-header">
                <div class="section-title">技术中台</div>
              </div>
              <div class="apps-container">
                <div
                  v-for="app in technicalPlatformApps"
                  :key="app.id"
                  class="app-button-3d"
                  @click="handleAppClick(app)"
                >
                  <div
                    class="app-button-face app-button-front"
                    :class="app.status"
                  >
                    <div class="app-name">{{ app.name }}</div>
                  </div>
                  <div class="app-button-face app-button-back">
                    <div class="app-info">
                      <div>CPU: {{ app.cpu }}%</div>
                      <div>内存: {{ app.memory }}%</div>
                      <div>状态: {{ app.statusText }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ECS分组 -->
            <div class="middle-section">
              <div class="section-header">
                <div class="section-title">ECS</div>
              </div>
              <div class="apps-container">
                <div
                  v-for="app in ecsApps"
                  :key="app.id"
                  class="app-button-3d"
                  @click="handleAppClick(app)"
                >
                  <div
                    class="app-button-face app-button-front"
                    :class="app.status"
                  >
                    <div class="app-name">{{ app.name }}</div>
                  </div>
                  <div class="app-button-face app-button-back">
                    <div class="app-info">
                      <div>CPU: {{ app.cpu }}%</div>
                      <div>内存: {{ app.memory }}%</div>
                      <div>状态: {{ app.statusText }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 应用区域 -->
          <div class="zone zone-app">
            <div class="zone-header">
              <div>
                <div class="zone-title">应用区域</div>
                <!-- <div class="zone-description">业务应用服务集群</div> -->
              </div>
            </div>

            <!-- 腾讯TKE分组 -->
            <div class="middle-section">
              <div class="section-header">
                <div class="section-title">腾讯TKE</div>
              </div>
              <div class="apps-container">
                <div
                  v-for="app in tkeApps"
                  :key="app.id"
                  class="app-button-3d"
                  @click="handleAppClick(app)"
                >
                  <div
                    class="app-button-face app-button-front"
                    :class="app.status"
                  >
                    <div class="app-name">{{ app.name }}</div>
                  </div>
                  <div class="app-button-face app-button-back">
                    <div class="app-info">
                      <div>CPU: {{ app.cpu }}%</div>
                      <div>内存: {{ app.memory }}%</div>
                      <div>状态: {{ app.statusText }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ECS分组 -->
            <div class="middle-section">
              <div class="section-header">
                <div class="section-title">ECS</div>
              </div>
              <div class="apps-container">
                <div
                  v-for="app in newEcsApps"
                  :key="app.id"
                  class="app-button-3d"
                  @click="handleAppClick(app)"
                >
                  <div
                    class="app-button-face app-button-front"
                    :class="app.status"
                  >
                    <div class="app-name">{{ app.name }}</div>
                  </div>
                  <div class="app-button-face app-button-back">
                    <div class="app-info">
                      <div>CPU: {{ app.cpu }}%</div>
                      <div>内存: {{ app.memory }}%</div>
                      <div>状态: {{ app.statusText }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二行：DMZ区域 + 大数据区域 + 云平台区域（三列布局） -->
        <div class="zone-row three-columns">
          <!-- 大数据区域 -->
          <div class="zone zone-mrs">
            <div class="zone-header">
              <div>
                <div class="zone-title">大数据区域</div>
                <!-- <div class="zone-description">数据处理与分析中心</div> -->
              </div>
            </div>
            <div class="apps-container">
              <div
                v-for="app in mrsApps"
                :key="app.id"
                class="app-button-3d"
                @click="handleAppClick(app)"
              >
                <div
                  class="app-button-face app-button-front"
                  :class="app.status"
                >
                  <div class="app-name">{{ app.name }}</div>
                </div>
                <div class="app-button-face app-button-back">
                  <div class="app-info">
                    <div>CPU: {{ app.cpu }}%</div>
                    <div>内存: {{ app.memory }}%</div>
                    <div>状态: {{ app.statusText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 云平台区域 -->
          <div class="zone zone-cloud">
            <div class="zone-header">
              <div>
                <div class="zone-title">云平台区域</div>
                <!-- <div class="zone-description">云计算资源与服务管理</div> -->
              </div>
            </div>
            <div class="apps-container">
              <div
                v-for="app in cloudApps"
                :key="app.id"
                class="app-button-3d"
                @click="handleAppClick(app)"
              >
                <div
                  class="app-button-face app-button-front"
                  :class="app.status"
                >
                  <div class="app-name">{{ app.name }}</div>
                </div>
                <div class="app-button-face app-button-back">
                  <div class="app-info">
                    <div>CPU: {{ app.cpu }}%</div>
                    <div>内存: {{ app.memory }}%</div>
                    <div>状态: {{ app.statusText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DMZ区域 -->
          <div class="zone zone-dmz">
            <div class="zone-header">
              <div>
                <div class="zone-title">DMZ区域</div>
                <!-- <div class="zone-description">外部访问控制与安全防护</div> -->
              </div>
            </div>
            <div class="apps-container dmz-wrap">
              <div
                v-for="app in dmzApps"
                :key="app.id"
                class="app-button-3d"
                @click="handleAppClick(app)"
              >
                <div
                  class="app-button-face app-button-front"
                  :class="app.status"
                >
                  <div class="app-name">{{ app.name }}</div>
                </div>
                <div class="app-button-face app-button-back">
                  <div class="app-info">
                    <div>CPU: {{ app.cpu }}%</div>
                    <div>内存: {{ app.memory }}%</div>
                    <div>状态: {{ app.statusText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useMonitoring } from "./composables/useMonitoring";

// 组件引用
const bgCanvas = ref<HTMLCanvasElement>();
const zonesContainer = ref<HTMLElement>();
const zoneGrid = ref<HTMLElement>();

// 使用监控逻辑
const {
  loading,
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
} = useMonitoring();

// 统计计算
const allApps = computed(() => [
  ...dmzApps.value,
  ...mrsApps.value,
  ...technicalPlatformApps.value,
  ...ecsApps.value,
  ...tkeApps.value,
  ...newEcsApps.value,
  ...cloudApps.value
]);

const totalApps = computed(() => allApps.value.length);

const runningApps = computed(
  () => allApps.value.filter(app => app.status === "normal").length
);

const warningApps = computed(
  () => allApps.value.filter(app => app.status === "warning").length
);

const errorApps = computed(
  () => allApps.value.filter(app => app.status === "error").length
);

// 应用点击处理
const handleAppClick = (app: any) => {
  console.log("点击应用:", app);
  // 这里可以添加更多交互逻辑，比如弹出详情窗口
};

// 统计项点击处理
const handleStatClick = (statType: string) => {
  console.log("点击统计项:", statType);

  // 这里可以添加详细统计页面跳转逻辑
  switch (statType) {
    case "total":
      console.log("查看应用总数详情");
      break;
    case "running":
      console.log("查看运行中应用详情");
      break;
    case "warning":
      console.log("查看警告应用详情");
      break;
    case "error":
      console.log("查看错误应用详情");
      break;
  }
};

let dataUpdateInterval: number;

// 获取DMZ区域的4个角坐标
const getDMZCoordinates = () => {
  const dmzElement = document.querySelector(".zone-dmz");
  if (!dmzElement) {
    console.log("DMZ区域未找到");
    return null;
  }

  const rect = dmzElement.getBoundingClientRect();
  const coordinates = {
    topLeft: { x: rect.left, y: rect.top },
    topRight: { x: rect.right, y: rect.top },
    bottomLeft: { x: rect.left, y: rect.bottom },
    bottomRight: { x: rect.right, y: rect.bottom },
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2
  };

  console.log("DMZ区域坐标:", coordinates);
  return coordinates;
};

// 获取中台区域的4个角坐标
const getMiddleZoneCoordinates = () => {
  const middleElement = document.querySelector(".zone-middle");
  if (!middleElement) {
    console.log("中台区域未找到");
    return null;
  }

  const rect = middleElement.getBoundingClientRect();
  const coordinates = {
    topLeft: { x: rect.left, y: rect.top },
    topRight: { x: rect.right, y: rect.top },
    bottomLeft: { x: rect.left, y: rect.bottom },
    bottomRight: { x: rect.right, y: rect.bottom },
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2
  };

  console.log("中台区域坐标:", coordinates);
  return coordinates;
};

// 获取MRS区域的坐标
const getMRSCoordinates = () => {
  const mrsElement = document.querySelector(".zone-mrs");
  if (!mrsElement) {
    console.log("MRS区域未找到");
    return null;
  }

  const rect = mrsElement.getBoundingClientRect();
  const coordinates = {
    topLeft: { x: rect.left, y: rect.top },
    topRight: { x: rect.right, y: rect.top },
    bottomLeft: { x: rect.left, y: rect.bottom },
    bottomRight: { x: rect.right, y: rect.bottom },
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2
  };

  console.log("MRS区域坐标:", coordinates);
  return coordinates;
};

// 获取DMZ与MRS区域之间的距离
const getDMZToMRSDistance = () => {
  const dmzCoords = getDMZCoordinates();
  const mrsCoords = getMRSCoordinates();

  if (dmzCoords && mrsCoords) {
    const distance = mrsCoords.left - dmzCoords.right;
    console.log("DMZ区域右边到MRS区域左边的距离:", distance + "px");

    // 检查是否接近50像素
    if (Math.abs(distance - 50) < 5) {
      console.log("✅ 距离设置正确，约为50像素");
    } else {
      console.log("❌ 距离需要调整，当前为", distance + "px，目标为50px");
    }

    return distance;
  }
};

// 获取两个区域的相对位置信息
const getRelativePositions = () => {
  const dmzCoords = getDMZCoordinates();
  const middleCoords = getMiddleZoneCoordinates();

  if (dmzCoords && middleCoords) {
    const relativePosition = {
      dmzToMiddle: {
        horizontal: middleCoords.centerX - dmzCoords.centerX,
        vertical: middleCoords.centerY - dmzCoords.centerY,
        distance: Math.sqrt(
          Math.pow(middleCoords.centerX - dmzCoords.centerX, 2) +
          Math.pow(middleCoords.centerY - dmzCoords.centerY, 2)
        )
      }
    };

    console.log("DMZ与中台区域相对位置:", relativePosition);
    return relativePosition;
  }
};

onMounted(() => {
  // 初始化背景动画
  if (bgCanvas.value) {
    initBackgroundAnimation(bgCanvas.value);
  }

  // 立即设置加载完成
  loading.value = false;

  // 延迟执行其他初始化
  setTimeout(() => {
    // 初始化3D鼠标跟踪
    if (zonesContainer.value && zoneGrid.value) {
      add3DMouseTracking(zonesContainer.value, zoneGrid.value);
    }

    // 定期更新数据
    dataUpdateInterval = window.setInterval(simulateDataUpdate, 5000);

    // 获取并输出各区域坐标信息
    setTimeout(() => {
      getDMZCoordinates();
      getMRSCoordinates();
      getMiddleZoneCoordinates();
      getDMZToMRSDistance();
      getRelativePositions();
    }, 1000);
  }, 1500);
});

onUnmounted(() => {
  if (dataUpdateInterval) {
    clearInterval(dataUpdateInterval);
  }
});
</script>

<style scoped src="./styles/monitoring.css"></style>
