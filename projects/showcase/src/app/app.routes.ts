import { Routes } from '@angular/router';
import { ButtonsShowcaseComponent } from './showcase/components/buttons-showcase.component';
import { ProgressShowcaseComponent } from './showcase/components/progress-showcase.component';
import { TooltipsShowcaseComponent } from './showcase/components/tooltips-showcase.component';
import { ModalsShowcaseComponent } from './showcase/components/modals-showcase.component';
import { AlertsShowcaseComponent } from './showcase/components/alerts-showcase.component';
import { SelectsShowcaseComponent } from './showcase/components/selects-showcase.component';
import { FormsShowcaseComponent } from './showcase/components/forms-showcase.component';
import { TabsShowcaseComponent } from './showcase/components/tabs-showcase.component';
import { BadgesShowcaseComponent } from './showcase/components/badges-showcase.component';
import { TablesShowcaseComponent } from './showcase/components/tables-showcase.component';
import { AvatarsShowcaseComponent } from './showcase/components/avatars-showcase.component';
import { CardsShowcaseComponent } from './showcase/components/cards-showcase.component';
import { ExamplesShowcaseComponent } from './showcase/components/examples-showcase.component';
import { DashboardComponent } from './showcase/components/dashboard.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'examples',
    component: ExamplesShowcaseComponent,
  },
  {
    path: 'buttons',
    component: ButtonsShowcaseComponent,
  },
  {
    path: 'selects',
    component: SelectsShowcaseComponent,
  },
  {
    path: 'tables',
    component: TablesShowcaseComponent,
  },
  {
    path: 'avatars',
    component: AvatarsShowcaseComponent,
  },
  {
    path: 'cards',
    component: CardsShowcaseComponent,
  },
  {
    path: 'alerts',
    component: AlertsShowcaseComponent,
  },
  {
    path: 'tooltips',
    component: TooltipsShowcaseComponent,
  },
  {
    path: 'tabs',
    component: TabsShowcaseComponent,
  },
  {
    path: 'badges',
    component: BadgesShowcaseComponent,
  },
  {
    path: 'tooltips',
    component: TooltipsShowcaseComponent,
  },
  {
    path: 'modals',
    component: ModalsShowcaseComponent,
  },
  {
    path: 'progress',
    component: ProgressShowcaseComponent,
  },
  {
    path: 'tables',
    component: TablesShowcaseComponent,
  },
  {
    path: 'forms',
    component: FormsShowcaseComponent,
  },
];
