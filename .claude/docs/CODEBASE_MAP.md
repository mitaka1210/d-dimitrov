# Codebase Map

> **Purpose**: X-ray vision into the codebase - WHERE things are located with file paths for instant navigation.
>
> **Related Docs**:
> - `ARCHITECTURE_GUIDE.md` - System design, patterns, and principles
> - `BUSINESS_LOGIC.md` - Domain business rules and formulas
> - `CODE_PRINCIPLES.md` - Code quality standards and hard limits

---

## How to Use This File

This file provides instant navigation to any part of the system.

**IMPORTANT: This is a template.** Sections below contain example placeholders. When customizing for your project:
1. **DELETE the example rows/sections entirely** (don't just fill them in)
2. **ADD your actual content** following the same format
3. **REMOVE sections that don't apply** to your project

**When to update this file:**
- After adding new services or major functions
- After significant refactoring
- When you find yourself repeatedly searching for the same code

**Format conventions:**
- File paths are relative to project root
- Keep tables sorted by domain/importance

---

## Quick Reference: File Locations

<!-- DELETE the example rows below and add your actual file locations -->

| Domain | Purpose | File Path |
|--------|---------|-----------|
| ***Example** - delete this section* |
| **Orders** | Type definitions | `src/services/orders/types.ts` |
| | Main service | `src/services/orders/order.service.ts` |
| **API** | Auth middleware | `src/api/middleware/auth.middleware.ts` |

---

## Quick Reference: Key Functions

<!-- DELETE the example rows below and add your actual functions -->

| Function | Location | Purpose |
|----------|----------|---------|
| ***Example** - delete this section* |
| `createOrder()` | `order.service.ts` | Creates new order |
| `validatePayment()` | `payment.service.ts` | Validates payment data |

---

## Entity/State Lifecycle

<!-- DELETE the example section below and add your actual states -->

### *Example: Order States*

```
PENDING → CONFIRMED → SHIPPED → DELIVERED
              ↓
          CANCELLED
```

**States**:
- `PENDING` - Order created, awaiting payment
- `CONFIRMED` - Payment received
- `SHIPPED` - Handed to carrier
- `DELIVERED` - Customer received
- `CANCELLED` - Order cancelled

---

## Data Flow Examples

<!-- DELETE the example section below and add your actual flows -->

### *Example: Order Creation Flow*

```
1. Frontend → User submits order form
2. API Controller → Validates input
3. Order Service → Creates order record
4. Payment Service → Processes payment
5. Notification Service → Sends confirmation
6. Frontend → Shows success
```

---

## API Endpoints

<!-- DELETE the example rows below and add your actual endpoints -->

| Route | Method | Handler | Purpose |
|-------|--------|---------|---------|
| ***Example** - delete this section* |
| `/api/orders` | GET | `order.controller.ts` | List orders |
| `/api/orders` | POST | `order.controller.ts` | Create order |
| `/api/orders/:id` | GET | `order.controller.ts` | Get single order |

---

## WebSocket Events (if applicable)

<!-- DELETE the example rows below and add your actual events -->

| Event | Emitted From | Payload | Purpose |
|-------|--------------|---------|---------|
| ***Example** - delete this section* |
| `order:created` | `order.service.ts` | `{ orderId, status }` | Notifies new order |
| `order:updated` | `order.service.ts` | `{ orderId, changes }` | Broadcasts updates |

---

## Configuration Locations

<!-- DELETE the example rows below and add your actual config locations -->

| Config Type | Location | Purpose |
|-------------|----------|---------|
| ***Example** - delete this section* |
| System defaults | `src/config/defaults.ts` | Base configuration |
| Environment vars | `.env` / `.env.example` | Environment-specific |
| Database config | `prisma/schema.prisma` | Database schema |

---

## Common Debugging Entry Points

<!-- DELETE the example section below and add your actual debugging scenarios -->

***Example** - delete this section*

**Issue: Order not processing**
1. Check: `order.service.ts` - Is order being created?
2. Check: `payment.service.ts` - Is payment processing?
3. Check: Database - Is order record persisted?

**Issue: Frontend not updating**
1. Check: WebSocket connection in browser dev tools
2. Check: `websocket.service.ts` - Events being emitted?
3. Check: React component - State updating?

---

## Architecture Decision Records

<!-- DELETE the example section below and add your actual decisions -->

***Example** - delete this section*

**Why separate Order and Payment services?**
- Problem: Payment logic was tangled with order logic
- Solution: Extract payment into dedicated service
- Rationale: Enables different payment providers, cleaner testing

---

## Performance Hotspots

<!-- DELETE the example section below and add your actual hotspots -->

***Example** - delete this section*

**Critical Paths** (optimize these):

1. **Order creation** - Must complete in <500ms
   - Entry: `order.service.ts`
   - Optimize: Database queries, payment API calls

---

## Testing Reference

<!-- DELETE the example rows below and add your actual test locations -->

| Domain | Unit Tests | Integration Tests |
|--------|------------|-------------------|
| ***Example** - delete this section* |
| Orders | `order.service.test.ts` | `order.integration.test.ts` |
| Payments | `payment.service.test.ts` | - |

---

*This map provides instant navigation to any part of the system. Keep it updated as the codebase evolves.*
