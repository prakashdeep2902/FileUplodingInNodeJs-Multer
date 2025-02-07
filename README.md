# what is Multer in NodeJs

Multer is a middleware for handling **multipart/form-data** in **Node.js**, primarily used for uploading files. It is commonly integrated with **Express.js** to handle file uploads in web applications.

### Key Features:

1. **Parses Form Data**: Multer extracts files and text fields from a multipart form submission.
2. **Saves Files**: Files can either be saved to disk or stored temporarily in memory.
3. **Customizable Storage Options**: You can define where and how files are stored.
4. **File Filtering**: It allows filtering files based on their type or other criteria.

---

### Installation:

To install Multer, run:

```bash
npm install multer
```

---

### Usage Example:

#### 1. Basic Setup for Single File Upload:

```javascript
const express = require("express");
const multer = require("multer");
const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

// Single file upload
app.post("/upload", upload.single("myFile"), (req, res) => {
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

#### 2. Multiple File Upload:

```javascript
app.post("/upload-multiple", upload.array("myFiles", 5), (req, res) => {
  res.send({
    message: "Files uploaded successfully!",
    files: req.files,
  });
});
```

---

### Key Multer Options:

1. **`storage`**: Defines how and where files are stored.

   - **`diskStorage`**: Saves files to disk.
   - **`memoryStorage`**: Stores files in memory as `Buffer` objects.

2. **`limits`**: Restricts file size or number of files. Example:

   ```javascript
   const upload = multer({
     storage,
     limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB max size
   });
   ```

3. **`fileFilter`**: Custom logic to accept or reject files.
   ```javascript
   const upload = multer({
     storage,
     fileFilter: (req, file, cb) => {
       if (file.mimetype === "image/png") {
         cb(null, true);
       } else {
         cb(new Error("Only .png files are allowed!"));
       }
     },
   });
   ```

---

### Use Cases:

- Uploading profile pictures, documents, or media files.
- Handling form submissions with both text and file data.
- Building APIs for file management.

Let me know if you'd like a deeper explanation or help implementing it in your project! 😊
