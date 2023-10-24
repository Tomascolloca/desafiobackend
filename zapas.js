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

  isCodeUnique(code) {
    return !this.products.some((product) => product.code === code);
  }

  isIdUnique(id) {
    return !this.products.some((product) => product.id === id);
  }

  addProduct(title, description, price, image, id, stock) {
    if (!this.isCodeUnique(id)) {
      console.log(`El código (ID) ${id} ya está en uso. No se puede agregar el producto.`);
      return;
    }

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

  updateProduct(id, updatedProduct) {
    if (!this.isIdUnique(id)) {
      console.log(`No se puede actualizar el producto porque el ID ${id} ya está en uso.`);
      return;
    }

    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      console.log(`Producto actualizado con éxito.`);
    } else {
      console.log(`Producto no encontrado con ID: ${id}`);
    }
  }
}

module.exports = ProductManager;

