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
              《土木工程施工》
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

      <!-- 内容展示区 -->
      <div class="content-grid">
        <!-- 图表1：著作简介 -->
        <div class="info-card">
          <h4>📖 著作简介</h4>
          <p>{{ data.intro || '请选择左侧著作查看详情' }}</p>
        </div>

        <!-- 图表2：核心工艺 -->
        <div class="info-card">
          <h4>🔧 核心工艺技术</h4>
          <ul v-if="data.techniques">
            <li
              v-for="(tech, idx) in data.techniques"
              :key="idx"
            >
              {{ tech }}
            </li>
          </ul>
          <p v-else>
            请选择左侧著作查看
          </p>
        </div>

        <!-- 图表3：历史价值 -->
        <div class="info-card wide">
          <h4>🏛️ 历史价值与影响</h4>
          <p>{{ data.value || '请选择左侧著作查看详情' }}</p>
        </div>

        <!-- 图表4：代表作品 -->
        <div class="info-card wide">
          <h4>🌟 代表作品/应用</h4>
          <ul v-if="data.works">
            <li
              v-for="(work, idx) in data.works"
              :key="idx"
            >
              {{ work }}
            </li>
          </ul>
          <p v-else>
            请选择左侧著作查看
          </p>
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
    year: '宋代',
    intro: '《桥谱》是专门记载中国古代桥梁建造技术的专著，但原书已失传。现存内容主要散见于《营造法式》《工程做法》等后世文献的引用中。',
    techniques: ['桥梁选址原则', '石桥建造规范', '木桥结构设计'],
    value: '作为中国最早的桥梁专著之一，虽然内容不完整，但对研究宋代以前桥梁技术具有重要参考价值。',
    works: ['赵州桥（隋代）', '灞桥（汉代）', '洛阳桥（北宋）']
  },
  book2: {
    title: '《河防通议》',
    desc: '主要论述黄河防洪与治河工程，其中包含大量关于桥梁基础、堤岸、水闸的施工工艺',
    authority: '沈立初（北宋）/ 沙克什（元代）',
    year: '元代',
    intro: '由北宋沈立初撰、元代沙克什重编，系统记载了宋金元三代治理黄河的工程规章制度。全书仅1.8万字，分为河议、制度、料例、功程、输运、算法六大部分。',
    techniques: ['"历步减土"土方计算法则', '埽工修筑技术', '堵口闭河方法', '堤防测量规范', '河防管理体系'],
    value: '确立了量化管理的传统，将物料运输距离与用工量精确绑定。在黄河流域应用逾三百年，是古代工程管理高度精细化的典范。',
    works: ['黄河堤防工程', '埽工护岸', '水闸建设']
  },
  book3: {
    title: '《天工开物》',
    desc: '被誉为"中国17世纪的工艺百科全书"，其中《舟车》卷专门记载桥梁建造',
    authority: '宋应星（明代）',
    year: '明代',
    intro: '明末科学家宋应星编撰，被誉为"17世纪的工艺百科全书"。宋应星五试不第后遍游各地，在田边、作坊中实地考察农业与手工业实践，写成此书。',
    techniques: ['石桥建造方法', '木桥结构设计', '浮桥架设技术', '桥梁用材选择', '工匠技术整合'],
    value: '李约瑟《中国科学技术史》列举的26项中国向西方传播的技术中，《天工开物》论述了18项。是研究中国古代技术的重要文献。',
    works: ['《舟车》第九卷桥梁内容', '赵州桥技术分析', '各地桥梁实地考察记录']
  },
  book4: {
    title: '《工程做法》',
    desc: '相当于清代的"建筑规范"，对官式石桥、木桥有标准化规定',
    authority: '果亲王允礼 / 清工部',
    year: '清代',
    intro: '清雍正十二年工部颁布的建筑技术规范，全书七十四卷，继宋代《营造法式》之后官方颁布的第二部系统性建筑工程专著，长期作为宫殿、坛庙等官式建筑的营造准则。',
    techniques: ['"斗口"模数设计体系（十一等）', '大木作规范', '石作工艺标准', '斗栱作技术', '十一专业协同作业'],
    value: '以斗口为基本模数实现建筑标准化，使得不同工匠建造的建筑在风格、结构与尺度上高度统一，是中国古代建筑技术高度发达的有力证明。',
    works: ['紫禁城建筑群', '天坛', '官式石桥', '颐和园长廊']
  },
  bridge3: {
    title: '《土木工程施工》',
    desc: '新形态教材，嵌入现场施工视频，适合系统学习土建施工技术',
    authority: '刘俊岩、应惠清等',
    year: '2022年',
    intro: '由济南大学刘俊岩教授、同济大学应惠清教授等联合编写，依托济南大学"国家级一流本科专业建设点"的教学科研成果，结合现行工程建设标准编写而成。',
    techniques: ['土方工程施工', '基础工程施工', '混凝土结构工程', '结构吊装工程', '桥梁结构施工', '路面施工', '隧道施工', '流水施工原理', '网络计划技术', '施工组织设计'],
    value: '体系全面，包含土方、基础、混凝土等传统工种，以及桥梁、道路、隧道等专业领域。新形态教材在书中嵌入了现场施工视频，方便直观理解复杂工艺流程。',
    works: ['土方工程', '基础工程', '桥梁工程', '道路工程', '隧道工程']
  },
  bridge4: {
    title: '《桥梁工程施工关键技术》',
    desc: '实战性强，中国建筑第七工程局有限公司工程经验总结',
    authority: '中国建筑第七工程局有限公司',
    year: '近年出版',
    intro: '本书最大的特点是实战性强，是中国建筑第七工程局有限公司根据大量真实工程经验总结而成，"干货"含量非常高。全书按建桥逻辑从水下到高空展开，非常清晰。',
    techniques: [
      '围堰工程施工：钢板桩围堰、钢吊（套）箱围堰、双壁钢围堰、锁扣钢管桩围堰',
      '基础工程施工：溶洞区、裂隙陷穴区、高强度基岩、卵石地层等特殊地质桩基施工',
      '墩台工程施工：高墩翻模、高墩爬模、高墩滑模',
      '盖梁工程施工：倒梯形、门式、大悬臂等类型成型技术',
      '桥跨结构施工：预制梁安装、节段梁拼装、支架现浇'
    ],
    value: '从围堰到高墩，覆盖桥梁施工全流程。将多项技术融入金丽温高速、国道310、台州湾大桥、兰州元通黄河大桥等6个完整真实工程案例中展示。',
    works: ['金丽温高速', '国道310', '台州湾大桥', '兰州元通黄河大桥']
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
/* 内容卡片 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.info-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h4 {
    margin: 0 0 12px 0;
    color: #dc2626;
    font-size: 15px;
    border-bottom: 2px solid #fecaca;
    padding-bottom: 8px;
  }

  p {
    margin: 0;
    color: #374151;
    line-height: 1.7;
    font-size: 14px;
  }

  ul {
    margin: 0;
    padding-left: 20px;
    color: #374151;
    line-height: 1.8;
    font-size: 14px;
  }

  &.wide {
    grid-column: 1 / -1;
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