console.log("Hej du");

const container = document.querySelector(".kategori-list");

const endpoint = `https://kea-alt-del.dk/t7/api/categories`;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(categories) {
  let markup = "";
  categories.forEach((cat) => {
    markup += ` <a href="productlist.html?category=${cat.category}" class="category-card"> ${cat.category} </a> `;
  });

  container.innerHTML = markup;
}

getData();
