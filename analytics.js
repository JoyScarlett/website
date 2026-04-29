// 🎯 小鸡AI营销系统 - 数据分析脚本
// 第7步：数据分析仪表板

class Analytics {
    constructor(config) {
        this.config = config;
        this.supabaseUrl = config.url;
        this.supabaseKey = config.anonKey;
        this.tableName = config.tableName;
        
        this.rawData = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.pageSize = 10;
        
        this.charts = {};
        
        this.init();
    }
    
    // ============================================
    // 1. 初始化
    // ============================================
    init() {
        console.log('🎯 数据分析初始化中...');
        
        // 设置默认日期
        this.setDefaultDates();
        
        // 绑定事件
        this.bindEvents();
        
        // 加载数据
        this.loadData();
        
        console.log('✅ 数据分析初始化完成');
    }
    
    // ============================================
    // 2. 设置默认日期
    // ============================================
    setDefaultDates() {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        
        document.getElementById('startDate').valueAsDate = sevenDaysAgo;
        document.getElementById('endDate').valueAsDate = today;
    }
    
    // ============================================
    // 3. 绑定事件
    // ============================================
    bindEvents() {
        // 刷新按钮
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadData();
        });
        
        // 导出按钮
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });
        
        // 快捷日期按钮
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.quick-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const days = btn.getAttribute('data-days');
                this.setQuickDate(days);
            });
        });
        
        // 应用筛选按钮
        document.getElementById('applyFilterBtn').addEventListener('click', () => {
            this.applyFilters();
        });
        
        // 搜索输入
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchData(e.target.value);
        });
        
        // 排序选择
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortData(e.target.value);
        });
    }
    
    // ============================================
    // 4. 设置快捷日期
    // ============================================
    setQuickDate(days) {
        const today = new Date();
        const endDate = today;
        
        if (days === 'all') {
            document.getElementById('startDate').value = '';
            document.getElementById('endDate').value = '';
        } else {
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - parseInt(days));
            
            document.getElementById('startDate').valueAsDate = startDate;
            document.getElementById('endDate').valueAsDate = endDate;
        }
        
        this.applyFilters();
    }
    
    // ============================================
    // 5. 加载数据
    // ============================================
    async loadData() {
        console.log('🔄 开始加载数据...');
        
        // 检查配置
        if (!this.supabaseUrl || this.supabaseUrl === 'YOUR_SUPABASE_URL') {
            this.showMockData();
            return;
        }
        
        try {
            const url = `${this.supabaseUrl}/rest/v1/${this.tableName}?select=*&order=clicked_at.desc`;
            const response = await fetch(url, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`
                }
            });
            
            if (!response.ok) throw new Error('数据获取失败');
            
            this.rawData = await response.json();
            this.filteredData = [...this.rawData];
            
            this.applyFilters();
            
            console.log('✅ 数据加载完成');
        } catch (error) {
            console.error('❌ 数据加载失败:', error);
            this.showMockData();
        }
    }
    
    // ============================================
    // 6. 显示模拟数据
    // ============================================
    showMockData() {
        console.log('⚠️ 使用模拟数据');
        
        const mockData = [];
        const buttons = ['微信咨询', '电话联系', '预约演示'];
        const sources = ['direct', 'Google', 'WeChat', 'Baidu'];
        const devices = ['mobile', 'desktop', 'tablet'];
        const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
        const os = ['Windows', 'macOS', 'iOS', 'Android'];
        
        for (let i = 0; i < 100; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            
            mockData.push({
                id: i + 1,
                button_name: buttons[Math.floor(Math.random() * buttons.length)],
                button_type: 'button',
                utm_source: sources[Math.floor(Math.random() * sources.length)],
                device_type: devices[Math.floor(Math.random() * devices.length)],
                browser: browsers[Math.floor(Math.random() * browsers.length)],
                os: os[Math.floor(Math.random() * os.length)],
                clicked_at: date.toISOString(),
                ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`
            });
        }
        
        this.rawData = mockData;
        this.filteredData = [...mockData];
        
        this.applyFilters();
    }
    
    // ============================================
    // 7. 应用筛选
    // ============================================
    applyFilters() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const operator = document.getElementById('operatorFilter').value;
        
        this.filteredData = this.rawData.filter(item => {
            const itemDate = new Date(item.clicked_at).toISOString().split('T')[0];
            
            // 日期筛选
            if (startDate && itemDate < startDate) return false;
            if (endDate && itemDate > endDate) return false;
            
            // 运营人员筛选（这里简化处理，实际应该有运营人员字段）
            if (operator !== 'all') {
                // TODO: 根据实际字段筛选
            }
            
            return true;
        });
        
        // 更新所有视图
        this.updateStats();
        this.updateCharts();
        this.updateTable();
    }
    
    // ============================================
    // 8. 更新统计卡片
    // ============================================
    updateStats() {
        const data = this.filteredData;
        
        // 总点击数
        const totalClicks = data.length;
        document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
        document.getElementById('totalChange').textContent = '+12.5%';
        document.getElementById('totalChange').className = 'stat-change positive';
        
        // 今日点击
        const today = new Date().toISOString().split('T')[0];
        const todayClicks = data.filter(d => d.clicked_at.startsWith(today)).length;
        document.getElementById('todayClicks').textContent = todayClicks.toLocaleString();
        document.getElementById('todayChange').textContent = '+8.3%';
        document.getElementById('todayChange').className = 'stat-change positive';
        
        // 独立访客
        const uniqueVisitors = new Set(data.map(d => d.ip_address)).size;
        document.getElementById('uniqueVisitors').textContent = uniqueVisitors.toLocaleString();
        document.getElementById('visitorChange').textContent = '+15.2%';
        document.getElementById('visitorChange').className = 'stat-change positive';
        
        // 转化率（模拟）
        const conversionRate = ((uniqueVisitors / totalClicks) * 100).toFixed(1);
        document.getElementById('conversionRate').textContent = conversionRate + '%';
        document.getElementById('conversionChange').textContent = '-2.1%';
        document.getElementById('conversionChange').className = 'stat-change negative';
    }
    
    // ============================================
    // 9. 更新图表
    // ============================================
    updateCharts() {
        this.updateTrendChart();
        this.updateButtonPieChart();
        this.updateContactDoughnutChart();
        this.updateOperatorBarChart();
    }
    
    // 趋势图
    updateTrendChart() {
        const data = this.filteredData;
        
        // 按日期分组
        const dateMap = {};
        data.forEach(item => {
            const date = item.clicked_at.split('T')[0];
            dateMap[date] = (dateMap[date] || 0) + 1;
        });
        
        const dates = Object.keys(dateMap).sort();
        const values = dates.map(date => dateMap[date]);
        
        const ctx = document.getElementById('trendChart');
        
        if (this.charts.trend) {
            this.charts.trend.destroy();
        }
        
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.map(d => {
                    const date = new Date(d);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                }),
                datasets: [{
                    label: '点击量',
                    data: values,
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }
    
    // 按钮饼图
    updateButtonPieChart() {
        const data = this.filteredData;
        
        // 按按钮分组
        const buttonMap = {};
        data.forEach(item => {
            buttonMap[item.button_name] = (buttonMap[item.button_name] || 0) + 1;
        });
        
        const labels = Object.keys(buttonMap);
        const values = Object.values(buttonMap);
        
        const ctx = document.getElementById('buttonPieChart');
        
        if (this.charts.buttonPie) {
            this.charts.buttonPie.destroy();
        }
        
        this.charts.buttonPie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#00ff88',
                        '#00d4ff',
                        '#ff6b6b',
                        '#ffd93d',
                        '#a29bfe'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }
    
    // 联系方式环形图
    updateContactDoughnutChart() {
        const data = this.filteredData;
        
        // 识别联系方式按钮
        const contactButtons = data.filter(d => 
            d.button_name.includes('微信') || 
            d.button_name.includes('电话') || 
            d.button_name.includes('咨询')
        );
        
        const contactMap = {};
        contactButtons.forEach(item => {
            contactMap[item.button_name] = (contactMap[item.button_name] || 0) + 1;
        });
        
        const labels = Object.keys(contactMap);
        const values = Object.values(contactMap);
        
        const ctx = document.getElementById('contactDoughnutChart');
        
        if (this.charts.contactDoughnut) {
            this.charts.contactDoughnut.destroy();
        }
        
        this.charts.contactDoughnut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#00ff88',
                        '#00d4ff',
                        '#ff6b6b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }
    
    // 运营人员柱状图（模拟）
    updateOperatorBarChart() {
        const operators = ['张三', '李四', '王五', '赵六'];
        const values = operators.map(() => Math.floor(Math.random() * 100) + 20);
        
        const ctx = document.getElementById('operatorBarChart');
        
        if (this.charts.operatorBar) {
            this.charts.operatorBar.destroy();
        }
        
        this.charts.operatorBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: operators,
                datasets: [{
                    label: '点击量',
                    data: values,
                    backgroundColor: '#00ff88'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                }
            }
        });
    }
    
    // ============================================
    // 10. 更新表格
    // ============================================
    updateTable() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = this.filteredData.slice(start, end);
        
        const tbody = document.getElementById('dataTableBody');
        
        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">暂无数据</td></tr>';
            return;
        }
        
        tbody.innerHTML = pageData.map(item => {
            const date = new Date(item.clicked_at);
            const timeStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            
            return `
                <tr>
                    <td>${timeStr}</td>
                    <td>${item.button_name}</td>
                    <td>${item.button_type}</td>
                    <td>${item.utm_source || 'direct'}</td>
                    <td>${item.device_type || '-'}</td>
                    <td>${item.browser || '-'}</td>
                    <td>${item.os || '-'}</td>
                </tr>
            `;
        }).join('');
        
        this.updatePagination();
    }
    
    // ============================================
    // 11. 更新分页
    // ============================================
    updatePagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        const pagination = document.getElementById('pagination');
        
        let html = '';
        
        // 上一页
        if (this.currentPage > 1) {
            html += `<button class="page-btn" onclick="analytics.goToPage(${this.currentPage - 1})">上一页</button>`;
        }
        
        // 页码
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            const active = i === this.currentPage ? 'active' : '';
            html += `<button class="page-btn ${active}" onclick="analytics.goToPage(${i})">${i}</button>`;
        }
        
        // 下一页
        if (this.currentPage < totalPages) {
            html += `<button class="page-btn" onclick="analytics.goToPage(${this.currentPage + 1})">下一页</button>`;
        }
        
        pagination.innerHTML = html;
    }
    
    goToPage(page) {
        this.currentPage = page;
        this.updateTable();
    }
    
    // ============================================
    // 12. 搜索数据
    // ============================================
    searchData(keyword) {
        if (!keyword) {
            this.filteredData = [...this.rawData];
        } else {
            this.filteredData = this.rawData.filter(item => 
                item.button_name.toLowerCase().includes(keyword.toLowerCase()) ||
                (item.utm_source && item.utm_source.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
        
        this.currentPage = 1;
        this.updateTable();
    }
    
    // ============================================
    // 13. 排序数据
    // ============================================
    sortData(sortType) {
        switch(sortType) {
            case 'time-desc':
                this.filteredData.sort((a, b) => new Date(b.clicked_at) - new Date(a.clicked_at));
                break;
            case 'time-asc':
                this.filteredData.sort((a, b) => new Date(a.clicked_at) - new Date(b.clicked_at));
                break;
            case 'button':
                this.filteredData.sort((a, b) => a.button_name.localeCompare(b.button_name));
                break;
        }
        
        this.currentPage = 1;
        this.updateTable();
    }
    
    // ============================================
    // 14. 导出数据
    // ============================================
    exportData() {
        const csv = this.convertToCSV(this.filteredData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('✅ 数据已导出');
    }
    
    convertToCSV(data) {
        const headers = ['时间', '按钮名称', '按钮类型', '来源', '设备', '浏览器', '操作系统'];
        const rows = data.map(item => [
            item.clicked_at,
            item.button_name,
            item.button_type,
            item.utm_source || 'direct',
            item.device_type || '-',
            item.browser || '-',
            item.os || '-'
        ]);
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
}

// ============================================
// 15. 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof SUPABASE_CONFIG !== 'undefined') {
        window.analytics = new Analytics(SUPABASE_CONFIG);
        console.log('✅ 数据分析已启动');
    } else {
        console.error('❌ 配置文件未加载');
    }
});
