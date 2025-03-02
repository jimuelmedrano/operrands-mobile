import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  writeBatch,
} from "@react-native-firebase/firestore";
import moment from "moment";

export async function onSignInUserInfo(
  displayName: string | null,
  email: string | null
) {
  const firestore = getFirestore();

  const q = query(collection(firestore, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);

  const userExists = querySnapshot.docs.length > 0;
  if (displayName === null) {
    displayName = email!.split("@")[0];
  }

  if (!userExists) {
    await addUser(displayName, email);
    await addDefaultErrands(email);
  }
}

// Adding single data to firestore
async function addUser(displayName: string | null, email: string | null) {
  const firestore = getFirestore();

  try {
    await addDoc(collection(firestore, "users"), {
      displayName: displayName,
      email: email,
      categories: ["To do", "Daily", "Weekly", "Monthly"],
      dateCreated: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
}

// Adding multiple data to firestore
async function addDefaultErrands(email: string | null) {
  const firestore = getFirestore();
  try {
    await addDoc(collection(firestore, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Create new errand",
      notes: "Click the add button to create a new errand",
      status: "todo",
      category: "To do",
      startDate: moment().toISOString().split("T")[0],
      repeat: "None",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
    await addDoc(collection(firestore, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Check daily errands",
      notes: "Click the daily errands category button",
      status: "todo",
      category: "To do",
      startDate: moment().toISOString().split("T")[0],
      repeat: "None",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
    await addDoc(collection(firestore, "errands"), {
      user: email,
      addedDate: new Date(),
      title: "Sample errand",
      notes: "Edit or delete this errand by clicking on it",
      status: "todo",
      category: "Daily",
      startDate: moment().toISOString().split("T")[0],
      repeat: "Daily",
      repeatDayOfWeek: ["Mon"],
      repeatDayOfMonth: [1],
    });
  } catch (error) {
    console.log(error);
  }
}
