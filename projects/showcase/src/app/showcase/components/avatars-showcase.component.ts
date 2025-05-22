import {Component} from '@angular/core';
import {AvatarComponent,} from 'ng-design-system-lib';
import {ShowcaseSectionComponent} from '../shared/showcase-section.component';
import {ExampleBoxComponent} from '../shared/example-box.component';

@Component({
  selector: 'app-avatar-showcase',
  standalone: true,
  imports: [
    AvatarComponent,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
  ],
  template: `
    <app-showcase-section title="Layout Components">
      <!-- Avatars -->
      <app-example-box
        title="Avatars"
        description="User or entity representations"
      >
        <div class="flex flex-col space-y-4">
          <div>
            <p class="text-sm text-neutral-600 mb-2">Avatar Sizes:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar size="xs" name="User"></ds-avatar>
              <ds-avatar size="sm" name="User"></ds-avatar>
              <ds-avatar size="md" name="User"></ds-avatar>
              <ds-avatar size="lg" name="User"></ds-avatar>
              <ds-avatar size="xl" name="User"></ds-avatar>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Image Avatars:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar src="https://i.pravatar.cc/150?img=1" name="John Doe">
              </ds-avatar>
              <ds-avatar
                src="https://i.pravatar.cc/150?img=2"
                name="Jane Smith"
              >
              </ds-avatar>
              <ds-avatar
                src="https://i.pravatar.cc/150?img=3"
                name="Alex Johnson"
              >
              </ds-avatar>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Initials Avatars:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar name="John Doe"></ds-avatar>
              <ds-avatar name="Jane Smith"></ds-avatar>
              <ds-avatar name="Alex Johnson"></ds-avatar>
              <ds-avatar name="Single"></ds-avatar>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">With Status:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar name="John" status="online"></ds-avatar>
              <ds-avatar name="Jane" status="offline"></ds-avatar>
              <ds-avatar name="Alex" status="away"></ds-avatar>
              <ds-avatar name="Pat" status="busy"></ds-avatar>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Square Avatars:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar name="John Doe" [rounded]="false"></ds-avatar>
              <ds-avatar
                src="https://i.pravatar.cc/150?img=4"
                name="Jane Smith"
                [rounded]="false"
              >
              </ds-avatar>
            </div>
          </div>

          <div>
            <p class="text-sm text-neutral-600 mb-2">Custom Background:</p>
            <div class="flex flex-wrap items-center gap-3">
              <ds-avatar name="Custom" bgColor="#6366f1"></ds-avatar>
              <ds-avatar name="Colors" bgColor="#ec4899"></ds-avatar>
              <ds-avatar name="Example" bgColor="#14b8a6"></ds-avatar>
            </div>
          </div>
        </div>
      </app-example-box>

    </app-showcase-section>
  `,
})
export class AvatarsShowcaseComponent {}
