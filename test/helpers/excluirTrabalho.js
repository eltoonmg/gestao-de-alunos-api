import { api } from "./api.js";

export async function excluirTrabalho(token, trabalhoId) {
  const excluirTrabalhoResposta = await api()
    .delete(`/api/admin/trabalhos/${trabalhoId}`)
    .set("Authorization", token)

    return excluirTrabalhoResposta;
}