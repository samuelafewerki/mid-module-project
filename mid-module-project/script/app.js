/*
    app.js

*/

function generateCard(card) {
    let cardHTML = document.createElement('article');
    cardHTML.classList.add('product-card');
    const price = new Intl.NumberFormat(`en-US`, {
      currency: `USD`,
      style: "currency",
    }).format(card.price);
    const innerHTML = `
      <div class="sku-price">
        <div class="price">${price}</div>
      </div>
      <div class="product-name action" data-id="${card.productId}">${card.name}</div>
      <div class="product-image">
        <img src="${card.imageName}">
      </div>
      <div class="cart">
        <i class="fa-solid fa-cart-plus icon action" title="Add item to cart"></i>
      </div>
    `;
    cardHTML.innerHTML = innerHTML;
    return cardHTML;
  }
  
  function displayCards(filteredProducts = null) {
    let products = productService.getProducts();
    if (filteredProducts) {
      products = filteredProducts
    }
    
    let cardContainer = document.getElementById('product-cards');
    cardContainer.innerHTML = '';
    products.forEach(p => {
      let card = generateCard(p);
      cardContainer.appendChild(card);
  
      // Add event handlers for product name and cart icon
      const productName = card.querySelector('.product-name');
      productName.addEventListener("click", () => {
        alert(p.description);
      });
  
      const cartIcon = card.querySelector('.fa-cart-plus');
      cartIcon.addEventListener("click", () => {
        alert("Item added to the cart");
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    displayCards();

    const searchBar = document.getElementById('search-bar');
  searchBar.addEventListener('keyup', () => {
    const searchTerm = searchBar.value.toLowerCase();
    let filteredProducts = productService.getProducts();

    console.log(filteredProducts);

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      });
    }

    console.log(filteredProducts);

    displayCards(filteredProducts);
  });
  });
  