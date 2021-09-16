export interface Task
{
  TaskId: number;
  SprintId: number;
  UserId: number;
  DateCreated: Date;
  DateCompleted: Date;
  ShortDesc: string;
  FullDesc: string;
  StoryPoint: number;
  IsCompleted: boolean;
  TaskStatus: string;
}
