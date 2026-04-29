// 🎯 小鸡AI营销系统 - 内容管理器
// 第5步：数据与视图分离

class ContentManager {
    constructor() {
        this.storageKey = 'xiaoji_ai_content';
        this.defaultContent = this.getDefaultContent();
    }
    
    // ============================================
    // 1. 获取默认内容
    // ============================================
    getDefaultContent() {
        return {
            // 导航栏
            nav: {
                logo: {
                    icon: '🐔',
                    text: '小鸡AI'
                },
                menu: [
                    { text: '首页', link: '#home' },
                    { text: '功能', link: '#features' },
                    { text: '案例', link: '#cases' },
                    { text: '关于', link: '#about' }
                ],
                cta: {
                    text: '免费试用',
                    link: '#trial'
                }
            },
            
            // Hero区
            hero: {
                title: {
                    line1: '智能营销',
                    line2: '让增长更简单'
                },
                subtitle: 'AI驱动的营销自动化系统，帮助企业降低获客成本，提升转化效率',
                buttons: [
                    {
                        text: '立即开始',
                        type: 'primary',
                        icon: '🚀',
                        dataButton: 'hero-start'
                    },
                    {
                        text: '观看演示',
                        type: 'secondary',
                        icon: '▶️',
                        dataButton: 'hero-demo'
                    }
                ],
                visual: {
                    type: 'emoji',
                    content: '🤖'
                }
            },
            
            // 功能区
            features: {
                title: '核心功能',
                subtitle: '全方位的智能营销解决方案',
                items: [
                    {
                        icon: '⚡',
                        title: '自动化营销',
                        description: 'AI自动生成营销内容，多渠道智能投放，节省80%人力成本'
                    },
                    {
                        icon: '🎯',
                        title: '精准投放',
                        description: '智能分析用户画像，精准定位目标客户，提升3倍转化率'
                    },
                    {
                        icon: '📊',
                        title: '数据分析',
                        description: '实时追踪营销效果，智能优化投放策略，ROI提升200%'
                    },
                    {
                        icon: '🔄',
                        title: '全渠道整合',
                        description: '统一管理微信、抖音、小红书等多个平台，一键同步发布'
                    },
                    {
                        icon: '💬',
                        title: '智能客服',
                        description: 'AI自动回复客户咨询，24小时在线服务，提升客户满意度'
                    },
                    {
                        icon: '📈',
                        title: '增长预测',
                        description: '基于大数据的增长预测模型，提前规划营销策略'
                    }
                ]
            },
            
            // 案例区
            cases: {
                title: '成功案例',
                subtitle: '已帮助1000+企业实现营销增长',
                items: [
                    {
                        company: '某电商平台',
                        industry: '电商',
                        result: '转化率提升 300%',
                        description: '通过AI智能推荐和精准投放，3个月内GMV增长500万'
                    },
                    {
                        company: '某教育机构',
                        industry: '教育',
                        result: '获客成本降低 60%',
                        description: '自动化营销流程优化，每月节省营销费用20万元'
                    },
                    {
                        company: '某SaaS公司',
                        industry: '科技',
                        result: '用户增长 5倍',
                        description: '全渠道整合营销，半年内付费用户从2000增至10000'
                    }
                ]
            },
            
            // 页脚
            footer: {
                columns: [
                    {
                        title: '产品',
                        links: [
                            { text: '功能介绍', link: '#features' },
                            { text: '价格方案', link: '#pricing' },
                            { text: '客户案例', link: '#cases' }
                        ]
                    },
                    {
                        title: '支持',
                        links: [
                            { text: '帮助中心', link: '#help' },
                            { text: '开发文档', link: '#docs' },
                            { text: '联系我们', link: '#contact' }
                        ]
                    },
                    {
                        title: '公司',
                        links: [
                            { text: '关于我们', link: '#about' },
                            { text: '加入我们', link: '#careers' },
                            { text: '新闻动态', link: '#news' }
                        ]
                    }
                ],
                contact: {
                    email: 'contact@xiaoji.ai',
                    phone: '400-123-4567',
                    wechat: 'xiaoji_ai'
                },
                copyright: '© 2024 小鸡AI营销系统. All rights reserved.'
            }
        };
    }
    
    // ============================================
    // 2. 获取内容
    // ============================================
    getContent() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const content = JSON.parse(stored);
                console.log('✅ 从localStorage加载内容');
                return content;
            }
        } catch (e) {
            console.warn('⚠️ localStorage读取失败，使用默认内容', e);
        }
        
        // 首次访问，保存默认内容
        this.saveContent(this.defaultContent);
        return this.defaultContent;
    }
    
    // ============================================
    // 3. 保存内容
    // ============================================
    saveContent(content) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(content));
            console.log('✅ 内容已保存到localStorage');
            return true;
        } catch (e) {
            console.error('❌ localStorage保存失败', e);
            return false;
        }
    }
    
    // ============================================
    // 4. 更新内容（部分更新）
    // ============================================
    updateContent(section, data) {
        const content = this.getContent();
        content[section] = { ...content[section], ...data };
        return this.saveContent(content);
    }
    
    // ============================================
    // 5. 重置为默认内容
    // ============================================
    resetContent() {
        return this.saveContent(this.defaultContent);
    }
    
    // ============================================
    // 6. 导出内容（用于备份）
    // ============================================
    exportContent() {
        const content = this.getContent();
        const dataStr = JSON.stringify(content, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'xiaoji-ai-content-backup.json';
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('✅ 内容已导出');
    }
    
    // ============================================
    // 7. 导入内容（用于恢复）
    // ============================================
    importContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    if (this.saveContent(content)) {
                        console.log('✅ 内容已导入');
                        resolve(content);
                    } else {
                        reject(new Error('保存失败'));
                    }
                } catch (error) {
                    console.error('❌ 内容导入失败', error);
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        });
    }
}

// 导出全局实例
if (typeof window !== 'undefined') {
    window.ContentManager = ContentManager;
}
