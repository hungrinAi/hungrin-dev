import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data
  const mockStats = {
    newOrdersToday: 42,
    weeklyRevenue: 1250,
    weatherEffect: 15,
    totalOrders: 1240,
    salesData: [
      { name: 'Mon', sales: 400 },
      { name: 'Tue', sales: 300 },
      { name: 'Wed', sales: 600 },
      { name: 'Thu', sales: 800 },
      { name: 'Fri', sales: 500 },
      { name: 'Sat', sales: 900 },
      { name: 'Sun', sales: 700 },
    ],
    promoOfDay: {
      title: 'Burger Bundle!',
      price: 12.99,
      oldPrice: 16.99,
      slotsLeft: 7,
      emoji: '🍔',
      tag: '🔥 Hot'
    },
    aiSuggestions: [
      '+ Suggest A Promo',
      '+ Current offers',
      '+ Get More Customers',
      '+ Create a Post'
    ]
  };

  const mockOrders: any[] = [
    { 
      id: '#ORD-7821', 
      customer: 'John Doe',
      customerName: 'John Doe', 
      initials: 'JD', 
      items: ['Classic Cheeseburger', 'Truffle Fries', 'Vanilla Milkshake'], 
      total: 25.50, 
      time: '12:45 PM', 
      status: 'completed', 
      createdAt: '2026-03-22T12:45:00Z',
      deliveryPlatform: 'uber',
      subtotal: 22.00,
      deliveryFee: 2.50,
      tips: 1.00,
      fullTotal: 25.50
    },
    { 
      id: '#ORD-7822', 
      customer: 'Jane Smith',
      customerName: 'Jane Smith', 
      initials: 'JS', 
      items: ['Spicy Chicken Wings', 'Diet Coke'], 
      total: 18.00, 
      time: '01:15 PM', 
      status: 'pending', 
      createdAt: '2026-03-22T13:15:00Z',
      deliveryPlatform: 'deliveroo',
      subtotal: 15.00,
      deliveryFee: 2.00,
      tips: 1.00,
      fullTotal: 18.00
    },
  ];

  const mockCampaigns: any[] = [
    { 
      id: '1', 
      name: 'Summer Burger Fest', 
      emoji: '🍔', 
      meta: '20% off all bundles', 
      status: 'Active', 
      orders: 142, 
      revenue: '£1,846', 
      startDate: '2024-06-01', 
      endDate: '2024-08-31' 
    },
    { 
      id: '2', 
      name: 'Weekend Wings', 
      emoji: '🍗', 
      meta: 'Buy 1 Get 1 Free', 
      status: 'Paused', 
      orders: 85, 
      revenue: '£425', 
      startDate: '2024-07-01', 
      endDate: '2024-07-31' 
    },
  ];

  const mockCustomers: any[] = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com',
      phone: '07421 892 102',
      totalOrders: 12,
      totalSpent: 245.50,
      initials: 'JD', 
      orders: 12, 
      spend: 245.50, 
      lastOrder: '2 hours ago', 
      status: 'active', 
      color: 'bg-purple-500' 
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '07421 892 103',
      totalOrders: 5,
      totalSpent: 85.00,
      initials: 'JS', 
      orders: 5, 
      spend: 85.00, 
      lastOrder: 'Yesterday', 
      status: 'active', 
      color: 'bg-g-dark' 
    },
  ];

  const mockInsights = {
    customerSegments: [
      { name: 'Loyal', value: 45 },
      { name: 'Returning', value: 30 },
      { name: 'New', value: 15 },
      { name: 'VIP', value: 10 },
    ],
    salesTrend: [
      { name: 'Mon', sales: 400 },
      { name: 'Tue', sales: 300 },
      { name: 'Wed', sales: 600 },
      { name: 'Thu', sales: 800 },
      { name: 'Fri', sales: 500 },
      { name: 'Sat', sales: 900 },
      { name: 'Sun', sales: 700 },
    ],
    recommendations: [
      { 
        id: '1', 
        title: 'Burger Bundle Optimization',
        description: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special.",
        category: 'Sales',
        impact: 'High',
        text: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special." 
      },
      { 
        id: '2', 
        title: 'Retention Growth',
        description: "Customer retention is up 15% this month. Keep it up!",
        category: 'Loyalty',
        impact: 'Medium',
        text: "Customer retention is up 15% this month. Keep it up!" 
      },
      { 
        id: '3', 
        title: 'Happy Hour Detection',
        description: "Slow hours detected between 3 PM - 5 PM. Launch a 'Happy Hour' promo.",
        category: 'Promotion',
        impact: 'High',
        text: "Slow hours detected between 3 PM - 5 PM. Launch a 'Happy Hour' promo." 
      }
    ],
    topProducts: [
      { name: 'Classic Cheeseburger', category: 'Main', sales: 142, revenue: '1,846', growth: '+12%', trend: '+12%', emoji: '🍔' },
      { name: 'Spicy Chicken Wings', category: 'Sides', sales: 98, revenue: '882', growth: '+8%', trend: '+8%', emoji: '🍗' },
      { name: 'Truffle Fries', category: 'Sides', sales: 85, revenue: '425', growth: '-2%', trend: '-2%', emoji: '🍟' },
      { name: 'Vanilla Milkshake', category: 'Drinks', sales: 76, revenue: '380', growth: '+15%', trend: '+15%', emoji: '🥤' },
    ]
  };

  // API Routes
  app.get("/api/dashboard/stats", (req, res) => {
    res.json(mockStats);
  });

  app.get("/api/insights", (req, res) => {
    res.json(mockInsights);
  });

  app.get("/api/orders", (req, res) => {
    res.json({
      pending: 16,
      completed: 78,
      todayRevenue: 178.99,
      orders: mockOrders
    });
  });

  app.get("/api/campaigns", (req, res) => {
    res.json(mockCampaigns);
  });

  app.get("/api/customers", (req, res) => {
    res.json({
      totalCustomers: 1284,
      avgOrderValue: 24.50,
      loyaltyRate: 68,
      customers: mockCustomers
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
