import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { NewTaskPageComponent } from "./new-task-page/new-task-page.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'NewTaskPage', component: NewTaskPageComponent},


  {path: '**', redirectTo: ''}
]

export const appRoutingModule = RouterModule.forRoot(routes);
