import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { MOCK_DASHBOARD_STATS, MOCK_ORDERS, MOCK_CAMPAIGNS, MOCK_INSIGHTS, MOCK_CUSTOMERS } from './mockData';

// Error handling helper
const handleFirestoreError = (error: any, operation: string, path: string) => {
  const errInfo = {
    error: error.message,
    operationType: operation,
    path: path,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    }
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
};

export const dataService = {
  // Stats
  async getDashboardStats() {
    try {
      if (!auth.currentUser) return MOCK_DASHBOARD_STATS;
      
      const q = query(collection(db, 'stats'), where('userId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return MOCK_DASHBOARD_STATS;
      
      return snapshot.docs[0].data();
    } catch (error) {
      return MOCK_DASHBOARD_STATS; // Fallback to mock data on error
    }
  },

  // Orders
  async getOrders() {
    try {
      if (!auth.currentUser) {
        return {
          pending: MOCK_ORDERS.filter(o => o.status === 'pending').length,
          completed: MOCK_ORDERS.filter(o => o.status === 'completed').length,
          todayRevenue: MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0),
          orders: MOCK_ORDERS
        };
      }
      
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      return {
        pending: orders.filter((o: any) => o.status === 'pending').length,
        completed: orders.filter((o: any) => o.status === 'completed').length,
        todayRevenue: orders.reduce((acc: number, o: any) => acc + o.total, 0),
        orders: orders.length > 0 ? orders : MOCK_ORDERS
      };
    } catch (error) {
      return {
        pending: MOCK_ORDERS.filter(o => o.status === 'pending').length,
        completed: MOCK_ORDERS.filter(o => o.status === 'completed').length,
        todayRevenue: MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0),
        orders: MOCK_ORDERS
      };
    }
  },

  // Campaigns
  async getCampaigns() {
    try {
      if (!auth.currentUser) return MOCK_CAMPAIGNS;
      
      const q = query(collection(db, 'campaigns'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return MOCK_CAMPAIGNS;
      
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return MOCK_CAMPAIGNS;
    }
  },

  // Insights
  async getInsights() {
    try {
      if (!auth.currentUser) return MOCK_INSIGHTS;
      
      const q = query(collection(db, 'insights'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return MOCK_INSIGHTS;
      
      return snapshot.docs[0].data();
    } catch (error) {
      return MOCK_INSIGHTS;
    }
  },

  // Customers
  async getCustomers() {
    try {
      if (!auth.currentUser) return MOCK_CUSTOMERS;
      
      const q = query(collection(db, 'customers'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return MOCK_CUSTOMERS;
      
      const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return {
        totalCustomers: customers.length,
        avgOrderValue: 42.50,
        loyaltyRate: 65,
        customers: customers
      };
    } catch (error) {
      return MOCK_CUSTOMERS;
    }
  },

  // Real-time listeners
  subscribeToOrders(callback: (orders: any[]) => void) {
    if (!auth.currentUser) {
      callback(MOCK_ORDERS);
      return () => {};
    }

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(orders.length > 0 ? orders : MOCK_ORDERS);
    }, (error) => {
      handleFirestoreError(error, 'list', 'orders');
    });
  }
};
