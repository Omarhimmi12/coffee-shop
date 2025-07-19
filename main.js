const navbar = document.querySelector('.navbar');
const searchForm = document.querySelector('.search-form');
const cartItem = document.querySelector('.cart-items-container');

// Toggle navbar
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

// Toggle search
document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

// Toggle cart
document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

// Hide all on scroll
window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

// Optional: hide search form when clicking outside
document.addEventListener('click', (e) => {
  if (!searchForm.contains(e.target) && e.target.id !== 'search-btn') {
    searchForm.classList.remove('active');
  }
});


// Search bar 
document.getElementById("search-box").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const boxes = document.querySelectorAll(".products .box");

  boxes.forEach(box => {
    const title = box.querySelector("h3").innerText.toLowerCase();
    box.style.display = title.includes(keyword) ? "block" : "none";
  });
});

// About Us hover effect
const img = document.getElementById("hoverImg");
img.addEventListener("mouseenter", () => {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = "img/staff.jpg";
    img.style.opacity = 1;
  }, 150);
});
img.addEventListener("mouseleave", () => {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = "img/1.jpg";
    img.style.opacity = 1;
  }, 150);
});

// Show products with button
document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll("#product-container .box");
  const showMoreBtn = document.getElementById("show-more-products");
  let visibleCount = 3;

  boxes.forEach((box, index) => {
    box.style.display = index < visibleCount ? "block" : "none";
  });

  showMoreBtn.addEventListener("click", () => {
    visibleCount += 3;
    boxes.forEach((box, index) => {
      box.style.display = index < visibleCount ? "block" : "none";
    });
    if (visibleCount >= boxes.length) {
      showMoreBtn.style.display = "none";
    }
  });
});

// Cart system
const cartContainer = document.getElementById('cart-container');

// Load cart items
function loadCartItems() {
  const items = JSON.parse(localStorage.getItem('cart')) || [];
  let html = items.map(item => `
    <div class="cart-item">
      <span class="fas fa-times close-cart" onclick="removeItem('${item.name}')"></span>
      <img src="${item.img}" alt="">
      <div class="content">
        <h3>${item.name}</h3>
        <div class="price">${item.price}</div>
      </div>
    </div>`).join('');

  if (items.length > 0) {
    html += `<a href="#" class="btn" id="checkout-btn">Checkout now</a>`;
  } else {
    html += `<p class="text-center">Your cart is empty</p>`;
  }

  cartContainer.innerHTML = html;
  attachCheckoutHandler();
}

// Attach checkout click
function attachCheckoutHandler() {
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCheckoutModal();
    });
  }
}

function showCheckoutModal() {
  const items = JSON.parse(localStorage.getItem('cart')) || [];
  const modalBody = document.getElementById("checkout-modal-body");

  if (items.length === 0) {
    modalBody.innerHTML = `<p>Your cart is empty.</p>`;
  } else {
    let html = `<div class="table-responsive"><table class="table table-bordered">
    <thead>
      <tr>
        <th class="text-center"><h1>Image</h1></th>
        <th class="text-center"><h1>Product</h1></th>
        <th class="text-center"><h1>Price</h1></th>
      </tr>
    </thead>
    <tbody>`;

    items.forEach(item => {
      html += `
        <tr>
          <td><img src="${item.img}" width="80" height="80"></td>
          <td><h3>${item.name}</h3></td>
          <td><h3>${item.price}</h3></td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    modalBody.innerHTML = html;
  }

// Show the Bootstrap modal
const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
modal.show();

// Confirm order button
document.getElementById("final-checkout").onclick = () => {
  alert("✅ Thank you for your order!");
  localStorage.removeItem('cart');
  loadCartItems();
  modal.hide();
};
}


// Remove item from cart
function removeItem(name) {
  let items = JSON.parse(localStorage.getItem('cart')) || [];
  items = items.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(items));
  loadCartItems();
}

// Add to cart
document.querySelectorAll('.products .box').forEach(box => {
  box.querySelector('.btn').addEventListener('click', () => {
    const name = box.querySelector('h3').innerText;
    const price = box.querySelector('.price').innerHTML;
    const img = box.querySelector('img').getAttribute('src');
    const newItem = { name, price, img };

    let items = JSON.parse(localStorage.getItem('cart')) || [];

    // Prevent duplicates
    if (!items.some(item => item.name === name)) {
      items.push(newItem);
      localStorage.setItem('cart', JSON.stringify(items));
      loadCartItems();
    } else {
      alert("⚠️ Item already in cart!");
    }
  });
});

// Initial cart load
loadCartItems();

// FAQs toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains("active");

    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.display = "none";
    });

    if (!isOpen) {
      button.classList.add("active");
      answer.style.display = "block";
    }
  });
});


// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const options = {
  threshold: 0.2
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Remove if you want it only once
    }
  });
}, options);

reveals.forEach(section => {
  observer.observe(section);
});
