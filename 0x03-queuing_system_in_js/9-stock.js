import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const PORT = 1245;

// Connect to Redis
const client = redis.createClient();
const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = promisify(client.get).bind(client);

// Product List
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Helper function to get item by ID
const getItemById = (id) => {
  return listProducts.find((item) => item.itemId === id);
};

// Routes

// GET /list_products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// GET /list_products/:itemId
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity =
    item.initialAvailableQuantity - (parseInt(reservedStock, 10) || 0);

  res.json({
    ...item,
    currentQuantity,
  });
});

// GET /reserve_product/:itemId
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    return res.json({ status: 'Product not found' });
  }

  const reservedStock = await getCurrentReservedStockById(itemId);
  const currentQuantity =
    item.initialAvailableQuantity - (parseInt(reservedStock, 10) || 0);

  if (currentQuantity <= 0) {
    return res.json({
      status: 'Not enough stock available',
      itemId: itemId,
    });
  }

  reserveStockById(itemId, (parseInt(reservedStock, 10) || 0) + 1);

  res.json({
    status: 'Reservation confirmed',
    itemId: itemId,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
