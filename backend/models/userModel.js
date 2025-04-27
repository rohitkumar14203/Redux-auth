import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// pre("save") is a Mongoose middleware
// It runs before the .save() operation on the document.
// "save" means this will trigger whenever you save a user (e.g. on registration or password update).
// It allows us to do something before the user gets saved in the database — in this case, we're hashing the password.
userSchema.pre("save", async function (next) {
  // Inside Mongoose middleware, this refers to the document being saved.

  // Checks if the password field was modified.

  //  Use case:
  // When a new user is being created → password is new → needs hashing
  // When user updates email or name, and not password → no need to hash again
  if (!this.isModified("password")) {
    next();
  }

  //bcrypt.genSalt(10)
  // Bcrypt needs a "salt" (random string) to hash securely.
  // 10 is the cost factor (how strong the hashing is). Higher = more secure but slower.
  const salt = await bcrypt.genSalt(10);

  // this.password means the password value of the user currently being saved.

  // bcrypt.hash(this.password, salt)
  // This hashes the plain text password using the generated salt.
  // It replaces the original password (this.password) with the hashed one.
  this.password = await bcrypt.hash(this.password, salt);
});

//* Password Matching

// With the help of methods we can create a custom methods in models.
// custom method called matchPassword on the user schema using Mongoose.

// userSchema.methods ---> adding a custom function to the user document.
// this.password:  Refers to the hashed password stored in MongoDB
userSchema.methods.matchPassword = async function (password) {
  // bcrypt.compare(plain, hashed): ➤ It returns true if both passwords match otherwise give false
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
