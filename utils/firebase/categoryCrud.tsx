import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  writeBatch,
  onSnapshot,
  query,
  where,
} from "@react-native-firebase/firestore";
import { ErrandItemProps } from "../interface";

// CREATE
export async function addNewCategory(
  categoryName: string,
  currentCategories: string[],
  categoryId: string
) {
  const firestore = getFirestore();
  const docRef = doc(firestore, "users", categoryId);
  currentCategories.push(categoryName);
  try {
    await updateDoc(docRef, {
      categories: currentCategories,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// READ
export function getCategoryList(
  email: string,
  setCategories: (category: string[]) => void,
  setCategoryId: (categoryId: string) => void
) {
  const firestore = getFirestore();

  const q = query(collection(firestore, "users"), where("email", "==", email));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setCategoryId(doc.id);
      setCategories(doc.data().categories);
    });
  });
  return () => unsubscribe();
}

// UPDATE
export async function editCategory(
  errandData: ErrandItemProps[],
  newCategoryName: string,
  newCategories: string[],
  categoryId: string
) {
  const db = getFirestore();
  const batch = writeBatch(db);

  const categoryRef = doc(db, "users", categoryId);
  batch.update(categoryRef, { categories: newCategories });

  errandData.forEach((data) => {
    const ref = doc(db, "errands", data.id);
    batch.update(ref, { category: newCategoryName });
  });
  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// DELETE
export async function deleteCategory(
  categoryToDelete: string,
  currentCategories: string[],
  categoryId: string,
  errandData: ErrandItemProps[]
) {
  const db = getFirestore();

  const batch = writeBatch(db);
  const categoryRef = doc(db, "users", categoryId);
  batch.update(categoryRef, {
    categories: currentCategories.filter(
      (category) => category !== categoryToDelete
    ),
  });

  errandData.forEach((data) => {
    const ref = doc(db, "errands", data.id);
    batch.delete(ref);
  });
  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
