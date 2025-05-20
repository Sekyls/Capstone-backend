const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGO_URL;

// Import models (adjust paths as needed for your project structure)
const User = require("./src/models/users");
const Restaurant = require("./src/models/restaurants");
const Meal = require("./src/models/meals");
const Order = require("./src/models/orders");

// Sample data
const users = [
  {
    name: "Canoe Beach Sushi & Grill Bar",
    email: "restaurant1@example.com",
    password: "Password1@",
    role: "restaurant",
    phone: "+1234567890",
    address: "123 Restaurant Ave, Food City, FC 12345",
  },
  {
    name: "Vine",
    email: "restaurant2@example.com",
    password: "Password2@",
    role: "restaurant",
    phone: "+1987654321",
    address: "456 Bistro St, Chef Town, CT 67890",
  },
  {
    name: "Dennis Sekyi Opoku",
    email: "customer@example.com",
    password: "Customer1@",
    role: "customer",
    phone: "+1122334455",
    address: "789 Hungry Lane, Food Town, FT 45678",
  },
  {
    name: "Osei Asante Caleb",
    email: "Customer2@example.com",
    password: "Customer2@",
    role: "customer",
    phone: "+1555666777",
    address: "101 Diner Road, Meal City, MC 56789",
  },
  {
    name: "Laura Boampong",
    email: "boampong@example.com",
    password: "Customer3@",
    role: "customer",
    phone: "+1777888999",
    address: "202 Snack Street, Bite Village, BV 34567",
  },
];

const restaurants = [
  {
    restaurantName: "Italiano Delizioso",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c9/76/8c/bar.jpg?w=1100&h=-1&s=1",
    location: "123 Italian Avenue, Pasta City, IT 12345",
    description:
      "Authentic Italian cuisine with homemade pasta and wood-fired pizza. Family owned for three generations.",
  },
  {
    restaurantName: "Burger Heaven",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/6e/45/34/our-cinnamon-french-toast.jpg?w=1100&h=-1&s=1",
    location: "456 Burger Street, Beef Town, BH 67890",
    description:
      "Premium burgers made with locally sourced ingredients. Known for our special sauce and hand-cut fries.",
  },
];

const mealTemplates = [
  // Italian restaurant meals
  [
    {
      name: "Margherita Pizza",
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, fresh basil, and olive oil.",
      category: "Pizza",
      price: 12.99,
      imageUrl:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
    {
      name: "Spaghetti Carbonara",
      description:
        "Spaghetti pasta with creamy egg sauce, pancetta, pecorino romano cheese, and black pepper.",
      category: "Pasta",
      price: 14.99,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
    {
      name: "Tiramisu",
      description:
        "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
      category: "Dessert",
      price: 8.99,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
  ],
  // Burger restaurant meals
  [
    {
      name: "Classic Cheeseburger",
      description:
        "Juicy beef patty with cheddar cheese, lettuce, tomato, and our special sauce on a brioche bun.",
      category: "Burger",
      price: 10.99,
      imageUrl:
        "https://images.unsplash.com/photo-1654878910519-b6117fbd5a41?q=80&w=3842&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
    {
      name: "Truffle Fries",
      description:
        "Hand-cut fries tossed with truffle oil, parmesan cheese, and fresh herbs.",
      category: "Sides",
      price: 6.99,
      imageUrl:
        "https://images.unsplash.com/photo-1723763246578-99e614b2a91b?q=80&w=3976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
    {
      name: "Chocolate Milkshake",
      description:
        "Creamy milkshake made with premium chocolate ice cream and topped with whipped cream.",
      category: "Drinks",
      price: 5.99,
      imageUrl:
        "https://images.unsplash.com/photo-1591864384134-8a21ffb51cb5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isAvailable: true,
    },
  ],
];

// Order statuses
const orderStatuses = ["pending", "preparing", "ready", "completed"];

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Hash password function
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Main seeding function
async function seedDatabase() {
  try {
    // Clean up existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Meal.deleteMany({});
    await Order.deleteMany({});

    console.log("Cleared existing data.");

    // Create users
    console.log("Creating users...");
    const createdUsers = [];

    for (const user of users) {
      const hashedPassword = await hashPassword(user.password);
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        phone: user.phone,
        address: user.address,
      });

      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
      console.log(`User created: ${savedUser.name} (${savedUser.role})`);
    }

    // Get restaurant owners and customers
    const restaurantOwners = createdUsers.filter(
      (user) => user.role === "restaurant"
    );
    const customers = createdUsers.filter((user) => user.role === "customer");

    // Create restaurants
    console.log("\nCreating restaurants...");
    const createdRestaurants = [];

    for (let i = 0; i < restaurants.length; i++) {
      const newRestaurant = new Restaurant({
        restaurantName: restaurants[i].restaurantName,
        imageUrl: restaurants[i].imageUrl,
        location: restaurants[i].location,
        description: restaurants[i].description,
        userId: restaurantOwners[i]._id,
      });

      const savedRestaurant = await newRestaurant.save();
      createdRestaurants.push(savedRestaurant);
      console.log(`Restaurant created: ${savedRestaurant.restaurantName}`);
    }

    // Create meals for each restaurant
    console.log("\nCreating meals...");
    const createdMeals = [];

    for (let i = 0; i < createdRestaurants.length; i++) {
      const restaurant = createdRestaurants[i];
      const meals = mealTemplates[i];

      for (const meal of meals) {
        const newMeal = new Meal({
          name: meal.name,
          description: meal.description,
          category: meal.category,
          price: meal.price,
          imageUrl: meal.imageUrl,
          isAvailable: meal.isAvailable,
          restaurantId: restaurant._id,
        });

        const savedMeal = await newMeal.save();
        createdMeals.push(savedMeal);
        console.log(
          `Meal created: ${savedMeal.name} for ${restaurant.restaurantName}`
        );
      }
    }

    // Create orders
    console.log("\nCreating orders...");
    const orderPromises = [];

    // Create 2 orders per customer
    for (const customer of customers) {
      for (let i = 0; i < 2; i++) {
        // Pick a random restaurant and meal
        const randomRestaurantIndex = Math.floor(
          Math.random() * createdRestaurants.length
        );
        const restaurant = createdRestaurants[randomRestaurantIndex];

        // Get meals for this restaurant
        const restaurantMeals = createdMeals.filter(
          (meal) => meal.restaurantId.toString() === restaurant._id.toString()
        );

        // Pick a random meal from this restaurant
        const randomMealIndex = Math.floor(
          Math.random() * restaurantMeals.length
        );
        const meal = restaurantMeals[randomMealIndex];
        const quantity = Math.floor(Math.random() * 2) + 1; // 1 or 2
        const priceAtOrderTime = meal.price;
        const totalPrice = priceAtOrderTime * quantity;

        // Random order status
        const randomStatusIndex = Math.floor(
          Math.random() * orderStatuses.length
        );
        const status = orderStatuses[randomStatusIndex];

        // Create the order
        const newOrder = new Order({
          customerId: customer._id,
          restaurantId: restaurant._id,
          meal: {
            mealId: meal._id,
            quantity: quantity,
            priceAtOrderTime: priceAtOrderTime,
          },
          totalPrice: totalPrice,
          deliveryAddress: customer.address,
          status: status,
          notes: i % 2 === 0 ? "Please ring the doorbell" : "",
          isPaid: Math.random() > 0.3, // 70% chance of being paid
        });

        orderPromises.push(newOrder.save());
      }
    }

    const savedOrders = await Promise.all(orderPromises);
    console.log(`Created ${savedOrders.length} orders.`);

    console.log("\nDatabase seeding completed successfully!");
    console.log("\nSample login credentials:");
    console.log("- Restaurant: restaurant1@example.com / Password1@");
    console.log("- Customer: customer@example.com / Customer1@");

    // Disconnect from database
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();
