const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {

      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(title, description, price, image, id, stock) {
    const product = {
      title,
      description,
      price,
      image,
      id,
      stock,
    };
    this.products.push(product);
    this.saveProducts();
    console.log(`Producto agregado: ${title} (ID: ${id})`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      console.log(`Producto encontrado: ${product.title} (ID: ${product.id})`);
    } else {
      console.log(`Producto no encontrado con ID: ${id}`);
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      console.log(`Producto actualizado con éxito.`);
    } else {
      console.log(`Producto no encontrado con ID: ${id}`);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log(`Producto eliminado con éxito.`);
    } else {
      console.log(`Producto no encontrado con ID: ${id}`);
    }
  }
}

const manager = new ProductManager('productData.json');

manager.addProduct("Zapatillas Nike", "Zapatillas deportivas de Nike", 120.0, "nike.jpg", 1, 15);
manager.addProduct("Zapatillas Adidas", "Zapatillas deportivas de Adidas", 110.0, "adidas.jpg", 2, 10);

console.log("Lista de productos:", manager.getProducts());
