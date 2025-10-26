<template>
  <div class="main-content">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <IconifyIconOffline :icon="Server" class="title-icon" />
          3D 系统架构监控
        </h1>
        <p class="page-description">
          实时3D可视化系统架构，直观展示各组件状态和数据流向
        </p>
      </div>

      <div class="header-actions">
        <el-button-group>
          <el-button type="primary" :icon="Refresh" @click="refreshSystem">
            刷新数据
          </el-button>
          <el-button :icon="Setting" @click="openSettings">
            设置
          </el-button>
          <el-button :icon="FullScreen" @click="toggleFullscreen">
            全屏
          </el-button>
        </el-button-group>
      </div>
    </div>

    <div class="architecture-container">
      <SystemArchitecture3D />
    </div>

    <!-- 设置对话框 -->
    <el-dialog
      v-model="settingsVisible"
      title="3D架构设置"
      width="600px"
      :before-close="handleClose"
    >
      <el-form :model="settings" label-width="120px">
        <el-form-item label="自动刷新">
          <el-switch v-model="settings.autoRefresh" />
        </el-form-item>
        <el-form-item label="刷新间隔">
          <el-input-number
            v-model="settings.refreshInterval"
            :min="5"
            :max="300"
            :step="5"
            :disabled="!settings.autoRefresh"
          />
          <span class="ml-2">秒</span>
        </el-form-item>
        <el-form-item label="显示FPS">
          <el-switch v-model="settings.showFPS" />
        </el-form-item>
        <el-form-item label="网格地面">
          <el-switch v-model="settings.showGrid" />
        </el-form-item>
        <el-form-item label="粒子效果">
          <el-switch v-model="settings.particleEffect" />
        </el-form-item>
        <el-form-item label="音效">
          <el-switch v-model="settings.soundEnabled" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="settingsVisible = false">取消</el-button>
          <el-button type="primary" @click="saveSettings">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { message } from '@/utils/message'
import { SystemArchitecture3D } from '@/components/ReThree3D/index'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'

import Server from '~icons/ri/server-fill'
import Refresh from '~icons/ep/refresh'
import Setting from '~icons/ep/setting'
import FullScreen from '~icons/ri/fullscreen-line'

defineOptions({
  name: 'SystemArchitecture3DPage'
})

const { toggle: toggleFullscreen } = useFullscreen()
const settingsVisible = ref(false)
const refreshTimer = ref<NodeJS.Timeout>()

const settings = reactive({
  autoRefresh: true,
  refreshInterval: 30,
  showFPS: false,
  showGrid: true,
  particleEffect: true,
  soundEnabled: false
})

// 刷新系统数据
const refreshSystem = () => {
  message('正在刷新系统架构数据...', { type: 'info' })

  // 这里可以调用实际的API获取最新的系统状态
  setTimeout(() => {
    message('系统架构数据已更新', { type: 'success' })
  }, 1000)
}

// 打开设置
const openSettings = () => {
  settingsVisible.value = true
}

// 保存设置
const saveSettings = () => {
  settingsVisible.value = false
  message('设置已保存', { type: 'success' })

  // 重新启动自动刷新
  if (settings.autoRefresh) {
    startAutoRefresh()
  } else {
    stopAutoRefresh()
  }
}

// 关闭对话框
const handleClose = () => {
  settingsVisible.value = false
}

// 开始自动刷新
const startAutoRefresh = () => {
  stopAutoRefresh()
  if (settings.autoRefresh) {
    refreshTimer.value = setInterval(() => {
      refreshSystem()
    }, settings.refreshInterval * 1000)
  }
}

// 停止自动刷新
const stopAutoRefresh = () => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value)
    refreshTimer.value = undefined
  }
}

// 生命周期
onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped lang="scss">
.main-content {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-content {
  flex: 1;
}

.page-title {
  display: flex;
  align-items: center;
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;

  .title-icon {
    margin-right: 12px;
    font-size: 28px;
    color: #3b82f6;
  }
}

.page-description {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.header-actions {
  flex-shrink: 0;
}

.architecture-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

// 响应式设计
@media (max-width: 768px) {
  .main-content {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    gap: 16px;
  }

  .header-actions {
    width: 100%;

    .el-button-group {
      width: 100%;

      .el-button {
        flex: 1;
      }
    }
  }

  .page-title {
    font-size: 20px;
  }
}

// 暗色主题支持
.dark {
  .main-content {
    background: #1a1a1a;
  }

  .page-header,
  .architecture-container {
    background: #2d3748;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .page-title {
    color: #f7fafc;
  }

  .page-description {
    color: #a0aec0;
  }
}
</style>