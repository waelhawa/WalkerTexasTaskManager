--Create database TaskManager;

--use WTTM_DB;

--create table teams
--(
--teamId int identity (1,1),
--primary key (teamId),
--teamName nvarchar (50),
--teamPoints int
--);

--go

--create table users 
--(
--userId nvarchar(450) not null,
--primary key (userId),
--teamId int references teams(teamId),
--displayName nvarchar(50)
--);

--go

--create table sprints
--(
--sprintId int identity (1,1),
--primary key (sprintId),
--teamId int references teams(teamId),
--dateCreated date not null,
--dateCompleted date not null,
--isCompleted bit not null,
--sprintStatus nvarchar (30),
--totalStoryPoints int
--);

--go

create table tasks
(
taskId int identity (1,1),
primary key (taskId),
sprintId int references sprints(sprintId),
userId nvarchar(450) references AspNetUsers(Id),
dateCreated date not null,
dateCompleted date not null,
shortDesc nvarchar (50) not null,
fullDesc nvarchar (300) not null,
storyPoint int not null,
isCompleted bit not null,
taskStatus nvarchar (30)
);

--alter table AspNetUsers
--add teamId int references teams(teamId);

