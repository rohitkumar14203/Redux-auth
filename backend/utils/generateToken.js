import jwt from "jsonwebtoken";

const generatedToken = (res, userId) => {
  // jwt.sign(payload, secret, options)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // res.cookie(name, value, options);
  res.cookie("jwt", token, {
    httpOnly: true, // Cannot access from frontend JS
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS (not HTTP).
    sameSite: "None", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generatedToken;

/*
What is JWT?
JWT = JSON Web Token

It’s a secure way to send data (like user ID) between client and server.
After a user logs in, we create a token and send it to the client.
The client (browser/app) will send this token in future requests as proof of login.

* jwt.sign(payload, secret, options)
This is the method to generate a JWT.

Part     -------  What it does
payload  -------  The data you want to include in the token (usually userId, email, etc.)
secret   -------  A secret key (string) to encrypt the token. Stored in .env file.
options  -------  Like how long the token should be valid (expiresIn, etc.)


! userId in payload
{ userId }

We send this inside the token so that later, when we decode the token, we can get which user sent the request.
This avoids querying the database every time.
It’s like:
👉 “This request is from user with ID = 654654dd... Trust me, here’s the proof (token).”

process.env.JWT_SECRET
This is your private key to encrypt and decrypt tokens.
Only your server knows this secret.
That’s how the server can verify the token later.

expiresIn: "30d"
The token will expire in 30 days.
After that, the user will need to log in again.

*/
