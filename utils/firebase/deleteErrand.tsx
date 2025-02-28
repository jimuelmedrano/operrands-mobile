import {
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@react-native-firebase/firestore";
import { ErrandItemProps } from "../interface";
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
