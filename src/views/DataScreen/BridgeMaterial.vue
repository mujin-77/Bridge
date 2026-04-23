<template>
  <div class="layout">
    <!-- 左侧栏 -->
    <div class="sider">
      <div class="logo">
        桥梁工艺著作
      </div>
      <ul class="menu">
        <!-- 梁式桥 -->
        <li
          class="menu-title"
          @click="toggle('recent')"
        >
          古代经典
          <span>{{ openMenu === 'recent' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'recent'"
            class="submenu"
          >
            <li @click="changeView('book1')">
              《桥谱》
            </li>
            <li @click="changeView('book2')">
              《河防通议》
            </li>
            <li @click="changeView('book3')">
              《天工开物》
            </li>
            <li @click="changeView('book4')">
              《工程做法》
            </li>
          </ul>
        </transition>

        <!-- 拱桥 -->
        <li
          class="menu-title"
          @click="toggle('recent_1')"
        >
          现代综合性工艺著作
          <span>{{ openMenu === 'recent_1' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_1'"
            class="submenu"
          >
            <li @click="changeView('bridge3')">
              《土木工程施工工艺.桥梁工程》
            </li>
            <li @click="changeView('bridge4')">
              《桥梁工程施工关键技术》
            </li>
          </ul>
        </transition>

        <!-- 返回 -->
        <li
          class="exit"
          @click="back"
        >
          返回数据大屏
        </li>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <!-- 标题区 -->
      <div class="header">
        <h2>{{ currentTitle }}</h2>
        <p>{{ currentDesc }}</p>
      </div>

      <!-- 数据卡片 -->
      <div class="card-row">
        <div class="card">
          <div>作者 / 主编</div>
          <strong>{{ data.authority }}</strong>
        </div>
        <div class="card">
          <div>出版年份</div>
          <strong>{{ data.year }}</strong>
        </div>
      </div>

      <!-- 图表区（占位，后面接ECharts） -->
      <div class="chart-row">
        <div class="chart">
          图表1
        </div>
        <div class="chart">
          图表2
        </div>
      </div>

      <div class="chart-row">
        <div class="chart big">
          图表3
        </div>
        <div class="chart big">
          图表4
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.push('/DataScreen')
}

// 折叠菜单
const openMenu = ref(null)
const toggle = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu
}

// 当前内容
const currentTitle = ref('著作名')
const currentDesc = ref('请选择左侧著作查看详情')

// 模拟数据（核心）
const dataMap = {
  book1: {
    title: '《桥谱》',
    desc: '据传为专门记载桥梁的图谱，但原书已佚，仅有部分内容散见于其他文献',
    authority: '佚名',
    year: '宋代'
  },
  book2: {
    title: '《河防通议》',
    desc: '主要论述黄河防洪与治河工程，其中包含大量关于桥梁基础、堤岸、水闸的施工工艺，是研究古代水利与桥梁结合的宝贵资料',
    authority: '沙克什 (元代)',
    year: '元代'
  },
  book3: {
    title: '《天工开物》',
    desc: '被誉为“中国17世纪的工艺百科全书”，其中《舟车》第九卷专门记载了多种桥梁（如石桥、木桥、浮桥）的建造方法和用材，图文并茂',
    authority: '宋应星',
    year: '明代'
  },
  book4: {
    title: '《工程做法》',
    desc: '相当于清代的“建筑规范”，其中对官式石桥、木桥的构件尺寸、用工用料都有标准化的规定',
    authority: '	清工部',
    year: '清代'
  },
}

const data = ref({})

// 切换内容（核心逻辑）
const changeView = (key) => {
  const item = dataMap[key]
  if (!item) return

  currentTitle.value = item.title
  currentDesc.value = item.desc
  data.value = item
}
</script>

<style lang="less" scoped>

.layout {
  display: flex;
  height: 100vh;
  overflow: hidden; // 关键：禁止整体滚动
}

/* 左侧 */
.sider {
  width: 220px;
  height: 100%;
  background: #001529;
  color: #fff;
  padding: 10px;
}

.logo {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}



/* 右侧 */
.content {
  flex: 1;
  background: #f0f2f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 关键：右侧滚动
}

.header {
  margin-bottom: 20px;
}

/* 卡片 */
.card-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}
/* 图表 */
.chart-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.chart {
  flex: 1;
  height: 120px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  &.big {
  height: 180px;
}


}
/* 下拉菜单动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>