import { api } from "./api.js";

export async function excluirDisciplina(token, disciplinaId) {
  const excluirDisciplinaResposta = await api()
    .delete(`/api/admin/disciplinas/${disciplinaId}`)
    .set("Authorization", token)

    return excluirDisciplinaResposta;
}