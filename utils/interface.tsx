import { Timestamp } from "@react-native-firebase/firestore";
export interface ErrandItemProps {
  id: string;
  title: string;
  notes: string;
  status: string;
  category: string;
  startDate: Date;
  repeat: string;
  repeatDayOfWeek: string[];
  repeatDayOfMonth: number[];
  dueDate?: string;
  addedDate: Timestamp;
  user: string;
}
