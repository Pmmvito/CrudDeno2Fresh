import { Handlers } from "$fresh/server.ts";
import { getFormulario, getSession } from "../../components/banco/db.ts";

export const handler: Handlers = {
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
        <div class="border p-4 mb-2 rounded-lg bg-gray-50" id="form-${form.id}">
          <h3 contenteditable="true" class="font-bold text-lg border-dashed border-transparent hover:border-blue-300" 
              onblur="updateField(${form.id}, 'titulo', this.textContent)">${form.titulo}</h3>
          <p contenteditable="true" class="text-gray-600 border-dashed border-transparent hover:border-blue-300"
             onblur="updateField(${form.id}, 'descricao', this.textContent)">${form.descricao}</p>
          <div class="mt-2">
            <button 
              hx-delete="/api/deletar/${form.id}"
              hx-target="#lista-container"
              hx-confirm="Tem certeza que deseja deletar?"
              class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              🗑️ Deletar
            </button>
          </div>
        </div>
      `).join('') + `
      <script>
      function updateField(id, field, value) {
        fetch('/api/atualizar/' + id, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({[field]: value})
        });
      }
      </script>`;

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