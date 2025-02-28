import { addDoc, getFirestore } from "@react-native-firebase/firestore";

export async function onSignInUserInfo(
  displayName: string | null,
  email: string | null
) {
  const firestore = getFirestore();
  const userRef = firestore.collection("users");
  const errandRef = firestore.collection("errands");

  if (displayName === null) {
    displayName = email!.split("@")[0];
  }
  const userExists =
    (await userRef.where("email", "==", email).get()).docs.length > 0;

  if (!userExists) {
    await addUser(displayName, email);
    await addDefaultErrands(email);
  }
}

// Adding single data to firestore
async function addUser(displayName: string | null, email: string | null) {
  const firestore = getFirestore();
  const userRef = firestore.collection("users");
  await addDoc(userRef, {
    displayName: displayName,
    email: email,
    categories: ["To do", "Daily", "Weekly", "Monthly"],
    dateCreated: new Date(),
  });
}

// Adding multiple data to firestore
async function addDefaultErrands(email: string | null) {
  const firestore = getFirestore();
  const errandRef = firestore.collection("errands");
  console.log("Adding default errands");
  let batch = firestore.batch();

  batch.set(errandRef.doc(), {
    user: email,
    addedDate: new Date(),
    title: "Create new errand",
    notes: "Click the add button to create a new errand",
    status: "To do",
    category: "To do",
    startDate: new Date(),
    repeat: "None",
    repeatDayOfWeek: ["Mon"],
    repeatDayOfMonth: [1],
    dueDate: "None",
  });
  batch.set(errandRef.doc(), {
    user: email,
    addedDate: new Date(),
    title: "Check daily errands",
    notes: "Click the daily errands category button",
    status: "To do",
    category: "To do",
    startDate: new Date(),
    repeat: "None",
    repeatDayOfWeek: ["Mon"],
    repeatDayOfMonth: [1],
    dueDate: "None",
  });
  batch.set(errandRef.doc(), {
    user: email,
    addedDate: new Date(),
    title: "Sample errand",
    notes: "Edit or delete this errand by clicking on it",
    status: "To do",
    category: "Daily",
    startDate: new Date(),
    repeat: "Daily",
    repeatDayOfWeek: ["Mon"],
    repeatDayOfMonth: [1],
    dueDate: "None",
  });

  await batch.commit();

  console.log("Default errands added successfully");
}
