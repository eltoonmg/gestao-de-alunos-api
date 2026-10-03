import { api } from './api.js';
import 'dotenv/config';

let tokenAdmin = null;

export async function comTokenDeAdmin() {
    if (!tokenAdmin) {
        const loginResposta = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_EMAIL,
                senha: process.env.ADMIN_SENHA
            });

        tokenAdmin = loginResposta.body.token;
    }

    return `Bearer ${tokenAdmin}`;
}

export async function getTokenAluno(emailUser, passUser) {
    const loginResposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: emailUser,
            senha: passUser
        });

    return `Bearer ${loginResposta.body.token}`;
}