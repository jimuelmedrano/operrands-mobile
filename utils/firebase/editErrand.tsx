import {
  getFirestore,
  addDoc,
  doc,
  updateDoc,
} from "@react-native-firebase/firestore";
import { ErrandItemProps } from "../interface";
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
