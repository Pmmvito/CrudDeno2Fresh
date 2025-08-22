import { Handlers } from "$fresh/server.ts";
import { clearSession } from "../../components/banco/db.ts";

export const handler: Handlers = {
   POST(_req, _ctx) {
    try {
      // Limpa a sessão
      clearSession();
      
      return new Response("", {
        status: 200,
        headers: {
          "HX-Redirect": "/",

        }
      });
      
    } catch (_error) {
      return new Response("Erro ao fazer logout", {
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  },
};