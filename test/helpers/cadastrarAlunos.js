import { api } from "./api.js";

export async function cadastrarAluno(token, dadosAluno) {
  const cadastroAlunoResposta = await api()
    .post("/api/admin/alunos")
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send(dadosAluno);

  return cadastroAlunoResposta.body.id;
}
