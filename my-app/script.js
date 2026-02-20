window.addEventListener("DOMContentLoaded", () => {
  const allProducts = [
    { category: "カチューシャ", name: "ミニー 1", price: 1800, img: "acc1.png" },
    { category: "カチューシャ", name: "ミニー 2", price: 1800, img: "acc2.png" },
    { category: "カチューシャ", name: "ミニー 3", price: 2000, img: "acc3.png" },
    { category: "カチューシャ", name: "ミニー 4", price: 1600, img: "acc4.png" },
    { category: "カチューシャ", name: "ミニー 5", price: 1800, img: "acc5.png" },
    { category: "カチューシャ", name: "ミニー 6", price: 1800, img: "acc6.png" },
    { category: "カチューシャ", name: "ミニー 7", price: 2200, img: "acc7.png" },
    { category: "カチューシャ", name: "ミニー 8", price: 1800, img: "acc8.png" },
    { category: "カチューシャ", name: "ミニー 9", price: 1800, img: "acc9.png" },
    { category: "カチューシャ", name: "ミニー 10", price: 1800, img: "acc10.png" },
    { category: "カチューシャ", name: "ミニー 11", price: 1800, img: "acc11.png" },
    { category: "カチューシャ", name: "ミニー 12", price: 1800, img: "acc12.png" },
    { category: "ぬいぐるみ", name: "ミッキーぬい", price: 2500, img: "nui1.png" },
    { category: "キーホルダー", name: "ロゴキー", price: 800, img: "key1.png" }
  ];

  let currentCategoryItems = [];
  let currentProductIndex = 0;
  let count = 1;
  let cartItems = [];

  window.showMap = function() { switchView("view-map"); };

  window.showShelf = function(category) {
    currentCategoryItems = allProducts.filter(p => p.category === category);
    document.getElementById("shelf-title").textContent = category;
    renderShelf();
    switchView("view-shelf");
  };

  window.showDetail = function(index) {
    currentProductIndex = index;
    count = 1; updateDetailView();
    document.getElementById("view-detail").style.display = "flex";
  };

  window.backToShelf = function() { document.getElementById("view-detail").style.display = "none"; };

  function switchView(id) {
    document.querySelectorAll(".view").forEach(v => v.style.display = "none");
    document.getElementById(id).style.display = "block";
  }

  function renderShelf() {
    const grid = document.getElementById("shelf-items");
    grid.innerHTML = "";
    currentCategoryItems.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "shelf-item";
      div.innerHTML = `<img src="${item.img}" onerror="this.src='https://via.placeholder.com/60?text=IMG'"><p>${item.name}</p>`;
      div.onclick = () => window.showDetail(index);
      grid.appendChild(div);
    });
  }

  function updateDetailView() {
    const item = currentCategoryItems[currentProductIndex];
    document.getElementById("product-name").textContent = item.name;
    document.getElementById("product-price").textContent = item.price.toLocaleString();
    document.getElementById("product-img").src = item.img;
    document.getElementById("count").textContent = count;
  }

  document.getElementById("next-detail").onclick = () => {
    currentProductIndex = (currentProductIndex + 1) % currentCategoryItems.length;
    count = 1; updateDetailView();
  };
  document.getElementById("prev-detail").onclick = () => {
    currentProductIndex = (currentProductIndex - 1 + currentCategoryItems.length) % currentCategoryItems.length;
    count = 1; updateDetailView();
  };

  document.getElementById("plus").onclick = () => { count++; updateDetailView(); };
  document.getElementById("minus").onclick = () => { if(count > 1) { count--; updateDetailView(); } };

  document.getElementById("add-to-cart").onclick = () => {
    const item = currentCategoryItems[currentProductIndex];
    cartItems.push({ id: Date.now(), ...item, count: count });
    
    const msgEl = document.getElementById("detail-message");
    msgEl.textContent = "Added! ✨";
    const footerCart = document.querySelector(".footer-bar");
    footerCart.classList.add("cart-bounce");
    
    updateCartUI();

    setTimeout(() => {
      msgEl.textContent = "";
      footerCart.classList.remove("cart-bounce");
      window.backToShelf();
    }, 800);
  };

  function updateCartUI() {
    document.getElementById("cart-total").textContent = cartItems.reduce((s, i) => s + i.count, 0);
    document.getElementById("cart-price").textContent = cartItems.reduce((s, i) => s + (i.price * i.count), 0).toLocaleString();
    const listEl = document.getElementById("cart-items");
    listEl.innerHTML = "";
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.style.padding = "8px 0"; li.style.borderBottom = "1px solid #eee";
      li.innerHTML = `${item.name}×${item.count} <button onclick="removeItem(${item.id})" style="background:#ff4d4d; color:white; border:none; border-radius:4px; margin-left:10px; cursor:pointer;">削</button>`;
      listEl.appendChild(li);
    });
  }

  window.removeItem = (id) => { cartItems = cartItems.filter(i => i.id !== id); updateCartUI(); };

  document.getElementById("cart-status-btn").onclick = () => document.getElementById("cart-modal").style.display = "flex";
  document.getElementById("close-cart").onclick = () => document.getElementById("cart-modal").style.display = "none";
  document.getElementById("order-confirm").onclick = () => {
    if(cartItems.length === 0) return alert("カートが空です");
    document.getElementById("order-complete").style.display = "flex";
  };

  window.showMap();
});