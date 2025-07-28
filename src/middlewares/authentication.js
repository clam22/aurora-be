import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env.js';

export const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token provided, authorization denied"
            });
        }
        
        try {
            const decode = jwt.verify(token, jwtSecret);
            req.user = decode;
            next();
            
        } catch (error) {
            res.status(401).json({
                status: 401,
                message: "Token is not valid",
                error: error.message
            });
        }
    }
    else {
        return res.status(401).json({
            status: 401,
            message: "Authorization header is missing or malformed"
        });
    }
}