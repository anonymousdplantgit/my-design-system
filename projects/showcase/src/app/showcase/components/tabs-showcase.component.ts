import {Component} from '@angular/core';
import {TabComponent, TabsComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
}

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    TabsComponent,
    TabComponent,

  ],
  template: `
    <app-showcase-section title="Data Display Components">
      <!-- Tabs -->
      <app-example-box
        title="Tabs"
        description="Organize content into separate views"
      >
        <div class="flex flex-col space-y-6">
          <div>
            <p class="text-sm text-neutral-600 mb-2">Default Tabs:</p>
            <ds-tabs>
              <ds-tab title="Profile">
                <div class="py-3">
                  <h3 class="font-medium">Profile Content</h3>
                  <p class="mt-1">This is the content for the profile tab.</p>
                </div>
              </ds-tab>
              <ds-tab title="Settings">
                <div class="py-3">
                  <h3 class="font-medium">Settings Content</h3>
                  <p class="mt-1">This is the content for the settings tab.</p>
                </div>
              </ds-tab>
              <ds-tab title="Notifications">
                <div class="py-3">
                  <h3 class="font-medium">Notifications Content</h3>
                  <p class="mt-1">
                    This is the content for the notifications tab.
                  </p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Pills Variant:</p>
            <ds-tabs variant="pills">
              <ds-tab title="Day">
                <div class="py-3">
                  <p>Daily view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Week">
                <div class="py-3">
                  <p>Weekly view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Month">
                <div class="py-3">
                  <p>Monthly view content</p>
                </div>
              </ds-tab>
              <ds-tab title="Year">
                <div class="py-3">
                  <p>Yearly view content</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Underlined Tabs:</p>
            <ds-tabs variant="underline">
              <ds-tab title="Details">
                <div class="py-3">
                  <p>Details content</p>
                </div>
              </ds-tab>
              <ds-tab title="Documents">
                <div class="py-3">
                  <p>Documents content</p>
                </div>
              </ds-tab>
              <ds-tab title="Activity" [disabled]="true">
                <div class="py-3">
                  <p>Activity content</p>
                </div>
              </ds-tab>
              <ds-tab title="History">
                <div class="py-3">
                  <p>History content</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Full Width Tabs:</p>
            <ds-tabs [fullWidth]="true" [justified]="true">
              <ds-tab title="Tab 1">
                <div class="py-3">
                  <p>Content for tab 1</p>
                </div>
              </ds-tab>
              <ds-tab title="Tab 2">
                <div class="py-3">
                  <p>Content for tab 2</p>
                </div>
              </ds-tab>
              <ds-tab title="Tab 3">
                <div class="py-3">
                  <p>Content for tab 3</p>
                </div>
              </ds-tab>
            </ds-tabs>
          </div>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class TabsShowcaseComponent {

}
