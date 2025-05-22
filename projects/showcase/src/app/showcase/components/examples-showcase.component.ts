import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertComponent,
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  CheckboxComponent,
  DatepickerComponent,
  FormFieldComponent,
  InputComponent,
  RadioComponent,
  SelectComponent,
  TabComponent,
  TableColumnComponent,
  TableComponent,
  TabsComponent,
} from 'design-lib';
import { ShowcaseSectionComponent } from '../shared/showcase-section.component';
import { ExampleBoxComponent } from '../shared/example-box.component';
import { NgClass, NgFor } from '@angular/common';

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: Date;
}

interface Activity {
  user: string;
  action: string;
  time: string;
}

@Component({
  selector: 'app-examples-showcase',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    ReactiveFormsModule,
    ShowcaseSectionComponent,
    ExampleBoxComponent,
    AlertComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    InputComponent,
    RadioComponent,
    SelectComponent,
    TableComponent,
    TableColumnComponent,
    TabsComponent,
    TabComponent,
  ],
  template: `
    <app-showcase-section title="Complete Examples">
      <!-- User Profile Page -->
      <app-example-box
        title="User Profile Page"
        description="A complete user profile management example"
      >
        <ds-card>
          <div class="p-4">
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Profile Picture and Basic Info -->
              <div class="md:w-1/3 flex flex-col items-center">
                <div class="mb-4">
                  <ds-avatar
                    size="xl"
                    name="John Doe"
                    src="https://i.pravatar.cc/150?img=68"
                    className="w-32 h-32"
                  >
                  </ds-avatar>
                </div>

                <div class="text-center mb-4">
                  <h2 class="text-xl font-semibold">John Doe</h2>
                  <p class="text-neutral-500">Product Manager</p>
                  <div class="flex justify-center mt-2">
                    <ds-badge variant="primary">Premium Member</ds-badge>
                  </div>
                </div>

                <div class="w-full flex flex-col space-y-3">
                  <div class="flex justify-between">
                    <span class="text-neutral-500">Member since</span>
                    <span>Jan 2021</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-500">Last login</span>
                    <span>2 days ago</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-500">Email</span>
                    <span>john.doe.com</span>
                  </div>
                </div>
              </div>

              <!-- User Information -->
              <div class="md:w-2/3">
                <ds-tabs>
                  <ds-tab title="Profile Information">
                    <form
                      [formGroup]="profileForm"
                      class="flex flex-col space-y-4 mt-4"
                    >
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ds-form-field
                          label="First Name"
                          [required]="true"
                          [control]="profileForm.get('firstName')!"
                        >
                          <ds-input
                            type="text"
                            placeholder="Enter first name"
                            formControlName="firstName"
                          ></ds-input>
                        </ds-form-field>

                        <ds-form-field
                          label="Last Name"
                          [required]="true"
                          [control]="profileForm.get('lastName')!"
                        >
                          <ds-input
                            type="text"
                            placeholder="Enter last name"
                            formControlName="lastName"
                          ></ds-input>
                        </ds-form-field>
                      </div>

                      <ds-form-field
                        label="Email Address"
                        [required]="true"
                        [control]="profileForm.get('email')!"
                      >
                        <ds-input
                          type="email"
                          placeholder="Enter email address"
                          formControlName="email"
                        ></ds-input>
                      </ds-form-field>

                      <ds-form-field
                        label="Phone Number"
                        [control]="profileForm.get('phone')!"
                      >
                        <ds-input
                          type="tel"
                          placeholder="Enter phone number"
                          formControlName="phone"
                        ></ds-input>
                      </ds-form-field>

                      <ds-form-field
                        label="Date of Birth"
                        [control]="profileForm.get('birthdate')!"
                      >
                        <ds-datepicker
                          placeholder="YYYY-MM-DD"
                          formControlName="birthdate"
                        ></ds-datepicker>
                      </ds-form-field>

                      <ds-form-field
                        label="Job Title"
                        [control]="profileForm.get('jobTitle')!"
                      >
                        <ds-input
                          type="text"
                          placeholder="Enter job title"
                          formControlName="jobTitle"
                        ></ds-input>
                      </ds-form-field>

                      <ds-form-field
                        label="Bio"
                        [control]="profileForm.get('bio')!"
                      >
                        <ds-input
                          type="text"
                          placeholder="Tell us about yourself"
                          formControlName="bio"
                        ></ds-input>
                      </ds-form-field>

                      <div class="flex flex-col space-y-2 pt-2">
                        <ds-checkbox
                          label="Receive email notifications"
                          formControlName="emailNotifications"
                        ></ds-checkbox>

                        <ds-checkbox
                          label="Receive SMS notifications"
                          formControlName="smsNotifications"
                        ></ds-checkbox>
                      </div>

                      <div class="pt-4 flex justify-end space-x-3">
                        <ds-button variant="secondary">Cancel</ds-button>
                        <ds-button
                          variant="primary"
                          [disabled]="profileForm.invalid"
                          [ngClass]="{
                            'opacity-50 cursor-not-allowed':
                              profileForm.invalid,
                          }"
                        >
                          Save Changes
                        </ds-button>
                      </div>
                    </form>
                  </ds-tab>

                  <ds-tab title="Security">
                    <form
                      [formGroup]="securityForm"
                      class="flex flex-col space-y-4 mt-4"
                    >
                      <ds-form-field
                        label="Current Password"
                        [required]="true"
                        [control]="securityForm.get('currentPassword')!"
                      >
                        <ds-input
                          type="password"
                          placeholder="Enter current password"
                          formControlName="currentPassword"
                        ></ds-input>
                      </ds-form-field>

                      <ds-form-field
                        label="New Password"
                        [required]="true"
                        [control]="securityForm.get('newPassword')!"
                      >
                        <ds-input
                          type="password"
                          placeholder="Enter new password"
                          formControlName="newPassword"
                        ></ds-input>
                      </ds-form-field>

                      <ds-form-field
                        label="Confirm Password"
                        [required]="true"
                        [control]="securityForm.get('confirmPassword')!"
                      >
                        <ds-input
                          type="password"
                          placeholder="Confirm new password"
                          formControlName="confirmPassword"
                        ></ds-input>
                      </ds-form-field>

                      <ds-alert type="info" title="Password Requirements">
                        Your password must be at least 8 characters long and
                        include at least one uppercase letter, one lowercase
                        letter, one number, and one special character.
                      </ds-alert>

                      <div class="pt-4 flex justify-end space-x-3">
                        <ds-button variant="secondary">Cancel</ds-button>
                        <ds-button
                          variant="primary"
                          [disabled]="securityForm.invalid"
                          [ngClass]="{
                            'opacity-50 cursor-not-allowed':
                              securityForm.invalid,
                          }"
                        >
                          Update Password
                        </ds-button>
                      </div>
                    </form>
                  </ds-tab>

                  <ds-tab title="Preferences">
                    <div class="flex flex-col space-y-4 mt-4">
                      <h3 class="text-lg font-medium">Language & Region</h3>
                      <ds-form-field label="Language">
                        <ds-select [options]="languageOptions"></ds-select>
                      </ds-form-field>

                      <ds-form-field label="Time Zone">
                        <ds-select [options]="timezoneOptions"></ds-select>
                      </ds-form-field>

                      <h3 class="text-lg font-medium pt-4">Theme</h3>
                      <ds-form-field label="Interface Theme">
                        <ds-radio
                          [options]="themeOptions"
                          name="theme"
                          direction="horizontal"
                        ></ds-radio>
                      </ds-form-field>

                      <h3 class="text-lg font-medium pt-4">Privacy</h3>
                      <div class="flex flex-col space-y-2">
                        <ds-checkbox
                          label="Show my online status"
                        ></ds-checkbox>

                        <ds-checkbox
                          label="Share my activities with followers"
                        ></ds-checkbox>

                        <ds-checkbox
                          label="Allow others to tag me in photos"
                        ></ds-checkbox>
                      </div>

                      <div class="pt-4 flex justify-end">
                        <ds-button variant="primary"
                          >Save Preferences</ds-button
                        >
                      </div>
                    </div>
                  </ds-tab>
                </ds-tabs>
              </div>
            </div>
          </div>
        </ds-card>
      </app-example-box>

      <!-- Dashboard Example -->
      <app-example-box
        title="Dashboard"
        description="Data-rich dashboard layout example"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <!-- Stats Cards -->
          <ds-card
            [noHeader]="true"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <div class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white text-opacity-80 text-sm">Total Users</p>
                  <p class="text-2xl font-semibold">2,542</p>
                  <p class="text-white text-opacity-80 text-sm mt-1">
                    +12% from last month
                  </p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-full">
                  <!-- Icon would go here -->
                </div>
              </div>
            </div>
          </ds-card>

          <ds-card
            [noHeader]="true"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white"
          >
            <div class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white text-opacity-80 text-sm">Revenue</p>
                  <p class="text-2xl font-semibold">$42,389</p>
                  <p class="text-white text-opacity-80 text-sm mt-1">
                    +5.2% from last month
                  </p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-full">
                  <!-- Icon would go here -->
                </div>
              </div>
            </div>
          </ds-card>

          <ds-card
            [noHeader]="true"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          >
            <div class="p-4">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-white text-opacity-80 text-sm">Orders</p>
                  <p class="text-2xl font-semibold">1,253</p>
                  <p class="text-white text-opacity-80 text-sm mt-1">
                    +8.7% from last month
                  </p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-full">
                  <!-- Icon would go here -->
                </div>
              </div>
            </div>
          </ds-card>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Main content -->
          <div class="md:col-span-2">
            <ds-card title="Recent Orders">
              <ds-table [data]="orders" [filterable]="true" [paginated]="true">
                <ds-table-column field="id" header="Order ID" [sortable]="true">
                </ds-table-column>
                <ds-table-column
                  field="customer"
                  header="Customer"
                  [sortable]="true"
                >
                </ds-table-column>
                <ds-table-column
                  field="amount"
                  header="Amount"
                  [sortable]="true"
                  [format]="formatCurrency"
                  align="right"
                >
                </ds-table-column>
                <ds-table-column
                  field="status"
                  header="Status"
                  [sortable]="true"
                >
                </ds-table-column>
                <ds-table-column
                  field="date"
                  header="Date"
                  [sortable]="true"
                  [format]="formatDate"
                >
                </ds-table-column>
              </ds-table>
            </ds-card>
          </div>

          <!-- Sidebar -->
          <div class="md:col-span-1">
            <ds-card title="Recent Activity" subtitle="Latest system events">
              <div class="flex flex-col space-y-4">
                <div *ngFor="let activity of recentActivities" class="flex">
                  <div class="mr-3">
                    <ds-avatar size="sm" [name]="activity.user"></ds-avatar>
                  </div>
                  <div>
                    <p class="text-sm">
                      <span class="font-medium">{{ activity.user }}</span>
                      {{ activity.action }}
                    </p>
                    <p class="text-xs text-neutral-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-neutral-200">
                <ds-button variant="link" size="sm"
                  >View All Activity</ds-button
                >
              </div>
            </ds-card>

            <ds-card title="Quick Actions" className="mt-4">
              <div class="flex flex-col space-y-2">
                <ds-button variant="primary" [fullWidth]="true"
                  >Create New Order</ds-button
                >
                <ds-button variant="secondary" [fullWidth]="true"
                  >Generate Report</ds-button
                >
                <!--                <ds-button variant="outline" [fullWidth]="true">View Settings</ds-button>-->
              </div>
            </ds-card>
          </div>
        </div>
      </app-example-box>

      <!-- Auth Example -->
      <app-example-box
        title="Authentication Examples"
        description="Login and registration forms"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Login Form -->
          <ds-card title="Login Form" [hoverable]="true">
            <form [formGroup]="loginForm" class="flex flex-col space-y-4">
              <ds-form-field
                label="Email or Username"
                [required]="true"
                [control]="loginForm.get('email')!"
              >
                <ds-input
                  type="email"
                  placeholder="Enter your email or username"
                  formControlName="email"
                ></ds-input>
              </ds-form-field>

              <ds-form-field
                label="Password"
                [required]="true"
                [control]="loginForm.get('password')!"
              >
                <ds-input
                  type="password"
                  placeholder="Enter your password"
                  formControlName="password"
                ></ds-input>
              </ds-form-field>

              <div class="flex items-center justify-between">
                <ds-checkbox
                  label="Remember me"
                  formControlName="remember"
                ></ds-checkbox>
                <ds-button variant="link" size="sm">Forgot Password?</ds-button>
              </div>

              <ds-button
                variant="primary"
                [fullWidth]="true"
                [disabled]="loginForm.invalid"
                [ngClass]="{
                  'opacity-50 cursor-not-allowed': loginForm.invalid,
                }"
              >
                Log In
              </ds-button>

              <div class="text-center pt-2">
                <p class="text-sm text-neutral-600">
                  Don't have an account?
                  <a href="#" class="text-primary-600 hover:underline"
                    >Sign up</a
                  >
                </p>
              </div>
            </form>
          </ds-card>

          <!-- Registration Form -->
          <ds-card title="Registration Form" [hoverable]="true">
            <form [formGroup]="registerForm" class="flex flex-col space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ds-form-field
                  label="First Name"
                  [required]="true"
                  [control]="registerForm.get('firstName')!"
                >
                  <ds-input
                    type="text"
                    placeholder="Enter your first name"
                    formControlName="firstName"
                  ></ds-input>
                </ds-form-field>

                <ds-form-field
                  label="Last Name"
                  [required]="true"
                  [control]="registerForm.get('lastName')!"
                >
                  <ds-input
                    type="text"
                    placeholder="Enter your last name"
                    formControlName="lastName"
                  ></ds-input>
                </ds-form-field>
              </div>

              <ds-form-field
                label="Email Address"
                [required]="true"
                [control]="registerForm.get('email')!"
              >
                <ds-input
                  type="email"
                  placeholder="Enter your email"
                  formControlName="email"
                ></ds-input>
              </ds-form-field>

              <ds-form-field
                label="Password"
                [required]="true"
                [control]="registerForm.get('password')!"
              >
                <ds-input
                  type="password"
                  placeholder="Create a password"
                  formControlName="password"
                ></ds-input>
              </ds-form-field>

              <ds-form-field
                label="Confirm Password"
                [required]="true"
                [control]="registerForm.get('confirmPassword')!"
              >
                <ds-input
                  type="password"
                  placeholder="Confirm your password"
                  formControlName="confirmPassword"
                ></ds-input>
              </ds-form-field>

              <ds-checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                formControlName="terms"
              ></ds-checkbox>

              <ds-button
                variant="primary"
                [fullWidth]="true"
                [disabled]="registerForm.invalid"
                [ngClass]="{
                  'opacity-50 cursor-not-allowed': registerForm.invalid,
                }"
              >
                Create Account
              </ds-button>

              <div class="text-center pt-2">
                <p class="text-sm text-neutral-600">
                  Already have an account?
                  <a href="#" class="text-primary-600 hover:underline"
                    >Log in</a
                  >
                </p>
              </div>
            </form>
          </ds-card>
        </div>
      </app-example-box>
    </app-showcase-section>
  `,
})
export class ExamplesShowcaseComponent {
  profileForm!: FormGroup;
  securityForm!: FormGroup;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  languageOptions = [
    { value: 'en', label: 'English (US)' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
  ];

  timezoneOptions = [
    { value: 'utc', label: 'UTC (Coordinated Universal Time)' },
    { value: 'est', label: 'EST (Eastern Standard Time)' },
    { value: 'cst', label: 'CST (Central Standard Time)' },
    { value: 'mst', label: 'MST (Mountain Standard Time)' },
    { value: 'pst', label: 'PST (Pacific Standard Time)' },
  ];

  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
  ];

  orders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      amount: 235.89,
      status: 'completed',
      date: new Date('2023-01-15'),
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      amount: 125.99,
      status: 'completed',
      date: new Date('2023-01-17'),
    },
    {
      id: 'ORD-003',
      customer: 'Robert Johnson',
      amount: 432.5,
      status: 'pending',
      date: new Date('2023-01-18'),
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      amount: 78.25,
      status: 'completed',
      date: new Date('2023-01-20'),
    },
    {
      id: 'ORD-005',
      customer: 'David Wilson',
      amount: 349.99,
      status: 'cancelled',
      date: new Date('2023-01-22'),
    },
    {
      id: 'ORD-006',
      customer: 'Emily Taylor',
      amount: 189.5,
      status: 'pending',
      date: new Date('2023-01-23'),
    },
  ];

  recentActivities: Activity[] = [
    { user: 'John D.', action: 'created a new order', time: '12 minutes ago' },
    {
      user: 'Sarah M.',
      action: 'updated product inventory',
      time: '45 minutes ago',
    },
    {
      user: 'Robert J.',
      action: 'completed profile setup',
      time: '2 hours ago',
    },
    {
      user: 'Lisa T.',
      action: 'changed account settings',
      time: '5 hours ago',
    },
    {
      user: 'Michael B.',
      action: 'added new payment method',
      time: 'Yesterday at 4:30 PM',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  initForms() {
    this.profileForm = this.fb.group({
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
      birthdate: ['1985-06-15'],
      jobTitle: ['Product Manager'],
      bio: [
        'Experienced product manager with focus on UX and customer satisfaction.',
      ],
      emailNotifications: [true],
      smsNotifications: [false],
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  formatDate(value: Date): string {
    if (!value) return '';
    return value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
