console.log("Hej du");

const klikkategori = new URLSearchParams(window.location.search).get(
  "category",
);

console.log(klikkategori);

document.querySelector("h2").textContent = klikkategori;

const container = document.querySelector(".grid-products");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${klikkategori}&limit=30`;

document
  .querySelectorAll("#filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

let allData;
let udsnit;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = data;
      udsnit = data;
      showProducts(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;
  console.log(valgt);
  if (valgt === "All") {
    udsnit = allData;
    showProducts(udsnit);
  } else {
    udsnit = allData.filter((element) => element.gender === valgt);
    showProducts(udsnit);
  }
}

function sorter(e) {
  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;
    if (dir === "up") {
      udsnit.sort((a, b) => a.price - b.price);
    } else {
      udsnit.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = e.target.dataset.text;
    if (dir === "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showProducts(udsnit);
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
            <p class="brand">${produkt.articletype} | ${produkt.brandname}</p>
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
