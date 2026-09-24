import request from 'supertest';
import { expect } from 'chai';
import { getToken } from '../helpers/auth.js';


describe('Login', () => {
  let token;

  beforeEach(async () => {
    token = await getToken('admin@escola.com', 'admin123')
  })

  it('deve cadastrar um aluno quando ele informar dados válidos', async () => { 
    //cadastrar o aluno
    const cadastroAlunoResposta = await request('http://localhost:3081')
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
            nome: 'Elton Machado',
            email: 'elton.machado@example.com',
            matricula: '2026-001',
            senha: '123456'
      });

      //validar que ele foi cadastrado
      expect(cadastroAlunoResposta.status).to.equal(201);
      expect(cadastroAlunoResposta.body.nome).to.equal('Elton Machado');
      expect(cadastroAlunoResposta.body.email).to.equal('elton.machado@example.com');
      expect(cadastroAlunoResposta.body.matricula).to.equal('2026-001');
  });

  it('deve negar o cadastro de um aluno quando ele já existe', async () => { 
    //cadastrar o aluno
    const cadastroAlunoResposta = await request('http://localhost:3081')
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
            nome: 'Ana Souza', 
            email: 'ana.souza@example.com', 
            matricula: '2024001', 
            senha: '123456'
      });

      //validar que ele foi cadastrado
      expect(cadastroAlunoResposta.status).to.equal(409);
      expect(cadastroAlunoResposta.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.');
      });
});