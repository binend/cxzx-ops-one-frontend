<template>
  <div class="three-3d-container">
    <div ref="threeContainer" class="three-canvas"></div>
    <div class="controls-panel">
      <el-card class="control-card">
        <template #header>
          <div class="card-header">
            <span>3D 系统架构控制台</span>
          </div>
        </template>

        <div class="control-section">
          <h4>视角控制</h4>
          <el-button-group class="button-group">
            <el-button size="small" @click="resetCamera">重置视角</el-button>
            <el-button size="small" @click="topView">俯视图</el-button>
            <el-button size="small" @click="sideView">侧视图</el-button>
          </el-button-group>
        </div>

        <div class="control-section">
          <h4>动画控制</h4>
          <el-switch
            v-model="animationEnabled"
            active-text="数据流动画"
            @change="toggleAnimation"
          />
          <el-switch
            v-model="rotationEnabled"
            active-text="自动旋转"
            @change="toggleRotation"
            class="mt-2"
          />
        </div>

        <div class="control-section">
          <h4>节点信息</h4>
          <div v-if="selectedNode" class="node-info">
            <p><strong>节点名称:</strong> {{ selectedNode.name }}</p>
            <p><strong>节点类型:</strong> {{ selectedNode.type }}</p>
            <p><strong>状态:</strong>
              <el-tag :type="selectedNode.status === 'online' ? 'success' : 'danger'">
                {{ selectedNode.status === 'online' ? '在线' : '离线' }}
              </el-tag>
            </p>
          </div>
          <div v-else class="no-selection">
            点击节点查看详细信息
          </div>
        </div>

        <div class="control-section">
          <h4>系统统计</h4>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-label">总节点数:</span>
              <span class="stat-value">{{ systemStats.totalNodes }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">在线节点:</span>
              <span class="stat-value online">{{ systemStats.onlineNodes }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">数据流:</span>
              <span class="stat-value">{{ systemStats.dataFlows }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

defineOptions({
  name: 'SystemArchitecture3D'
})

interface SystemNode {
  id: string
  name: string
  type: 'server' | 'database' | 'loadbalancer' | 'cache' | 'microservice'
  position: THREE.Vector3
  status: 'online' | 'offline'
  mesh?: THREE.Mesh
  color?: number
}

interface DataFlow {
  from: string
  to: string
  curve?: THREE.Curve<THREE.Vector3>
  particles?: THREE.Points
}

const threeContainer = ref<HTMLElement>()
const selectedNode = ref<SystemNode | null>(null)
const animationEnabled = ref(true)
const rotationEnabled = ref(false)

const systemStats = ref({
  totalNodes: 0,
  onlineNodes: 0,
  dataFlows: 0
})

// Three.js 核心对象
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let animationId: number

// 系统节点和数据流
let systemNodes: SystemNode[] = []
let dataFlows: DataFlow[] = []

// 初始化Three.js场景
const initThreeScene = () => {
  if (!threeContainer.value) return

  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)
  scene.fog = new THREE.Fog(0x0a0a0a, 10, 100)

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    threeContainer.value.clientWidth / threeContainer.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(20, 20, 20)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  threeContainer.value.appendChild(renderer.domElement)

  // 创建控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // 添加灯光
  setupLighting()

  // 创建系统架构
  createSystemArchitecture()

  // 添加事件监听
  window.addEventListener('resize', onWindowResize)
  renderer.domElement.addEventListener('click', onMouseClick)
}

// 设置灯光
const setupLighting = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)

  // 方向光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.near = 0.1
  directionalLight.shadow.camera.far = 50
  directionalLight.shadow.camera.left = -20
  directionalLight.shadow.camera.right = 20
  directionalLight.shadow.camera.top = 20
  directionalLight.shadow.camera.bottom = -20
  scene.add(directionalLight)

  // 点光源
  const pointLight = new THREE.PointLight(0x00ff88, 1, 100)
  pointLight.position.set(0, 10, 0)
  scene.add(pointLight)
}

// 创建系统架构
const createSystemArchitecture = () => {
  // 创建网格地面
  const gridHelper = new THREE.GridHelper(40, 20, 0x444444, 0x222222)
  scene.add(gridHelper)

  // 创建系统节点
  createNodes()

  // 创建数据流连接
  createDataFlows()

  // 更新统计信息
  updateStats()
}

// 创建系统节点
const createNodes = () => {
  const nodeConfigs: Omit<SystemNode, 'position'>[] = [
    { id: 'lb1', name: '负载均衡器', type: 'loadbalancer', status: 'online' },
    { id: 'web1', name: 'Web服务器1', type: 'server', status: 'online' },
    { id: 'web2', name: 'Web服务器2', type: 'server', status: 'online' },
    { id: 'app1', name: '应用服务1', type: 'microservice', status: 'online' },
    { id: 'app2', name: '应用服务2', type: 'microservice', status: 'online' },
    { id: 'db1', name: '主数据库', type: 'database', status: 'online' },
    { id: 'db2', name: '从数据库', type: 'database', status: 'online' },
    { id: 'cache1', name: 'Redis缓存', type: 'cache', status: 'online' },
    { id: 'api1', name: 'API网关', type: 'microservice', status: 'online' },
    { id: 'mq1', name: '消息队列', type: 'microservice', status: 'offline' }
  ]

  nodeConfigs.forEach((config, index) => {
    const node: SystemNode = {
      ...config,
      position: calculateNodePosition(index, nodeConfigs.length)
    }

    node.mesh = createNodeMesh(node)
    node.color = getNodeColor(node.type, node.status)

    scene.add(node.mesh)
    systemNodes.push(node)
  })
}

// 计算节点位置
const calculateNodePosition = (index: number, total: number): THREE.Vector3 => {
  const radius = 12
  const angle = (index / total) * Math.PI * 2
  const layers = [
    { y: 8, count: 1 },  // 负载均衡器
    { y: 4, count: 3 },  // Web服务器
    { y: 0, count: 4 },  // 应用服务和数据库
    { y: -4, count: 2 }  // 缓存和消息队列
  ]

  let currentLayer = 0
  let countInLayer = 0

  for (let i = 0; i < layers.length; i++) {
    if (index < layers[i].count + countInLayer) {
      currentLayer = i
      break
    }
    countInLayer += layers[i].count
  }

  const indexInLayer = index - countInLayer
  const layerTotal = layers[currentLayer].count
  const layerAngle = (indexInLayer / layerTotal) * Math.PI * 2
  const layerRadius = radius * (1 - currentLayer * 0.2)

  return new THREE.Vector3(
    Math.cos(layerAngle) * layerRadius,
    layers[currentLayer].y,
    Math.sin(layerAngle) * layerRadius
  )
}

// 创建节点网格
const createNodeMesh = (node: SystemNode): THREE.Mesh => {
  let geometry: THREE.BufferGeometry

  switch (node.type) {
    case 'loadbalancer':
      geometry = new THREE.OctahedronGeometry(1.5)
      break
    case 'server':
      geometry = new THREE.BoxGeometry(2, 1, 2)
      break
    case 'database':
      geometry = new THREE.CylinderGeometry(1, 1.5, 2)
      break
    case 'cache':
      geometry = new THREE.TetrahedronGeometry(1.5)
      break
    case 'microservice':
      geometry = new THREE.SphereGeometry(1)
      break
    default:
      geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  }

  const material = new THREE.MeshPhongMaterial({
    color: getNodeColor(node.type, node.status),
    emissive: getNodeColor(node.type, node.status),
    emissiveIntensity: node.status === 'online' ? 0.2 : 0.05,
    transparent: true,
    opacity: 0.9
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(node.position)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.userData = { node }

  // 添加发光效果
  if (node.status === 'online') {
    const glowGeometry = geometry.clone()
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: getNodeColor(node.type, node.status),
      transparent: true,
      opacity: 0.3
    })
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    glowMesh.scale.set(1.2, 1.2, 1.2)
    mesh.add(glowMesh)
  }

  return mesh
}

// 获取节点颜色
const getNodeColor = (type: string, status: string): number => {
  const statusMultiplier = status === 'online' ? 1 : 0.3

  switch (type) {
    case 'loadbalancer':
      return 0x00ff88 * statusMultiplier
    case 'server':
      return 0x0088ff * statusMultiplier
    case 'database':
      return 0xff8800 * statusMultiplier
    case 'cache':
      return 0xff0088 * statusMultiplier
    case 'microservice':
      return 0x8800ff * statusMultiplier
    default:
      return 0x888888 * statusMultiplier
  }
}

// 创建数据流
const createDataFlows = () => {
  const flowConfigs = [
    { from: 'lb1', to: 'web1' },
    { from: 'lb1', to: 'web2' },
    { from: 'web1', to: 'app1' },
    { from: 'web2', to: 'app2' },
    { from: 'app1', to: 'db1' },
    { from: 'app2', to: 'db1' },
    { from: 'app1', to: 'cache1' },
    { from: 'app2', to: 'cache1' },
    { from: 'db1', to: 'db2' }
  ]

  flowConfigs.forEach(config => {
    const fromNode = systemNodes.find(n => n.id === config.from)
    const toNode = systemNodes.find(n => n.id === config.to)

    if (fromNode && toNode) {
      const flow: DataFlow = {
        from: config.from,
        to: config.to
      }

      // 创建连接线
      createConnectionLine(fromNode.position, toNode.position, flow)

      // 创建粒子动画
      createParticleFlow(fromNode.position, toNode.position, flow)

      dataFlows.push(flow)
    }
  })
}

// 创建连接线
const createConnectionLine = (start: THREE.Vector3, end: THREE.Vector3, flow: DataFlow) => {
  const curve = new THREE.CatmullRomCurve3([start, end])
  flow.curve = curve

  const curvePoints = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.3,
    linewidth: 2
  })

  const line = new THREE.Line(geometry, material)
  scene.add(line)
}

// 创建粒子流动
const createParticleFlow = (start: THREE.Vector3, end: THREE.Vector3, flow: DataFlow) => {
  const particleCount = 20
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount
    const point = new THREE.Vector3().lerpVectors(start, end, t)
    positions[i * 3] = point.x
    positions[i * 3 + 1] = point.y
    positions[i * 3 + 2] = point.z
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.3,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  const particles = new THREE.Points(geometry, material)
  particles.userData = { flow, start, end, speed: Math.random() * 0.01 + 0.005 }

  scene.add(particles)
  flow.particles = particles
}

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 更新控制器
  controls.update()

  // 自动旋转
  if (rotationEnabled.value) {
    scene.rotation.y += 0.005
  }

  // 数据流动画
  if (animationEnabled.value) {
    animateDataFlows()
  }

  // 节点脉动效果
  animateNodes()

  renderer.render(scene, camera)
}

// 数据流动画
const animateDataFlows = () => {
  dataFlows.forEach(flow => {
    if (flow.particles) {
      const particleSystem = flow.particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array
      const userData = particleSystem.userData

      for (let i = 0; i < positions.length; i += 3) {
        const t = (i / 3) / (positions.length / 3)
        const newT = (t + userData.speed) % 1

        const point = new THREE.Vector3().lerpVectors(userData.start, userData.end, newT)
        positions[i] = point.x
        positions[i + 1] = point.y
        positions[i + 2] = point.z
      }

      particleSystem.geometry.attributes.position.needsUpdate = true
    }
  })
}

// 节点动画
const animateNodes = () => {
  systemNodes.forEach(node => {
    if (node.mesh && node.status === 'online') {
      node.mesh.rotation.y += 0.01
    }
  })
}

// 窗口大小调整
const onWindowResize = () => {
  if (!threeContainer.value) return

  camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
}

// 鼠标点击事件
const onMouseClick = (event: MouseEvent) => {
  if (!threeContainer.value || !camera || !scene) return

  const mouse = new THREE.Vector2()
  const rect = threeContainer.value.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)

  const meshes = systemNodes.map(n => n.mesh).filter(Boolean) as THREE.Mesh[]
  const intersects = raycaster.intersectObjects(meshes)

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object
    const node = clickedMesh.userData.node as SystemNode
    selectNode(node)
  } else {
    selectedNode.value = null
  }
}

// 选择节点
const selectNode = (node: SystemNode) => {
  selectedNode.value = node

  // 高亮选中的节点
  systemNodes.forEach(n => {
    if (n.mesh) {
      const material = n.mesh.material as THREE.MeshPhongMaterial
      if (n.id === node.id) {
        material.emissiveIntensity = 0.5
      } else {
        material.emissiveIntensity = n.status === 'online' ? 0.2 : 0.05
      }
    }
  })
}

// 控制函数
const resetCamera = () => {
  camera.position.set(20, 20, 20)
  camera.lookAt(0, 0, 0)
  controls.reset()
}

const topView = () => {
  camera.position.set(0, 30, 0.1)
  camera.lookAt(0, 0, 0)
}

const sideView = () => {
  camera.position.set(30, 0, 0)
  camera.lookAt(0, 0, 0)
}

const toggleAnimation = (enabled: boolean) => {
  animationEnabled.value = enabled
}

const toggleRotation = (enabled: boolean) => {
  rotationEnabled.value = enabled
}

// 更新统计信息
const updateStats = () => {
  systemStats.value = {
    totalNodes: systemNodes.length,
    onlineNodes: systemNodes.filter(n => n.status === 'online').length,
    dataFlows: dataFlows.length
  }
}

// 生命周期
onMounted(async () => {
  await nextTick()
  initThreeScene()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('resize', onWindowResize)
  renderer.domElement.removeEventListener('click', onMouseClick)

  // 清理Three.js资源
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (object.material instanceof THREE.Material) {
        object.material.dispose()
      }
    }
  })

  renderer.dispose()
})
</script>

<style scoped lang="scss">
.three-3d-container {
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  border-radius: 8px;
  overflow: hidden;
}

.three-canvas {
  width: 100%;
  height: 100%;
}

.controls-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.control-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-weight: 600;
  color: #2c3e50;
}

.control-section {
  margin-bottom: 20px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    font-weight: 600;
    color: #34495e;
    border-bottom: 2px solid #3498db;
    padding-bottom: 5px;
  }
}

.button-group {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.node-info {
  p {
    margin: 5px 0;
    font-size: 13px;

    strong {
      color: #2c3e50;
    }
  }
}

.no-selection {
  color: #7f8c8d;
  font-style: italic;
  font-size: 13px;
  text-align: center;
  padding: 20px 0;
}

.stats {
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #ecf0f1;

    &:last-child {
      border-bottom: none;
    }
  }

  .stat-label {
    font-size: 13px;
    color: #34495e;
  }

  .stat-value {
    font-weight: 600;
    font-size: 14px;
    color: #2c3e50;

    &.online {
      color: #27ae60;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .controls-panel {
    position: static;
    width: 100%;
    max-height: none;
    margin-top: 20px;
  }

  .three-3d-container {
    height: 400px;
  }
}
</style>