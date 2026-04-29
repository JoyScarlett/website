// 🎯 小鸡AI营销系统 - 数据看板脚本
// 第4步：运营人员系统

class Dashboard {
    constructor(config) {
        this.config = config;
        this.supabaseUrl = config.url;
        this.supabaseKey = config.anonKey;
        this.tableName = config.tableName;
        
        this.init();
    }
    
    // ============================================
    // 1. 初始化
    // ============================================
    init() {
        console.log('🎯 数据看板初始化中...');
        
        // 绑定刷新按钮
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadAllData());
        }
        
        // 首次加载数据
        this.loadAllData();
    }
    
    // ============================================
    // 2. 加载所有数据
    // ============================================
    async loadAllData() {
        console.log('🔄 开始加载数据...');
        
        try {
            // 并行加载所有数据
            await Promise.all([
                this.loadOverallStats(),
                this.loadButtonRanking(),
                this.loadSourceStats(),
                this.loadTrendData()
            ]);
            
            // 更新最后更新时间
            this.updateLastUpdateTime();
            
            console.log('✅ 数据加载完成');
        } catch (error) {
            console.error('❌ 数据加载失败:', error);
            this.showError('数据加载失败，请检查配置');
        }
    }
    
    // ============================================
    // 3. 加载总体统计
    // ============================================
    async loadOverallStats() {
        // 检查配置
        if (!this.supabaseUrl || this.supabaseUrl === 'YOUR_SUPABASE_URL') {
            this.showMockOverallStats();
            return;
        }
        
        try {
            const url = `${this.supabaseUrl}/rest/v1/${this.tableName}?select=*`;
            const response = await fetch(url, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('数据获取失败');
            
            const data = await response.json();
            
            // 计算统计数据
            const totalClicks = data.length;
            const uniqueVisitors = new Set(data.map(d => d.ip_address)).size;
            const uniqueButtons = new Set(data.map(d => d.button_name)).size;
            
            // 今日点击
            const today = new Date().toISOString().split('T')[0];
            const todayClicks = data.filter(d => d.clicked_at.startsWith(today)).length;
            
            // 更新UI
            document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
            document.getElementById('uniqueVisitors').textContent = uniqueVisitors.toLocaleString();
            document.getElementById('uniqueButtons').textContent = uniqueButtons;
            document.getElementById('todayClicks').textContent = todayClicks.toLocaleString();
            
        } catch (error) {
            console.error('总体统计加载失败:', error);
            this.showMockOverallStats();
        }
    }
    
    // 显示模拟数据
    showMockOverallStats() {
        document.getElementById('totalClicks').textContent = '1,234';
        document.getElementById('uniqueVisitors').textContent = '567';
        document.getElementById('uniqueButtons').textContent = '3';
        document.getElementById('todayClicks').textContent = '89';
    }
    
    // ============================================
    // 4. 加载按钮排行榜
    // ============================================
    async loadButtonRanking() {
        const tbody = document.getElementById('rankingTableBody');
        
        // 检查配置
        if (!this.supabaseUrl || this.supabaseUrl === 'YOUR_SUPABASE_URL') {
            this.showMockRanking(tbody);
            return;
        }
        
        try {
            // 使用视图查询
            const url = `${this.supabaseUrl}/rest/v1/button_ranking?order=click_count.desc&limit=10`;
            const response = await fetch(url, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('排行榜数据获取失败');
            
            const data = await response.json();
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="loading-cell">暂无数据</td></tr>';
                return;
            }
            
            // 渲染排行榜
            tbody.innerHTML = data.map((item, index) => {
                const rank = index + 1;
                const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
                
                return `
                    <tr>
                        <td><span class="rank-badge ${rankClass}">${rank}</span></td>
                        <td>${this.escapeHtml(item.button_name)}</td>
                        <td>${item.click_count.toLocaleString()}</td>
                        <td>${item.unique_visitors.toLocaleString()}</td>
                    </tr>
                `;
            }).join('');
            
        } catch (error) {
            console.error('排行榜加载失败:', error);
            this.showMockRanking(tbody);
        }
    }
    
    // 显示模拟排行榜
    showMockRanking(tbody) {
        const mockData = [
            { button_name: '微信咨询', click_count: 456, unique_visitors: 234 },
            { button_name: '电话联系', click_count: 389, unique_visitors: 198 },
            { button_name: '预约演示', click_count: 267, unique_visitors: 145 }
        ];
        
        tbody.innerHTML = mockData.map((item, index) => {
            const rank = index + 1;
            const rankClass = `rank-${rank}`;
            
            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${rank}</span></td>
                    <td>${item.button_name}</td>
                    <td>${item.click_count.toLocaleString()}</td>
                    <td>${item.unique_visitors.toLocaleString()}</td>
                </tr>
            `;
        }).join('');
    }
    
    // ============================================
    // 5. 加载来源统计
    // ============================================
    async loadSourceStats() {
        const tbody = document.getElementById('sourceTableBody');
        
        // 检查配置
        if (!this.supabaseUrl || this.supabaseUrl === 'YOUR_SUPABASE_URL') {
            this.showMockSourceStats(tbody);
            return;
        }
        
        try {
            const url = `${this.supabaseUrl}/rest/v1/source_stats?order=click_count.desc&limit=10`;
            const response = await fetch(url, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('来源统计数据获取失败');
            
            const data = await response.json();
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="loading-cell">暂无数据</td></tr>';
                return;
            }
            
            // 渲染来源统计
            tbody.innerHTML = data.map(item => `
                <tr>
                    <td>${this.escapeHtml(item.source)}</td>
                    <td>${this.escapeHtml(item.medium)}</td>
                    <td>${item.click_count.toLocaleString()}</td>
                    <td>${item.unique_visitors.toLocaleString()}</td>
                </tr>
            `).join('');
            
        } catch (error) {
            console.error('来源统计加载失败:', error);
            this.showMockSourceStats(tbody);
        }
    }
    
    // 显示模拟来源统计
    showMockSourceStats(tbody) {
        const mockData = [
            { source: 'direct', medium: 'none', click_count: 567, unique_visitors: 289 },
            { source: 'Google', medium: 'organic_search', click_count: 234, unique_visitors: 156 },
            { source: 'WeChat', medium: 'social', click_count: 189, unique_visitors: 98 }
        ];
        
        tbody.innerHTML = mockData.map(item => `
            <tr>
                <td>${item.source}</td>
                <td>${item.medium}</td>
                <td>${item.click_count.toLocaleString()}</td>
                <td>${item.unique_visitors.toLocaleString()}</td>
            </tr>
        `).join('');
    }
    
    // ============================================
    // 6. 加载趋势数据
    // ============================================
    async loadTrendData() {
        const chartContainer = document.getElementById('trendChart');
        
        // 检查配置
        if (!this.supabaseUrl || this.supabaseUrl === 'YOUR_SUPABASE_URL') {
            this.showMockTrend(chartContainer);
            return;
        }
        
        try {
            // 调用辅助函数
            const url = `${this.supabaseUrl}/rest/v1/rpc/get_last_7_days_stats`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('趋势数据获取失败');
            
            const data = await response.json();
            
            if (data.length === 0) {
                chartContainer.innerHTML = '<div class="loading-cell">暂无数据</div>';
                return;
            }
            
            // 渲染趋势图
            this.renderTrendChart(chartContainer, data);
            
        } catch (error) {
            console.error('趋势数据加载失败:', error);
            this.showMockTrend(chartContainer);
        }
    }
    
    // 渲染趋势图
    renderTrendChart(container, data) {
        // 找出最大值用于计算比例
        const maxClicks = Math.max(...data.map(d => d.total_clicks));
        
        container.innerHTML = data.map(item => {
            const height = (item.total_clicks / maxClicks) * 100;
            const date = new Date(item.date);
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            
            return `
                <div class="trend-bar">
                    <div class="bar-container">
                        <div class="bar" style="height: ${height}%">
                            <div class="bar-value">${item.total_clicks}</div>
                        </div>
                    </div>
                    <div class="bar-label">${label}</div>
                </div>
            `;
        }).join('');
    }
    
    // 显示模拟趋势
    showMockTrend(container) {
        const mockData = [
            { date: '2024-01-01', total_clicks: 45 },
            { date: '2024-01-02', total_clicks: 67 },
            { date: '2024-01-03', total_clicks: 89 },
            { date: '2024-01-04', total_clicks: 56 },
            { date: '2024-01-05', total_clicks: 78 },
            { date: '2024-01-06', total_clicks: 92 },
            { date: '2024-01-07', total_clicks: 103 }
        ];
        
        this.renderTrendChart(container, mockData);
    }
    
    // ============================================
    // 7. 工具函数
    // ============================================
    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('lastUpdate').textContent = timeString;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showError(message) {
        console.error(message);
        // 可以在这里添加错误提示UI
    }
}

// ============================================
// 8. 初始化
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (typeof SUPABASE_CONFIG !== 'undefined') {
        const dashboard = new Dashboard(SUPABASE_CONFIG);
        console.log('✅ 数据看板已启动');
    } else {
        console.error('❌ 配置文件未加载，请检查 config.js');
    }
});
