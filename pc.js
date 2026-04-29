// 🎯 小鸡AI营销系统 - PC端主脚本
// 第5步：动态渲染逻辑

class PCWebsite {
    constructor() {
        this.contentManager = new ContentManager();
        this.content = this.contentManager.getContent();
        this.tracker = null;
        
        this.init();
    }
    
    // ============================================
    // 1. 初始化
    // ============================================
    init() {
        console.log('🎯 PC官网初始化中...');
        
        // 初始化追踪器
        this.initTracker();
        
        // 渲染所有内容
        this.renderAll();
        
        // 绑定事件
        this.bindEvents();
        
        console.log('✅ PC官网初始化完成');
    }
    
    // ============================================
    // 2. 初始化追踪器
    // ============================================
    initTracker() {
        if (typeof ButtonTracker !== 'undefined' && typeof SUPABASE_CONFIG !== 'undefined') {
            this.tracker = new ButtonTracker(SUPABASE_CONFIG);
            this.tracker.init();
            console.log('✅ 追踪器已启动');
        }
    }
    
    // ============================================
    // 3. 渲染所有内容
    // ============================================
    renderAll() {
        this.renderNav();
        this.renderHero();
        this.renderFeatures();
        this.renderCases();
        this.renderFooter();
    }
    
    // ============================================
    // 4. 渲染导航栏
    // ============================================
    renderNav() {
        const { nav } = this.content;
        
        // Logo
        const navLogo = document.getElementById('navLogo');
        navLogo.innerHTML = `
            <span class="logo-icon">${nav.logo.icon}</span>
            <span class="logo-text">${nav.logo.text}</span>
        `;
        
        // 菜单
        const navMenu = document.getElementById('navMenu');
        navMenu.innerHTML = nav.menu.map(item => `
            <li class="nav-item">
                <a href="${item.link}" class="nav-link">${item.text}</a>
            </li>
        `).join('');
        
        // CTA按钮
        const navCtaBtn = document.getElementById('navCtaBtn');
        navCtaBtn.textContent = nav.cta.text;
    }
    
    // ============================================
    // 5. 渲染Hero区
    // ============================================
    renderHero() {
        const { hero } = this.content;
        
        // 标题
        const heroTitle = document.getElementById('heroTitle');
        heroTitle.innerHTML = `
            <span class="title-line1">${hero.title.line1}</span>
            <span class="title-line2">${hero.title.line2}</span>
        `;
        
        // 副标题
        const heroSubtitle = document.getElementById('heroSubtitle');
        heroSubtitle.textContent = hero.subtitle;
        
        // 按钮
        const heroButtons = document.getElementById('heroButtons');
        heroButtons.innerHTML = hero.buttons.map(btn => `
            <button class="hero-btn ${btn.type}-btn" data-button="${btn.dataButton}">
                <span class="btn-icon">${btn.icon}</span>
                <span class="btn-text">${btn.text}</span>
            </button>
        `).join('');
        
        // 视觉元素
        const heroVisual = document.getElementById('heroVisual');
        if (hero.visual.type === 'emoji') {
            heroVisual.innerHTML = `
                <div class="visual-emoji">${hero.visual.content}</div>
            `;
        }
    }
    
    // ============================================
    // 6. 渲染功能区
    // ============================================
    renderFeatures() {
        const { features } = this.content;
        
        // 标题
        document.getElementById('featuresTitle').textContent = features.title;
        document.getElementById('featuresSubtitle').textContent = features.subtitle;
        
        // 功能卡片
        const featuresGrid = document.getElementById('featuresGrid');
        featuresGrid.innerHTML = features.items.map(item => `
            <div class="feature-card glass-effect">
                <div class="feature-icon">${item.icon}</div>
                <h3 class="feature-title">${item.title}</h3>
                <p class="feature-description">${item.description}</p>
            </div>
        `).join('');
    }
    
    // ============================================
    // 7. 渲染案例区
    // ============================================
    renderCases() {
        const { cases } = this.content;
        
        // 标题
        document.getElementById('casesTitle').textContent = cases.title;
        document.getElementById('casesSubtitle').textContent = cases.subtitle;
        
        // 案例卡片
        const casesGrid = document.getElementById('casesGrid');
        casesGrid.innerHTML = cases.items.map(item => `
            <div class="case-card glass-effect">
                <div class="case-header">
                    <h3 class="case-company">${item.company}</h3>
                    <span class="case-industry">${item.industry}</span>
                </div>
                <div class="case-result">${item.result}</div>
                <p class="case-description">${item.description}</p>
            </div>
        `).join('');
    }
    
    // ============================================
    // 8. 渲染页脚
    // ============================================
    renderFooter() {
        const { footer } = this.content;
        
        // 页脚内容
        const footerContent = document.getElementById('footerContent');
        footerContent.innerHTML = `
            <div class="footer-logo">
                <span class="logo-icon">🐔</span>
                <span class="logo-text">小鸡AI</span>
            </div>
            <div class="footer-columns">
                ${footer.columns.map(col => `
                    <div class="footer-column">
                        <h4 class="footer-column-title">${col.title}</h4>
                        <ul class="footer-links">
                            ${col.links.map(link => `
                                <li><a href="${link.link}">${link.text}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
                <div class="footer-column">
                    <h4 class="footer-column-title">联系我们</h4>
                    <ul class="footer-contact">
                        <li>📧 ${footer.contact.email}</li>
                        <li>📞 ${footer.contact.phone}</li>
                        <li>💬 ${footer.contact.wechat}</li>
                    </ul>
                </div>
            </div>
        `;
        
        // 页脚底部
        const footerBottom = document.getElementById('footerBottom');
        footerBottom.innerHTML = `<p>${footer.copyright}</p>`;
    }
    
    // ============================================
    // 9. 绑定事件
    // ============================================
    bindEvents() {
        // 移动端菜单切换
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // 导航栏滚动效果
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 关闭移动端菜单
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
    
    // ============================================
    // 10. 刷新内容（用于后台更新后同步）
    // ============================================
    refresh() {
        console.log('🔄 刷新内容...');
        this.content = this.contentManager.getContent();
        this.renderAll();
        console.log('✅ 内容已刷新');
    }
}

// ============================================
// 11. 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.pcWebsite = new PCWebsite();
});

// ============================================
// 12. 暴露刷新接口（供后台使用）
// ============================================
window.refreshWebsite = () => {
    if (window.pcWebsite) {
        window.pcWebsite.refresh();
    }
};
