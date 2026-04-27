# Business Logic

> **Purpose**: Domain-specific business rules, formulas, and logic - the WHY behind how the system works.
>
> **Related Docs**:
> - `ARCHITECTURE_GUIDE.md` - System design and patterns
> - `CODEBASE_MAP.md` - File locations and navigation
> - `CODE_PRINCIPLES.md` - Code quality standards

---

## How to Use This File

This file documents **domain-specific business logic** that isn't obvious from reading the code. It answers "why does the system work this way?" rather than "where is the code?"

**IMPORTANT: This is a template.** Sections below contain example placeholders. When customizing for your project:
1. **DELETE the example rows/sections entirely** (don't just fill them in)
2. **ADD your actual content** following the same format
3. **REMOVE sections that don't apply** to your project

**When to update this file:**
- After implementing complex business rules
- When formulas or calculations are non-obvious
- When business decisions affect code structure
- After learning domain knowledge that future developers need

---

## Core Concepts

<!-- DELETE the example rows below and add your actual concepts -->

| Concept | Definition | Key Rule |
|---------|------------|----------|
| *Example: Order* | *A customer's purchase request* | *Must have at least one item* |

---

## Business Rules

<!-- DELETE the example section below and add your actual rules -->

### *Example: Pricing Rules*

**Rule**: *Discounts cannot exceed 50% of original price*

**Why**: *Prevents accidental/malicious extreme discounts*

**Implementation**: See `pricing.service.ts`

**Example**:
```
Input: 100% discount requested
Rule applied: Cap at 50%
Output: 50% discount applied
```

---

## Formulas and Calculations

<!-- DELETE the example section below and add your actual formulas -->

### *Example: Tax Calculation*

**Purpose**: *Calculate sales tax for an order*

**Formula**:
```
tax = subtotal * taxRate
total = subtotal + tax
```

**Variables**:
- `subtotal`: Sum of item prices
- `taxRate`: Jurisdiction-specific rate (0.0 - 0.15)

**Implementation**: `tax.service.ts`

---

## Process Flows

<!-- DELETE the example section below and add your actual flows -->

### *Example: Order Fulfillment*

```
1. Order placed - Payment captured
2. Inventory reserved - Stock decremented
3. Shipment created - Carrier notified
   └── If out of stock: Backorder created
4. Delivered - Order completed
```

**Business Rules Applied**:
- At step 2: Cannot oversell inventory
- At step 3: Carrier selected by cheapest rate

---

## State Transitions

<!-- DELETE the example section below and add your actual states -->

### *Example: Order Lifecycle*

```
PENDING → CONFIRMED → SHIPPED → DELIVERED
              ↓
          CANCELLED
```

**Transition Rules**:

| From | To | Trigger | Conditions |
|------|-----|---------|------------|
| PENDING | CONFIRMED | Payment success | Valid payment method |
| CONFIRMED | CANCELLED | User request | Within 24 hours |

---

## Domain Terminology

<!-- DELETE the example rows below and add your actual terms -->

| Term | Definition | Context |
|------|------------|---------|
| *SKU* | *Stock Keeping Unit - unique product identifier* | *Inventory management* |

---

## Configuration Parameters

<!-- DELETE the example rows below and add your actual parameters -->

| Parameter | Purpose | Default | Valid Range |
|-----------|---------|---------|-------------|
| *maxCartItems* | *Limit items per cart* | *50* | *1-100* |

---

## Edge Cases and Special Handling

<!-- DELETE the example section below and add your actual edge cases -->

### *Example: Zero-Quantity Orders*

**Scenario**: User submits order with 0 items

**Problem**: Would create invalid order record

**Solution**: Validation rejects at API layer

---

## Business Constraints

<!-- DELETE the example rows below and add your actual constraints -->

| Constraint | Reason | Enforcement |
|------------|--------|-------------|
| *Min order $10* | *Shipping cost economics* | *Checkout validation* |

---

## Integration Points

<!-- DELETE the example section below and add your actual integrations -->

### *Example: Payment Gateway*

**Purpose**: Process credit card payments

**Key Interactions**:
- We send: Card token, amount, currency
- We receive: Transaction ID, status

**Business Rules**:
- Retry failed payments up to 3 times

---

*This document captures domain knowledge that isn't obvious from the code. Keep it updated as business rules evolve.*
