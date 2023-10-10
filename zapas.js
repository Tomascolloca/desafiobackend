class ProductManager {
    constructor() {
      this.products = [];
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
      console.log(`Producto agregado: ${title} (ID: ${id})`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getElementById(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        console.log(`Producto encontrado: ${product.title} (ID: ${product.id})`);
      } else {
        console.log(`Producto no encontrado con ID: ${id}`);
      }
      return product;
    }
  }
 
  const manager = new ProductManager();
  

  manager.addProduct("Zapatillas Nike", "Zapatillas deportivas de Nike", 120.0, "nike.jpg", 1, 15);
  manager.addProduct("Zapatillas Adidas", "Zapatillas deportivas de Adidas", 110.0, "adidas.jpg", 2, 10);
  
  console.log("Lista de productos:", manager.getProducts());
  