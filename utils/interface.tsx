export interface ErrandItemProps {
  id: string;
  title: string;
  notes: string;
  status: string;
  category: string;
  startDate: string;
  repeat: string;
  repeatDayOfWeek: string[];
  repeatDayOfMonth: number[];
  dueDate?: string;
  time?: string;
  addedDate: Date;
  user: string;
}
