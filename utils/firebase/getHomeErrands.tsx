import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "@react-native-firebase/firestore";

export function getHomeErrands(
  user: string,
  setErrandsData: (errands: Object[]) => void
) {
  const firestore = getFirestore();

  const q = query(collection(firestore, "errands"), where("user", "==", user));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let errandsList: Object[] = [];
    querySnapshot.forEach((doc) => {
      errandsList.push({ id: doc.id, ...doc.data() });
    });
    setErrandsData(errandsList);
  });
  return () => unsubscribe();
}
