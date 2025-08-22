import { Handlers } from "$fresh/server.ts";
import { findUser, addUser } from "../../components/banco/db.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      const formData = await req.formData();
      
      const nome = formData.get("Nome")?.toString();
      const email = formData.get("email")?.toString().toLowerCase();
      const senha = formData.get("senha")?.toString();
      
      if (!nome || !email || !senha) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Por favor, preencha todos os campos.</div>`,
          { 
            status: 200, // Mudança aqui: status 200
            headers: { "Content-Type": "text/html" }
          }
        );
      }
      
      const existingUser = await findUser(email);
      if (existingUser) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Email ${email} já está registrado.</div>`,
          { 
            status: 200, // Mudança aqui: status 200
            headers: { "Content-Type": "text/html" }
          }
        );
      }    
      
      await addUser(nome, email, senha);

      return new Response(
        `<div class="text-green-500 p-2 bg-green-100 rounded mb-4">Usuário ${nome} registrado com sucesso!</div>`,
        { 
          status: 200,
          headers: { 
            "Content-Type": "text/html",
            "HX-Trigger": "formReset" // Trigger para resetar
          }
        }
      );
      
    } catch (_error) {
      return new Response(
        `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Erro interno. Tente novamente.</div>`,
        { 
          status: 200, // Mudança aqui: status 200
          headers: { "Content-Type": "text/html" }
        }
      );
    }
  },
};