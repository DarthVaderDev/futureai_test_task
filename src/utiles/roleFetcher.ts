import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseClient";

export const fetchUserRole = async (uid: string): Promise<string | null> => {
  try {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.role || null;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
