import { api } from "./api.js";

export async function cadastroDisciplina(token, dadosDisciplina) {
  const cadastroDisciplinaResposta = await api()
    .post("/api/admin/disciplinas")
    .set("Content-Type", "application/json")
    .set("Authorization", token)
    .send(dadosDisciplina);

  return cadastroDisciplinaResposta;
}
