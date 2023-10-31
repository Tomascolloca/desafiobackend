const express = require('express');
const ProductManager = require('./productManager');
const app = express();
const port = 8080;

const manager = new ProductManager('productData.json');

app.use(express.json());

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Rutas para productos

app.get('/api/products', (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = manager.getProducts();

  if (!isNaN(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

app.get('/api/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = manager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.post('/api/products', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
  } else {
    const id = manager.generateUniqueID();
    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };
    manager.addProduct(newProduct);
    res.status(201).json(newProduct);
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
