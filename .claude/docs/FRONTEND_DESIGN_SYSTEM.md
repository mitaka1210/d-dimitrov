# Frontend Design System

> **Purpose**: UI patterns, component conventions, and styling standards for consistent frontend development.
>
> **Related Docs**:
> - `ARCHITECTURE_GUIDE.md` - System design and patterns
> - `CODEBASE_MAP.md` - File locations and navigation
> - `CODE_PRINCIPLES.md` - Code quality standards

---

## How to Use This File

This file documents **frontend-specific patterns and conventions** to ensure UI consistency across the application.

**IMPORTANT: This is a template.** Sections below contain example values. When customizing for your project:
1. **REPLACE example values** with your actual design tokens
2. **ADD your actual components** following the same format
3. **REMOVE sections that don't apply** to your project

**When to update this file:**
- After establishing new UI patterns
- When adding reusable components
- After defining color/spacing/typography standards
- When component APIs are finalized

---

## Design Tokens

<!-- CUSTOMIZE: Document your design tokens -->

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#3B82F6` | Primary actions, links |
| `--color-secondary` | `#6B7280` | Secondary text, borders |
| `--color-success` | `#10B981` | Success states |
| `--color-warning` | `#F59E0B` | Warning states |
| `--color-error` | `#EF4444` | Error states |
| `--color-background` | `#FFFFFF` | Page background |
| `--color-surface` | `#F9FAFB` | Card/panel background |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-family` | `Inter, system-ui, sans-serif` | Body text |
| `--font-mono` | `JetBrains Mono, monospace` | Code |
| `--text-xs` | `0.75rem` | Labels, captions |
| `--text-sm` | `0.875rem` | Secondary text |
| `--text-base` | `1rem` | Body text |
| `--text-lg` | `1.125rem` | Subheadings |
| `--text-xl` | `1.25rem` | Headings |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `0.25rem` | Tight spacing |
| `--space-2` | `0.5rem` | Default gap |
| `--space-4` | `1rem` | Section padding |
| `--space-6` | `1.5rem` | Card padding |
| `--space-8` | `2rem` | Section margins |

---

## Component Patterns

<!-- CUSTOMIZE: Document your reusable component patterns -->

### Button

**Location**: `components/ui/Button.tsx`

**Variants**:
- `primary` - Main actions
- `secondary` - Secondary actions
- `danger` - Destructive actions
- `ghost` - Tertiary actions

**Usage**:
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable interactions |
| `loading` | `boolean` | `false` | Show loading spinner |

### Card

**Location**: `components/ui/Card.tsx`

**Usage**:
```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Modal

**Location**: `components/ui/Modal.tsx`

**Usage**:
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Confirm Action">
  <p>Are you sure?</p>
  <ModalActions>
    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </ModalActions>
</Modal>
```

---

## Form Patterns

<!-- CUSTOMIZE: Document form conventions -->

### Form Layout

```tsx
<Form onSubmit={handleSubmit}>
  <FormField>
    <Label htmlFor="name">Name</Label>
    <Input id="name" {...register('name')} />
    <FieldError>{errors.name?.message}</FieldError>
  </FormField>

  <FormActions>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>
```

### Validation Display

- Errors shown below field in red
- Success state shows green border
- Required fields marked with asterisk

---

## Layout Patterns

<!-- CUSTOMIZE: Document layout conventions -->

### Page Layout

```tsx
<PageContainer>
  <PageHeader>
    <PageTitle>Page Title</PageTitle>
    <PageActions>
      <Button>Action</Button>
    </PageActions>
  </PageHeader>

  <PageContent>
    {/* Main content */}
  </PageContent>
</PageContainer>
```

### Grid System

- Use CSS Grid or Flexbox
- Default gap: `--space-4`
- Max content width: `1200px`
- Responsive breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`

---

## State Indicators

<!-- CUSTOMIZE: Document how different states are displayed -->

### Loading States

| Component | Loading Display |
|-----------|----------------|
| Button | Spinner replaces text |
| Table | Skeleton rows |
| Card | Skeleton content |
| Page | Full page spinner |

### Empty States

```tsx
<EmptyState
  icon={<InboxIcon />}
  title="No items yet"
  description="Create your first item to get started"
  action={<Button>Create Item</Button>}
/>
```

### Error States

```tsx
<ErrorState
  title="Something went wrong"
  description={error.message}
  action={<Button onClick={retry}>Try Again</Button>}
/>
```

---

## Accessibility Standards

<!-- CUSTOMIZE: Document accessibility requirements -->

### Requirements

- All interactive elements keyboard accessible
- Focus visible indicators on all focusable elements
- Color contrast ratio minimum 4.5:1 for text
- Form fields have associated labels
- Images have alt text
- ARIA labels for icon-only buttons

### Focus Management

- Modal opens: focus trapped inside
- Modal closes: focus returns to trigger
- Tab order follows visual order

---

## Animation Guidelines

<!-- CUSTOMIZE: Document animation conventions -->

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Fade | `150ms` | `ease-out` | Tooltips, dropdowns |
| Slide | `200ms` | `ease-in-out` | Panels, modals |
| Scale | `150ms` | `ease-out` | Buttons, cards |

**Principles**:
- Subtle over flashy
- Respect `prefers-reduced-motion`
- No animations > 300ms for UI elements

---

## Dark Mode (if applicable)

<!-- CUSTOMIZE: Document dark mode conventions -->

### Color Mapping

| Light Mode | Dark Mode |
|------------|-----------|
| `--color-background: #FFFFFF` | `--color-background: #111827` |
| `--color-surface: #F9FAFB` | `--color-surface: #1F2937` |
| `--color-text: #111827` | `--color-text: #F9FAFB` |

### Implementation

```tsx
// Use CSS variables, theme toggles automatically
<div className="bg-background text-foreground">
```

---

## Icon System

<!-- CUSTOMIZE: Document icon conventions -->

**Icon Library**: [e.g., Lucide React, Heroicons]

**Sizes**:
- `sm`: 16px - Inline with text
- `md`: 20px - Buttons, default
- `lg`: 24px - Headers, emphasis

**Usage**:
```tsx
import { Plus, Trash, Edit } from 'lucide-react';

<Button>
  <Plus className="w-5 h-5 mr-2" />
  Add Item
</Button>
```

---

*This document ensures consistent UI patterns across the frontend. Update when patterns evolve.*
