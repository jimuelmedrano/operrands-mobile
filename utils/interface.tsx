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
  addedDate: Date;
  user: string;
}
