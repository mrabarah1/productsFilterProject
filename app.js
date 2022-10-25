
let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");


const displayProducts = () => {
  // if statement to filter empty array
  if(filteredProducts.length < 1) {
   console.log(filteredProducts.length < 1);
   productsContainer.innerHTML = `<h6>sorry no product matched your search</h6>`;
   return;
  }

  // displaying the filteredProducts in a new array using map() method
  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      const { id, title, image, price } = product;
      return `<article class="product" data-id="${id}">
          <img src="${image}" class="product-img img">
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>`;
    })
    .join("");
};
displayProducts();


// Text Filter
const formInput = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

formInput.addEventListener("keyup", (e) => {
  // e.preventDefault();
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});


// filter buttons
const companiesDOM = document.querySelector(".companies");

const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((product) => product.company))];
  companiesDOM.innerHTML = buttons.map((company) => {
    return `<button class="company-btn" data-id="${company}">${company}</button>`;
  }).join("");
};
displayButtons();

companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if(el.classList.contains("company-btn")) {
    if(el.dataset.id === "all") {
      filteredProducts = [...products];
    }else{
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts();
  }
});
