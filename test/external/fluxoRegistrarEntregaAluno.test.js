import { expect } from "chai";
import { comTokenDeAdmin, getTokenAluno } from "../helpers/auth.js";
import fluxoEntregaTrabalho from "../fixtures/fluxoEntregaTrabalho.json" with { type: "json" };
import { cadastrarAluno } from "../helpers/cadastrarAlunos.js";
import { cadastroDisciplina } from "../helpers/cadastrarDisciplina.js";
import { cadastroMatricula } from "../helpers/cadastrarMatricula.js";
import { cadastroTrabalho } from "../helpers/entregaTrabalho.js";
import { excluirAluno } from "../helpers/excluirAluno.js";
import { excluirDisciplina } from "../helpers/excluirDisciplina.js";
import { excluirTrabalho } from "../helpers/excluirTrabalho.js";

describe("Cadastrar trabalho do aluno em disciplina", () => {
  let alunoId, disciplinaId, matriculaId, trabalhoId;

  afterEach(async () => {
    // Realizando limpeza dos dados de teste
    const tokenAdmin = await comTokenDeAdmin();

    if (trabalhoId) {
      await excluirTrabalho(tokenAdmin, trabalhoId);
    }

    if (disciplinaId) {
      await excluirDisciplina(tokenAdmin, disciplinaId);
    }

    if (alunoId) {
      await excluirAluno(tokenAdmin, alunoId);
    }
  });

  fluxoEntregaTrabalho.forEach((entregaTrabalho) => {
    it(entregaTrabalho.testTitle, async () => {

      // Realiza o cadastro do aluno com token de Admin
      const respostaAluno = await cadastrarAluno(
        await comTokenDeAdmin(),
        entregaTrabalho.dadosAluno,
      );

      //Assert(Validar)
      //Validar Status
      expect(respostaAluno.status).to.equal(201);

      alunoId = respostaAluno.body.id;

      //Validar nome,id,email e senha
      expect(alunoId).to.not.be.undefined;
      expect(respostaAluno.body.email).to.not.be.undefined;
      expect(respostaAluno.body.matricula).to.not.be.undefined;
      expect(respostaAluno.body.nome).to.not.be.undefined;



      // Cadastrar disciplina
      const respostaDisciplina = await cadastroDisciplina(
        await comTokenDeAdmin(),
        entregaTrabalho.dadosDisciplina,
      );

      //Assert(Validar)
      //Validar Status
      expect(respostaDisciplina.status).to.equal(201);
      
      //Validar id
      disciplinaId = respostaDisciplina.body.id
      expect(disciplinaId).to.not.be.undefined;
      expect(respostaDisciplina.body.nome).to.not.be.undefined;
      expect(respostaDisciplina.body.codigo).to.not.be.undefined;
      expect(respostaDisciplina.body.cargaHoraria).to.not.be.undefined;


      // Matricular aluno na disciplina
      const respostaMatricula = await cadastroMatricula(
        await comTokenDeAdmin(),
        alunoId,
        disciplinaId,
      );

      //Assert(Validar)
      //Validar Status
      expect(respostaMatricula.status).to.equal(201);

      //Validar matriculaid, disciplinaid e alunoId
      matriculaId = respostaMatricula.body.id;
      expect(matriculaId).to.not.be.undefined;
      expect(respostaMatricula.body.disciplinaId).to.not.be.undefined;
      expect(respostaMatricula.body.alunoId).to.not.be.undefined;


      // Cadastrar trabalho na disciplina matriculada
      const tokenAluno = await getTokenAluno(
        entregaTrabalho.dadosAluno.email,
        entregaTrabalho.dadosAluno.senha,
      );

      const respostaTrabalho = await cadastroTrabalho(
        tokenAluno,
        alunoId,
        disciplinaId,
        entregaTrabalho.dadosTrabalho,
      );

      //Assert(Validar)
      //Validar Status
      expect(respostaTrabalho.status).to.equal(201);

      //Validar id, status, descrição e titulo
      trabalhoId = respostaTrabalho.body.id;
      expect(trabalhoId).to.not.be.undefined;
      expect(respostaTrabalho.body.descricao).to.not.be.undefined;
      expect(respostaTrabalho.body.titulo).to.not.be.undefined;
      expect(respostaTrabalho.body.status).to.be.equal("entregue");
    });
  });
});