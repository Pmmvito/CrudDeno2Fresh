import { Button } from "../components/Button.tsx"

export default function Login() {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form 
        hx-post="/api/login" 
        hx-on--after-request="if(event.detail.xhr.responseText.includes('sucesso')) this.reset()"
      >
        <div className="mb-4">
          <label htmlFor="emailL" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="emailL" name="email" required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" /> 
        </div>
        <div className="mb-4">
          <label htmlFor="senhaL" className="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" id="senhaL" name="senha" required 
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <Button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Login
        </Button>
      </form>
    </div>
  );
}