import {
  getFirestore,
  collection,
  addDoc,
  initializeFirestore,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "@react-native-firebase/firestore";
import { getApp } from "@react-native-firebase/app";
import { ErrandItemProps } from "../interface";

// CREATE
export async function addNewErrand(errandData: ErrandItemProps) {
  const db = await initializeFirestore(getApp(), {
    ignoreUndefinedProperties: true,
  });

  try {
    await addDoc(collection(db, "errands"), errandData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// READ (Home errands and All errands)

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
        startDate: doc.data().startDate,
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

// UPDATE
export async function editErrand(errandData: ErrandItemProps) {
  const firestore = getFirestore();
  const docRef = doc(firestore, "errands", errandData.id);
  try {
    await updateDoc(docRef, {
      title: errandData.title,
      notes: errandData.notes,
      status: errandData.status,
      category: errandData.category,
      startDate: errandData.startDate,
      repeat: errandData.repeat,
      repeatDayOfWeek: errandData.repeatDayOfWeek,
      repeatDayOfMonth: errandData.repeatDayOfMonth,
      dueDate: errandData.dueDate,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// DELETE
export async function deleteErrand(errandData: ErrandItemProps) {
  const firestore = getFirestore();
  try {
    await deleteDoc(doc(firestore, "errands", errandData.id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
