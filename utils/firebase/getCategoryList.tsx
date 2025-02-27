import {
  collection,
  getFirestore,
  query,
  where,
  onSnapshot,
} from "@react-native-firebase/firestore";

export function getCategoryList(
  email: string,
  setCategories: (category: string[]) => void
) {
  const firestore = getFirestore();

  const q = query(collection(firestore, "users"), where("email", "==", email));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setCategories(doc.data().categories);
    });
  });
  return () => unsubscribe();
}
