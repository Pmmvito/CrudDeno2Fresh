import { addFormulario, getFormulario, getSession } from "../../components/banco/db.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      const formData = await req.formData();

      const titulo = formData.get("titulo")?.toString();
      const descricao = formData.get("descricao")?.toString();

      if (!titulo || !descricao) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Por favor, preencha todos os campos.</div>`,
          { 
            status: 200,
            headers: { "Content-Type": "text/html" }
          }
        );
      }
      await addFormulario(titulo, descricao);

      return new Response(
        `<div class="text-green-500 p-2 bg-green-100 rounded mb-4">Formulário enviado com sucesso!</div>`,
        { 
          status: 200,
          headers: { "Content-Type": "text/html" }
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

  GET(_req, _ctx) {
    try {
      const user = getSession();
      if (!user) {
        return new Response(
          `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Você precisa estar logado para ver os formulários.</div>`,
          { 
            status: 200,
            headers: { 
              "Content-Type": "text/html",
              "HX-Retarget": "#lista-container"
            }
          }
        );
      }

      const formularios = getFormulario();
      
      if (formularios.length === 0) {
        return new Response(
          `<div class="text-gray-500 p-4 text-center">Nenhum formulário encontrado.</div>`,
          { 
            status: 200,
            headers: { 
              "Content-Type": "text/html",
              "HX-Retarget": "#lista-container"
            }
          }
        );
      }

      const listaHTML = formularios.map(form => `
        <div class="border p-4 mb-2 rounded-lg bg-gray-50">
          <h3 class="font-bold text-lg">${form.titulo}</h3>
          <p class="text-gray-600">${form.descricao}</p>
          <small class="text-gray-400">ID: ${form.id}</small>
        </div>
      `).join('');

      return new Response(listaHTML, {
        status: 200,
        headers: { 
          "Content-Type": "text/html",
          "HX-Retarget": "#lista-container"
        }
      });
      
    } catch (error) {
      console.error("Erro ao buscar formulários:", error);
      return new Response(
        `<div class="text-red-500 p-2 bg-red-100 rounded mb-4">Erro ao carregar formulários.</div>`,
        { 
          status: 200,
          headers: { 
            "Content-Type": "text/html",
            "HX-Retarget": "#lista-container"
          }
        }
      );
    }
  },
};