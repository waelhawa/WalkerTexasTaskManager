Create database TaskManager;

use TaskManager;

create table teams
(
teamId int identity (1,1),
primary key (teamId)
);

create table users 
(
userId int identity(1,1),
primary key (userId),
teamId int references teams(teamId)
);

create table sprints
(
sprintId int identity (1,1),
primary key (sprintId),
teamId int references teams(teamId)
);

create table tasks
(
taskId int identity (1,1),
primary key (taskId),
sprintId int references sprints(sprintId)
);