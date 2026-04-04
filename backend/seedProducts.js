const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const connectDB = require("./config");

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Premium quality Bluetooth headphones with noise cancellation",
    price: 4999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    name: "Smart Watch",
    description: "Advanced fitness tracking smartwatch with AMOLED display",
    price: 9999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 10,
    rating: 4.8,
    reviews: 256,
  },
  {
    name: "USB-C Cable",
    description: "Fast charging USB-C cable, 2 meters long",
    price: 499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    stock: 50,
    rating: 4.3,
    reviews: 89,
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt available in multiple colors",
    price: 599,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 30,
    rating: 4.6,
    reviews: 145,
  },
  {
    name: "Running Shoes",
    description: "Lightweight sports shoes perfect for running and gym",
    price: 3999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 20,
    rating: 4.7,
    reviews: 234,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap, 6mm thickness",
    price: 1299,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    stock: 25,
    rating: 4.4,
    reviews: 156,
  },
  {
    name: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald",
    price: 399,
    category: "Books",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500",
    stock: 40,
    rating: 4.9,
    reviews: 312,
  },
  {
    name: "Learn JavaScript",
    description: "Complete guide to mastering JavaScript programming",
    price: 799,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    stock: 35,
    rating: 4.5,
    reviews: 178,
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with touch control",
    price: 1599,
    category: "Home",
    image: "https://images.unsplash.com/photo-1565636192335-14f0d7e9b2b9?w=500",
    stock: 18,
    rating: 4.6,
    reviews: 134,
  },
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with temperature control",
    price: 4499,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500",
    stock: 12,
    rating: 4.7,
    reviews: 198,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} products added to database`);

    // Display created products
    console.log("\n📦 Sample Products Created:\n");
    createdProducts.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - ₹${product.price} (${product.category})`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
