import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided."});
  }

  const token = authHeader.split(" ")[1];

  
  if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).json({ message: "Invalid token." });
  }
};

export default authMiddleware;