// ============================================
// CUSTOMER - PANADERÍA ARTESANAL
// ============================================

const logoImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI2Q0Yjg5NiIvPgo8cGF0aCBkPSJNMzIgMTJWMzJMMzggMzgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5jam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMTgiIHN0cm9rZT0iIzBhMGUxYSIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPg==';

let cart = [];
let customerOrders = [];
let searchTerm = '';
let selectedCategory = 'Todos';
let currentView = 'shop'; // 'shop' o 'orders' o 'payment'
let products = []; // Ahora será cargado desde localStorage
let paymentMethods = []; // Métodos de pago del cliente

// ============================================
// FUNCIONES DE SINCRONIZACIÓN CON LOCALSTORAGE
// ============================================

// Cargar productos desde localStorage
function loadProducts() {
    const savedProducts = localStorage.getItem('panaderia_products');
    if (savedProducts) {
        return JSON.parse(savedProducts);
    }
    // Productos por defecto si no hay guardados
    return [
        {
            id: 'P001',
            nombre: 'Pan Artesanal Integral',
            categoria: 'Panes',
            precio: 180000,
            descripcion: 'Pan integral recién horneado con semillas de girasol y lino',
            imagen: 'https://images.unsplash.com/photo-1555932450-31a8aec2adf1?w=400',
            disponible: true,
            stock: 45
        },
        {
            id: 'P002',
            nombre: 'Croissants de Mantequilla',
            categoria: 'Pastelería',
            precio: 140000,
            descripcion: 'Croissants hojaldrados con mantequilla francesa premium',
            imagen: 'https://images.unsplash.com/photo-1636294153307-e38cbf295a87?w=400',
            disponible: true,
            stock: 32
        },
        {
            id: 'P003',
            nombre: 'Pan de Masa Madre',
            categoria: 'Panes',
            precio: 260000,
            descripcion: 'Pan de masa madre con fermentación de 24 horas',
            imagen: 'https://images.unsplash.com/photo-1624323209995-b617d99ce390?w=400',
            disponible: true,
            stock: 28
        },
        {
            id: 'P004',
            nombre: 'Pastel de Chocolate',
            categoria: 'Pasteles',
            precio: 1120000,
            descripcion: 'Delicioso pastel de chocolate con ganache suave',
            imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
            disponible: true,
            stock: 8
        },
        {
            id: 'P005',
            nombre: 'Galletas Surtidas',
            categoria: 'Galletas',
            precio: 340000,
            descripcion: 'Caja de galletas artesanales surtidas (12 unidades)',
            imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
            disponible: true,
            stock: 25
        },
        {
            id: 'P006',
            nombre: 'Donas Glaseadas',
            categoria: 'Donas',
            precio: 100000,
            descripcion: 'Donas esponjosas con glaseado de colores (unidad)',
            imagen: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
            disponible: true,
            stock: 42
        }
    ];
}

// Cargar pedidos desde localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('panaderia_orders');
    if (savedOrders) {
        // Filtrar solo los pedidos del cliente actual
        const allOrders = JSON.parse(savedOrders);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return allOrders.filter(order => order.cliente === currentUser.name || order.customerId === currentUser.email);
    }
    return [];
}

// Guardar pedido en localStorage (agregarlo a la lista general)
function saveOrder(newOrder) {
    const savedOrders = localStorage.getItem('panaderia_orders');
    let orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(newOrder);
    localStorage.setItem('panaderia_orders', JSON.stringify(orders));
}

// Actualizar pedido en localStorage
function updateOrderInStorage(orderId, updatedOrder) {
    const savedOrders = localStorage.getItem('panaderia_orders');
    let orders = savedOrders ? JSON.parse(savedOrders) : [];
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
        orders[index] = updatedOrder;
        localStorage.setItem('panaderia_orders', JSON.stringify(orders));
    }
}

// Cargar métodos de pago desde localStorage
function loadPaymentMethods() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const key = `panaderia_payment_${currentUser.email}`;
    const savedMethods = localStorage.getItem(key);
    if (savedMethods) {
        return JSON.parse(savedMethods);
    }
    return [];
}

// Guardar métodos de pago en localStorage
function savePaymentMethods() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const key = `panaderia_payment_${currentUser.email}`;
    localStorage.setItem(key, JSON.stringify(paymentMethods));
}

// Inicializar pedidos de ejemplo
customerOrders = loadOrders();

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
        case 'Cancelación en proceso': return 'badge-warning';
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
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    badge.textContent = totalItems;
    
    if (totalItems === 0) {
        badge.classList.add('hidden');
    } else {
        badge.classList.remove('hidden');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        cart.push({ ...product, cantidad: 1 });
    }
    
    updateCartBadge();
    showToast('Producto agregado al carrito');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        renderCart();
    }
}

function renderCart() {
    const body = document.getElementById('cart-body');
    
    if (cart.length === 0) {
        body.innerHTML = `
            <div class="empty-state">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p class="text-muted">Tu carrito está vacío</p>
                <p class="text-sm text-muted mt-2">Agrega productos para comenzar</p>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    body.innerHTML = `
        <div class="space-y-3">
            ${cart.map((item, index) => `
                <div class="flex gap-3 p-3 rounded-lg border" style="background-color: var(--secondary);">
                    <div style="width: 80px; height: 80px; flex-shrink: 0; border-radius: var(--radius); overflow: hidden; background-color: var(--muted);">
                        <img src="${item.imagen}" alt="${item.nombre}" 
                             style="width: 100%; height: 100%; object-fit: cover;" 
                             onerror="this.src='https://via.placeholder.com/80?text=No+Image'" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="truncate">${item.nombre}</h4>
                        <p class="text-sm text-muted">${formatCurrency(item.precio)} c/u</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button class="btn btn-outline btn-sm" onclick="updateQuantity(${index}, -1)" style="width: 28px; height: 28px; padding: 0;">
                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <span class="text-sm" style="width: 32px; text-align: center;">${item.cantidad}</span>
                            <button class="btn btn-outline btn-sm" onclick="updateQuantity(${index}, 1)" style="width: 28px; height: 28px; padding: 0;">
                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col items-end justify-between" style="flex-direction: column;">
                        <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${index})" style="color: #ef4444; width: 28px; height: 28px; padding: 0;">
                            <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                        <p class="text-primary">${formatCurrency(item.precio * item.cantidad)}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="pt-4 border-t space-y-3 mt-4">
            <div class="flex justify-between items-center">
                <span>Subtotal:</span>
                <span>${formatCurrency(total)}</span>
            </div>
            <div class="flex justify-between items-center text-sm">
                <span class="text-muted">Envío:</span>
                <span style="color: #166534;">Gratis</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t">
                <span>Total:</span>
                <span class="text-2xl text-primary">${formatCurrency(total)}</span>
            </div>
            <button class="btn btn-primary btn-block" onclick="checkout()">
                Confirmar Pedido
            </button>
        </div>
    `;
}

function updateQuantity(index, delta) {
    cart[index].cantidad += delta;
    if (cart[index].cantidad <= 0) {
        cart.splice(index, 1);
    }
    updateCartBadge();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartBadge();
    renderCart();
}

function checkout() {
    if (cart.length === 0) return;
    
    // Crear nuevo pedido
    const newOrder = {
        id: 'PED-' + String(customerOrders.length + 1).padStart(3, '0'),
        productos: cart.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio
        })),
        total: cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        estado: 'Pendiente',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        cancelacionSolicitada: false,
        cliente: JSON.parse(localStorage.getItem('currentUser')).name,
        customerId: JSON.parse(localStorage.getItem('currentUser')).email
    };
    
    customerOrders.push(newOrder);
    saveOrder(newOrder);
    
    showToast('¡Pedido confirmado! Gracias por tu compra');
    cart = [];
    updateCartBadge();
    toggleCart();
}

function switchView(view) {
    currentView = view;
    renderView();
    
    // Actualizar tabs activos
    document.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
    event?.target?.closest('.view-tab')?.classList.add('active');
}

function renderView() {
    const content = document.getElementById('customer-content');
    
    if (currentView === 'shop') {
        renderShop();
    } else if (currentView === 'orders') {
        renderOrders();
    } else if (currentView === 'payment') {
        renderPayment();
    }
}

function renderShop() {
    const content = document.getElementById('customer-content');
    
    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || product.categoria === selectedCategory;
        return matchesSearch && matchesCategory && product.disponible;
    });
    
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Welcome Banner -->
            <div class="card card-primary shadow-lg">
                <div class="card-content pt-6">
                    <h2 style="color: var(--primary-foreground); margin-bottom: 0.5rem;">
                        ¡Bienvenido, ${JSON.parse(localStorage.getItem('currentUser')).name}!
                    </h2>
                    <p style="color: rgba(10, 14, 26, 0.8);">Explora nuestros productos frescos del día</p>
                </div>
            </div>
            
            <!-- Buscador y Filtros -->
            <div class="card shadow-lg">
                <div class="card-content">
                    <div class="search-filter-container">
                        <!-- Buscador -->
                        <div class="search-box">
                            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="text" 
                                   class="input search-input" 
                                   placeholder="Buscar productos..." 
                                   value="${searchTerm}"
                                   oninput="updateSearch(this.value)" />
                        </div>
                        
                        <!-- Filtros de Categoría -->
                        <div class="category-filters">
                            ${['Todos', 'Panes', 'Pastelería', 'Pasteles', 'Galletas', 'Donas'].map(cat => `
                                <button class="category-btn ${selectedCategory === cat ? 'active' : ''}" 
                                        onclick="updateCategory('${cat}')">
                                    ${cat}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Products Grid -->
            ${filteredProducts.length > 0 ? `
                <div class="grid grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
                    ${filteredProducts.map(product => `
                        <div class="card overflow-hidden shadow-lg transition-all">
                            <div class="aspect-video overflow-hidden" style="background-color: var(--muted);">
                                <img src="${product.imagen}" alt="${product.nombre}" 
                                     class="w-full h-full object-cover product-image" 
                                     onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'" />
                            </div>
                            <div class="card-header pb-3">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <h4 class="card-title">${product.nombre}</h4>
                                        <span class="badge badge-primary mt-1">${product.categoria}</span>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-2xl text-primary">${formatCurrency(product.precio)}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-content">
                                <p class="text-sm text-muted mb-3">${product.descripcion}</p>
                                <button class="btn btn-primary btn-block" onclick="addToCart('${product.id}')">
                                    <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                    </svg>
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="card shadow-lg">
                    <div class="card-content">
                        <div class="empty-state">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            <p class="text-muted">No se encontraron productos</p>
                            <p class="text-sm text-muted mt-2">Intenta con otra búsqueda o categoría</p>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

function updateSearch(value) {
    searchTerm = value;
    renderShop();
}

function updateCategory(category) {
    selectedCategory = category;
    renderShop();
}

function renderOrders() {
    const content = document.getElementById('customer-content');
    // Recargar pedidos para tener los datos más actuales
    customerOrders = loadOrders();
    
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="card card-primary shadow-lg">
                <div class="card-content pt-6">
                    <h2 style="color: var(--primary-foreground); margin-bottom: 0.5rem;">
                        Mis Pedidos
                    </h2>
                    <p style="color: rgba(10, 14, 26, 0.8);">Revisa el estado de tus pedidos y gestiona tus pagos</p>
                </div>
            </div>
            
            <!-- Orders List -->
            ${customerOrders.length > 0 ? `
                <div class="space-y-4">
                    ${customerOrders.map(order => `
                        <div class="card shadow-lg">
                            <div class="card-content">
                                <div class="order-header">
                                    <div>
                                        <h4 class="card-title">${order.id}</h4>
                                        <p class="text-sm text-muted">${order.fecha} - ${order.hora}</p>
                                        ${order.metodoPago ? `
                                            <div class="flex items-center gap-2 mt-2">
                                                <svg class="icon icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                                                </svg>
                                                <span class="text-sm" style="color: var(--primary);">${order.metodoPago}</span>
                                                ${order.pagado ? `<span class="badge badge-success">Pagado</span>` : `<span class="badge badge-warning">Pendiente de Pago</span>`}
                                            </div>
                                        ` : ''}
                                    </div>
                                    <span class="badge ${getStatusColor(order.estado)}">${order.estado}</span>
                                </div>
                                
                                <div class="order-products mt-4">
                                    ${order.productos.map(prod => `
                                        <div class="order-product-item">
                                            <div>
                                                <p>${prod.nombre}</p>
                                                <p class="text-sm text-muted">Cantidad: ${prod.cantidad}</p>
                                            </div>
                                            <p class="text-primary">${formatCurrency(prod.precio * prod.cantidad)}</p>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="order-footer">
                                    <div class="order-total">
                                        <span>Total:</span>
                                        <span class="text-2xl text-primary">${formatCurrency(order.total)}</span>
                                    </div>
                                    
                                    <div class="flex gap-2 items-center">
                                        ${order.estado !== 'Entregado' && order.estado !== 'Cancelado' && !order.pagado && paymentMethods.length > 0 && !order.metodoPago ? `
                                            <button class="btn btn-primary btn-sm" onclick="showPaymentModal('${order.id}')">
                                                <svg class="icon icon-sm" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                                                </svg>
                                                Pagar
                                            </button>
                                        ` : ''}
                                        ${order.estado !== 'Entregado' && order.estado !== 'Cancelado' ? `
                                            ${!order.cancelacionSolicitada ? `
                                                <button class="btn btn-outline btn-sm cancel-btn" onclick="requestCancellation('${order.id}')">
                                                    Solicitar Cancelación
                                                </button>
                                            ` : `
                                                <div class="cancellation-status">
                                                    <svg class="icon icon-sm" style="color: #f59e0b;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                                    </svg>
                                                    <span class="text-sm" style="color: #f59e0b;">Cancelación en proceso...</span>
                                                </div>
                                            `}
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="card shadow-lg">
                    <div class="card-content">
                        <div class="empty-state">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
                            </svg>
                            <p class="text-muted">No tienes pedidos</p>
                            <p class="text-sm text-muted mt-2">Cuando realices un pedido, aparecerá aquí</p>
                        </div>
                    </div>
                </div>
            `}
        </div>
    `;
}

function showPaymentModal(orderId) {
    const order = customerOrders.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closePaymentModal()"></div>
        <div class="modal-content">
            <button class="close-btn" onclick="closePaymentModal()">&times;</button>
            <div class="modal-header">
                <h3 class="modal-title">Seleccionar Método de Pago</h3>
                <p class="modal-description">Pedido: ${order.id} - Total: ${formatCurrency(order.total)}</p>
            </div>
            <div class="modal-body">
                <div class="space-y-3">
                    ${paymentMethods.map((method, index) => `
                        <div class="card" style="cursor: pointer; transition: all 0.2s;" onclick="selectPaymentMethod('${orderId}', ${index})">
                            <div class="card-content">
                                <div class="flex items-center gap-3">
                                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        ${method.tipo === 'Tarjeta' ? 
                                            '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>' :
                                            method.tipo === 'Nequi' ?
                                            '<path d="M21 10c0-5-3-7-9-7s-9 2-9 7v2c0 2.5 1.5 5 9 5s9-2.5 9-5v-2z"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/>' :
                                            '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5h-2.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H17"/>'
                                        }
                                    </svg>
                                    <div>
                                        <h4>${method.nombre}</h4>
                                        <p class="text-sm text-muted">${method.detalles}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.remove();
    }
}

function selectPaymentMethod(orderId, methodIndex) {
    const order = customerOrders.find(o => o.id === orderId);
    const method = paymentMethods[methodIndex];
    
    if (!order || !method) return;
    
    // Actualizar el pedido con el método de pago
    order.metodoPago = `${method.tipo} - ${method.detalles}`;
    order.pagado = true;
    
    // Actualizar en localStorage
    updateOrderInStorage(orderId, order);
    
    closePaymentModal();
    showToast(`Pago realizado exitosamente con ${method.tipo}`);
    renderOrders();
}

function requestCancellation(orderId) {
    const order = customerOrders.find(o => o.id === orderId);
    if (order) {
        order.cancelacionSolicitada = true;
        showToast('Solicitud de cancelación enviada. Será procesada en breve.');
        renderOrders();
        
        // Simular procesamiento de cancelación
        setTimeout(() => {
            order.estado = 'Cancelado';
            showToast('Tu pedido ha sido cancelado exitosamente');
            renderOrders();
        }, 3000);
    }
}

function renderPayment() {
    const content = document.getElementById('customer-content');
    
    content.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="card card-primary shadow-lg">
                <div class="card-content pt-6">
                    <h2 style="color: var(--primary-foreground); margin-bottom: 0.5rem;">
                        Métodos de Pago
                    </h2>
                    <p style="color: rgba(10, 14, 26, 0.8);">Administra tus métodos de pago para futuras compras</p>
                </div>
            </div>
            
            <!-- Add Payment Method Form -->
            <div class="card shadow-lg">
                <div class="card-header">
                    <h3 class="card-title">Agregar Método de Pago</h3>
                    <p class="text-sm text-muted">Selecciona el tipo de pago</p>
                </div>
                <div class="card-content">
                    <div class="space-y-4">
                        <div>
                            <label class="label">Tipo de Pago</label>
                            <select id="payment-type" class="input" onchange="updatePaymentForm()">
                                <option value="">Seleccionar...</option>
                                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                                <option value="nequi">Nequi</option>
                                <option value="efectivo">Efectivo</option>
                            </select>
                        </div>
                        
                        <div id="payment-form-container"></div>
                        
                        <button class="btn btn-primary btn-block" onclick="savePaymentMethod()">
                            Guardar Método de Pago
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Payment Methods List -->
            ${paymentMethods.length > 0 ? `
                <div>
                    <h3 class="text-lg mb-4">Mis Métodos de Pago</h3>
                    <div class="space-y-4">
                        ${paymentMethods.map((method, index) => `
                            <div class="card shadow-lg">
                                <div class="card-content">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <div class="flex items-center gap-2 mb-2">
                                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    ${method.tipo === 'Tarjeta' ? 
                                                        '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>' :
                                                        method.tipo === 'Nequi' ?
                                                        '<path d="M21 10c0-5-3-7-9-7s-9 2-9 7v2c0 2.5 1.5 5 9 5s9-2.5 9-5v-2z"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/>' :
                                                        '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5h-2.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H17"/>'
                                                    }
                                                </svg>
                                                <h4 class="card-title">${method.nombre}</h4>
                                            </div>
                                            <p class="text-sm text-muted">${method.tipo}</p>
                                            <p class="text-sm mt-2">${method.detalles}</p>
                                        </div>
                                        <div class="flex gap-2">
                                            <button class="btn btn-outline btn-sm" onclick="deletePaymentMethod(${index})" style="color: #ef4444;">
                                                <svg class="icon" style="width: 1rem; height: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function updatePaymentForm() {
    const type = document.getElementById('payment-type').value;
    const container = document.getElementById('payment-form-container');
    
    if (!type) {
        container.innerHTML = '';
        return;
    }
    
    if (type === 'tarjeta') {
        container.innerHTML = `
            <div class="space-y-3">
                <div>
                    <label class="label">Nombre del Titular</label>
                    <input type="text" id="card-holder" class="input" placeholder="Nombre completo" />
                </div>
                <div>
                    <label class="label">Número de Tarjeta</label>
                    <input type="text" id="card-number" class="input" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCardNumber(this)" />
                </div>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label class="label">Fecha de Expiración</label>
                        <input type="text" id="card-expiry" class="input" placeholder="MM/AA" maxlength="5" oninput="formatExpiry(this)" />
                    </div>
                    <div>
                        <label class="label">CVV</label>
                        <input type="text" id="card-cvv" class="input" placeholder="123" maxlength="3" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'nequi') {
        container.innerHTML = `
            <div class="space-y-3">
                <div>
                    <label class="label">Número de Teléfono Nequi</label>
                    <input type="tel" id="nequi-phone" class="input" placeholder="3001234567" maxlength="10" oninput="this.value=this.value.replace(/[^0-9]/g,'')" />
                </div>
                <div>
                    <label class="label">Nombre del Titular</label>
                    <input type="text" id="nequi-holder" class="input" placeholder="Nombre completo" />
                </div>
            </div>
        `;
    } else if (type === 'efectivo') {
        container.innerHTML = `
            <div class="space-y-3">
                <div class="p-4 rounded-lg" style="background-color: var(--secondary);">
                    <p class="text-sm text-muted">El pago en efectivo se realizará al momento de la entrega del pedido.</p>
                </div>
            </div>
        `;
    }
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\//g, '').replace(/[^0-9]/g, '');
    if (value.length >= 2) {
        input.value = value.slice(0, 2) + '/' + value.slice(2, 4);
    } else {
        input.value = value;
    }
}

function savePaymentMethod() {
    const type = document.getElementById('payment-type').value;
    
    if (!type) {
        showToast('Por favor selecciona un tipo de pago');
        return;
    }
    
    let method = {};
    
    if (type === 'tarjeta') {
        const holder = document.getElementById('card-holder').value.trim();
        const number = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('card-expiry').value.trim();
        const cvv = document.getElementById('card-cvv').value.trim();
        
        if (!holder || !number || !expiry || !cvv) {
            showToast('Por favor completa todos los campos');
            return;
        }
        
        if (number.replace(/\s/g, '').length !== 16) {
            showToast('Número de tarjeta inválido');
            return;
        }
        
        if (cvv.length !== 3) {
            showToast('CVV inválido');
            return;
        }
        
        method = {
            id: 'PM-' + Date.now(),
            tipo: 'Tarjeta',
            nombre: holder,
            detalles: `**** **** **** ${number.slice(-4)}`,
            expiry: expiry
        };
    } else if (type === 'nequi') {
        const phone = document.getElementById('nequi-phone').value.trim();
        const holder = document.getElementById('nequi-holder').value.trim();
        
        if (!phone || !holder) {
            showToast('Por favor completa todos los campos');
            return;
        }
        
        if (phone.length !== 10) {
            showToast('Número de teléfono inválido');
            return;
        }
        
        method = {
            id: 'PM-' + Date.now(),
            tipo: 'Nequi',
            nombre: holder,
            detalles: `Nequi ${phone}`
        };
    } else if (type === 'efectivo') {
        method = {
            id: 'PM-' + Date.now(),
            tipo: 'Efectivo',
            nombre: 'Pago en Efectivo',
            detalles: 'Pago contra entrega'
        };
    }
    
    paymentMethods.push(method);
    savePaymentMethods();
    
    showToast('Método de pago guardado exitosamente');
    
    // Limpiar formulario
    document.getElementById('payment-type').value = '';
    document.getElementById('payment-form-container').innerHTML = '';
    
    renderPayment();
}

function deletePaymentMethod(index) {
    if (confirm('¿Estás seguro de eliminar este método de pago?')) {
        paymentMethods.splice(index, 1);
        savePaymentMethods();
        showToast('Método de pago eliminado');
        renderPayment();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'customer') {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('logo-img').src = logoImage;
    document.getElementById('customer-name').textContent = currentUser.name;
    
    // Cargar productos desde localStorage
    products = loadProducts();
    
    // Cargar métodos de pago desde localStorage
    paymentMethods = loadPaymentMethods();
    
    // Mostrar tienda por defecto
    switchView('shop');
    updateCartBadge();
});