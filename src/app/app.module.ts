import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DataService } from './services/data.service';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCgx5GWpu9y2AgF7BJtET2R99pNRMM341k'
    })
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyCgx5GWpu9y2AgF7BJtET2R99pNRMM341k"
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
