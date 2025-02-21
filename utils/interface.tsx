export interface ErrandItemProps {
  id: number;
  title: string;
  notes: string;
  status: string;
  category: string;
  startDate: Date;
  repeat: string;
  repeatDayOfWeek: string[];
  repeatDayOfMonth: number[];
  dueDate?: Date;
}
