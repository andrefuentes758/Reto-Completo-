class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartCount();
    this.renderCartItems();
  }

  loadCart() {
    const saved = localStorage.getItem('supertienda_cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('supertienda_cart', JSON.stringify(this.items));
  }

  addItem(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = this.items.find(i => i.id === productId);
    const totalQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    if (totalQuantity > product.stock) {
      alert(`No hay suficiente stock de ${product.name}`);
      return;
    }

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }

    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
  }

  getTotalItems() {
    return this.items.reduce((t, i) => t + i.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((t, i) => t + i.price * i.quantity, 0);
  }

  updateCartCount() {
    const cartCountSpan = document.getElementById('cartCount');
    if (cartCountSpan) cartCountSpan.textContent = this.getTotalItems();
  }

  renderCartItems() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = "<p>Tu carrito está vacío</p>";
      this.updateCartSummary();
      return;
    }

    container.innerHTML = this.items.map(i => `
      <div class="cart-item">
        <img src="${i.image}" width="50">
        <span>${i.name} x${i.quantity}</span>
        <span>$${i.price * i.quantity}</span>
        <button onclick="cart.removeItem(${i.id})">Eliminar</button>
      </div>
    `).join('');

    this.updateCartSummary();
  }

  updateCartSummary() {
    const subtotal = this.getTotalPrice();
    const envio = subtotal > 0 ? 10000 : 0;
    const total = subtotal + envio;

    const subtotalSpan = document.getElementById('subtotal');
    const envioSpan = document.getElementById('envio');
    const totalSpan = document.getElementById('total');

    if (subtotalSpan) subtotalSpan.textContent = `$${subtotal}`;
    if (envioSpan) envioSpan.textContent = `$${envio}`;
    if (totalSpan) totalSpan.textContent = `$${total}`;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
    this.renderCartItems();
  }
}

const cart = new ShoppingCart();

function addToCart(id) {
  cart.addItem(id);
}

function mostrarCarrito() {
  const cartSection = document.getElementById('cartSection');
  if (cartSection) {
    cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
  }
}

function checkout() {
  if (cart.items.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  window.location.href = "checkout.html";
}
