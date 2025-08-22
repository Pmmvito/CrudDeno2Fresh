import Login from "../islands/login.tsx";
import Register from "../islands/register.tsx"; 
import Cab from "../components/cab.tsx";
import Rod from "../components/rod.tsx";



export default function Home() {
  return (
    <>
      <Cab/>
      <div class="min-h-screen flex flex-col px-4 py-8 bg-[#86efac]"
          hx-target="#message-container">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold">Bem-vindo</h1>
          <p class="my-4">Faça login ou registre</p>
          <div class="text-center mb-8">        
            <div id="message-container" className="mt-4"></div>
          </div>
    
          <div class="grid md:grid-cols-2 gap-6">
            <Login />
            <Register />
          </div>
        </div>
      </div>
      <Rod/>
    </>
  )
}
