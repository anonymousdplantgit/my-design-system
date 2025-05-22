# Design Lib - Angular Design System

A comprehensive Angular design system library built with Tailwind CSS, providing a complete set of UI components for modern web applications.

## Features

- 🎨 **Complete Design System**: Buttons, Forms, Tables, Modals, and more
- 🚀 **Angular 19 Compatible**: Built with the latest Angular features
- 💨 **Tailwind CSS Integration**: Consistent styling with utility classes
- 📱 **Responsive Design**: Mobile-first approach
- ♿ **Accessibility**: WCAG compliant components
- 🎯 **TypeScript**: Full type safety
- 📦 **Tree Shakable**: Import only what you need

## Installation

```bash
npm install @besaitech/ng-design-system-lib
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install @angular/common @angular/core date-fns

npm install -D tailwindcss@3.4.1 postcss autoprefixer
```

## Quick Start

1. **Add the following in your** tailwind.config.js file located on the root folder:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // IMPORTANT: Include your design library
    "./node_modules/@besaitech/ng-design-system-lib/**/*.{html,ts,js,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        warning: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        neutral: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        }
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(0, 114, 245, 0.3)",
      }
    },
  },
  plugins: [],
}

```

1. **Import the components** in your Angular module or standalone component:

```typescript
import { ButtonComponent, InputComponent, CardComponent } from '@besaitech/ng-design-system-lib';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, InputComponent, CardComponent],
  template: `
    <ds-card title="Example Card">
      <ds-input placeholder="Enter text"></ds-input>
      <ds-button variant="primary">Submit</ds-button>
    </ds-card>
  `
})
export class ExampleComponent {}
```

2. **Configure Tailwind CSS** by adding the library paths to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@besaitech/ng-design-system-lib/**/*.{html,ts,js,mjs}"
  ],
  // ... rest of your config
}
```

## Available Components

### Form Components
- `ds-input` - Text inputs with validation
- `ds-select` - Dropdown selections
- `ds-checkbox` - Checkbox inputs
- `ds-radio` - Radio button groups
- `ds-datepicker` - Date selection
- `ds-form-field` - Form field wrapper with labels and validation

### UI Components
- `ds-button` - Buttons with multiple variants
- `ds-card` - Content containers
- `ds-modal` - Dialog overlays
- `ds-alert` - Notification messages
- `ds-badge` - Status indicators
- `ds-avatar` - User avatars
- `ds-progress-bar` - Progress indicators
- `ds-spinner` - Loading spinners
- `ds-table` - Data tables with sorting and pagination
- `ds-tabs` - Tabbed content
- `ds-tooltip` - Contextual help

## Example Usage

### Button Component
```html
<ds-button variant="primary" size="md" [raised]="true">
  Click me
</ds-button>
```

### Form with Validation
```typescript
// Component
export class MyFormComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required]
  });
}
```

```html
<!-- Template -->
<form [formGroup]="form">
  <ds-form-field label="Email" [required]="true" [control]="form.get('email')!">
    <ds-input type="email" formControlName="email"></ds-input>
  </ds-form-field>
  
  <ds-form-field label="Name" [required]="true" [control]="form.get('name')!">
    <ds-input type="text" formControlName="name"></ds-input>
  </ds-form-field>
</form>
```

### Data Table
```html
<ds-table [data]="users" [filterable]="true" [paginated]="true">
  <ds-table-column field="name" header="Name" [sortable]="true"></ds-table-column>
  <ds-table-column field="email" header="Email" [sortable]="true"></ds-table-column>
  <ds-table-column field="status" header="Status"></ds-table-column>
</ds-table>
```

## Styling and Theming

The library uses Tailwind CSS for styling. You can customize the design system by:

1. **Custom Colors**: Override the color palette in your `tailwind.config.js`
2. **Component Classes**: Add custom CSS classes using the `className` input
3. **CSS Variables**: Use CSS custom properties for dynamic theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

MIT © [BESAITECH]

## Changelog

### 1.0.0
- Initial release
- Complete set of form and UI components
- Tailwind CSS integration
- Angular 19 support
