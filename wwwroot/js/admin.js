// ============================================
// ADMIN - PANADERÍA ARTESANAL CON GRÁFICAS
// ============================================

const logoImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI2Q0Yjg5NiIvPgo8cGF0aCBkPSJNMzIgMTJWMzJMMzggMzgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5jam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPg==';

// Variables globales
let salesChart = null;
let ordersChart = null;
let productsChart = null;
let products = [];
let orders = [];

// Inicializar datos
function initData() {
    products = [
        {
            id: 'P001',
            nombre: 'Pan Artesanal Integral',
            categoria: 'Panes',
            precio: 180000,
            descripcion: 'Pan integral recién horneado con semillas de girasol y lino',
            stock: 45,
            imagen: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?w=400',
            disponible: true
        },
        {
            id: 'P002',
            nombre: 'Croissants de Mantequilla',
            categoria: 'Pastelería',
            precio: 140000,
            descripcion: 'Croissants hojaldrados con mantequilla francesa premium',
            stock: 32,
            imagen: 'https://images.unsplash.com/photo-1636294153307-e38cbf295a87?w=400',
            disponible: true
        },
        {
            id: 'P003',
            nombre: 'Pan de Masa Madre',
            categoria: 'Panes',
            precio: 260000,
            descripcion: 'Pan de masa madre con fermentación de 24 horas',
            stock: 28,
            imagen: 'https://images.unsplash.com/photo-1624323209995-b617d99ce390?w=400',
            disponible: true
        },
        {
            id: 'P004',
            nombre: 'Pastel de Chocolate',
            categoria: 'Pasteles',
            precio: 1120000,
            descripcion: 'Delicioso pastel de chocolate con ganache suave',
            stock: 8,
            imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
            disponible: true
        },
        {
            id: 'P005',
            nombre: 'Galletas Surtidas',
            categoria: 'Galletas',
            precio: 340000,
            descripcion: 'Caja de galletas artesanales surtidas (12 unidades)',
            stock: 25,
            imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
            disponible: true
        },
        {
            id: 'P006',
            nombre: 'Donas Glaseadas',
            categoria: 'Donas',
            precio: 100000,
            descripcion: 'Donas esponjosas con glaseado de colores (unidad)',
            stock: 42,
            imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
            disponible: true
        }
    ];

    orders = [
        {
            id: 'PED-001',
            cliente: 'María González',
            telefono: '555-0101',
            productos: [
                { nombre: 'Pan Artesanal Integral', cantidad: 3, precio: 180000 },
                { nombre: 'Croissants de Mantequilla', cantidad: 6, precio: 140000 }
            ],
            total: 1380000,
            estado: 'Entregado',
            fecha: '2025-11-19',
            hora: '08:30',
            metodoPago: 'Efectivo'
        },
        {
            id: 'PED-002',
            cliente: 'Juan Pérez',
            telefono: '555-0102',
            productos: [
                { nombre: 'Pan de Masa Madre', cantidad: 2, precio: 260000 },
                { nombre: 'Galletas Surtidas', cantidad: 1, precio: 340000 }
            ],
            total: 860000,
            estado: 'En preparación',
            fecha: '2025-11-19',
            hora: '09:15',
            metodoPago: 'Tarjeta'
        },
        {
            id: 'PED-003',
            cliente: 'Ana Martínez',
            telefono: '555-0103',
            productos: [
                { nombre: 'Pastel de Chocolate', cantidad: 1, precio: 1120000 },
                { nombre: 'Donas Glaseadas', cantidad: 12, precio: 100000 }
            ],
            total: 2320000,
            estado: 'Listo',
            fecha: '2025-11-19',
            hora: '10:00',
            metodoPago: 'Transferencia'
        },
        {
            id: 'PED-004',
            cliente: 'Carlos Ruiz',
            telefono: '555-0104',
            productos: [
                { nombre: 'Croissants de Mantequilla', cantidad: 4, precio: 140000 },
                { nombre: 'Pan Artesanal Integral', cantidad: 2, precio: 180000 }
            ],
            total: 920000,
            estado: 'Pendiente',
            fecha: '2025-11-19',
            hora: '10:30',
            metodoPago: 'Efectivo'
        },
        {
            id: 'PED-005',
            cliente: 'Laura Silva',
            telefono: '555-0105',
            productos: [
                { nombre: 'Galletas Surtidas', cantidad: 2, precio: 340000 },
                { nombre: 'Donas Glaseadas', cantidad: 10, precio: 100000 }
            ],
            total: 1680000,
            estado: 'En preparación',
            fecha: '2025-11-19',
            hora: '11:00',
            metodoPago: 'Tarjeta'
        }
    ];
}

// Utilidades
function formatCurrency(amount) {
    return `$ ${amount.toLocaleString('es-CO')} COP`;
}

function getStatusColor(status) {
    switch(status) {
        case 'Pendiente': return 'badge-gray';
        case 'En preparación': return 'badge-primary';
        case 'Listo': return 'badge-blue';
        case 'Entregado': return 'badge-success';
        case 'Cancelado': return 'badge-danger';
        default: return 'badge-gray';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function logout() {
    window.location.href = '/LoginMvc/Index';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    initData();
    
    document.getElementById('logo-img').src = logoImage;
    document.getElementById('admin-name').textContent = currentUser.name;
    
    switchTab('dashboard');
});

function switchTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    event?.target?.closest('.nav-tab')?.classList.add('active');
    
    const content = document.getElementById('admin-content');
    
    switch(tab) {
        case 'dashboard':
            content.innerHTML = renderDashboard();
            initCharts();
            break;
        case 'catalog':
            content.innerHTML = renderCatalog();
            break;
        case 'orders':
            content.innerHTML = renderOrders();
            break;
    }
}

// ============================================
// DASHBOARD CON GRÁFICAS
// ============================================

function renderDashboard() {
    const lowStockItems = [
        { nombre: 'Harina Integral', stock: 15, unidad: 'kg', minimo: 50 },
        { nombre: 'Mantequilla', stock: 8, unidad: 'kg', minimo: 20 },
        { nombre: 'Levadura', stock: 3, unidad: 'kg', minimo: 10 }
    ];
    
    return `
        <div class="space-y-6">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="card card-primary">
                    <div class="card-header flex justify-between items-center pb-2">
                        <div class="text-sm" style="color: rgba(10,14,26,0.8);">Ventas Hoy</div>
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <div class="card-content">
                        <div class="text-3xl" style="color: #0a0e1a;">$40,050,000 COP</div>
                        <p class="text-xs mt-1" style="color: rgba(10,14,26,0.8);">+23.5% vs ayer</p>
                    </div>
                </div>
                
                <div class="card shadow-lg">
                    <div class="card-header flex justify-between items-center pb-2">
                        <div class="text-sm text-muted">Pedidos Hoy</div>
                        <svg class="icon" style="color: var(--primary);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </div>
                    <div class="card-content">
                        <div class="text-3xl">${orders.length}</div>
                        <p class="text-xs text-muted mt-1">Total pedidos</p>
                    </div>
                </div>
                
                <div class="card shadow-lg">
                    <div class="card-header flex justify-between items-center pb-2">
                        <div class="text-sm text-muted">Productos</div>
                        <svg class="icon" style="color: var(--primary);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                    </div>
                    <div class="card-content">
                        <div class="text-3xl">${products.length}</div>
                        <p class="text-xs text-muted mt-1">En catálogo activo</p>
                    </div>
                </div>
                
                <div class="card shadow-lg">
                    <div class="card-header flex justify-between items-center pb-2">
                        <div class="text-sm text-muted">Ticket Promedio</div>
                        <svg class="icon" style="color: var(--primary);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                        </svg>
                    </div>
                    <div class="card-content">
                        <div class="text-3xl">$100</div>
                        <p class="text-xs text-muted mt-1">+8% esta semana</p>
                    </div>
                </div>
            </div>
            
            <!-- Gráficas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Ventas de la Semana</h3>
                    </div>
                    <div class="card-content">
                        <div class="chart-container">
                            <canvas id="salesChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Distribución de Ventas por Producto</h3>
                    </div>
                    <div class="card-content">
                        <div class="chart-container">
                            <canvas id="productsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card shadow-lg">
                <div class="card-header">
                    <h3 class="card-title">Pedidos por Día</h3>
                </div>
                <div class="card-content">
                    <div class="chart-container">
                        <canvas id="ordersChart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Pedidos Recientes y Stock Bajo -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card shadow-lg">
                    <div class="card-header">
                        <h3 class="card-title">Pedidos Recientes</h3>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${orders.slice(0, 5).map(order => `
                                <div class="p-3 rounded-lg border" style="background-color: var(--secondary);">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <p><strong>${order.id}</strong></p>
                                            <p class="text-sm text-muted">${order.cliente}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-primary">${formatCurrency(order.total)}</p>
                                            <span class="badge ${getStatusColor(order.estado)}">${order.estado}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-lg" style="background-color: #0a0e1a; border-color: var(--primary);">
                    <div class="card-header">
                        <h3 class="card-title flex items-center gap-2" style="color: var(--primary);">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            Alertas de Stock Bajo
                        </h3>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${lowStockItems.map(item => `
                                <div class="p-3 rounded-lg" style="background-color: var(--secondary); border: 1px solid var(--primary);">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <p>${item.nombre}</p>
                                            <p class="text-sm text-muted">Mínimo: ${item.minimo} ${item.unidad}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-red">${item.stock} ${item.unidad}</p>
                                            <span class="text-xs text-red">¡Reabastecer!</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initCharts() {
    if (salesChart) salesChart.destroy();
    if (ordersChart) ordersChart.destroy();
    if (productsChart) productsChart.destroy();
    
    const colors = {
        primary: '#d4b896',
        secondary: '#b89968',
        tertiary: '#8a7a5e',
        background: '#0a0e1a',
        text: '#e8dcc8'
    };
    
    const salesData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Ventas ($)',
            data: [20250000, 23400000, 21600000, 27450000, 33750000, 40050000, 32400000],
            borderColor: colors.primary,
            backgroundColor: 'rgba(212, 184, 150, 0.1)',
            tension: 0.4,
            fill: true,
            borderWidth: 3
        }]
    };
    
    const ordersData = {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Pedidos',
            data: [45, 52, 48, 61, 75, 89, 72],
            backgroundColor: colors.primary,
            borderRadius: 8
        }]
    };
    
    const productData = {
        labels: ['Pan Artesanal', 'Croissants', 'Pasteles', 'Galletas', 'Donas'],
        datasets: [{
            data: [35, 25, 20, 12, 8],
            backgroundColor: [
                colors.primary,
                colors.secondary,
                colors.tertiary,
                '#e8dcc8',
                '#c4a876'
            ],
            borderWidth: 0
        }]
    };
    
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: colors.text,
                    font: { size: 12 }
                }
            },
            tooltip: {
                backgroundColor: '#121827',
                titleColor: colors.text,
                bodyColor: colors.text,
                borderColor: colors.primary,
                borderWidth: 1
            }
        },
        scales: {
            y: {
                ticks: { color: colors.text },
                grid: { color: 'rgba(212, 184, 150, 0.1)' }
            },
            x: {
                ticks: { color: colors.text },
                grid: { color: 'rgba(212, 184, 150, 0.1)' }
            }
        }
    };
    
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        salesChart = new Chart(salesCtx, {
            type: 'line',
            data: salesData,
            options: commonOptions
        });
    }
    
    const ordersCtx = document.getElementById('ordersChart');
    if (ordersCtx) {
        ordersChart = new Chart(ordersCtx, {
            type: 'bar',
            data: ordersData,
            options: commonOptions
        });
    }
    
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
        productsChart = new Chart(productsCtx, {
            type: 'doughnut',
            data: productData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: colors.text,
                            font: { size: 11 },
                            padding: 10
                        }
                    },
                    tooltip: {
                        backgroundColor: '#121827',
                        titleColor: colors.text,
                        bodyColor: colors.text,
                        borderColor: colors.primary,
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ============================================
// CATÁLOGO DE PRODUCTOS
// ============================================

function renderCatalog() {
    return `
        <div class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div>
                    <h2>Catálogo de Productos</h2>
                    <p class="text-muted">Gestiona tus productos de panadería</p>
                </div>
                <button class="btn btn-primary" onclick="openAddProductModal()">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Agregar Producto
                </button>
            </div>
            
            <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
                ${products.map(product => `
                    <div class="card overflow-hidden shadow-lg transition-all" style="height: fit-content;">
                        <div style="aspect-ratio: 1; overflow: hidden; background-color: var(--muted);">
                            <img src="${product.imagen}" alt="${product.nombre}" 
                                 class="w-full h-full object-cover product-image" 
                                 onerror="this.src='https://via.placeholder.com/150?text=Sin+Imagen'" />
                        </div>
                        <div class="p-2">
                            <h4 style="font-size: 0.75rem; margin-bottom: 0.25rem; line-height: 1.2;">${product.nombre}</h4>
                            <span class="badge badge-primary" style="font-size: 0.625rem; padding: 0.125rem 0.375rem;">${product.categoria}</span>
                            <p class="text-primary" style="font-size: 0.875rem; margin-top: 0.375rem;">${formatCurrency(product.precio)}</p>
                            <p class="text-sm text-muted" style="margin-top: 0.25rem; font-size: 0.625rem;">
                                Stock: <span class="${product.stock < 10 ? 'text-red' : 'text-green'}">${product.stock}</span>
                            </p>
                            <div class="flex gap-1" style="margin-top: 0.5rem;">
                                <button class="btn btn-outline btn-sm flex-1" style="border-color: var(--primary); color: var(--primary); padding: 0.25rem; font-size: 0.625rem;" onclick="openEditProductModal('${product.id}')">
                                    <svg class="icon" style="width: 0.75rem; height: 0.75rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                </button>
                                <button class="btn btn-outline btn-sm" style="border-color: #fca5a5; color: #ef4444; padding: 0.25rem; font-size: 0.625rem;" onclick="deleteProduct('${product.id}')">
                                    <svg class="icon" style="width: 0.75rem; height: 0.75rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Modal Agregar/Editar Producto -->
        <div id="product-modal" class="modal">
            <div class="modal-backdrop" onclick="closeProductModal()"></div>
            <div class="modal-content">
                <button class="close-btn" onclick="closeProductModal()">&times;</button>
                <div class="modal-header">
                    <h3 class="modal-title" id="product-modal-title">Agregar Producto</h3>
                </div>
                <div class="modal-body">
                    <form id="product-form" onsubmit="saveProduct(event)" class="space-y-4">
                        <input type="hidden" id="product-id" />
                        
                        <div class="input-group">
                            <label>Nombre del Producto</label>
                            <input type="text" id="product-name" class="input" required />
                        </div>
                        
                        <div class="input-group">
                            <label>Categoría</label>
                            <select id="product-category" class="input" required>
                                <option value="">Seleccionar</option>
                                <option value="Panes">Panes</option>
                                <option value="Pastelería">Pastelería</option>
                                <option value="Pasteles">Pasteles</option>
                                <option value="Galletas">Galletas</option>
                                <option value="Donas">Donas</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="input-group">
                                <label>Precio (COP)</label>
                                <input type="number" id="product-price" class="input" required />
                            </div>
                            <div class="input-group">
                                <label>Stock</label>
                                <input type="number" id="product-stock" class="input" required />
                            </div>
                        </div>
                        
                        <div class="input-group">
                            <label>Descripción</label>
                            <textarea id="product-description" class="textarea" rows="3" required></textarea>
                        </div>
                        
                        <div class="input-group">
                            <label>URL de Imagen</label>
                            <input type="url" id="product-image" class="input" required />
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block">Guardar Producto</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function openAddProductModal() {
    document.getElementById('product-modal-title').textContent = 'Agregar Producto';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal').classList.add('active');
}

function openEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('product-modal-title').textContent = 'Editar Producto';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.nombre;
    document.getElementById('product-category').value = product.categoria;
    document.getElementById('product-price').value = product.precio;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.descripcion;
    document.getElementById('product-image').value = product.imagen;
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function saveProduct(event) {
    event.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const productData = {
        nombre: document.getElementById('product-name').value,
        categoria: document.getElementById('product-category').value,
        precio: parseInt(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        descripcion: document.getElementById('product-description').value,
        imagen: document.getElementById('product-image').value,
        disponible: true
    };
    
    if (productId) {
        // Editar
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showToast('Producto actualizado correctamente');
        }
    } else {
        // Agregar
        const newId = 'P' + String(products.length + 1).padStart(3, '0');
        products.push({ id: newId, ...productData });
        showToast('Producto agregado correctamente');
    }
    
    closeProductModal();
    switchTab('catalog');
}

function deleteProduct(productId) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        showToast('Producto eliminado correctamente');
        switchTab('catalog');
    }
}

// ============================================
// GESTIÓN DE PEDIDOS
// ============================================

function renderOrders() {
    return `
        <div class="space-y-6">
            <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div>
                    <h2>Gestión de Pedidos</h2>
                    <p class="text-muted">Administra y monitorea todos los pedidos</p>
                </div>
                <button class="btn btn-primary" onclick="openAddOrderModal()">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Nuevo Pedido
                </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                ${[
                    { label: 'Todos', count: orders.length },
                    { label: 'Pendiente', count: orders.filter(o => o.estado === 'Pendiente').length },
                    { label: 'En preparación', count: orders.filter(o => o.estado === 'En preparación').length },
                    { label: 'Listo', count: orders.filter(o => o.estado === 'Listo').length },
                    { label: 'Entregado', count: orders.filter(o => o.estado === 'Entregado').length }
                ].map(stat => `
                    <div class="card shadow-lg">
                        <div class="card-content pt-6 text-center">
                            <div class="text-3xl">${stat.count}</div>
                            <p class="text-sm text-muted mt-1">${stat.label}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="card shadow-lg">
                <div class="card-header">
                    <h3 class="card-title">Pedidos</h3>
                </div>
                <div class="card-content">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Teléfono</th>
                                    <th>Fecha/Hora</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orders.map(order => `
                                    <tr>
                                        <td style="font-family: monospace;">${order.id}</td>
                                        <td>${order.cliente}</td>
                                        <td class="text-muted">${order.telefono}</td>
                                        <td class="text-muted">
                                            <div class="text-sm">
                                                <div>${order.fecha}</div>
                                                <div class="text-xs text-muted">${order.hora}</div>
                                            </div>
                                        </td>
                                        <td>${formatCurrency(order.total)}</td>
                                        <td>
                                            <span class="badge ${getStatusColor(order.estado)}">${order.estado}</span>
                                        </td>
                                        <td>
                                            <button class="btn btn-outline btn-sm" style="border-color: var(--primary); color: var(--primary);" onclick="openOrderDetailsModal('${order.id}')">
                                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                                                </svg>
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal Agregar Pedido -->
        <div id="order-add-modal" class="modal">
            <div class="modal-backdrop" onclick="closeAddOrderModal()"></div>
            <div class="modal-content">
                <button class="close-btn" onclick="closeAddOrderModal()">&times;</button>
                <div class="modal-header">
                    <h3 class="modal-title">Crear Nuevo Pedido</h3>
                </div>
                <div class="modal-body">
                    <form id="order-form" onsubmit="saveOrder(event)" class="space-y-4">
                        <div class="input-group">
                            <label>Nombre del Cliente</label>
                            <input type="text" id="order-customer" class="input" required />
                        </div>
                        
                        <div class="input-group">
                            <label>Teléfono</label>
                            <input type="tel" id="order-phone" class="input" required />
                        </div>
                        
                        <div class="input-group">
                            <label>Método de Pago</label>
                            <select id="order-payment" class="input" required>
                                <option value="">Seleccionar</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </div>
                        
                        <div class="input-group">
                            <label>Productos</label>
                            <div id="order-products-list" class="space-y-2"></div>
                            <button type="button" class="btn btn-outline btn-sm" style="border-color: var(--primary); color: var(--primary); margin-top: 0.5rem;" onclick="addProductToOrder()">
                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                                Agregar Producto
                            </button>
                        </div>
                        
                        <div class="pt-4 border-t">
                            <div class="flex justify-between items-center">
                                <span><strong>Total:</strong></span>
                                <span class="text-2xl text-primary" id="order-total">$ 0 COP</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-block">Crear Pedido</button>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Modal Detalles del Pedido -->
        <div id="order-details-modal" class="modal">
            <div class="modal-backdrop" onclick="closeOrderDetailsModal()"></div>
            <div class="modal-content">
                <button class="close-btn" onclick="closeOrderDetailsModal()">&times;</button>
                <div class="modal-header">
                    <h3 class="modal-title">Detalles del Pedido</h3>
                </div>
                <div class="modal-body" id="order-details-content"></div>
            </div>
        </div>
    `;
}

function openAddOrderModal() {
    document.getElementById('order-add-modal').classList.add('active');
}

function closeAddOrderModal() {
    document.getElementById('order-add-modal').classList.remove('active');
}

function saveOrder(event) {
    event.preventDefault();
    
    // Recopilar productos seleccionados
    const productsList = document.getElementById('order-products-list');
    const selectedProducts = [];
    let total = 0;
    
    productsList.querySelectorAll('.flex.justify-between.items-center').forEach(item => {
        const select = item.querySelector('select');
        const quantityInput = item.querySelector('input');
        const productId = select.value;
        const quantity = parseInt(quantityInput.value);
        
        const product = products.find(p => p.id === productId);
        
        if (product && quantity > 0) {
            selectedProducts.push({
                nombre: product.nombre,
                cantidad: quantity,
                precio: product.precio
            });
            total += product.precio * quantity;
        }
    });
    
    if (selectedProducts.length === 0) {
        alert('Por favor agrega al menos un producto al pedido');
        return;
    }
    
    const newOrder = {
        id: 'PED-' + String(orders.length + 1).padStart(3, '0'),
        cliente: document.getElementById('order-customer').value,
        telefono: document.getElementById('order-phone').value,
        productos: selectedProducts,
        total: total,
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        metodoPago: document.getElementById('order-payment').value
    };
    
    orders.push(newOrder);
    showToast('Pedido creado correctamente');
    closeAddOrderModal();
    switchTab('orders');
}

function openOrderDetailsModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const content = document.getElementById('order-details-content');
    content.innerHTML = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4 p-4 rounded-lg" style="background-color: var(--secondary);">
                <div>
                    <p class="text-sm text-muted">Cliente</p>
                    <p>${order.cliente}</p>
                </div>
                <div>
                    <p class="text-sm text-muted">Teléfono</p>
                    <p>${order.telefono}</p>
                </div>
                <div>
                    <p class="text-sm text-muted">Fecha</p>
                    <p>${order.fecha} ${order.hora}</p>
                </div>
                <div>
                    <p class="text-sm text-muted">Método de Pago</p>
                    <p>${order.metodoPago}</p>
                </div>
            </div>
            
            <div class="input-group">
                <label>Cambiar Estado del Pedido</label>
                <select id="order-status-select" class="input" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="Pendiente" ${order.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="En preparación" ${order.estado === 'En preparación' ? 'selected' : ''}>En preparación</option>
                    <option value="Listo" ${order.estado === 'Listo' ? 'selected' : ''}>Listo</option>
                    <option value="Entregado" ${order.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
                    <option value="Cancelado" ${order.estado === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                </select>
            </div>
            
            <div>
                <p class="mb-2"><strong>Productos</strong></p>
                <div class="space-y-2">
                    ${order.productos.map(producto => `
                        <div class="flex justify-between items-center p-3 rounded-lg border" style="background-color: var(--card);">
                            <div>
                                <p>${producto.nombre}</p>
                                <p class="text-sm text-muted">Cantidad: ${producto.cantidad}</p>
                            </div>
                            <p class="text-primary">${formatCurrency(producto.precio * producto.cantidad)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="pt-4 border-t">
                <div class="flex justify-between items-center">
                    <span><strong>Total</strong></span>
                    <span class="text-2xl text-primary">${formatCurrency(order.total)}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('order-details-modal').classList.add('active');
}

function closeOrderDetailsModal() {
    document.getElementById('order-details-modal').classList.remove('active');
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.estado = newStatus;
        showToast(`Estado actualizado a: ${newStatus}`);
        // Actualizar la tabla de pedidos
        switchTab('orders');
    }
}

function addProductToOrder() {
    const productSelect = document.createElement('select');
    productSelect.className = 'input';
    productSelect.innerHTML = `
        <option value="">Seleccionar producto</option>
        ${products.map(product => `
            <option value="${product.id}">${product.nombre} - ${formatCurrency(product.precio)}</option>
        `).join('')}
    `;
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'input';
    quantityInput.min = '1';
    quantityInput.value = '1';
    
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-outline btn-sm';
    removeButton.style.borderColor = '#fca5a5';
    removeButton.style.color = '#ef4444';
    removeButton.style.padding = '0.25rem';
    removeButton.style.fontSize = '0.625rem';
    removeButton.innerHTML = `
        <svg class="icon" style="width: 0.75rem; height: 0.75rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
    `;
    removeButton.onclick = function() {
        productSelect.remove();
        quantityInput.remove();
        removeButton.remove();
        updateOrderTotal();
    };
    
    const productItem = document.createElement('div');
    productItem.className = 'flex justify-between items-center';
    productItem.appendChild(productSelect);
    productItem.appendChild(quantityInput);
    productItem.appendChild(removeButton);
    
    document.getElementById('order-products-list').appendChild(productItem);
    
    productSelect.onchange = updateOrderTotal;
    quantityInput.onchange = updateOrderTotal;
}

function updateOrderTotal() {
    const productsList = document.getElementById('order-products-list');
    let total = 0;
    
    productsList.querySelectorAll('select').forEach(select => {
        const productId = select.value;
        const quantity = parseInt(select.nextElementSibling.value);
        const product = products.find(p => p.id === productId);
        
        if (product && quantity > 0) {
            total += product.precio * quantity;
        }
    });
    
    document.getElementById('order-total').textContent = formatCurrency(total);
}