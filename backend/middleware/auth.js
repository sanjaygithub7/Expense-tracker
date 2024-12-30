const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    // Check if token is provided
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    console.log(authHeader);

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details to the request object
        console.log(req.user.id); // Log decoded payload for debugging
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
