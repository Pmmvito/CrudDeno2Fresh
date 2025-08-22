import { Handlers } from "$fresh/server.ts";
import { deleteFormulario } from "../../../components/banco/db.ts";

export const handler: Handlers = {
  DELETE(_req, ctx) {
    try {
      const id = ctx.params.id;
      const success = deleteFormulario(parseInt(id));
      
      if (success) {
        return new Response("", {
          status: 200,
          headers: { 
            "HX-Trigger": "updateList",
            "HX-Target": "#lista-container"
          }
        });
      } else {
        return new Response(
          `<div class="text-red-500 p-2">Erro ao deletar formulário.</div>`,
          { status: 200, headers: { "Content-Type": "text/html" } }
        );
      }
    } catch (error) {
        console.log("Erro ao deletar formulário:", error);
      return new Response(
        `<div class="text-red-500 p-2">Erro interno.</div>`,
        { status: 500, headers: { "Content-Type": "text/html" } }
      );
    }
  },
};