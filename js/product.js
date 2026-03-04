console.log("Hej du");

const id = new URLSearchParams(window.location.search).get("id");

const container = document.querySelector(".product-container");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(produkter) {
  console.log("produkter");
  container.innerHTML = `
  <a href="productlist.html?category=${produkter.category}"class ="link-back"">← Back</a>
  <div class="grid-product-image">
  <div class="productpage-image">
<img src="https://kea-alt-del.dk/t7/images/webp/640/${produkter.id}.webp">
      </div>

      <section class="product-details">
        <h2>${produkter.productdisplayname}</h2>
        <div>
          <p><span>Type:</span> ${produkter.articletype}</p>
          <p><span>Kategori:</span> ${produkter.category}</p>
          <p><span>Pris:</span> ${produkter.price},-</p>
          <p><span>Stock:</span> 5</p>
        </div>
        <button class="buy-button">Køb nu</button>
      </section>
      </div>`;
}

getData();
