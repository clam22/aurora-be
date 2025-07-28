import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env.js';

const user = {
    id: 1,
    name: 'John Doe',
    role: 'admin',
    department: 'Engineering',
    accessLevel: 4,
};

const token = jwt.sign(user, jwtSecret, {expiresIn: '1h'});
console.log('Generated Token:', token);

