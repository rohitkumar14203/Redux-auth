const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`); // Create error with requested URL
  res.status(404); // Set 404 status for not found route
  next(error); // Pass error to error handling middleware
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode == 200 ? 500 : res.statusCode; // Set 500 if no status set yet
  let message = err.message; // Extract error message

  if (err.name === "CastError" && err.kind === "ObjectID") {
    statusCode = 404; // Handle invalid MongoDB ObjectId error
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message: message, // Send error message

    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Show stack only in dev
  });
};

export { notFound, errorHandler };

/**
 🔹 What is stack?
➤ err.stack is called the stack trace.
It shows the path of function calls that led to the error — 
jaise kaunse file, kaunse line pe error hua aur kis sequence me functions call hue.


if (err.name === "CastError" && err.kind === "ObjectId")

Example:
GET /api/user/12345notavalidid

This is not a valid MongoDB ObjectId (it should be a 24-char hex string).
 So Mongoose can't query it and throws this:

 {
  name: "CastError",
  kind: "ObjectId"
}

✔️ If both conditions match

That means the user gave a bad ID (like malformed or short)

Then we:

Set statusCode = 404 (Not Found)

Send message = "Resource Not Found"

*/
