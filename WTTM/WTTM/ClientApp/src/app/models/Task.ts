export interface Task
{
  taskId: number;
  sprintId: number;
  userId: string;
  dateCreated: Date;
  shortDesc: string;
  fullDesc: string;
  storyPoint: number;
  isCompleted: boolean;
  taskStatus: string;
  dateCompleted: Date;
}
