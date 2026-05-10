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
          @click="toggle('beam')"
        >
          梁式桥
          <span>{{ openMenu === 'beam' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'beam'"
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

        <!-- 拱式桥 -->
        <li
          class="menu-title"
          @click="toggle('arch')"
        >
          拱式桥
          <span>{{ openMenu === 'arch' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'arch'"
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

        <!-- 斜拉桥 -->
        <li
          class="menu-title"
          @click="toggle('cable')"
        >
          斜拉桥
          <span>{{ openMenu === 'cable' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'cable'"
            class="submenu"
          >
            <li @click="changeView('bridge5')">
              苏通长江大桥
            </li>
            <li @click="changeView('bridge18')">
              黄茅海跨海通道
            </li>
            <li @click="changeView('bridge19')">
              香山大桥
            </li>
            <li @click="changeView('bridge14')">
              济南黄河大桥
            </li>
          </ul>
        </transition>

        <!-- 悬索桥 -->
        <li
          class="menu-title"
          @click="toggle('suspension')"
        >
          悬索桥
          <span>{{ openMenu === 'suspension' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'suspension'"
            class="submenu"
          >
            <li @click="changeView('bridge6')">
              坝陵河大桥
            </li>
            <li @click="changeView('bridge7')">
              西陵长江大桥
            </li>
            <li @click="changeView('bridge15')">
              五峰山长江大桥
            </li>
            <li @click="changeView('bridge16')">
              江阴长江大桥
            </li>
          </ul>
        </transition>

        <!-- 刚构桥 -->
        <li
          class="menu-title"
          @click="toggle('rigid')"
        >
          刚构桥
          <span>{{ openMenu === 'rigid' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'rigid'"
            class="submenu"
          >
            <li @click="changeView('bridge8')">
              虎门大桥辅航道桥
            </li>
            <li @click="changeView('bridge9')">
              黄石长江大桥
            </li>
            <li @click="changeView('bridge10')">
              洛溪大桥
            </li>
            <li @click="changeView('bridge17')">
              常泰长江大桥
            </li>
          </ul>
        </transition>

        <!-- 组合桥 -->
        <li
          class="menu-title"
          @click="toggle('composite')"
        >
          组合桥
          <span>{{ openMenu === 'composite' ? '▼' : '▶' }}</span>
        </li>
        <transition name="slide">
          <ul
            v-show="openMenu === 'composite'"
            class="submenu"
          >
            <li @click="changeView('bridge11')">
              铜陵长江三桥
            </li>
            <li @click="changeView('bridge12')">
              天峨龙滩特大桥
            </li>
            <li @click="changeView('bridge13')">
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
        <div class="card">
          <div>主跨跨度</div>
          <strong>{{ data.span }}</strong>
        </div>
      </div>

      <!-- 详细介绍 -->
      <div
        v-if="data.detail"
        class="detail-card"
      >
        <h3>桥梁介绍</h3>
        <p>{{ data.detail }}</p>
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
  // 梁式桥
  bridge1: {
    title: '南京长江二桥北汊桥',
    desc: '钢箱梁斜拉桥 | 江苏省南京市 | 建成于2001年',
    length: '全桥长21.337公里',
    year: '2001年',
    span: '主跨628米',
    detail: '南京长江第二大桥由南汊桥、北汊桥及引线组成。南汊桥建成时，其跨径在当时同类斜拉桥中居世界第三，体现了当时中国在斜拉桥领域的突破性成就。'
  },
  bridge2: {
    title: '云南六库怒江大桥',
    desc: '预应力混凝土连续梁桥 | 云南省怒江州泸水市 | 建成于1991年6月',
    length: '全长678米',
    year: '1991年6月',
    span: '主跨154米',
    detail: '该桥是国内跨度最大的预应力混凝土连续箱梁之一，以其超长的单孔跨度位居当时全国第一、亚洲第二。它成为了六库城区唯一连接怒江两岸的交通命脉，结束了当地千百年来人马摆渡过江的历史。'
  },

  // 拱式桥
  bridge3: {
    title: '赵州桥',
    desc: '敞肩石拱桥 | 河北省石家庄市赵县 | 建成于公元605年(隋代)',
    length: '全长64.4米',
    year: '公元605年',
    span: '净跨37.02米',
    detail: '赵州桥由隋代著名匠师李春设计建造，是世界上现存修建时间最早、保存最完好的石拱桥。它在主拱两端首创性地各设两个小拱，形成"敞肩拱"，这种精巧设计不仅减轻了桥身自重，还减少了洪水对桥体的冲击，是古代桥梁史上的杰出创造。'
  },
  bridge4: {
    title: '万县长江大桥(万州长江大桥)',
    desc: '劲性骨架钢筋混凝土箱形拱桥 | 重庆市万州区 | 建成于1997年6月',
    length: '全长856.12米',
    year: '1997年6月',
    span: '主跨420米',
    detail: '大桥主孔跨径420米，一跨过江，曾是当时世界上跨径和规模最大的混凝土拱桥。它的建成打破了万州没有跨江大桥的历史，并曾获得首届"全国十佳桥梁"称号，在中国拱桥建设史上具有里程碑意义。'
  },

  // 斜拉桥
  bridge5: {
    title: '苏通长江大桥',
    desc: '双塔双索面钢箱梁斜拉桥 | 江苏省苏州(常熟)—南通市 | 建成于2008年6月30日',
    length: '全长32.4公里',
    year: '2008年6月30日',
    span: '主跨1088米',
    detail: '苏通大桥是当时世界上首座主跨径超越千米的斜拉桥，它的建成为世界提供了"中国方案"，创造了最大跨径(1088米)、最高桥塔(300.4米)、最长拉索(577米)、最大群桩基础四项世界纪录。大桥主墩采用131根直径超2.5米、长约120米的群桩基础，其承台面积达一个足球场大小。'
  },
  bridge18: {
    title: '黄茅海跨海通道',
    desc: '钢箱梁斜拉桥(双塔/三塔) | 广东省珠海市—江门市 | 建成于2024年12月',
    length: '全长约31公里',
    year: '2024年12月',
    span: '黄茅海大桥主跨720米',
    detail: '项目是港珠澳大桥的西延线，也是《粤港澳大湾区发展规划纲要》发布后首个开工的跨海通道工程。通道包含2座大跨度斜拉桥，其中，黄茅海大桥采用三塔斜拉桥设计，建成后成为世界上跨径最大的三塔公路斜拉桥。'
  },
  bridge19: {
    title: '香山大桥',
    desc: '双层斜拉桥 | 广东省中山市 | 建成于2025年11月(主体合龙)',
    length: '总长约1776米',
    year: '2025年11月',
    span: '主跨880米，塔高270米',
    detail: '该桥是集超大跨径、超宽桥面、超高索塔于一体的双层公路桥，是珠江口又一座引人注目的新地标。高达270米的"人"字形主塔通过液压爬模工艺分节段现浇，施工难度极高。大桥采用上下双层双向8车道标准设计。'
  },
  bridge14: {
    title: '济南黄河大桥(老桥)',
    desc: '预应力混凝土连续梁斜拉桥 | 山东省济南市 | 建成于1982年7月',
    length: '总长2023.44米',
    year: '1982年7月',
    span: '最大跨径220米',
    detail: '该桥建成时是当时亚洲跨度最大的公路斜拉桥，在世界十大预应力混凝土斜拉桥中排行第8位，成为济南乃至山东的标志性桥梁。大桥由主桥和引桥组成，桥面分设行车道和人行道。'
  },

  // 悬索桥
  bridge6: {
    title: '坝陵河大桥',
    desc: '单跨钢桁架悬索桥 | 贵州省安顺市关岭县 | 建成于2009年12月23日',
    length: '全长2237米',
    year: '2009年12月23日',
    span: '主跨1088米',
    detail: '坝陵河大桥是世界首座山区峡谷千米级跨径桥梁，建成时荣居"国内第一，世界第六"的单跨径钢桁梁悬索桥。其桥面距水面高差惊人，也是贵州唯一一座可以进入桥体内部旅行观光的超级大桥。'
  },
  bridge7: {
    title: '西陵长江大桥',
    desc: '单跨双铰式钢箱加劲梁悬索桥 | 湖北省宜昌市三峡坝区 | 建成于1996年8月10日',
    length: '全长1118.66米',
    year: '1996年8月10日',
    span: '主跨900米',
    detail: '它是万里长江上修建的第一座悬索桥。作为三峡工程交通的关键工程之一，该桥在三峡建设期间承担了两岸繁重的运输任务。大桥于1998年荣获中国建筑工程鲁班奖。'
  },
  bridge15: {
    title: '五峰山长江大桥',
    desc: '单跨悬吊钢桁梁悬索桥(公铁两用) | 江苏省镇江市—扬州市 | 建成于2020年12月',
    length: '全长6409米',
    year: '2020年12月',
    span: '主跨1092米',
    detail: '这是世界上首座千米级高铁悬索桥。大桥上层为双向八车道高速公路，下层为四线高速铁路，实现了高速铁路与公路交通在同一座桥上安全并行。单根主缆的拉力高达9万吨。'
  },
  bridge16: {
    title: '江阴长江大桥',
    desc: '钢悬索桥 | 江苏省江阴市—靖江市 | 建成于1999年9月28日',
    length: '全长3071米',
    year: '1999年9月28日',
    span: '主跨1385米',
    detail: '该桥是我国首座跨度超千米的特大型钢悬索桥，建成时为中国第一、世界第四大跨径的同类桥梁，代表了我国20世纪90年代的造桥最高水平。大桥的建成在中国桥梁工程建设史上具有里程碑意义。'
  },

  // 刚构桥
  bridge8: {
    title: '虎门大桥辅航道桥',
    desc: '预应力混凝土连续刚构桥 | 珠江口(广州南沙—东莞虎门) | 建成于1997年6月',
    length: '全长570米',
    year: '1997年6月',
    span: '主跨270米',
    detail: '辅航道桥主跨的270米，是同类桥型的世界第一跨径，为中国大跨径连续刚构桥的发展起到了里程碑式的推动作用。该桥1996年6月合龙时的误差远小于设计要求，其施工与监控经验至今仍值得借鉴。'
  },
  bridge9: {
    title: '黄石长江大桥',
    desc: '预应力混凝土连续刚构桥 | 湖北省黄石市 | 建成于1995年12月16日',
    length: '全长2580.08米',
    year: '1995年12月16日',
    span: '主跨245米',
    detail: '这是国内第一座由交通部自主设计、建造的长江大桥。大桥采用5跨(162.5 + 3×245 + 162.5米)的连续刚构形式，其跨度与联孔长度均很大。'
  },
  bridge10: {
    title: '洛溪大桥',
    desc: '预应力混凝土连续刚构桥 | 广东省广州市(海珠区—番禺区) | 建成于1988年8月28日',
    length: '全长1916.04米',
    year: '1988年8月28日',
    span: '主跨180米',
    detail: '这座大桥是中国首座大跨径预应力混凝土连续刚构桥。在当时，它的主跨180米的方案在同类桥型中，位居世界第六、亚洲第一，是改革开放后广东省桥梁建设的里程碑。'
  },
  bridge17: {
    title: '常泰长江大桥',
    desc: '钢桁梁斜拉桥与钢桁拱桥组合 | 江苏省常州市—泰兴市 | 建成于2025年',
    length: '跨江段全长10.03公里',
    year: '2025年',
    span: '主跨1208米',
    detail: '该桥是长江上首座集高速公路、城际铁路、普通公路于一体的过江通道，其主航道斜拉桥主跨1208米，为世界最大跨度公铁两用斜拉桥。建设过程中成功攻克了超千米级沉井基础施工、钢混混合索塔建造等一系列世界级难题。'
  },

  // 组合桥
  bridge11: {
    title: '铜陵长江三桥(G3铜陵长江公铁大桥)',
    desc: '斜拉-悬索协作体系桥(世界首座) | 安徽省铜陵市 | 建成于2025年11月',
    length: '路线全长11.88公里',
    year: '2025年11月',
    span: '主跨988米',
    detail: '这是世界首座双层斜拉—悬索协作体系桥梁。它创新的"协作体系"在世界范围内首次被用于千米级大跨度桥梁。大桥集高速公路、城际铁路、货运铁路等功能于一身，拥有"五项世界首创""十项工艺创新"，展现了中国桥梁"智造"的新高度。'
  },
  bridge12: {
    title: '天峨龙滩特大桥',
    desc: '上承式劲性骨架混凝土拱桥 | 广西河池市天峨县 | 建成于2024年',
    length: '全长2488.55米',
    year: '2024年',
    span: '主跨600米',
    detail: '这是中国拱桥技术的最新巅峰。大桥将混凝土拱桥的跨径一举突破到600米，是当之无愧的"世界第一拱"，实现了拱桥跨径的"百年跨越"。'
  },
  bridge13: {
    title: '明珠湾大桥',
    desc: '中承式三主桁钢桁拱双层桥 | 广东省广州市南沙区 | 建成于2021年6月',
    length: '全长约9.1公里',
    year: '2021年6月',
    span: '主跨436米',
    detail: '该桥是目前世界上最大跨度三主桁连续钢桁拱双层桥。它如同钢铁飞虹，横跨珠江入海口，其独特的"卧龙造型"是南沙区的新地标。大桥下层还预留了BRT通道，是一座颜值与功能兼具的现代桥梁。'
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
  color: #000;
  margin-bottom: 20px;
}

/* 卡片 */
.card-row {
  color: #000;
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

/* 详细介绍卡片 */
.detail-card {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.detail-card h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.detail-card p {
  margin: 0;
  color: #666;
  line-height: 1.8;
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