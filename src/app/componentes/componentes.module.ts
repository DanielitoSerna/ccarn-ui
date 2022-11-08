import {NgModule} from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { BadgeComponent } from './badge/badge.component';
import { PrimeModule } from '../primeNG/prime.module';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    MomentPipe,
    BadgeComponent,
    TitleComponent
  ],
  imports: [
    PrimeModule
  ],
  exports: [
    MomentPipe,
    BadgeComponent,
    TitleComponent
  ],
  providers: [],
})
export class ComponentesModule {}
