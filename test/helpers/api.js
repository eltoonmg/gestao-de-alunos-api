import request from 'supertest';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3081';

export function api() {
    return request(BASE_URL);
}