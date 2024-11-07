import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../utils/firebase";
//contains all current user info
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      return set({ currentUser: null, isLoading: false });
    }

    try {
      const docRef = doc(db, "LenderUsers", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
        // console.log("try if");
      } else {
        set({ currentUser: null, isLoading: false });
        // console.log("try else");
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
