import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@react-native-firebase/firestore";

export async function getHomeErrands(
  user: string,
  setErrandsData: (errands: Object[]) => void
) {
  const firestore = getFirestore();

  const q = query(
    collection(firestore, "errands"),
    where("user", "==", user),
    where("status", "==", "todo"),
    orderBy("addedDate", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let errandsList: Object[] = [];
    querySnapshot.forEach((doc) => {
      errandsList.push({
        id: doc.id,
        title: doc.data().title,
        notes: doc.data().notes,
        status: doc.data().status,
        category: doc.data().category,
        startDate: doc.data().startDate,
        repeat: doc.data().repeat,
        repeatDayOfWeek: doc.data().repeatDayOfWeek,
        repeatDayOfMonth: doc.data().repeatDayOfMonth,
        dueDate: doc.data().dueDate,
        time: doc.data().time,
        addedDate: doc.data().addedDate.toDate(),
        user: doc.data().user,
      });
    });
    setErrandsData(errandsList);
  });
  return () => unsubscribe();
}
