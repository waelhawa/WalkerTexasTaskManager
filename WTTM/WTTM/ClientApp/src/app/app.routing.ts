import { Routes, RouterModule } from "@angular/router";
import { BacklogComponent } from "./backlog/backlog.component";

import { HomeComponent } from "./home/home.component";
import { NewTaskPageComponent } from "./new-task-page/new-task-page.component";
import { SprintDetailsComponent } from "./sprint-details/sprint-details.component";
import { SprintComponent } from "./sprint/sprint.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '/new-task-page', component: NewTaskPageComponent},
  {path: '/backlog', component: BacklogComponent},
  {path: '/sprint', component: SprintComponent},


  {path: '**', redirectTo: ''}
]

export const appRoutingModule = RouterModule.forRoot(routes);
