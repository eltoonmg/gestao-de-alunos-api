import { api } from "./api.js";

export async function cadastrarAluno(token, dadosAluno) {
  const cadastroAlunoResposta = await api()
    .post("/api/admin/alunos")
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send(dadosAluno);

  console.log("STATUS CADASTRO ALUNO:", cadastroAlunoResposta.status);
  console.log("BODY CADASTRO ALUNO:", cadastroAlunoResposta.body);

  return cadastroAlunoResposta.body.id;
}
