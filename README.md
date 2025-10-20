# String Analyzer API

A RESTful API service that analyzes strings and computes various properties including length, palindrome status, character frequency, and more.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## ✨ Features

- Analyze strings and compute properties:
  - Length
  - Palindrome detection (case-insensitive)
  - Unique character count
  - Word count
  - SHA-256 hash generation
  - Character frequency mapping
- Store analyzed strings in memory
- Filter strings by multiple criteria
- Natural language query support
- Rate limiting (100 requests per 15 minutes)
- CORS enabled

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v18 or higher)
- **Framework**: Express.js v5.1.0
- **Language**: JavaScript (ES6 Modules)
- **Dependencies**:
  - `express` - Web framework
  - `cors` - Cross-Origin Resource Sharing
  - `express-rate-limit` - API rate limiting
  - `crypto` (built-in) - SHA-256 hash generation

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

To check if you have Node.js and npm installed:

```bash
node --version
npm --version
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Oluwabillionz96/string-analyser-api.git
cd string-analyser-api
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:

- `express` (^5.1.0)
- `cors` (^2.8.5)
- `express-rate-limit` (^8.1.0)
- `nodemon` (^3.1.10) - Dev dependency for auto-restart

---

## 💻 Running Locally

### Development Mode (with auto-restart)

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production Mode

```bash
node app.js
```

### Verify the Server is Running

Open your browser or use curl:

```bash
curl http://localhost:5000
```

You should see:

```json
{
  "message": "Welcome to string analyser"
}
```

---

## 🔌 API Endpoints

### 1. Create/Analyze String

**POST** `/strings`

Analyzes a string and stores its computed properties.

**Request Body:**

```json
{
  "value": "hello world"
}
```

**Success Response (201 Created):**

```json
{
  "id": "b94d27b9934d3e08a52e52d7...",
  "value": "hello world",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "unique_characters": 8,
    "word_count": 2,
    "sha256_hash": "b94d27b9934d3e08a52e52d7...",
    "character_frequency_map": {
      "h": 1,
      "e": 1,
      "l": 3,
      "o": 2,
      "w": 1,
      "r": 1,
      "d": 1
    }
  },
  "created_at": "2025-10-20T10:00:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request` - Invalid request body or missing "value" field
- `409 Conflict` - String already exists
- `422 Unprocessable Entity` - Invalid data type (value must be string)

---

### 2. Get Specific String

**GET** `/strings/{string_value}`

Retrieves a previously analyzed string.

**Example:**

```bash
GET /strings/hello%20world
```

**Success Response (200 OK):**

```json
{
  "id": "b94d27b9934d3e08a52e52d7...",
  "value": "hello world",
  "properties": { ... },
  "created_at": "2025-10-20T10:00:00.000Z"
}
```

**Error Response:**

- `404 Not Found` - String does not exist

---

### 3. Get All Strings (with Filtering)

**GET** `/strings`

Retrieves all strings with optional filtering.

**Query Parameters:**

- `is_palindrome` (boolean) - Filter by palindrome status
- `min_length` (integer) - Minimum string length
- `max_length` (integer) - Maximum string length
- `word_count` (integer) - Exact word count
- `contains_character` (string) - Single character to search for

**Example:**

```bash
GET /strings?is_palindrome=true&min_length=5&word_count=1
```

**Success Response (200 OK):**

```json
{
  "data": [
    {
      "id": "...",
      "value": "racecar",
      "properties": { ... },
      "created_at": "2025-10-20T10:00:00.000Z"
    }
  ],
  "count": 1,
  "filters_applied": {
    "is_palindrome": "true",
    "min_length": "5",
    "word_count": "1"
  }
}
```

**Error Response:**

- `400 Bad Request` - Invalid query parameter values or types

---

### 4. Natural Language Filtering

**GET** `/strings/filter-by-natural-language?query={natural_language_query}`

Filter strings using natural language queries.

**Supported Queries:**

- `"all single word palindromic strings"`
- `"strings longer than 10 characters"`
- `"palindromic strings that contain the first vowel"`
- `"strings containing the letter z"`

**Example:**

```bash
GET /strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
```

**Success Response (200 OK):**

```json
{
  "data": [ ... ],
  "count": 3,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}
```

**Error Responses:**

- `400 Bad Request` - Unable to parse natural language query
- `422 Unprocessable Entity` - Query parsed but resulted in conflicting filters

---

### 5. Delete String

**DELETE** `/strings/{string_value}`

Deletes a string from the system.

**Example:**

```bash
DELETE /strings/hello%20world
```

**Success Response:**

- `204 No Content` (Empty response body)

**Error Response:**

- `404 Not Found` - String does not exist

---

## 📝 Usage Examples

### Using cURL

```bash
# 1. Analyze a string
curl -X POST http://localhost:5000/strings \
  -H "Content-Type: application/json" \
  -d '{"value": "racecar"}'

# 2. Get a specific string
curl http://localhost:5000/strings/racecar

# 3. Get all palindromes
curl "http://localhost:5000/strings?is_palindrome=true"

# 4. Natural language query
curl "http://localhost:5000/strings/filter-by-natural-language?query=single%20word%20palindromic%20strings"

# 5. Delete a string
curl -X DELETE http://localhost:5000/strings/racecar
```

### Using JavaScript (Fetch API)

```javascript
// Analyze a string
const response = await fetch("http://localhost:5000/strings", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ value: "hello world" }),
});
const data = await response.json();
console.log(data);
```

---

## 📁 Project Structure

```
string-analyser-api/
├── controllers/          # Route handlers
│   ├── addString.js
│   ├── deleteString.js
│   ├── getStringByQueries.js
│   ├── getStringByValue.js
│   └── queryByNaturalLanguage.js
├── middlewares/          # Custom middleware
│   └── validateStringValue.js
├── routes/              # Route definitions
│   └── analyzeStringRoute.js
├── utils/               # Helper functions
│   ├── analyzeString.js
│   ├── AppError.js
│   ├── characterFrequencyMap.js
│   ├── generateSHA256.js
│   ├── getUniqueCharacter.js
│   ├── isPalindrome.js
│   └── parseNaturalLanguageQuery.js
├── .gitignore
├── app.js               # Main application file
├── package.json
├── package-lock.json
└── README.md
```

---

## 🌐 Deployment

### Deploying to Railway

1. **Install Railway CLI:**

   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**

   ```bash
   railway login
   ```

3. **Initialize project:**

   ```bash
   railway init
   ```

4. **Deploy:**

   ```bash
   railway up
   ```

5. **Get your URL:**
   ```bash
   railway domain
   ```

### Environment Variables

No environment variables are required for basic operation. The server runs on port 5000 by default.

To use a custom port, modify `app.js`:

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
```

---

## 🧪 Testing

You can test the API using:

- **Postman** - Import the endpoints and test manually
- **Thunder Client** (VS Code extension) - Test directly in your editor
- **cURL** - Command-line testing (examples above)

---

## 🔒 Rate Limiting

The API implements rate limiting:

- **100 requests per 5 minutes** per IP address
- Exceeding this limit will result in `429 Too Many Requests` response

---

## ⚠️ Important Notes

- **Data Persistence**: This API uses in-memory storage. All data will be lost when the server restarts.
- **Case Sensitivity**: Palindrome detection is case-insensitive ("Racecar" is considered a palindrome)
<!-- - **Character Counting**: Spaces are counted as characters in unique character count -->
- **Character Counting**: 
  - String length includes spaces
  - Unique character count excludes spaces
  - Character frequency map excludes spaces
- **Duplicate Prevention**: Attempting to analyze the same string twice will result in a 409 error

---

## 🐛 Known Issues / Limitations

1. Data is not persistent (resets on server restart)
2. No authentication/authorization
3. Limited natural language query patterns
4. No pagination for large result sets

---

## 👨‍💻 Author

**Goodluck Reuben**

- Email: goodluckreuben96@gmail.com
- GitHub: [oluwabillionz96](https://github.com/oluwabillionz96)

---

## 📄 License

ISC

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📞 Support

If you have any questions or need help, please:

1. Check the documentation above
2. Open an issue on GitHub
3. Contact via email

---

**Built with ❤️ for HNG Stage 1 Backend**
