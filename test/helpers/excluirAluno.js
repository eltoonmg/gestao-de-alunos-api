import { api } from "./api.js";

export async function excluirAluno(token, alunoId) {
  const excluirAlunoResposta = await api()
    .delete(`/api/admin/alunos/${alunoId}`)
    .set("Authorization", token)
    
    return excluirAlunoResposta;
}