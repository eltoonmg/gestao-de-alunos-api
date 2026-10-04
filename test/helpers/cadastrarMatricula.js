import { api } from "./api.js";

export async function cadastroMatricula(token, alunoId, disciplinaId) {
  const cadastroMatriculaResposta = await api()
    .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send({
      alunoId: alunoId,
    });

  return cadastroMatriculaResposta;
}
