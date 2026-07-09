# StockFlow – Design Overview

## 1. Data Model (MongoDB)

- **User:** Credentials & roles (`admin` / `shopper`).
- **Product:** Details with a unique `sku`.
- **Store:** Store locations/details.
- **Inventory:** Tracks `quantity` per product per store.
  - _Note:_ Uses a compound unique index on `(productId, storeId)` to prevent duplicate tracking records.

---

## 2. Core Business Logic

### Preventing Negative Stock

- Uses atomic `findOneAndUpdate()`.
- The query strictly checks if `quantity >= requested_amount` _during_ the update.
- Prevents race conditions without manual database locks.

### Stock Transfers

- Uses MongoDB **Transactions** (ACID).
- **Process:** Deduct from Source ➔ Add to Destination ➔ Commit.
- If any step fails, the entire operation rolls back automatically.

---

## 3. Architecture (Layered)

- **Routes:** API endpoints.
- **Controllers:** HTTP request/response handling.
- **Services:** Business logic (stock logic, transfers).
- **Models:** Database schemas (Mongoose).
