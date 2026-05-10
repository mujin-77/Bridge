<template>
  <div class="bridge-overview">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="grid-overlay" />
      <div class="glow-orb orb-1" />
      <div class="glow-orb orb-2" />
    </div>

    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <h1 class="main-title">
          <span class="title-icon">🌉</span>
          中国桥梁发展状况
        </h1>
        <p class="subtitle">BRIDGE DEVELOPMENT OVERVIEW</p>
        <button
          class="back-btn"
          @click="back"
        >
          ← 返回首页
        </button>
      </div>
    </header>

    <!-- 核心数据展示 -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card highlight">
          <div class="stat-value">626<span class="unit">米</span></div>
          <div class="stat-label">世界最高桥记录</div>
          <div class="stat-desc">花江峡谷大桥桥面距水面高度</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">100<span class="unit">万+</span></div>
          <div class="stat-label">全国公路桥梁总量</div>
          <div class="stat-desc">世界领先的工程规模</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">18.8<span class="unit">万亿</span></div>
          <div class="stat-label">十四五交通投资</div>
          <div class="stat-desc">持续推动行业发展</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">万亿<span class="unit">级</span></div>
          <div class="stat-label">养护市场规模</div>
          <div class="stat-desc">2025年突破万亿大关</div>
        </div>
      </div>
    </section>

    <!-- 发展维度 -->
    <section class="dimensions-section">
      <h2 class="section-title">
        <span class="title-decoration">▎</span>
        发展维度概览
      </h2>
      
      <div class="dimensions-grid">
        <!-- 规模成就 -->
        <div class="dimension-card">
          <div class="card-header">
            <span class="card-icon">🏆</span>
            <h3>规模成就</h3>
          </div>
          <div class="card-content">
            <ul class="feature-list">
              <li>
                <span class="feature-tag world">世界之最</span>
                <p>贵州花江峡谷大桥（桥面距水面626.01米）成“世界最高桥”</p>
              </li>
              <li>
                <span class="feature-tag">海量存量</span>
                <p>全国公路桥梁已超100万座</p>
              </li>
            </ul>
            <div class="card-footer">
              <span class="highlight-text">✨ 世界领先的工程规模</span>
            </div>
          </div>
        </div>

        <!-- 前沿工程 -->
        <div class="dimension-card">
          <div class="card-header">
            <span class="card-icon">🚀</span>
            <h3>前沿工程</h3>
          </div>
          <div class="card-content">
            <ul class="feature-list">
              <li>
                <span class="feature-tag">常泰长江大桥</span>
                <p>刷新斜拉桥最大跨度世界纪录</p>
              </li>
              <li>
                <span class="feature-tag">天峨龙滩特大桥</span>
                <p>首次将拱桥跨度提高到600米</p>
              </li>
              <li>
                <span class="feature-tag">双柳长江大桥</span>
                <p>全球首座"智慧悬索桥"</p>
              </li>
            </ul>
            <div class="card-footer">
              <span class="highlight-text">✨ 不断突破极限，向"智能化"深度发展</span>
            </div>
          </div>
        </div>

        <!-- 核心技术 -->
        <div class="dimension-card">
          <div class="card-header">
            <span class="card-icon">⚙️</span>
            <h3>核心技术</h3>
          </div>
          <div class="card-content">
            <ul class="feature-list">
              <li>
                <span class="feature-tag material">新材料</span>
                <p>主缆使用2100MPa级超高强度钢丝</p>
              </li>
              <li>
                <span class="feature-tag material">新技术</span>
                <p>湖南"型钢-UHPC"技术使桥梁自重减半</p>
              </li>
              <li>
                <span class="feature-tag material">新装备</span>
                <p>使用"智慧造桥机"，工效提升20%</p>
              </li>
            </ul>
            <div class="card-footer">
              <span class="highlight-text">✨ 从"建造"到"智造"转型</span>
            </div>
          </div>
        </div>

        <!-- 发展模式 -->
        <div class="dimension-card">
          <div class="card-header">
            <span class="card-icon">📊</span>
            <h3>发展模式</h3>
          </div>
          <div class="card-content">
            <ul class="feature-list">
              <li>
                <span class="feature-tag mode">投资规模</span>
                <p>"十四五"期间交通固定投资达18.8万亿元</p>
              </li>
              <li>
                <span class="feature-tag mode">养护市场</span>
                <p>2025年市场规模突破万亿元</p>
              </li>
              <li>
                <span class="feature-tag mode">未来焦点</span>
                <p>一体化、智能化改造和绿色化</p>
              </li>
            </ul>
            <div class="card-footer">
              <span class="highlight-text">✨ 从"规模扩张"转向"提质增效"</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心支撑 -->
    <section class="support-section">
      <h2 class="section-title">
        <span class="title-decoration">▎</span>
        💡 背后的核心支撑
      </h2>
      <p class="section-intro">
        中国桥梁的非凡实力，关键在于构建起了一套完整的技术与工程体系：
      </p>
      
      <div class="support-grid">
        <div class="support-card">
          <div class="support-icon">🔧</div>
          <h4>强大的技术装备体系</h4>
          <p>目前已形成满足"穿山、越江、跨海"需求的成套技术和装备，并大量应用自主研发的"黑科技"</p>
        </div>
        <div class="support-card">
          <div class="support-icon">💡</div>
          <h4>自主创新驱动</h4>
          <p>核心专利技术大量涌现，国产盾构机全球市场占有率已达70%，展现出强大的自主创新能力</p>
        </div>
        <div class="support-card">
          <div class="support-icon">🤖</div>
          <h4>智能制造与数字化</h4>
          <p>"智慧造桥机"、BIM数字孪生等技术在高铁桥梁等重点项目中广泛应用。双柳长江大桥通过在缆索内部植入光纤传感网络，成为了"会思考"的桥梁</p>
        </div>
        <div class="support-card">
          <div class="support-icon">⚡</div>
          <h4>高效资源整合能力</h4>
          <p>依托完整的工业产业链，超90%的基建物资可实现自主供应，保障了项目高效推进。同时，AI技术赋能建造全过程，综合效率提升可达20%至50%</p>
        </div>
      </div>
    </section>

    <!-- 展望未来 -->
    <section class="future-section">
      <h2 class="section-title light">
        <span class="title-decoration">▎</span>
        🔭 展望未来：中国桥梁的下一程
      </h2>
      <p class="section-intro light">
        中国桥梁的未来发展，将围绕"新建"与"养护"两大主线展开：
      </p>
      
      <div class="future-grid">
        <div class="future-card">
          <div class="future-header">
            <span class="future-icon">🎯</span>
            <h4>持续突破</h4>
          </div>
          <p>一批新的桥梁超级工程仍在谋划和建设，如计划在"十五五"期间建成的张靖皋长江大桥等，将持续引领世界桥梁工程技术发展</p>
        </div>
        <div class="future-card">
          <div class="future-header">
            <span class="future-icon">🏠</span>
            <h4>拥抱存量时代</h4>
          </div>
          <p>超半数大型桥梁已进入寿命中后期，催生出万亿级的养护修缮市场，此领域将迎来黄金发展期</p>
        </div>
        <div class="future-card wide">
          <div class="future-header">
            <span class="future-icon">🌱</span>
            <h4>深化智能与绿色发展</h4>
          </div>
          <p>重点在于解决建设、运维等环节的"数据孤岛"问题，并推广绿色低碳技术和材料，推动行业全面升级</p>
        </div>
      </div>
    </section>

    <!-- 底部装饰 -->
    <footer class="footer">
      <div class="footer-decoration">
        <span class="bridge-icon">🌉</span>
      </div>
      <p>传承工匠精神 · 筑梦基建强国</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bridge-overview {
  min-height: 100vh;
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
  color: #e2e8f0;
  position: relative;
  overflow-x: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(248, 113, 113, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(248, 113, 113, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: #dc2626;
  top: -100px;
  right: -100px;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: #f87171;
  bottom: 20%;
  left: -50px;
}

/* 顶部导航 */
.header {
  position: relative;
  z-index: 1;
  padding: 40px 20px 20px;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 0 0 30px rgba(248, 113, 113, 0.5);
  
  .title-icon {
    margin-right: 15px;
  }
}

.subtitle {
  font-size: 16px;
  color: #94a3b8;
  letter-spacing: 4px;
  margin-bottom: 20px;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  padding: 10px 24px;
  background: rgba(248, 113, 113, 0.15);
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #f87171;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(248, 113, 113, 0.3);
    border-color: #f87171;
    box-shadow: 0 0 20px rgba(248, 113, 113, 0.3);
  }
}

/* 核心数据 */
.stats-section {
  position: relative;
  z-index: 1;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s;
  
  &:hover {
    border-color: rgba(248, 113, 113, 0.5);
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(248, 113, 113, 0.2);
  }
  
  &.highlight {
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(15, 23, 42, 0.9));
    border-color: #f87171;
    
    .stat-value {
      color: #f87171;
    }
  }
}

.stat-value {
  font-size: 42px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8px;
  
  .unit {
    font-size: 16px;
    color: #94a3b8;
    margin-left: 4px;
  }
}

.stat-label {
  font-size: 14px;
  color: #f87171;
  margin-bottom: 5px;
}

.stat-desc {
  font-size: 12px;
  color: #64748b;
}

/* 通用标题样式 */
.section-title {
  font-size: 28px;
  color: #fff;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  
  .title-decoration {
    color: #f87171;
    font-size: 24px;
  }
  
  &.light {
    color: #fff;
  }
}

.section-intro {
  color: #94a3b8;
  font-size: 16px;
  margin-bottom: 25px;
  line-height: 1.6;
  
  &.light {
    color: #cbd5e1;
  }
}

/* 发展维度 */
.dimensions-section {
  position: relative;
  z-index: 1;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.dimension-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(248, 113, 113, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    border-color: rgba(248, 113, 113, 0.4);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
}

.card-header {
  background: linear-gradient(90deg, rgba(220, 38, 38, 0.3), transparent);
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(248, 113, 113, 0.1);
  
  .card-icon {
    font-size: 28px;
  }
  
  h3 {
    font-size: 20px;
    color: #fff;
  }
}

.card-content {
  padding: 20px 25px;
}

.feature-list {
  list-style: none;
  
  li {
    margin-bottom: 15px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .feature-tag {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(248, 113, 113, 0.15);
    border: 1px solid rgba(248, 113, 113, 0.3);
    border-radius: 20px;
    font-size: 12px;
    color: #f87171;
    margin-bottom: 8px;
    
    &.world {
      background: linear-gradient(90deg, rgba(251, 191, 36, 0.2), rgba(248, 113, 113, 0.2));
      border-color: #fbbf24;
      color: #fbbf24;
    }
    
    &.material {
      background: rgba(34, 197, 94, 0.15);
      border-color: rgba(34, 197, 94, 0.3);
      color: #4ade80;
    }
    
    &.mode {
      background: rgba(59, 130, 246, 0.15);
      border-color: rgba(59, 130, 246, 0.3);
      color: #60a5fa;
    }
  }
  
  p {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.6;
  }
}

.card-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(248, 113, 113, 0.1);
  
  .highlight-text {
    color: #f87171;
    font-size: 13px;
  }
}

/* 核心支撑 */
.support-section {
  position: relative;
  z-index: 1;
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-top: 30px;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.support-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(248, 113, 113, 0.1);
  border-radius: 12px;
  padding: 25px;
  transition: all 0.3s;
  
  &:hover {
    border-color: rgba(248, 113, 113, 0.3);
    background: rgba(30, 41, 59, 0.8);
  }
  
  .support-icon {
    font-size: 36px;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  p {
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.7;
  }
}

/* 展望未来 */
.future-section {
  position: relative;
  z-index: 1;
  padding: 50px 20px 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.future-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
}

.future-card {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(15, 23, 42, 0.8));
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 16px;
  padding: 25px;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(220, 38, 38, 0.2);
    border-color: rgba(248, 113, 113, 0.5);
  }
  
  &.wide {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(15, 23, 42, 0.8));
    border-color: rgba(34, 197, 94, 0.2);
    
    &:hover {
      border-color: rgba(34, 197, 94, 0.5);
      box-shadow: 0 15px 35px rgba(34, 197, 94, 0.2);
    }
  }
  
  .future-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
    
    .future-icon {
      font-size: 28px;
    }
    
    h4 {
      color: #fff;
      font-size: 18px;
    }
  }
  
  p {
    color: #cbd5e1;
    font-size: 14px;
    line-height: 1.7;
  }
}

/* 底部装饰 */
.footer {
  position: relative;
  z-index: 1;
  padding: 50px 20px 40px;
  text-align: center;
}

.footer-decoration {
  margin-bottom: 20px;
  
  .bridge-icon {
    font-size: 48px;
    opacity: 0.6;
  }
}

.footer p {
  color: #64748b;
  font-size: 14px;
  letter-spacing: 2px;
}
</style>
