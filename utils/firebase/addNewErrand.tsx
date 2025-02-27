import {
  getFirestore,
  collection,
  addDoc,
} from "@react-native-firebase/firestore";
import { ErrandItemProps } from "../interface";
export async function addNewErrand(errandData: ErrandItemProps) {
  const firestore = getFirestore();
  const db = firestore.collection("errands");
  try {
    await addDoc(collection(firestore, "cities"), errandData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
