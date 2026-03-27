const products = [
  { id: 1, name: "Jordan Retro 1 Cafés", price: 200000, originalPrice: 250000, category: "zapatos", image: "retro 1 cafes.jpg", description: "Tenis edición café", stock: 10 },
  { id: 2, name: "Jordan Retro 1 Sky", price: 320000, originalPrice: 350000, category: "zapatos", image: "jordan 1 sky.jpg", description: "Tenis edición cielo especial", stock: 8 },
  { id: 3, name: "Adidas Azules", price: 250000, originalPrice: 280000, category: "zapatos", image: "adidas.jpg", description: "Tenis Adidas azules", stock: 12 },
  { id: 4, name: "Jordan Retro 1 Pandas", price: 250000, originalPrice: 300000, category: "zapatos", image: "pandas.webp", description: "Tenis blanco y negro", stock: 15 },
  { id: 5, name: "Nike Air Marron", price: 280000, originalPrice: 320000, category: "zapatos", image: "retro 1 marron.jpg", description: "Clásicos y pintoso", stock: 10 },
  { id: 6, name: "Air Jordan 1 Low", price: 600000, originalPrice: 650000, category: "zapatos", image: "jordan.jpg", description: "Deportivas y cómodas", stock: 9 },
  { id: 7, name: "Miles Morales Retro 1", price: 220000, originalPrice: 250000, category: "zapatos", image: "retro 1 miles morales.jpg", description: "Diseño clásico y perfecto", stock: 7 },
  { id: 8, name: "Jordan Retro 1 Gris", price: 700000, originalPrice: 740000, category: "zapatos", image: "nike 2.webp", description: "Especial para fiestas elegantes", stock: 11 },
  { id: 9, name: "Jordan Retro 1 Perleadas", price: 300000, originalPrice: 350000, category: "zapatos", image: "jordanww.webp", description: "Ideal para fiestas", stock: 8 },
  { id: 10, name: "Jordan Retro 1 Rosadas", price: 200000, originalPrice: 250000, category: "zapatos", image: "jordanretro.webp", description: "Para darte un estilo cómodo y casual", stock: 16 },
  { id: 11, name: "Air Jordan Panda ", price: 250000, originalPrice: 300000, category: "zapatos", image: "jordanrretro.webp", description: "Ideal para tu estilo de día a día", stock: 17 },
  { id: 12, name: "Jordan Retro 1 Traviss Marrones", price: 300000, originalPrice: 440000, category: "zapatos", image: "airjordan.jpg", description: "Casual y cómodo todos los dias", stock: 3 }
];

function getAllProducts() { return products; }
function getProductById(id) { return products.find(p => p.id === parseInt(id)); }

function filterProducts(category = '', priceRange = '', searchTerm = '') {
  let filtered = products;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }
  return filtered;
}

function createProductCard(product) {
  return `
    <div class="producto">
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart(${product.id})">Agregar</button>
    </div>
  `;
}

function renderProducts(list) {
  const container = document.getElementById('productsGrid');
  if (container) container.innerHTML = list.map(p => createProductCard(p)).join('');
}
