console.log("Hej du");

const klikkategori = new URLSearchParams(window.location.search).get(
  "category",
);

console.log(klikkategori);

const container = document.querySelector(".grid-products");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${klikkategori}&limit=30`;

document
  .querySelectorAll("button")
  .forEach((knap) => knap.addEventListener("click", filter));

let allData;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      showProducts(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  if (valgt == "All") {
    showProducts(allData);
  } else {
    const udsnit = allData.filter((element) => element.gender == valgt);
    showProducts(udsnit);
  }
}

function showProducts(produkter) {
  let markup = "";
  //   console.log(fangst);
  produkter.forEach((produkt) => {
    console.log("her kommer fisken:");
    console.log(produkt);
    markup += `
            <a href="product.html?id=${produkt.id}">
          <article class="article-product ${produkt.soldout ? "soldOut" : ""} ${produkt.discount ? "onSale" : ""}">
            ${produkt.soldout ? '<span class="soldout">Sold Out</span>' : ""}
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp" />
            <h3>${produkt.productdisplayname}</h3>
            <p class="brand">T-shirts | Puma</p>
            <p class="old-price">${produkt.price},-</p>
            <div class="discount">
            <p class="price-square">NOW DKK <span>${Math.round(produkt.price - (produkt.price * produkt.discount) / 100)}</span>,-</p>
              <p class="square"><span>${produkt.discount}</span>%</p>
            </div>
          </article>
        </a>
        `;
  });
  container.innerHTML = markup;
}

getData();
