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
    //Realizando limpeza dos dados de teste Alunos, Disciplinas e Trabalho
    const tokenAdmin = await comTokenDeAdmin();

    if (trabalhoId) {
      const resposta = await excluirTrabalho(tokenAdmin, trabalhoId);
    }

    if (disciplinaId) {
      const resposta = await excluirDisciplina(tokenAdmin, disciplinaId);
    }

    if (alunoId) {
      const resposta = await excluirAluno(tokenAdmin, alunoId);
    }
  });

  fluxoEntregaTrabalho.forEach((entregaTrabalho) => {
    it.only(entregaTrabalho.testTitle, async () => {
      // Cadastrar o aluno
      alunoId = await cadastrarAluno(
        await comTokenDeAdmin(),
        entregaTrabalho.dadosAluno,
      );

      // Cadastrar Disciplina
      disciplinaId = await cadastroDisciplina(
        await comTokenDeAdmin(),
        entregaTrabalho.dadosDisciplina,
      );

      // Matricular na Disciplina
      matriculaId = await cadastroMatricula(
        await comTokenDeAdmin(),
        alunoId,
        disciplinaId,
      );

      //Cadastrar Trabalho na Disciplina Matriculada
      const tokenAluno = await getTokenAluno(
        entregaTrabalho.dadosAluno.email,
        entregaTrabalho.dadosAluno.senha,
      );

      trabalhoId = await cadastroTrabalho(
        tokenAluno,
        alunoId,
        disciplinaId,
        entregaTrabalho.dadosTrabalho,
      );

      expect(alunoId).to.not.be.undefined;
      expect(disciplinaId).to.not.be.undefined;
      expect(matriculaId).to.not.be.undefined;
      expect(trabalhoId).to.not.be.undefined;
    });
  });
});
