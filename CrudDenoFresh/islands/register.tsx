import { Button } from "../components/Button.tsx"

export default function Register() {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form 
        hx-post="/api/register" 
        hx-on--after-request="if(event.detail.xhr.responseText.includes('sucesso')) this.reset()"
      >
        <div className="mb-4">
          <label htmlFor="Nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" id="Nome" name="Nome" required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" id="senha" name="senha" required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Registrar
        </Button>
      </form>
    </div>
  );
}