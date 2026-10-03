import { api } from "./api.js";

export async function cadastroTrabalho(
  token,
  alunosId,
  disciplinaId,
  dadosTrabalho,
) {
  const cadastroTrabalhoResposta = await api()
    .post(`/api/alunos/${alunosId}/trabalhos`)
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send({
      disciplinaId: disciplinaId,
      titulo: dadosTrabalho.titulo,
      descricao: dadosTrabalho.descricao,
    });
  return cadastroTrabalhoResposta.body.id;
}
