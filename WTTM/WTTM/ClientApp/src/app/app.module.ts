import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BanditComponent } from './bandit/bandit.component';
import { NewTaskPageComponent } from './new-task-page/new-task-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { BacklogComponent } from './backlog/backlog.component';
import { TaskComponent } from './task/task.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { SprintPageComponent } from './sprint-page/sprint-page.component';
import { NewTeamPageComponent } from './new-team-page/new-team-page.component';
import { NewSprintComponent } from './new-sprint/new-sprint.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BanditComponent,
    NewTaskPageComponent,
    TaskPageComponent,
    BacklogComponent,
    TaskComponent,
    SprintComponent,
    SprintDetailsComponent,
    SprintPageComponent,
    NewTeamPageComponent,
    NewSprintComponent
  ],
  imports: [
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,

     RouterModule.forRoot([
       { path: '', component: HomeComponent, pathMatch: 'full' },
       { path: 'sprint-page/:id', component: SprintPageComponent},
       { path: 'sprint-details', component: SprintDetailsComponent},
       { path: 'backlog', component: BacklogComponent },
       { path: 'new-task-page', component: NewTaskPageComponent },
       { path: 'task-page/:id', component: TaskPageComponent},
       { path: 'new-team-page', component: NewTeamPageComponent },
       { path: 'new-sprint', component: NewSprintComponent },


       //{ path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
     ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
