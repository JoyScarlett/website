// 🎯 小鸡AI营销系统 - 域名跳转路由
// 第11步：域名跳转逻辑

class DomainRouter {
    constructor(config) {
        this.config = config;
        this.currentDomain = window.location.hostname;
        this.currentPath = window.location.pathname;
        this.currentPage = this.getCurrentPage();
        
        if (this.config.options.debug) {
            console.log('🌐 DomainRouter 初始化');
            console.log('当前域名:', this.currentDomain);
            console.log('当前路径:', this.currentPath);
            console.log('当前页面:', this.currentPage);
        }
    }
    
    // ============================================
    // 获取当前页面名称
    // ============================================
    getCurrentPage() {
        const path = this.currentPath;
        
        // 处理根路径
        if (path === '/' || path === '') {
            return 'index.html';
        }
        
        // 提取文件名
        const fileName = path.split('/').pop();
        
        // 如果没有文件名，返回index.html
        if (!fileName || fileName.indexOf('.') === -1) {
            return 'index.html';
        }
        
        return fileName;
    }
    
    // ============================================
    // 检查是否为开发环境
    // ============================================
    isDevelopment() {
        const domain = this.currentDomain;
        
        // 检查是否匹配开发环境域名
        for (const devDomain of this.config.devDomains) {
            if (domain === devDomain || domain.startsWith(devDomain)) {
                return true;
            }
        }
        
        // 检查是否为本地文件
        if (window.location.protocol === 'file:') {
            return true;
        }
        
        return false;
    }
    
    // ============================================
    // 检查是否为PC域名
    // ============================================
    isPCDomain() {
        const domain = this.currentDomain;
        
        for (const pcDomain of this.config.pcDomains) {
            if (domain === pcDomain || domain.endsWith('.' + pcDomain)) {
                return true;
            }
        }
        
        return false;
    }
    
    // ============================================
    // 检查是否为移动端域名
    // ============================================
    isMobileDomain() {
        const domain = this.currentDomain;
        
        for (const mobileDomain of this.config.mobileDomains) {
            if (domain === mobileDomain || domain.endsWith('.' + mobileDomain)) {
                return true;
            }
        }
        
        return false;
    }
    
    // ============================================
    // 检测设备类型（备用方案）
    // ============================================
    detectDevice() {
        const ua = navigator.userAgent.toLowerCase();
        
        // 移动设备关键词
        const mobileKeywords = [
            'mobile', 'android', 'iphone', 'ipad', 'ipod',
            'blackberry', 'windows phone', 'webos'
        ];
        
        for (const keyword of mobileKeywords) {
            if (ua.includes(keyword)) {
                // iPad特殊处理（可以当作PC）
                if (keyword === 'ipad') {
                    return 'tablet';
                }
                return 'mobile';
            }
        }
        
        return 'desktop';
    }
    
    // ============================================
    // 构建跳转URL
    // ============================================
    buildRedirectURL(targetPage) {
        let url = targetPage;
        
        // 保留查询参数
        if (this.config.options.preserveQueryString && window.location.search) {
            url += window.location.search;
        }
        
        // 保留锚点
        if (this.config.options.preserveHash && window.location.hash) {
            url += window.location.hash;
        }
        
        return url;
    }
    
    // ============================================
    // 执行跳转
    // ============================================
    redirect(targetPage, reason) {
        const url = this.buildRedirectURL(targetPage);
        
        if (this.config.options.debug) {
            console.log(`🔄 准备跳转: ${this.currentPage} → ${targetPage}`);
            console.log(`📝 跳转原因: ${reason}`);
            console.log(`🔗 目标URL: ${url}`);
        }
        
        // 延迟跳转
        if (this.config.options.delay > 0) {
            setTimeout(() => {
                window.location.href = url;
            }, this.config.options.delay);
        } else {
            window.location.href = url;
        }
    }
    
    // ============================================
    // 主路由逻辑
    // ============================================
    route() {
        // 检查是否启用跳转
        if (!this.config.options.enabled) {
            if (this.config.options.debug) {
                console.log('⚠️ 域名跳转已禁用');
            }
            return;
        }
        
        // 开发环境不跳转
        if (this.isDevelopment()) {
            if (this.config.options.debug) {
                console.log('🔧 开发环境，不执行跳转');
            }
            return;
        }
        
        // ============================================
        // 规则1: PC域名访问
        // ============================================
        if (this.isPCDomain()) {
            if (this.config.options.debug) {
                console.log('💻 检测到PC域名');
            }
            
            // 如果当前不是PC页面，跳转到PC页面
            if (this.currentPage !== this.config.targets.pc) {
                this.redirect(this.config.targets.pc, 'PC域名访问，跳转到PC版本');
                return;
            }
            
            if (this.config.options.debug) {
                console.log('✅ 已在PC页面，无需跳转');
            }
            return;
        }
        
        // ============================================
        // 规则2: 移动端域名访问
        // ============================================
        if (this.isMobileDomain()) {
            if (this.config.options.debug) {
                console.log('📱 检测到移动端域名');
            }
            
            // 如果当前不是移动端页面，跳转到移动端页面
            if (this.currentPage !== this.config.targets.mobile) {
                this.redirect(this.config.targets.mobile, '移动端域名访问，跳转到移动版本');
                return;
            }
            
            if (this.config.options.debug) {
                console.log('✅ 已在移动端页面，无需跳转');
            }
            return;
        }
        
        // ============================================
        // 规则3: 未配置的域名，使用设备检测（备用方案）
        // ============================================
        if (this.config.options.enableDeviceDetection) {
            const device = this.detectDevice();
            
            if (this.config.options.debug) {
                console.log('🔍 未配置的域名，使用设备检测');
                console.log('检测到设备类型:', device);
            }
            
            // 移动设备访问PC页面，跳转到移动端
            if (device === 'mobile' && this.currentPage === this.config.targets.pc) {
                this.redirect(this.config.targets.mobile, '移动设备访问，跳转到移动版本');
                return;
            }
            
            // 桌面设备访问移动端页面，跳转到PC端
            if (device === 'desktop' && this.currentPage === this.config.targets.mobile) {
                this.redirect(this.config.targets.pc, '桌面设备访问，跳转到PC版本');
                return;
            }
            
            if (this.config.options.debug) {
                console.log('✅ 设备与页面匹配，无需跳转');
            }
        } else {
            if (this.config.options.debug) {
                console.log('⚠️ 未配置的域名，且设备检测已禁用');
            }
        }
    }
    
    // ============================================
    // 获取当前环境信息（调试用）
    // ============================================
    getEnvironmentInfo() {
        return {
            domain: this.currentDomain,
            path: this.currentPath,
            page: this.currentPage,
            isDev: this.isDevelopment(),
            isPCDomain: this.isPCDomain(),
            isMobileDomain: this.isMobileDomain(),
            device: this.detectDevice(),
            protocol: window.location.protocol,
            fullURL: window.location.href
        };
    }
}

// ============================================
// 自动初始化（如果配置存在）
// ============================================
if (typeof DOMAIN_CONFIG !== 'undefined') {
    // 页面加载完成后执行路由
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const router = new DomainRouter(DOMAIN_CONFIG);
            router.route();
            
            // 在控制台暴露router对象，方便调试
            if (DOMAIN_CONFIG.options.debug) {
                window.domainRouter = router;
                console.log('💡 提示: 可以在控制台使用 domainRouter.getEnvironmentInfo() 查看环境信息');
            }
        });
    } else {
        const router = new DomainRouter(DOMAIN_CONFIG);
        router.route();
        
        if (DOMAIN_CONFIG.options.debug) {
            window.domainRouter = router;
            console.log('💡 提示: 可以在控制台使用 domainRouter.getEnvironmentInfo() 查看环境信息');
        }
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DomainRouter;
}
