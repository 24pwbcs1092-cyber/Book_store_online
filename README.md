<<<<<<< HEAD
# book-store
=======
# Online Bookstore Management API

A RESTful API for managing an online bookstore built with Node.js, Express, and MongoDB.

## Features

- ✅ Complete CRUD operations for books
- ✅ Search books by author and genre
- ✅ Pagination support
- ✅ Request logging middleware
- ✅ Global error handling
- ✅ Input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm

## Installation

1. Clone the repository or navigate to the project directory:
```bash
cd Bookstore_API
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Edit the `.env` file and update the MongoDB connection string if using Atlas:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookstore
```

For MongoDB Atlas, use:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bookstore
```

4. Make sure MongoDB is running (if using local MongoDB):
```bash
# On Windows (if installed as service)
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

## Running the Application

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api/books
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books (with pagination & search) |
| GET | `/api/books/:id` | Get a single book by ID |
| POST | `/api/books` | Create a new book |
| PUT | `/api/books/:id` | Update a book by ID |
| DELETE | `/api/books/:id` | Delete a book by ID |

### Query Parameters

**Pagination:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Search:**
- `author` - Search by author name (case-insensitive)
- `genre` - Search by genre (case-insensitive)

**Example:**
```
GET /api/books?author=rowling&page=1&limit=5
GET /api/books?genre=fiction&limit=20
```

## Request Examples

### 1. Create a Book (POST)
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher Stone",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "price": 29.99,
    "publishedDate": "1997-06-26",
    "inStock": true
  }'
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/books" -Method POST -ContentType "application/json" -Body '{
  "title": "Harry Potter and the Philosopher Stone",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "price": 29.99,
  "publishedDate": "1997-06-26",
  "inStock": true
}'
```

### 2. Get All Books (GET)
```bash
curl http://localhost:5000/api/books
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/books"
```

### 3. Get Book by ID (GET)
```bash
curl http://localhost:5000/api/books/<book_id>
```

### 4. Update a Book (PUT)
```bash
curl -X PUT http://localhost:5000/api/books/<book_id> \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24.99,
    "inStock": false
  }'
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/books/<book_id>" -Method PUT -ContentType "application/json" -Body '{
  "price": 24.99,
  "inStock": false
}'
```

### 5. Delete a Book (DELETE)
```bash
curl -X DELETE http://localhost:5000/api/books/<book_id>
```

**PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/books/<book_id>" -Method DELETE
```

### 6. Search Books
```bash
# Search by author
curl "http://localhost:5000/api/books?author=rowling"

# Search by genre
curl "http://localhost:5000/api/books?genre=fantasy"

# Pagination
curl "http://localhost:5000/api/books?page=2&limit=5"
```

## Response Format

### Success Response (200/201):
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response (400/404/500):
```json
{
  "success": false,
  "error": "Error message"
}
```

### List Response (with pagination):
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [ ... ]
}
```

## Book Schema

```javascript
{
  title: String (required),
  author: String (required),
  genre: String,
  price: Number (required, min: 0),
  publishedDate: Date,
  inStock: Boolean (default: true)
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error or invalid ID)
- `404` - Not Found
- `500` - Server Error

## Project Structure

```
Bookstore_API/
├── src/
│   ├── models/
│   │   └── book.js           # Mongoose Book schema
│   ├── controllers/
│   │   └── bookController.js # Controller logic
│   ├── routes/
│   │   └── bookRoutes.js     # API routes
│   └── middleware/
│       ├── logger.js         # Request logger
│       └── errorHandler.js   # Global error handler
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── server.js                # Application entry point
└── README.md                # Documentation
```

## Development Notes

- The API uses Mongoose for MongoDB interactions
- All dates should be in ISO 8601 format
- The request logger logs all incoming requests with timestamps
- Validation errors return detailed error messages
- The API is case-insensitive for search operations

## License

ISC
>>>>>>> cc98bf0 (the book store api all files)
