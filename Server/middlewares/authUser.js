import jwt from "jsonwebtoken";



export const authUser = (req, res, next) => {
  try {
    // Extract token from cookies
    const { token } = req.cookies;

    // Check if token is present
    if (!token) {
      return res.status(401).json({ success: false, message: "User not authenticated. No token provided." });
    }

    // Verify token using the secret key
    const tokenVerified = jwt.verify(token, process.env.JWT_SK);

    // Check if token is valid
    if (!tokenVerified) {
      return res.status(401).json({ success: false, message: "User not authenticated. Token is invalid." });
    }

    if (tokenVerified.role !== "user") {
      return res.status(400).json({ message: "User not authenticated : Login as user " });
  }

    // Attach user data to request object
    req.user = tokenVerified;

    // Call the next middleware or route handler
    next();

  } catch (error) {
    // Log the error and send a response
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, message: "Authentication failed. Please log in again." });
  }
};


