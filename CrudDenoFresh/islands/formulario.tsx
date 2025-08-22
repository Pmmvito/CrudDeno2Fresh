import { Button } from "../components/Button.tsx";

export default function Form() {

return (
<div className="flex flex-col p-4">
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Formulário</h2>
        <form
            hx-post="/api/formulario"
            hx-target="#message-container" 
            hx-on--after-request="if(event.detail.xhr.responseText.includes('sucesso')) { this.reset(); htmx.trigger('#lista-container', 'updateList'); }"
            >
            <div className="mb-4">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                </label>
                <input  type="text" id="titulo" name="titulo" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mb-4">
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                    descricao
                </label>
                <textarea  id="descricao" name="descricao" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Enviar
            </Button>
        </form>
    </div>
</div>
);
}