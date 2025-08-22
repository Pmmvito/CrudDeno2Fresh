import { Handlers } from "$fresh/server.ts";
import { updateFormulario, getSession } from "../../../components/banco/db.ts";

export const handler: Handlers = {
  async PUT(req, ctx) {
    try {
      const user = getSession();
      if (!user) {
        return new Response(
          JSON.stringify({ error: "Usuário não logado" }),
          { 
            status: 401,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      const id = parseInt(ctx.params.id);
      const body = await req.json();
      const { titulo, descricao } = body;

      // Atualiza apenas o campo enviado
      const success = updateFormulario(id, titulo, descricao);

      if (success) {
        return new Response(
          JSON.stringify({ success: true, message: "Campo atualizado" }),
          { 
            status: 200,
            headers: { "Content-Type": "application/json" }
          }
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Formulário não encontrado ou sem permissão" }),
          { 
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

    } catch (error) {
      console.error("Erro ao atualizar:", error);
      return new Response(
        JSON.stringify({ error: "Erro interno do servidor" }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  },
};