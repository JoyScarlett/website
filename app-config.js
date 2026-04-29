// 🎯 小鸡AI营销系统 - 统一配置文件
// 第12步：文档和配置 - 应用配置

const APP_CONFIG = {
    // ============================================
    // 1. 基础信息
    // ============================================
    app: {
        name: '小鸡AI营销系统',
        version: '1.0.0',
        description: '智能营销解决方案',
        author: '小鸡AI团队',
        website: 'https://www.example.com',
        logo: '🐔'
    },
    
    // ============================================
    // 2. 公司信息
    // ============================================
    company: {
        name: '小鸡AI科技有限公司',
        fullName: '深圳市小鸡AI科技有限公司',
        slogan: '让营销更智能',
        description: 'AI驱动的营销自动化系统',
        
        // 联系方式
        contact: {
            phone: '400-123-4567',
            email: 'contact@example.com',
            wechat: 'xiaoji-ai',
            address: '广东省深圳市南山区科技园'
        },
        
        // 社交媒体
        social: {
            weibo: 'https://weibo.com/xiaoji-ai',
            wechat_qr: '/images/wechat-qr.png',
            douyin: '@xiaoji-ai',
            xiaohongshu: '@xiaoji-ai'
        },
        
        // 营业信息
        business: {
            license: '91440300XXXXXXXXXX',
            established: '2024',
            icp: '粤ICP备XXXXXXXX号'
        }
    },
    
    // ============================================
    // 3. Supabase 配置
    // ============================================
    supabase: {
        // 项目配置
        url: 'YOUR_SUPABASE_URL',  // 替换为你的 Supabase URL
        anonKey: 'YOUR_SUPABASE_ANON_KEY',  // 替换为你的 Supabase Anon Key
        
        // 数据表名称
        tables: {
            buttonClicks: 'button_clicks',
            users: 'users',
            analytics: 'analytics'
        },
        
        // 视图名称
        views: {
            dailyStats: 'daily_stats',
            buttonRanking: 'button_ranking',
            sourceStats: 'source_stats'
        },
        
        // 是否启用
        enabled: true,
        
        // 调试模式
        debug: true,
        
        // 重试配置
        retry: {
            maxAttempts: 3,
            delay: 1000
        }
    },
    
    // ============================================
    // 4. 运营人员配置
    // ============================================
    operators: [
        {
            id: 'op001',
            name: '张三',
            role: '高级运营',
            avatar: '/images/avatars/zhangsan.jpg',
            phone: '13800138001',
            wechat: 'zhangsan-wx',
            email: 'zhangsan@example.com',
            links: {
                wechat: 'https://example.com/wechat/zhangsan',
                phone: 'tel:13800138001',
                email: 'mailto:zhangsan@example.com'
            },
            active: true
        },
        {
            id: 'op002',
            name: '李四',
            role: '运营专员',
            avatar: '/images/avatars/lisi.jpg',
            phone: '13800138002',
            wechat: 'lisi-wx',
            email: 'lisi@example.com',
            links: {
                wechat: 'https://example.com/wechat/lisi',
                phone: 'tel:13800138002',
                email: 'mailto:lisi@example.com'
            },
            active: true
        },
        {
            id: 'op003',
            name: '王五',
            role: '客服专员',
            avatar: '/images/avatars/wangwu.jpg',
            phone: '13800138003',
            wechat: 'wangwu-wx',
            email: 'wangwu@example.com',
            links: {
                wechat: 'https://example.com/wechat/wangwu',
                phone: 'tel:13800138003',
                email: 'mailto:wangwu@example.com'
            },
            active: false  // 已离职
        }
    ],
    
    // ============================================
    // 5. 腾讯云COS配置
    // ============================================
    cos: {
        secretId: 'YOUR_SECRET_ID',
        secretKey: 'YOUR_SECRET_KEY',
        bucket: 'your-bucket-name-1234567890',
        region: 'ap-guangzhou',
        domain: 'your-custom-domain.com',
        https: true,
        cacheControl: 'max-age=3600',
        
        // CDN配置
        cdn: {
            enabled: false,
            domain: 'cdn.example.com'
        }
    },
    
    // ============================================
    // 6. 域名配置
    // ============================================
    domains: {
        // PC端域名
        pc: [
            'www.example.com',
            'pc.example.com'
        ],
        
        // 移动端域名
        mobile: [
            'm.example.com',
            'mobile.example.com'
        ],
        
        // 开发环境
        dev: [
            'localhost',
            '127.0.0.1',
            '192.168.',
            '10.0.'
        ]
    },
    
    // ============================================
    // 7. 功能开关
    // ============================================
    features: {
        // 用户行为追踪
        tracking: {
            enabled: true,
            debug: true
        },
        
        // 域名跳转
        domainRouting: {
            enabled: true,
            deviceDetection: true,
            debug: true
        },
        
        // 数据分析
        analytics: {
            enabled: true,
            realtime: true
        },
        
        // 动画效果
        animations: {
            enabled: true,
            reducedMotion: true  // 尊重用户偏好
        }
    },
    
    // ============================================
    // 8. UI配置
    // ============================================
    ui: {
        // 主题色
        theme: {
            primary: '#00ff88',      // 荧光绿
            secondary: '#00d4ff',    // 青蓝
            accent: '#a29bfe',       // 紫色
            background: '#0a0e27',   // 深色背景
            text: '#ffffff'          // 白色文字
        },
        
        // 字体
        fonts: {
            primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            mono: '"Courier New", monospace'
        },
        
        // 动画时长
        animation: {
            fast: '0.2s',
            normal: '0.3s',
            slow: '0.6s'
        }
    },
    
    // ============================================
    // 9. SEO配置
    // ============================================
    seo: {
        title: '小鸡AI营销系统 - 智能营销解决方案',
        description: 'AI驱动的营销自动化系统，帮助企业提升营销效率，降低获客成本',
        keywords: '营销系统,AI营销,营销自动化,数据分析,用户追踪',
        author: '小鸡AI团队',
        
        // Open Graph
        og: {
            type: 'website',
            image: '/images/og-image.jpg',
            locale: 'zh_CN'
        },
        
        // Twitter Card
        twitter: {
            card: 'summary_large_image',
            site: '@xiaoji-ai'
        }
    },
    
    // ============================================
    // 10. 环境配置
    // ============================================
    env: {
        // 当前环境：development | production | staging
        current: 'development',
        
        // 是否为生产环境
        isProduction: false,
        
        // API基础URL
        apiBaseURL: 'https://api.example.com',
        
        // 静态资源CDN
        cdnURL: 'https://cdn.example.com'
    },
    
    // ============================================
    // 11. 第三方服务
    // ============================================
    services: {
        // 百度统计
        baidu: {
            enabled: false,
            siteId: 'YOUR_BAIDU_SITE_ID'
        },
        
        // Google Analytics
        ga: {
            enabled: false,
            trackingId: 'UA-XXXXXXXXX-X'
        },
        
        // 客服系统
        customerService: {
            enabled: false,
            provider: 'qiyu',  // 网易七鱼
            appKey: 'YOUR_APP_KEY'
        }
    },
    
    // ============================================
    // 12. 业务配置
    // ============================================
    business: {
        // 按钮配置
        buttons: {
            wechat: {
                name: '微信咨询',
                icon: '💬',
                link: 'https://example.com/wechat',
                color: '#00ff88'
            },
            phone: {
                name: '电话联系',
                icon: '📞',
                link: 'tel:400-123-4567',
                color: '#00d4ff'
            },
            demo: {
                name: '预约演示',
                icon: '🚀',
                link: 'https://example.com/demo',
                color: '#a29bfe'
            }
        },
        
        // 统计数据
        stats: {
            customers: 1000,
            satisfaction: 98,
            support: '24/7'
        }
    }
};

// ============================================
// 辅助函数
// ============================================

// 获取配置项
function getConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let value = APP_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

// 检查功能是否启用
function isFeatureEnabled(feature) {
    return getConfig(`features.${feature}.enabled`, false);
}

// 获取当前环境
function getEnvironment() {
    return getConfig('env.current', 'development');
}

// 是否为生产环境
function isProduction() {
    return getConfig('env.isProduction', false);
}

// 获取活跃的运营人员
function getActiveOperators() {
    return APP_CONFIG.operators.filter(op => op.active);
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        getConfig,
        isFeatureEnabled,
        getEnvironment,
        isProduction,
        getActiveOperators
    };
}
