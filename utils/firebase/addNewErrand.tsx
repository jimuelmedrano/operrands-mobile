import {
  getFirestore,
  collection,
  addDoc,
  initializeFirestore,
} from "@react-native-firebase/firestore";
import { getApp } from "@react-native-firebase/app";
import { ErrandItemProps } from "../interface";
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
