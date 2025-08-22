import { Handlers } from "$fresh/server.ts";
import { findUser , setSession } from "../../components/banco/db.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      const formData = await req.formData();
      
      const email = formData.get("email")?.toString().toLowerCase();
      const senha = formData.get("senha")?.toString();
      
      if (!email || !senha) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Por favor, preencha todos os campos.</div>`,
          { 
            status: 200,
            headers: { "Content-Type": "text/html" }
          }
        );
      }
      
      const user = await findUser(email);
      if (!user || user.senha !== senha) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Email ou senha incorretos.</div>`,
          { 
            status: 200,
            headers: { "Content-Type": "text/html" }
          }
        );
      }    
      setSession(user.email);
      return new Response(
        `<div class="text-green-500 p-2 bg-green-100 rounded mb-4">Login realizado com sucesso! Bem-vindo, ${user.name}!</div>`,
        { 
          status: 200,
          headers: { 
            "Content-Type": "text/html",
            "HX-Trigger": "loginSuccess",
            "HX-Redirect": "/dashboard",
          }
        }
      );
      
    } catch (_error) {
      return new Response(
        `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Erro interno. Tente novamente.</div>`,
        { 
          status: 200,
          headers: { "Content-Type": "text/html" }
        }
      );
    }
  },
};