import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import * as sinon from 'sinon';
import authService from '../../src/services/auth.service.js';

describe('Login', () => {
  it('deve retornar 500 quando acontecer algum problema de conexão com o Banco de Dados', async () => { 
    const authServicemock = sinon.stub(authService, 'login'); 
    authServicemock.throws(new Error('Erro Catastrofico!'));

    const loginResposta = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@escola.com', senha: 'admin123' });

    expect(loginResposta.status).to.equal(500);
    expect(loginResposta.body.error).to.equal('Erro interno do servidor.');

    sinon.restore();
  });
});

describe('POST /api/auth/login', () => {
  after(async () => {
    await mongoose.connection.close();
  });

  it('deve retornar 200 e um token quando o admin informar e-mail e senha corretos', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@escola.com', senha: 'admin123' });

    expect(resposta.status).to.equal(200);
    expect(resposta.body).to.have.property('token');
  });

  it('deve retornar 401 quando a senha informada for inválida', async () => {
    const resposta = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@escola.com', senha: 'senha-incorreta' });

    expect(resposta.status).to.equal(401);
    expect(resposta.body.error).to.equal('E-mail ou senha inválidos.');
  });
});
