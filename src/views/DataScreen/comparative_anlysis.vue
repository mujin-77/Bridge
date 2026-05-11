<template>
  <div class="layout">
    <!-- 左侧 -->
    <div class="sider">
      <div class="logo">
        数据分析与介绍
      </div>

      <ul class="menu">
        <li
          class="menu-title"
          @click="toggle('bridge')"
        >
          桥梁结构对比
          <span>{{ openMenu === 'bridge' ? '▼' : '>' }}</span>
        </li>

        <li
          class="menu-title"
          @click="toggle('literature')"
        >
          书籍和人物介绍
          <span>{{ openMenu === 'literature' ? '▼' : '>' }}</span>
        </li>

        <li
          class="exit"
          @click="back"
        >
          返回数据大屏
        </li>
      </ul>
    </div>

    <!-- 右侧 -->
    <div class="content">
      <!-- 标题 -->
      <div class="header">
        <h2>{{ currentTitle }}</h2>
        <p>{{ currentDesc }}</p>
      </div>

      <!-- 桥梁模块 -->
      

      <div v-if="activeModule === 'bridge'">
        <div class="controls">
          <div>
            桥梁A：
            <select v-model="bridgeA">
              <option
                v-for="item in bridgeList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>

          <div style="margin-left: 20px;">
            桥梁B：
            <select v-model="bridgeB">
              <option
                v-for="item in bridgeList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div style="margin-left:100px;">
            指标：
            <select v-model="selectedIndicator">
              <option
                v-for="item in indicatorList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="chart-card">
            <BridgeRadar
              :bridge-a="bridgeA"
              :bridge-b="bridgeB"
            />
          </div>

          <div class="chart-card">
            <BridgeBar :indicator="selectedIndicator" />
          </div>
        </div>
      </div>

      <!-- 文献模块 -->
      <div v-else>
        <div class="book-container">
          <div
            v-for="(book, index) in books"
            :key="index"
            class="book-card"
            :class="{ active: activeBook === index }"
            @click="toggleBook(index)"
          >
            <div class="book-header">
              <h3>{{ book.title }}</h3>
              <span class="expand-icon">{{ activeBook === index ? '−' : '+' }}</span>
            </div>
            <p class="book-subtitle">
              {{ book.subtitle }}
            </p>
            <div
              v-if="activeBook === index"
              class="book-content"
            >
              <div
                v-for="(section, sIdx) in book.sections"
                :key="sIdx"
                class="section"
              >
                <h4>{{ section.heading }}</h4>
                <p>{{ section.intro }}</p>
                <p
                  v-for="(para, pIdx) in section.paragraphs"
                  :key="pIdx"
                >
                  {{ para }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBridgeStore } from '@/store/anlysis'
import BridgeRadar from '@/components/anlysis/Radar.vue'
import BridgeBar from '@/components/anlysis/Bar.vue'

const router = useRouter()

const back = () => {
  router.push('/DataScreen')
}

/** 模块控制 */
const activeModule = ref('bridge')
const openMenu = ref('bridge')

/** 书籍数据 */
const activeBook = ref(null)

const books = [
  {
    title: '《中国古桥技术史》',
    subtitle: '贯通古今的桥梁工程通史',
    sections: [
      {
        heading: '以现代工程视野，梳理千年造桥智慧',
        intro: '如果说古代典籍零散记录了桥梁建造的片段经验，那么《中国古桥技术史》便以系统性的学术体系，完整梳理了中国数千年桥梁营建的技术脉络，是中国桥梁工程史上首部完备的古桥技术通史。',
        paragraphs: [
          '这部重磅学术著作由中国现代桥梁之父茅以升领衔主编，集结一众桥梁工程专家编撰而成，凝结了几代桥梁人的研究心血。茅以升先生兼具深厚的现代工程学识与严谨的史学思维，他摒弃了传统古籍碎片化的记载方式，走遍全国古桥遗存现场考证，系统整理了从先秦到明清的桥梁形制、建造工艺、材料运用、结构原理，涵盖石桥、木桥、索桥、浮桥等所有古桥品类。',
          '书中不仅详实记录了赵州桥、洛阳桥、广济桥、卢沟桥等千古名桥的建造技法，更深度拆解了古人造桥的核心智慧，包括桥基加固、敞肩拱设计、潮汐适配筑桥等独家工艺，厘清了中国古桥从雏形到成熟的技术迭代脉络。不同于纯理论典籍，该书兼顾实操性与史料性，既收录了古代工匠口传心授的营造经验，又以现代工程力学视角解读古桥结构的科学性。',
          '作为中国古桥研究的奠基之作，这本书填补了中国古代桥梁技术系统性研究的空白，成为后世古桥修缮、桥梁史研究、传统工程技艺传承的核心典籍。延伸阅读可搭配茅以升自传及《桥梁史话》，通俗读本搭配专业通史，既能读懂桥梁工程技术，也能理解中国桥梁百年的崛起之路。'
        ]
      }
    ]
  },
  {
    title: '《中国古代桥梁》',
    subtitle: '踏遍山河的古桥美学与技艺实录',
    sections: [
      {
        heading: '融工程技术与建筑美学，复刻古桥千年风华',
        intro: '如果说《中国古桥技术史》侧重宏观技术体系梳理，那么唐寰澄的《中国古代桥梁》则以实地踏勘为根基，兼顾技术解析与美学鉴赏，全方位展现中国古桥的工程价值与人文魅力。',
        paragraphs: [
          '本书作者唐寰澄是中国古桥研究泰斗、著名桥梁专家，深耕桥梁领域数十年，兼具桥梁设计实操经验与古建研究功底，曾斩获武汉长江大桥建筑方案首奖，一生践行"访桥、研桥、懂桥"的治学理念。为撰写此书，他遍历全国山河，实地考察数百座古今桥梁，摒弃书本空谈，以一手实地资料完成这部经典著作。',
          '书中开创性地将中国古代桥梁划分为十大类型，涵盖原始桥梁、简支桥梁、拱桥、索桥、园林桥梁等全部品类，对每一类桥梁的结构特征、建造工艺、地域特色、演变历程逐一细致解读。相较于专业学术专著，本书文风通俗、图文兼具，精准拆解了中国古桥"结构稳固、形制精巧、因地制宜"的核心特点，尤其深度阐释了中式拱桥、伸臂梁桥等独创结构的技术优势。',
          '该书跳出单纯的工程技术视角，首次将桥梁建筑美学、地域人文与工程技术相结合，证明中国古桥不仅是交通工程产物，更是中式传统建筑美学的重要载体。作为古桥科普与研究的必读经典，其延伸读物《中国科学技术史：桥梁卷》可进一步深挖中外桥梁技术的发展差异与文明特质。'
        ]
      }
    ]
  },
  {
    title: '《桥上桥下的中国》',
    subtitle: '藏在桥梁里的千年华夏文明',
    sections: [
      {
        heading: '以桥为脉，解锁华夏工程与人文密码',
        intro: '如果说专业桥梁典籍聚焦技术与结构，那么《桥上桥下的中国》则跳出工程本身，以人文视角串联桥梁与历史、民俗、美学，让冰冷的桥梁建筑拥有鲜活的文明温度。',
        paragraphs: [
          '本书由复旦大学历史地理研究所教授李晓杰撰写，依托深厚的历史地理学识，打破工程、文史的学科壁垒，重新解读中国桥梁的千年价值。作者不局限于桥梁建造技艺，而是从历史脉络、工程技术、美学设计、军事交通、诗词民俗等九大维度，全方位梳理中国桥梁从远古雏形到明清鼎盛的发展历程。',
          '书中详细梳理了历代名桥的建造背景与历史故事，解析不同地域桥梁的形制差异背后的地理与人文原因，既讲解了造桥工匠的高超智慧，也收录了与桥梁相关的历史典故、诗词文化、民间风俗。不同于硬核技术书籍，这本书让读者读懂：桥梁从来不止是通行的工具，更是地域交流、文明融合、社会发展的重要见证。',
          '该书以通俗细腻的文笔，让小众的桥梁文化走进大众视野，实现了工程技术与人文历史的完美融合。适合作为桥梁文化入门读物，搭配古桥技术专著阅读，可兼顾技术深度与人文广度，完整构建中国桥梁的知识体系。'
        ]
      }
    ]
  },
  {
    title: '隋代匠师 李春',
    subtitle: '开创世界敞肩拱桥先河的造桥宗师',
    sections: [
      {
        heading: '以匠心造传世古桥，定千年造桥范式',
        intro: '如果说诸多典籍记录了桥梁技术的总结与传承，那么隋代工匠李春，则以一己之力开创了中国古桥的巅峰形制，用一座桥梁定义了世界古代石拱桥的最高水准。',
        paragraphs: [
          '李春是隋代杰出的民间造桥匠师，虽无传世著作，却以传世工程名留青史。隋开皇十五年至大业初年，李春主持修建赵州桥（安济桥），这座屹立一千四百余年的古桥，是世界现存最早、保存最完整、跨度最大的空腹单孔圆弧拱石桥，刷新了同时代世界桥梁的建造水准。',
          '李春最具开创性的贡献，是发明了敞肩拱结构设计，在主拱两端增设四个小拱，这一创新不仅大幅减轻桥身自重、节省建材，更极大提升了桥梁的泄洪能力与抗震性能，完美适配河流汛期的水文特点。这一结构设计，比欧洲同类桥梁技术早出现近七百年，是中国古代桥梁工程领先世界的核心佐证。唐代张嘉贞在《安济桥铭》中曾赞叹其"制造奇特，人不知其所为"，足以见其工艺精妙、设计超前。',
          '李春没有士人著书立说的载体，却以匠人实干诠释了中国传统工程智慧。赵州桥历经千年洪水、地震、战乱依旧屹立不倒，成为中国古代"因地制宜、因材施艺"工程思想的最佳实物见证，也让李春成为中国古代最具代表性的桥梁工匠标杆，其造桥理念与结构设计，深远影响了后世千年的拱桥建造工艺。'
        ]
      }
    ]
  },
  {
    title: '现代桥梁泰斗 茅以升',
    subtitle: '融通中西的现代中国桥梁奠基人',
    sections: [
      {
        heading: '承古开新，铸就中国现代桥梁之路',
        intro: '如果说李春缔造了中国古代桥梁的技术巅峰，那么茅以升则贯通古今、融汇中西，将中国桥梁工程从传统匠人营造，带入现代科学工程体系，是中国现代桥梁事业的开拓者与奠基人。',
        paragraphs: [
          '茅以升是我国著名桥梁工程专家、教育家，被誉为"中国现代桥梁之父"。他自幼立志造桥，远赴美国攻读土木工程专业，深耕桥梁结构力学，学成后毅然归国，摒弃照搬西方技术的模式，坚持结合中国水文、地质与国情开展桥梁建设，一生致力于振兴中国本土桥梁工程事业。他兼具扎实的现代理工学识与深厚的传统文化素养，既精通现代桥梁设计、施工与科研，又深耕中国古桥技术研究，打通了古代营造智慧与现代工程科学的壁垒。',
          '在工程实践上，他主持修建的钱塘江大桥，是中国人自主设计、自主建造的第一座现代化双层公铁两用大桥，打破了近代中国大型桥梁依赖外国工程师的局面，极大提振了中国工程界的底气。抗战时期，为阻止日军推进，他忍痛炸毁亲手建成的大桥，而后历经多年修复，诠释了"先国后桥"的家国担当。除此之外，他主导编撰《中国古桥技术史》，系统抢救、整理濒临失传的古代桥梁营造技艺，让千年古桥智慧得以被科学记录、传承后世。',
          '不同于传统工匠重实操、轻理论的特点，茅以升做到了工程实践、学术研究、人才培养三位一体。他总结提炼古桥工程理念，结合现代力学理论完善桥梁工程体系，同时深耕教育领域，培育大批桥梁工程人才。他以一生践行初心，既守住了中国古代桥梁的文明根脉，又开创了中国现代桥梁的发展新局，成为贯通古今桥梁工程文明的核心人物。延伸阅读可参考其著作《桥梁史话》《茅以升自传》，全面了解中国桥梁的百年崛起历程。'
        ]
      }
    ]
  }
]

const toggleBook = (index) => {
  activeBook.value = activeBook.value === index ? null : index
}

/** 标题 */
const currentTitle = ref('桥梁结构对比')
const currentDesc = ref('不同桥梁结构性能对比分析')

/** 桥梁选择 */
const bridgeA = ref('悬索桥')
const bridgeB = ref('拱式桥')

const bridgeStore = useBridgeStore()
const bridgeList = bridgeStore.bridgeList
const selectedIndicator = ref('抗震性')

const indicatorList = bridgeStore.indicators
/** 左侧切换 */
const toggle = (key) => {
  activeModule.value = key
  openMenu.value = key

  if (key === 'bridge') {
    currentTitle.value = '桥梁结构对比'
    currentDesc.value = '不同桥梁结构性能对比分析'
  }

  if (key === 'literature') {
    currentTitle.value = '书籍和人物介绍'
    currentDesc.value = '中国古桥研究典籍与桥梁工程人物'
  }
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

.header {
  color: #000;
  margin-bottom: 20px;
}
.content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  background: #f0f2f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 关键：右侧滚动
}


/* 卡片 */
.chart-card {
  flex: 1;
  min-width: 0;
  height: 520px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}
.chart-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  min-height: 520px;
}
.placeholder-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  color: #001529;
  margin-bottom: 20px;
  display: flex;
}
/* 图表 */
.chart-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

/* 书籍卡片 */
.book-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.book-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #f87171;
}

.book-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.book-card.active {
  border-left-color: #dc2626;
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
}

.book-subtitle {
  margin: 8px 0 0 0;
  color: #6b7280;
  font-size: 14px;
}

.expand-icon {
  font-size: 24px;
  color: #f87171;
  font-weight: bold;
}

.book-content {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section h4 {
  color: #dc2626;
  margin: 0 0 12px 0;
  font-size: 15px;
}

.section p {
  color: #374151;
  line-height: 1.8;
  margin: 0 0 12px 0;
  text-align: justify;
}

.section p:first-of-type {
  color: #1f2937;
  font-weight: 500;
}
</style>