# Vending Machine API Assessment

## Overview

Welcome to the Audience Engineering take-home assessment. Please spend no more than **120 minutes** to build a REST API for a vending machine using Cloudflare Workers.

The project scaffold is ready to go — TypeScript, Vitest, and a sample endpoint with a test are included to get you started. Your goal is to implement the API in `src/index.ts` (and any additional files you create in `src/`) to match the specification below.

## Getting Started

### Prerequisites

- Node.js (v24)
- npm

### Setup

```bash
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run your test suite |
| `npm run dev` | Start a local development server at `http://localhost:8787` |

## The Machine

### Inventory

Your vending machine comes pre-stocked with the following items:

| ID | Name | Price | Starting Stock |
|----|------|-------|----------------|
| `fizz-pop` | Fizz Pop | $1.25 | 10 |
| `mega-crunch` | Mega Crunch Chips | $1.50 | 5 |
| `choco-loco` | Choco Loco Bar | $0.75 | 12 |
| `h2-whoa` | H2-Whoa Water | $1.00 | 8 |

### Accepted Denominations

The machine accepts the following:

| Denomination | Value |
|-------------|-------|
| Quarter | $0.25 |
| Half Dollar | $0.50 |
| Dollar | $1.00 |
| Five Dollar Bill | $5.00 |

Any other amount should be rejected.

## API Specification

All responses must return valid `application/json`. All error responses use the shape `{ "error": "<message>" }`.

---

### `GET /items`

Returns all items currently in the vending machine.

**Response** `200 OK`
```json
{
  "items": [
    { "id": "fizz-pop", "name": "Fizz Pop", "price": 1.25, "stock": 10 },
    { "id": "mega-crunch", "name": "Mega Crunch Chips", "price": 1.50, "stock": 5 },
    { "id": "choco-loco", "name": "Choco Loco Bar", "price": 0.75, "stock": 12 },
    { "id": "h2-whoa", "name": "H2-Whoa Water", "price": 1.00, "stock": 8 }
  ]
}
```

The `stock` values shown above are the initial values. Stock is decremented by 1 each time an item is purchased and is reflected in subsequent `GET /items` responses.

---

### `PUT /money`

Insert money into the machine. The amount must be a valid denomination.

**Request body**
```json
{ "amount": 1.00 }
```

**Response** `200 OK`
```json
{ "inserted": 1.00, "balance": 1.00 }
```

**Response** `400 Bad Request` — return this for any of the following:
- The body is not valid JSON
- The `amount` field is missing
- The `amount` is not a number
- The `amount` is zero, negative, or not an accepted denomination

```json
{ "error": "Invalid denomination" }
```

---

### `GET /money`

Check the current balance (total money inserted that hasn't been spent or refunded).

**Response** `200 OK`
```json
{ "balance": 0 }
```

---

### `DELETE /money`

Refund all inserted money. Resets the balance to zero.

**Response** `200 OK`
```json
{ "refunded": 1.50 }
```

---

### `POST /purchase/:itemId`

Purchase an item from the machine. The balance must be sufficient, and the item must exist and be in stock. On success, the balance resets to zero and any overpayment is returned as change.

**Response** `200 OK`
```json
{ "item": "fizz-pop", "price": 1.25, "change": 3.75 }
```

**On failure**, the balance and stock are unchanged. The customer's money stays in the machine and can be used for another purchase or refunded.

**Response** `400 Bad Request` — insufficient funds (including zero balance)
```json
{ "error": "Insufficient funds" }
```

**Response** `404 Not Found` — item does not exist
```json
{ "error": "Item not found" }
```

**Response** `409 Conflict` — item is out of stock
```json
{ "error": "Out of stock" }
```

---

### Unknown Routes and Methods

- Any path not listed above should return `404 Not Found` (including `/`)
- Using the wrong HTTP method on a valid path (e.g. `POST /items`, `GET /purchase/fizz-pop`) should return `404` or `405`

## Tests

A sample test is included in `test/index.spec.ts` to show you how the testing infrastructure works. It uses `SELF` from `cloudflare:test` — a service binding that lets you make HTTP requests to your worker just like a real client.

You are expected to **write your own tests** for the vending machine API. Use the sample as a starting point.

```bash
npm test
```

We will run our own test suite against your submission to verify your API matches the spec. Writing thorough tests of your own will help ensure your implementation is correct.

## Evaluation

We will evaluate your submission on:

- **Correctness** — Does your API match the spec? We will run our own test suite against your submission.
- **Your tests** — How thorough are they? Do they cover edge cases?
- **Code quality** — Structure, organization, TypeScript usage, readability
- **NOTES.md** — Your design decisions, tradeoffs, and how you approached the problem

## Stretch Goals

If you finish the core API with time to spare, consider these optional challenges. They are **not tested** by the automated suite and are **not required**.

- **Persistence** — What happens to the machine state when the worker restarts? How might you make it durable?
- **Admin capabilities** — Could you add endpoints to restock the machine or add new items?
- **Documentation** — Write up your design decisions, tradeoffs you considered, and what you'd do differently with more time
- **Deployment** — Deploy your solution, share us a link to the live example (CloudFlare has a generous free tier)

## Rules

- AI usage is permitted, but you must be able to explain every line of your code in a follow-up conversation
- Write your own tests in the `test/` directory
- You may create additional files in `src/`
- You may modify `wrangler.jsonc` if needed (e.g., for storage bindings)
- Do not modify or delete `commit.txt`
- All work should be your own (with or without AI assistance)

## Submission

1. Push your solution to a **private** GitHub repository
2. Add **`webdev@technologyadvice.com`** as a collaborator on the repo (Settings → Collaborators → Add people)
3. Include a `NOTES.md` file with:
   - Your approach and key design decisions
   - Tradeoffs you considered
   - What you would improve with more time
   - How you used AI tools (if applicable)
4. Let your recruiter know when you're done
