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

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  generateUniqueID() {
    // Implementa lógica para generar un ID único, por ejemplo, un UUID o un número secuencial
    // Asegúrate de que sea realmente único
  }

  addProduct(productData) {
    // Agrega lógica para agregar un nuevo producto, verificando si el ID es único y almacenando la imagen
  }

  updateProduct(id, updatedProduct) {
    // Implementa lógica para actualizar un producto existente por su ID
  }

  isCodeUnique(code) {
    return !this.products.some((product) => product.code === code);
  }

  isIdUnique(id) {
    return !this.products.some((product) => product.id === id);
  }

  deleteProduct(id) {
    // Implementa lógica para eliminar un producto por su ID
  }
}

module.exports = ProductManager;
