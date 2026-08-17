// Data Produk Dummy
const products = [
  { id: 1, name: 'Kopi Susu Pro', price: 18000 },
  { id: 2, name: 'Americano', price: 15000 },
  { id: 3, name: 'Roti Bakar', price: 12000 },
  { id: 4, name: 'Nasi Goreng', price: 25000 },
  { id: 5, name: 'Teh Manis', price: 5000 }
];

let cart = [];

// Tampilkan Daftar Produk
function renderProducts(items) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => addToCart(product.id);
    card.innerHTML = `
      <div class="product-title">${product.name}</div>
      <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
    `;
    grid.appendChild(card);
  });
}

// Tambah ke Keranjang
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartView();
}

// Update Tampilan Keranjang
function updateCartView() {
  const cartContainer = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="empty-msg">Keranjang masih kosong</p>';
    document.getElementById('subtotalText').innerText = 'Rp 0';
    document.getElementById('totalText').innerText = 'Rp 0';
    return;
  }

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div>
        <div><strong>${item.name}</strong></div>
        <small>${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</small>
      </div>
      <div>Rp ${itemTotal.toLocaleString('id-ID')}</div>
    `;
    cartContainer.appendChild(itemEl);
  });

  document.getElementById('subtotalText').innerText = `Rp ${total.toLocaleString('id-ID')}`;
  document.getElementById('totalText').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Fitur Pencarian
function searchProduct() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
}

// Fitur Checkout Sederhana
function checkout() {
  if (cart.length === 0) {
    alert('Keranjang masih kosong!');
    return;
  }
  alert('Transaksi Berhasil!');
  cart = [];
  updateCartView();
}

// Jalankan saat aplikasi dibuka
renderProducts(products);
