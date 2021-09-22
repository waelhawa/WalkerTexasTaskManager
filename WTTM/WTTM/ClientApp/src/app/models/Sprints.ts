export interface Sprints {
    sprintId: number;
    teamId: number;
    dateCreated: Date;
    dateCompleted: Date;
    totalStoryPoint: number;
    isCompleted: boolean;
    sprintStatus: string;
}