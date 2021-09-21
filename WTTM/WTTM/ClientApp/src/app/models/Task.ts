export interface Task
{
  TaskId: number;
  SprintId: number;
  UserId: string;
  DateCreated: Date;
  ShortDesc: string;
  FullDesc: string;
  StoryPoint: number;
  IsCompleted: boolean;
  TaskStatus: string;
  DateCompleted: number;
}
