# Architecture Guide

> **Context Loading**: This file is REFERENCED, not loaded. Main Claude should refer to this when making architectural decisions.
>
> **Related Docs**:
> - `CODEBASE_MAP.md` - File locations, function tables, navigation
> - `BUSINESS_LOGIC.md` - Domain-specific business rules and formulas
> - `FRONTEND_DESIGN_SYSTEM.md` - UI patterns and styling (if applicable)

---

**IMPORTANT: This is a template.** The "Project Overview" and "Project Structure" sections contain placeholders. When customizing:
1. **REPLACE placeholder sections** with your actual project info
2. **KEEP the Core Architectural Principles** - these are universal best practices
3. **CUSTOMIZE the Quick Reference** section at the bottom

---

## Project Overview

<!-- REPLACE this section with your project description -->

**Project Name**: [Your Project Name]

**Description**: [Brief description of what the project does]

**Key Characteristics**:
- [Architecture style, e.g., "Service-oriented architecture"]
- [Application type, e.g., "Multi-tenant web application"]
- [Key technologies, e.g., "Express + Next.js on single server"]
- [Database, e.g., "PostgreSQL with Prisma ORM"]
- [Auth approach, e.g., "JWT-based authentication"]

---

## Project Structure

<!-- CUSTOMIZE: Replace with your actual project structure -->

### Backend (`src/`)

```
src/
├── api/                    # REST API Layer
│   ├── controllers/        # Request/response handlers
│   ├── middleware/         # Express middleware
│   └── routes/            # Route definitions
│
├── services/              # Core Business Logic
│   ├── [domain]/          # Domain-specific services
│   └── [domain]/          # Another domain
│
├── [other-dirs]/          # Other directories as needed
│
└── index.ts              # Main entry point
```

### Frontend (`frontend/src/`) (if applicable)

```
frontend/src/
├── app/                   # Next.js App Router / Pages
├── components/           # React components
├── context/             # React Context
├── hooks/               # Custom hooks
└── lib/                 # Utilities
```

### Database (if applicable)

**Key Models**:
- `Model1` - Description
- `Model2` - Description

---

## Core Architectural Principles

### Code Organization Philosophy

**Modular Design**
- Keep files focused on a single, well-defined purpose
- If scrolling multiple times is needed to understand a module, consider splitting it
- Functions should generally fit within a single screen view when reasonable
- Classes should have clear, cohesive responsibilities

**Complexity Guidelines**
- Monitor cyclomatic and cognitive complexity, not just line counts
- Prioritize readability and maintainability over arbitrary size limits
- Split code when it naturally separates into distinct concerns
- Consider the "rule of three": extract common patterns after three occurrences

### Separation of Concerns

**Layered Architecture**
- **Presentation Layer**: User interface and user interaction handling
- **Business Logic Layer**: Core domain logic and business rules
- **Data Access Layer**: Data persistence and retrieval
- **Integration Layer**: External system communications
- **Cross-cutting Concerns**: Logging, security, configuration

**Module Organization Patterns**
```
src/
├── core/               # Core business logic and domain models
├── interfaces/         # External interfaces (UI, API, CLI)
├── infrastructure/     # Technical implementations
├── shared/            # Shared utilities and common code
└── config/            # Configuration management
```

### Single Responsibility Principle

**Functions and Methods**
- Each function should do ONE thing and do it well
- Function names should clearly express their single purpose
- If a function name contains "and" or multiple verbs, consider splitting
- Pure functions (no side effects) are preferred where possible

**Classes and Modules**
- Each class should have ONE reason to change
- Modules should export related functionality
- Avoid "god classes" that know too much or do too much
- Prefer composition over inheritance

### Centralized Calculation Services (DRY Principle)

**CRITICAL**: Key calculations should be centralized in dedicated service functions. DO NOT duplicate formulas inline - always use existing functions.

<!-- CUSTOMIZE: Add your centralized functions here -->

| Calculation | Function | Location | Purpose |
|-------------|----------|----------|---------|
| Example Calc | `calculateExample()` | `src/services/example/calculator.ts` | Does X |

**Anti-Pattern to Avoid**:
```typescript
// BAD - Don't inline formulas
const result = (value1 / value2) * factor; // Duplicates calculator logic

// GOOD - Use centralized functions
const result = calculator.calculateExample(value1, value2, factor);
```

### Configuration Resolution Pattern

If your project uses layered configuration (e.g., system defaults → user defaults → instance overrides):

**Resolution Order** (highest to lowest priority):
1. **Instance override** - Value set on specific instance
2. **User default** - User's personal default
3. **System default** - Code-level default

**Correct Pattern**:
```typescript
// Use the config service - it handles resolution
const resolvedConfig = await configService.getResolvedConfig(instanceId);

// Use resolved values directly - never null
const value = resolvedConfig.someField;
```

**Anti-Pattern**:
```typescript
// BAD - Hardcoded fallbacks bypass user defaults
const value = instance.field ?? 60;
```

## Design Patterns

### Service Pattern
- Encapsulate business logic in service classes
- Services should be stateless when possible
- Use dependency injection for service dependencies
- Services handle one domain concept

### Repository Pattern
- Abstract data access behind interfaces
- Repositories handle data persistence logic
- Keep query logic separate from business logic
- Support different data sources transparently

### Factory Pattern
- Use factories for complex object creation
- Hide instantiation logic from consumers
- Support different implementations
- Centralize configuration-based creation

### Observer Pattern
- Implement event-driven architectures
- Decouple components through events
- Use for cross-cutting concerns
- Enable extensibility without modification

## Modularity Requirements

**Module Characteristics**
- High cohesion within modules
- Low coupling between modules
- Clear, well-defined interfaces
- Independent testability
- Single, focused purpose

**Interface Design**
- Design interfaces from the consumer's perspective
- Keep interfaces small and focused
- Use interface segregation principle
- Document interface contracts clearly
- Version interfaces when breaking changes occur

## Code Quality Standards

**Maintainability**
- Write self-documenting code with clear naming
- Keep functions small and focused
- Avoid deep nesting (max 3-4 levels)
- Extract complex conditionals into well-named functions
- Use consistent patterns throughout the codebase

**Dependency Management**
- Depend on abstractions, not concretions
- Higher-level modules shouldn't depend on lower-level modules
- Both should depend on abstractions
- No circular dependencies allowed
- Minimize coupling between modules

**Error Handling**
- Fail fast with clear error messages
- Handle errors at the appropriate level
- Use structured error types/classes
- Log errors with sufficient context
- Never silently swallow exceptions

## Performance Considerations

**Optimization Guidelines**
- Profile before optimizing
- Optimize algorithms before micro-optimizations
- Consider time and space complexity
- Cache expensive computations appropriately
- Use lazy loading and pagination for large datasets

**Resource Management**
- Clean up resources properly (connections, handles, subscriptions)
- Implement proper connection pooling
- Monitor memory usage and leaks
- Use streaming for large data processing
- Implement appropriate timeouts

## Warning Signs - Technical Debt Indicators

**Architecture Smells**
- Shotgun surgery (one change requires many file modifications)
- Feature envy (modules excessively interested in other modules)
- Inappropriate intimacy (modules know too much about each other)
- Large classes/modules doing too much
- Divergent change (module changes for multiple reasons)

**Code Smells**
- Long parameter lists
- Duplicate code blocks
- Dead code
- Speculative generality
- Temporary fields
- Message chains
- Middle man classes

**Process Smells**
- Increasing bug rates
- Longer development cycles
- Difficult deployments
- Frequent hotfixes
- Developer frustration

## Refactoring Triggers

**Consider Refactoring When:**
- Code is duplicated in three or more places
- A function/class has multiple responsibilities
- Deep nesting makes code hard to follow
- Comments are needed to explain what code does
- Making a change requires modifications in multiple unrelated places
- Test setup is complex and fragile
- Performance bottlenecks are identified
- Security vulnerabilities are discovered

---

## Quick Reference

<!-- CUSTOMIZE: Add your project-specific quick reference -->

### Where to Put New Code

| New Code Type | Location | Example |
|---------------|----------|---------|
| Calculation logic | `src/services/<domain>/` | Pricing logic → `src/services/pricing/` |
| API endpoint | `src/api/routes/` + `src/api/controllers/` | Add route + handler |
| UI component | `frontend/src/components/<category>/` | Form → `components/form/` |
| Database model | `prisma/schema.prisma` | Add model, run migrate |
| New service | `src/services/<domain>/<name>.service.ts` | Export from index.ts |

### Common Patterns

<!-- CUSTOMIZE: Add your project-specific patterns -->

**Reading Configuration**:
```typescript
const config = await configService.getEffectiveConfig(id);
```

**Database Transaction**:
```typescript
await prisma.$transaction(async (tx) => {
  // All operations succeed or all fail
});
```

**Broadcasting Events**:
```typescript
eventEmitter.emit('eventName', { data });
```

---

## Related Documentation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [CODEBASE_MAP.md](./CODEBASE_MAP.md) | File locations, function tables | Navigating code, finding implementations |
| [BUSINESS_LOGIC.md](./BUSINESS_LOGIC.md) | Domain business rules, formulas | Understanding domain logic |
| [FRONTEND_DESIGN_SYSTEM.md](./FRONTEND_DESIGN_SYSTEM.md) | UI patterns, CSS, styling | Frontend component styling |
