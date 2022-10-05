import {NgModule} from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { BadgeComponent } from './badge/badge.component';
import { PrimeModule } from '../primeNG/prime.module';

@NgModule({
  declarations: [
    MomentPipe,
    BadgeComponent
  ],
  imports: [
    PrimeModule
  ],
  exports: [
    MomentPipe,
    BadgeComponent
  ],
  providers: [],
})
export class ComponentesModule {}
