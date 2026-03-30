import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export const authService = {
  async login(email: string, pass: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      return result.user;
    } catch (error: any) {
      console.error('Login Error: ', error.message);
      throw error;
    }
  },

  async register(email: string, pass: string, restaurantName: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      const user = result.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        restaurantName,
        role: 'user',
        createdAt: Timestamp.now()
      });

      // Update Firebase Auth profile
      await updateProfile(user, { displayName: restaurantName });

      return user;
    } catch (error: any) {
      console.error('Registration Error: ', error.message);
      throw error;
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout Error: ', error.message);
      throw error;
    }
  },

  async getUserProfile(uid: string) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error: any) {
      console.error('Get Profile Error: ', error.message);
      throw error;
    }
  }
};
