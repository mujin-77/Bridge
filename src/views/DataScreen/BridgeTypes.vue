<template>
  <div class="layout">
    <!-- 左侧栏 -->
    <div class="sider">
      <div class="logo">
        中国典型桥梁代表
      </div>
      <li>桥梁类型</li>
      <ul class="menu">
        <!-- 梁式桥 -->
        <li
          class="menu-title"
          @click="toggle('recent')"
        >
          梁式桥
          <span>{{ openMenu === 'recent' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'recent'"
            class="submenu"
          >
            <li @click="changeView('bridge1')">
              南京长江二桥北汊桥
            </li>
            <li @click="changeView('bridge2')">
              云南六库怒江大桥
            </li>
          </ul>
        </transition>

        <!-- 拱桥 -->
        <li
          class="menu-title"
          @click="toggle('recent_1')"
        >
          拱式桥
          <span>{{ openMenu === 'recent_1' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_1'"
            class="submenu"
          >
            <li @click="changeView('bridge3')">
              赵州桥
            </li>
            <li @click="changeView('bridge4')">
              万县长江大桥
            </li>
          </ul>
        </transition>

        <li
          class="menu-title"
          @click="toggle('recent_2')"
        >
          斜拉桥
          <span>{{ openMenu === 'recent_2' ? '▼' : '▶' }}</span>
        </li>

        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_2'"
            class="submenu"
          >
            <li @click="changeView('bridge4')">
              苏通长江大桥
            </li>
            <li @click="changeView('bridge3')">
              黄茅海跨海通道
            </li>
            <li @click="changeView('bridge4')">
              香山大橋
            </li>
            <li @click="changeView('bridge3')">
              济南黄河大桥
            </li>
          </ul>
        </transition>

        <li
          class="menu-title"
          @click="toggle('recent_3')"
        >
          悬索桥
          <span>{{ openMenu === 'recent_3' ? '▼' : '▶' }}</span>
        </li>

        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_3'"
            class="submenu"
          >
            <li @click="changeView('bridge4')">
              五峰山长江大桥
            </li>
            <li @click="changeView('bridge3')">
              江阴长江大桥
            </li>
            <li @click="changeView('bridge4')">
              坝陵河大桥
            </li>
            <li @click="changeView('bridge4')">
              西陵长江大桥
            </li>
          </ul>
        </transition>

        <li
          class="menu-title"
          @click="toggle('recent_4')"
        >
          刚构桥
          <span>{{ openMenu === 'recent_4' ? '▼' : '▶' }}</span>
        </li>

        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_4'"
            class="submenu"
          >
            <li @click="changeView('bridge4')">
              虎门大桥辅航道桥
            </li>
            <li @click="changeView('bridge3')">
              黄石长江大桥
            </li>
            <li @click="changeView('bridge1')">
              洛溪大桥
            </li>
            <li @click="changeView('bridge1')">
              常泰长江大桥
            </li>
          </ul>
        </transition>

        <li
          class="menu-title"
          @click="toggle('recent_5')"
        >
          组合桥
          <span>{{ openMenu === 'recent_5' ? '▼' : '▶' }}</span>
        </li>

        <transition name="slide">
          <ul
            v-show="openMenu === 'recent_5'"
            class="submenu"
          >
            <li @click="changeView('bridge4')">
              铜陵长江三桥
            </li>
            <li @click="changeView('bridge3')">
              天峨龙滩特大桥
            </li>
            <li @click="changeView('bridge1')">
              明珠湾大桥
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
          <div>桥梁长度</div>
          <strong>{{ data.length }}</strong>
        </div>
        <div class="card">
          <div>建成年份</div>
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
const currentTitle = ref('桥梁数据')
const currentDesc = ref('请选择左侧桥梁查看详情')

// 模拟数据（核心）
const dataMap = {
  bridge1: {
    title: '南京长江二桥北汊桥',
    desc: '现代大型跨江桥梁',
    length: '2938m',
    year: '2001'
  },
  bridge2: {
    title: '云南六库怒江大桥',
    desc: '山区桥梁代表',
    length: '850m',
    year: '1990'
  },
  bridge3: {
    title: '赵州桥',
    desc: '中国古代石拱桥',
    length: '50m',
    year: '隋朝'
  },
  bridge4: {
    title: '万县长江大桥',
    desc: '长江重要交通桥',
    length: '856m',
    year: '1997'
  }
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