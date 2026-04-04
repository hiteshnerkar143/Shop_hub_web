const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");
const connectDB = require("./config");

// Real working Unsplash image URLs for each category
const categoryImages = {
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
    "https://images.unsplash.com/photo-1591501885064-d05551f6e52c?w=500&q=80",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
    "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&q=80",
  ],
  Clothing: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    "https://images.unsplash.com/photo-1552662206-53182c27a601?w=500&q=80",
    "https://images.unsplash.com/photo-1618886996285-e6d508a88319?w=500&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    "https://images.unsplash.com/photo-1598033129519-fe1cf6f63f25?w=500&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
    "https://images.unsplash.com/photo-1539533057440-7814a9d54c16?w=500&q=80",
    "https://images.unsplash.com/photo-1559526324-4169b6f91ac8?w=500&q=80",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095fb4b5e?w=500&q=80",
  ],
  Books: [
    "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    "https://images.unsplash.com/photo-1543002588-d83d61b93b36?w=500&q=80",
    "https://images.unsplash.com/photo-1524526267942-ab7da9b3b02f?w=500&q=80",
    "https://images.unsplash.com/photo-1475446842120-844e0205b594?w=500&q=80",
    "https://images.unsplash.com/photo-1541961017774-22e08e888c49?w=500&q=80",
    "https://images.unsplash.com/photo-1495446815901-a7297e61a6b0?w=500&q=80",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80",
    "https://images.unsplash.com/photo-1498855926480-d98e83099315?w=500&q=80",
    "https://images.unsplash.com/photo-1516979187457-635ffe35ff55?w=500&q=80",
  ],
  Home: [
    "https://images.unsplash.com/photo-1565636192335-14f0d7e9b2b9?w=500&q=80",
    "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    "https://images.unsplash.com/photo-1516542152519-c21cc028cb38?w=500&q=80",
    "https://images.unsplash.com/photo-1524638431109-93d504b7d7c9?w=500&q=80",
    "https://images.unsplash.com/photo-1572304969935-ee2c3be37f0e?w=500&q=80",
    "https://images.unsplash.com/photo-1600121848926-6d70deb348e3?w=500&q=80",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80",
    "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=500&q=80",
    "https://images.unsplash.com/photo-1521905167169-6f4ee915583e?w=500&q=80",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&q=80",
    "https://images.unsplash.com/photo-1534080857732-cac612b4c141?w=500&q=80",
    "https://images.unsplash.com/photo-1574258495688-46c73e87e4f8?w=500&q=80",
    "https://images.unsplash.com/photo-1500628346881-b72b27e84530?w=500&q=80",
    "https://images.unsplash.com/photo-1565702479325-7dae45d300b5?w=500&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&q=80",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80",
  ]
};

// Product names by category
const productNames = {
  Electronics: ["Wireless Headphones", "Smart Watch", "USB-C Cable", "Bluetooth Speaker", "Phone Charger", "Laptop Stand", "External SSD", "Power Bank", "USB Hub", "HDMI Cable", "Monitor Light", "Keyboard", "Mouse", "Gaming Headset", "Webcam", "Microphone", "Phone Case", "Screen Protector", "Camera", "Tripod", "Ring Light", "Memory Card", "Projector", "VR Headset", "Drone", "Action Camera", "Gimbal", "Charger", "Phone Stand", "Organizer", "Router", "Modem", "TV Mount", "Protector", "Cable", "Cabinet", "Desk", "Organizer", "Organizer", "Holder", "Cooler", "Wrist Rest", "Mouse Pad", "Monitor Stand", "Splitter", "Adapter", "Projector", "Frame", "Bulb", "Plug", "Speaker", "Camera", "Doorbell", "Light", "Thermostat", "Lock", "Doorbell", "Extender", "Router", "Switch", "Cable", "Cable", "Cable", "Dock", "Charger", "Bank", "Charger", "Charger", "Charge", "Earbud", "Cancellation", "Earphone", "Monitor", "Interface", "Desk", "Stand", "Filter", "Cable", "Equipment", "Soundbar", "Amplifier", "Equalizer", "Hub", "Injector", "Optic", "Cable", "Protector", "Backup", "System", "Inverter", "Converter", "Regulator", "Converter", "Adapter", "Charger", "Mount", "Cam", "WiFi", "Kit", "Hub", "Filter", "Monitor", "Scanner", "Tracker"],
  Clothing: ["Cotton T-Shirt", "Polo Shirt", "Casual Shirt", "Formal Shirt", "Denim Jacket", "Blazer", "Cardigan", "Hoodie", "Sweatshirt", "Tank Top", "Sleeveless", "Long Sleeve", "Thermal", "Compression", "Gym Shirt", "Sports Bra", "Leggings", "Yoga Pants", "Cargo Pants", "Blue Jeans", "Black Jeans", "Chinos", "Shorts", "Bermuda", "Skirt", "Maxi Skirt", "Casual Dress", "Formal Dress", "Evening Gown", "Wedding Dress", "Saree", "Kurti", "Salwar Suit", "Lehenga", "Leather Jacket", "Winter Jacket", "Woolen Coat", "Raincoat", "Windbreaker", "Vest", "Waistcoat", "Scarf", "Shawl", "Dupatta", "Stole", "Pashmina", "Silk Saree", "Cotton Saree", "Designer Suit", "Three Piece", "Tuxedo", "Uniform", "Uniform", "Coat", "Coat", "Scrubs", "Uniform", "Uniform", "Tie", "Bow Tie", "Suspenders", "Hat", "Cap", "Beanie", "Fedora", "Bucket Hat", "Sun Hat", "Visor", "Headband", "Hair Band", "Scarf", "Print Shirt", "Graphic Tee", "Band Tee", "Logo Tee", "Street Wear", "Oversized", "Crop Top", "Half Sleeve", "Three Quarter", "Batik Shirt", "Silk Shirt", "Linen Shirt", "Cotton Blend", "Wool Shirt", "Cashmere", "Merino", "Fleece", "Puffer", "Down Jacket", "Gilet", "Waterproof", "Softshell", "Hiking", "Athletic", "Racerback", "Performance", "Wicking"],
  Books: ["Great Gatsby", "JavaScript", "Python", "Data Science", "Web Dev", "Mobile Apps", "Cloud Computing", "AI", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Blockchain", "Cyber Security", "Network Admin", "Database", "System Design", "Microservices", "DevOps", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Lean Startup", "Atomic Habits", "Deep Work", "Mindfulness", "Power of Now", "Thinking", "Sapiens", "Homo Deus", "1984", "Animal Farm", "Brave New World", "Catcher Rye", "Pride Prejudice", "Jane Eyre", "Wuthering", "Hobbit", "Rings", "Potter", "Thrones", "Time", "Dune", "Foundation", "Neuromancer", "Snow Crash", "Matrix", "Runner", "Robot", "Time", "Leagues", "World", "Journey", "Treasure", "Monte Cristo", "Holmes", "Christie", "Orient Express", "Gone Girl", "Train", "Before", "Book Thief", "Light", "Nightingale", "Elephants", "Help", "Mockingbird", "Runner", "Suns", "Life", "Alchemist", "Siddhartha", "Prophet", "Prince", "Crawdads", "Daisy", "Husbands", "Chemistry", "Now", "Place", "Lovers", "Reminders", "Ends", "Started", "Love", "Confess", "November"],
  Home: ["LED Lamp", "Coffee Maker", "Air Purifier", "Humidifier", "Dehumidifier", "Vacuum", "Robot Vacuum", "Mop", "Cleaner", "Cleaner", "Microwave", "Toaster", "Blender", "Mixer", "Juicer", "Cooker", "Slow Cooker", "Rice Cooker", "Bread Maker", "Pizza", "Grill", "Sandwich", "Waffle", "Crepe", "Donut", "Kettle", "Heater", "Dispenser", "Purifier", "Dishwasher", "Washer", "Dryer", "Board", "Iron", "Sewing", "Sealer", "Dehydrator", "Cream", "Popcorn", "Cooler", "Fridge", "Refrigerator", "Freezer", "Conditioner", "Heater", "Cooler", "Humidifier", "Diffuser", "Light", "Fan", "Tower", "Pedestal", "Ceiling", "Wall", "Sheets", "Cases", "Blanket", "Comforter", "Cover", "Protector", "Topper", "Pillow", "Pillow", "Pillow", "Rod", "Curtains", "Blinds", "Shutters", "Mat", "Towels", "Towels", "Kitchen", "Cloth", "Mat", "Curtain", "Organizer", "Brush", "Bin", "Dispenser", "Holder", "Drawer", "Cabinet", "Shelf", "Hooks", "Frame", "Canvas", "Art", "Stickers", "Mirror", "Shelf", "Shelf", "Desk", "Table", "Chair", "Bag", "Seat", "Sofa", "Loveseat", "Ottoman", "Recliner"],
  Sports: ["Running Shoes", "Yoga Mat", "Dumbbells", "Barbell", "Plates", "Kettlebell", "Medicine Ball", "Band", "Bar", "Stand", "Roller", "Block", "Roller", "Ball", "Bolster", "Cushion", "Strap", "Wheel", "Ball", "Ball", "Ladder", "Cone", "Hurdle", "Rope", "Bag", "Bag", "Ball", "Stand", "Gloves", "Wraps", "Headgear", "Guard", "Guards", "Pads", "Pads", "Guards", "Brace", "Support", "Brace", "Sleeve", "Shirt", "Shorts", "Bra", "Leggings", "Socks", "Band", "Bag", "Bottle", "Bottle", "Towel", "Towel", "Band", "Armband", "Belt", "Backpack", "Pack", "Pack", "Bag", "Bag", "Court", "Ball", "Ball", "Ball", "Racket", "Racket", "Paddle", "Bat", "Bat", "Glove", "Ball", "Ball", "Ball", "Frisbee", "Set", "Board", "Board", "Board", "Skates", "Skates", "Skates", "Blades", "Helmet", "Helmet", "Gear", "Bicycle", "Bike", "Bike", "Bike", "Bike", "Bike", "Machine", "Climber", "Treadmill", "Machine"]
};

// Generate 100 products per category
const generateProducts = () => {
  const products = [];
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
  
  categories.forEach(category => {
    const names = productNames[category];
    const images = categoryImages[category];
    
    for (let i = 0; i < 100; i++) {
      const name = names[i % names.length];
      const image = images[i % images.length];
      
      let price, stock;
      if (category === "Electronics") {
        price = Math.floor(Math.random() * 15000) + 500;
        stock = Math.floor(Math.random() * 50) + 5;
      } else if (category === "Clothing") {
        price = Math.floor(Math.random() * 8000) + 300;
        stock = Math.floor(Math.random() * 60) + 10;
      } else if (category === "Books") {
        price = Math.floor(Math.random() * 1500) + 200;
        stock = Math.floor(Math.random() * 100) + 10;
      } else if (category === "Home") {
        price = Math.floor(Math.random() * 25000) + 500;
        stock = Math.floor(Math.random() * 40) + 5;
      } else {
        price = Math.floor(Math.random() * 20000) + 300;
        stock = Math.floor(Math.random() * 50) + 8;
      }
      
      products.push({
        name: `${name} ${String(i + 1).padStart(3, '0')}`,
        description: `Premium quality ${name.toLowerCase()} - Perfect for ${category.toLowerCase()} lovers. Get the best value with our exclusive collection.`,
        price: price,
        category: category,
        image: image,
        stock: stock,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 50
      });
    }
  });
  
  return products;
};

const sampleProducts = generateProducts();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️ Cleared existing products");

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`\n✅ ${createdProducts.length} products added to database!\n`);

    // Display product count by category
    const categories = ["Electronics", "Clothing", "Books", "Home", "Sports"];
    console.log("📊 Products by Category:");
    categories.forEach(cat => {
      const count = createdProducts.filter(p => p.category === cat).length;
      console.log(`   • ${cat}: ${count} products`);
    });

    console.log("\n✨ Database seeding completed successfully!");
    console.log("📱 Your store now has 500 amazing products with real images!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
