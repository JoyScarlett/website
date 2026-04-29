// 🎯 小鸡AI营销系统 - 后台管理脚本
// 第6步：后台管理系统

class AdminPanel {
    constructor() {
        this.contentManager = new ContentManager();
        this.content = this.contentManager.getContent();
        this.currentSection = 'nav';
        
        this.init();
    }
    
    // ============================================
    // 1. 初始化
    // ============================================
    init() {
        console.log('🎯 后台管理系统初始化中...');
        
        // 绑定事件
        this.bindEvents();
        
        // 渲染初始内容
        this.renderSection(this.currentSection);
        
        console.log('✅ 后台管理系统初始化完成');
    }
    
    // ============================================
    // 2. 绑定事件
    // ============================================
    bindEvents() {
        // 菜单切换
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.getAttribute('data-section');
                this.switchSection(section);
            });
        });
        
        // 保存按钮
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveContent();
        });
        
        // 预览按钮
        document.getElementById('previewBtn').addEventListener('click', () => {
            window.open('pc.html', '_blank');
        });
        
        // 导出按钮
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.contentManager.exportContent();
            this.showToast('数据已导出');
        });
        
        // 导入按钮
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        
        document.getElementById('importFile').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importContent(file);
            }
        });
        
        // 重置按钮
        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('确定要重置所有数据吗？此操作不可恢复！')) {
                this.contentManager.resetContent();
                this.content = this.contentManager.getContent();
                this.renderSection(this.currentSection);
                this.showToast('数据已重置');
            }
        });
    }
    
    // ============================================
    // 3. 切换编辑区
    // ============================================
    switchSection(section) {
        this.currentSection = section;
        
        // 更新菜单激活状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === section) {
                item.classList.add('active');
            }
        });
        
        // 渲染对应内容
        this.renderSection(section);
    }
    
    // ============================================
    // 4. 渲染编辑区
    // ============================================
    renderSection(section) {
        const titles = {
            nav: '导航栏设置',
            hero: 'Hero区设置',
            features: '功能区设置',
            cases: '案例区设置',
            footer: '页脚设置'
        };
        
        document.getElementById('contentTitle').textContent = titles[section];
        
        const contentBody = document.getElementById('contentBody');
        
        switch(section) {
            case 'nav':
                contentBody.innerHTML = this.renderNavForm();
                break;
            case 'hero':
                contentBody.innerHTML = this.renderHeroForm();
                break;
            case 'features':
                contentBody.innerHTML = this.renderFeaturesForm();
                break;
            case 'cases':
                contentBody.innerHTML = this.renderCasesForm();
                break;
            case 'footer':
                contentBody.innerHTML = this.renderFooterForm();
                break;
        }
        
        // 绑定动态按钮事件
        this.bindDynamicEvents();
    }
    
    // ============================================
    // 5. 渲染各区域表单
    // ============================================
    renderNavForm() {
        const { nav } = this.content;
        
        return `
            <div class="form-section">
                <h3 class="form-section-title">Logo设置</h3>
                <div class="form-group">
                    <label class="form-label">Logo图标</label>
                    <input type="text" class="form-input" id="nav-logo-icon" value="${nav.logo.icon}" placeholder="输入emoji或图标">
                </div>
                <div class="form-group">
                    <label class="form-label">Logo文字</label>
                    <input type="text" class="form-input" id="nav-logo-text" value="${nav.logo.text}" placeholder="输入品牌名称">
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">菜单项</h3>
                <div class="array-items" id="nav-menu-items">
                    ${nav.menu.map((item, index) => `
                        <div class="array-item" data-index="${index}">
                            <div class="array-item-header">
                                <span class="array-item-title">菜单项 ${index + 1}</span>
                                <button class="remove-item-btn" onclick="adminPanel.removeMenuItem(${index})">删除</button>
                            </div>
                            <div class="form-group">
                                <label class="form-label">菜单文字</label>
                                <input type="text" class="form-input" data-field="text" value="${item.text}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">链接地址</label>
                                <input type="text" class="form-input" data-field="link" value="${item.link}">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="add-item-btn" onclick="adminPanel.addMenuItem()">+ 添加菜单项</button>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">CTA按钮</h3>
                <div class="form-group">
                    <label class="form-label">按钮文字</label>
                    <input type="text" class="form-input" id="nav-cta-text" value="${nav.cta.text}">
                </div>
                <div class="form-group">
                    <label class="form-label">按钮链接</label>
                    <input type="text" class="form-input" id="nav-cta-link" value="${nav.cta.link}">
                </div>
            </div>
        `;
    }
    
    renderHeroForm() {
        const { hero } = this.content;
        
        return `
            <div class="form-section">
                <h3 class="form-section-title">标题设置</h3>
                <div class="form-group">
                    <label class="form-label">标题第一行</label>
                    <input type="text" class="form-input" id="hero-title-line1" value="${hero.title.line1}">
                </div>
                <div class="form-group">
                    <label class="form-label">标题第二行</label>
                    <input type="text" class="form-input" id="hero-title-line2" value="${hero.title.line2}">
                </div>
                <div class="form-group">
                    <label class="form-label">副标题</label>
                    <textarea class="form-textarea" id="hero-subtitle">${hero.subtitle}</textarea>
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">按钮设置</h3>
                <div class="array-items" id="hero-buttons">
                    ${hero.buttons.map((btn, index) => `
                        <div class="array-item" data-index="${index}">
                            <div class="array-item-header">
                                <span class="array-item-title">按钮 ${index + 1}</span>
                                <button class="remove-item-btn" onclick="adminPanel.removeHeroButton(${index})">删除</button>
                            </div>
                            <div class="form-group">
                                <label class="form-label">按钮文字</label>
                                <input type="text" class="form-input" data-field="text" value="${btn.text}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">按钮图标</label>
                                <input type="text" class="form-input" data-field="icon" value="${btn.icon}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">按钮类型</label>
                                <input type="text" class="form-input" data-field="type" value="${btn.type}" placeholder="primary 或 secondary">
                            </div>
                            <div class="form-group">
                                <label class="form-label">追踪标识</label>
                                <input type="text" class="form-input" data-field="dataButton" value="${btn.dataButton}">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="add-item-btn" onclick="adminPanel.addHeroButton()">+ 添加按钮</button>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">视觉元素</h3>
                <div class="form-group">
                    <label class="form-label">视觉内容（emoji）</label>
                    <input type="text" class="form-input" id="hero-visual-content" value="${hero.visual.content}">
                </div>
            </div>
        `;
    }
    
    renderFeaturesForm() {
        const { features } = this.content;
        
        return `
            <div class="form-section">
                <h3 class="form-section-title">标题设置</h3>
                <div class="form-group">
                    <label class="form-label">区域标题</label>
                    <input type="text" class="form-input" id="features-title" value="${features.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">副标题</label>
                    <input type="text" class="form-input" id="features-subtitle" value="${features.subtitle}">
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">功能卡片</h3>
                <div class="array-items" id="features-items">
                    ${features.items.map((item, index) => `
                        <div class="array-item" data-index="${index}">
                            <div class="array-item-header">
                                <span class="array-item-title">功能 ${index + 1}</span>
                                <button class="remove-item-btn" onclick="adminPanel.removeFeatureItem(${index})">删除</button>
                            </div>
                            <div class="form-group">
                                <label class="form-label">图标</label>
                                <input type="text" class="form-input" data-field="icon" value="${item.icon}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">标题</label>
                                <input type="text" class="form-input" data-field="title" value="${item.title}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" data-field="description">${item.description}</textarea>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="add-item-btn" onclick="adminPanel.addFeatureItem()">+ 添加功能</button>
            </div>
        `;
    }
    
    renderCasesForm() {
        const { cases } = this.content;
        
        return `
            <div class="form-section">
                <h3 class="form-section-title">标题设置</h3>
                <div class="form-group">
                    <label class="form-label">区域标题</label>
                    <input type="text" class="form-input" id="cases-title" value="${cases.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">副标题</label>
                    <input type="text" class="form-input" id="cases-subtitle" value="${cases.subtitle}">
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">案例卡片</h3>
                <div class="array-items" id="cases-items">
                    ${cases.items.map((item, index) => `
                        <div class="array-item" data-index="${index}">
                            <div class="array-item-header">
                                <span class="array-item-title">案例 ${index + 1}</span>
                                <button class="remove-item-btn" onclick="adminPanel.removeCaseItem(${index})">删除</button>
                            </div>
                            <div class="form-group">
                                <label class="form-label">公司名称</label>
                                <input type="text" class="form-input" data-field="company" value="${item.company}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">行业</label>
                                <input type="text" class="form-input" data-field="industry" value="${item.industry}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">成果</label>
                                <input type="text" class="form-input" data-field="result" value="${item.result}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">描述</label>
                                <textarea class="form-textarea" data-field="description">${item.description}</textarea>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="add-item-btn" onclick="adminPanel.addCaseItem()">+ 添加案例</button>
            </div>
        `;
    }
    
    renderFooterForm() {
        const { footer } = this.content;
        
        return `
            <div class="form-section">
                <h3 class="form-section-title">联系方式</h3>
                <div class="form-group">
                    <label class="form-label">邮箱</label>
                    <input type="text" class="form-input" id="footer-email" value="${footer.contact.email}">
                </div>
                <div class="form-group">
                    <label class="form-label">电话</label>
                    <input type="text" class="form-input" id="footer-phone" value="${footer.contact.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label">微信</label>
                    <input type="text" class="form-input" id="footer-wechat" value="${footer.contact.wechat}">
                </div>
            </div>
            
            <div class="form-section">
                <h3 class="form-section-title">版权信息</h3>
                <div class="form-group">
                    <label class="form-label">版权文字</label>
                    <input type="text" class="form-input" id="footer-copyright" value="${footer.copyright}">
                </div>
            </div>
        `;
    }
    
    // ============================================
    // 6. 保存内容
    // ============================================
    saveContent() {
        try {
            // 根据当前区域收集数据
            switch(this.currentSection) {
                case 'nav':
                    this.saveNavContent();
                    break;
                case 'hero':
                    this.saveHeroContent();
                    break;
                case 'features':
                    this.saveFeaturesContent();
                    break;
                case 'cases':
                    this.saveCasesContent();
                    break;
                case 'footer':
                    this.saveFooterContent();
                    break;
            }
            
            // 保存到localStorage
            this.contentManager.saveContent(this.content);
            
            // 显示成功提示
            this.showToast('保存成功！');
            
            console.log('✅ 内容已保存');
        } catch (error) {
            console.error('❌ 保存失败:', error);
            this.showToast('保存失败！', 'error');
        }
    }
    
    saveNavContent() {
        this.content.nav.logo.icon = document.getElementById('nav-logo-icon').value;
        this.content.nav.logo.text = document.getElementById('nav-logo-text').value;
        
        // 收集菜单项
        const menuItems = [];
        document.querySelectorAll('#nav-menu-items .array-item').forEach(item => {
            menuItems.push({
                text: item.querySelector('[data-field="text"]').value,
                link: item.querySelector('[data-field="link"]').value
            });
        });
        this.content.nav.menu = menuItems;
        
        this.content.nav.cta.text = document.getElementById('nav-cta-text').value;
        this.content.nav.cta.link = document.getElementById('nav-cta-link').value;
    }
    
    saveHeroContent() {
        this.content.hero.title.line1 = document.getElementById('hero-title-line1').value;
        this.content.hero.title.line2 = document.getElementById('hero-title-line2').value;
        this.content.hero.subtitle = document.getElementById('hero-subtitle').value;
        
        // 收集按钮
        const buttons = [];
        document.querySelectorAll('#hero-buttons .array-item').forEach(item => {
            buttons.push({
                text: item.querySelector('[data-field="text"]').value,
                icon: item.querySelector('[data-field="icon"]').value,
                type: item.querySelector('[data-field="type"]').value,
                dataButton: item.querySelector('[data-field="dataButton"]').value
            });
        });
        this.content.hero.buttons = buttons;
        
        this.content.hero.visual.content = document.getElementById('hero-visual-content').value;
    }
    
    saveFeaturesContent() {
        this.content.features.title = document.getElementById('features-title').value;
        this.content.features.subtitle = document.getElementById('features-subtitle').value;
        
        // 收集功能项
        const items = [];
        document.querySelectorAll('#features-items .array-item').forEach(item => {
            items.push({
                icon: item.querySelector('[data-field="icon"]').value,
                title: item.querySelector('[data-field="title"]').value,
                description: item.querySelector('[data-field="description"]').value
            });
        });
        this.content.features.items = items;
    }
    
    saveCasesContent() {
        this.content.cases.title = document.getElementById('cases-title').value;
        this.content.cases.subtitle = document.getElementById('cases-subtitle').value;
        
        // 收集案例项
        const items = [];
        document.querySelectorAll('#cases-items .array-item').forEach(item => {
            items.push({
                company: item.querySelector('[data-field="company"]').value,
                industry: item.querySelector('[data-field="industry"]').value,
                result: item.querySelector('[data-field="result"]').value,
                description: item.querySelector('[data-field="description"]').value
            });
        });
        this.content.cases.items = items;
    }
    
    saveFooterContent() {
        this.content.footer.contact.email = document.getElementById('footer-email').value;
        this.content.footer.contact.phone = document.getElementById('footer-phone').value;
        this.content.footer.contact.wechat = document.getElementById('footer-wechat').value;
        this.content.footer.copyright = document.getElementById('footer-copyright').value;
    }
    
    // ============================================
    // 7. 数组项操作
    // ============================================
    addMenuItem() {
        this.content.nav.menu.push({ text: '新菜单', link: '#' });
        this.renderSection('nav');
    }
    
    removeMenuItem(index) {
        this.content.nav.menu.splice(index, 1);
        this.renderSection('nav');
    }
    
    addHeroButton() {
        this.content.hero.buttons.push({
            text: '新按钮',
            icon: '🔘',
            type: 'primary',
            dataButton: 'new-button'
        });
        this.renderSection('hero');
    }
    
    removeHeroButton(index) {
        this.content.hero.buttons.splice(index, 1);
        this.renderSection('hero');
    }
    
    addFeatureItem() {
        this.content.features.items.push({
            icon: '⭐',
            title: '新功能',
            description: '功能描述'
        });
        this.renderSection('features');
    }
    
    removeFeatureItem(index) {
        this.content.features.items.splice(index, 1);
        this.renderSection('features');
    }
    
    addCaseItem() {
        this.content.cases.items.push({
            company: '新公司',
            industry: '行业',
            result: '成果',
            description: '案例描述'
        });
        this.renderSection('cases');
    }
    
    removeCaseItem(index) {
        this.content.cases.items.splice(index, 1);
        this.renderSection('cases');
    }
    
    // ============================================
    // 8. 导入内容
    // ============================================
    async importContent(file) {
        try {
            await this.contentManager.importContent(file);
            this.content = this.contentManager.getContent();
            this.renderSection(this.currentSection);
            this.showToast('数据已导入');
        } catch (error) {
            console.error('导入失败:', error);
            this.showToast('导入失败！', 'error');
        }
    }
    
    // ============================================
    // 9. Toast提示
    // ============================================
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastText = toast.querySelector('.toast-text');
        const toastIcon = toast.querySelector('.toast-icon');
        
        toastText.textContent = message;
        toastIcon.textContent = type === 'success' ? '✅' : '❌';
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // ============================================
    // 10. 绑定动态事件
    // ============================================
    bindDynamicEvents() {
        // 这里可以添加动态生成元素的事件绑定
    }
}

// ============================================
// 11. 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});
