const productList = document.getElementById("productList");

fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock} unidades</p>
        <img src="${product.thumbnails[0]}" alt="${product.title}">
      `;
      productList.appendChild(productDiv);
    });
  });
