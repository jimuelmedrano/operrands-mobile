import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "@react-native-firebase/firestore";

export function getAllErrands(
  user: string,
  setErrandsData: (errands: Object[]) => void
) {
  const firestore = getFirestore();

  const q = query(collection(firestore, "errands"), where("user", "==", user));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let errandsList: Object[] = [];
    querySnapshot.forEach((doc) => {
      errandsList.push({
        id: doc.id,
        title: doc.data().title,
        notes: doc.data().notes,
        status: doc.data().status,
        category: doc.data().category,
        startDate: doc.data().startDate.toDate(),
        repeat: doc.data().repeat,
        repeatDayOfWeek: doc.data().repeatDayOfWeek,
        repeatDayOfMonth: doc.data().repeatDayOfMonth,
        dueDate: doc.data().dueDate,
        addedDate: doc.data().addedDate.toDate(),
        user: doc.data().user,
      });
    });
    setErrandsData(errandsList);
  });
  return () => unsubscribe();
}
