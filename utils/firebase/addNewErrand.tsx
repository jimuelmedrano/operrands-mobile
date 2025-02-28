import {
  getFirestore,
  collection,
  addDoc,
} from "@react-native-firebase/firestore";
import { ErrandItemProps } from "../interface";
export async function addNewErrand(errandData: ErrandItemProps) {
  const firestore = getFirestore();
  try {
    await addDoc(collection(firestore, "errands"), errandData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
