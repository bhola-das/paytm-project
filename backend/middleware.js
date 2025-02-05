const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from the header

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded userId to the request object
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message); // Optional logging
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware,
};
