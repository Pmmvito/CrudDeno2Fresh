import { getSession } from "../components/banco/db.ts";
import Cab from "../components/cab.tsx";
import Rod from "../components/rod.tsx";
import Form from "../islands/formulario.tsx";
import FormLista from "../islands/lista.tsx";

export default function Dashboard() {
    const user = getSession();
    if (!user) {
        return (
            <>
            <Cab/>
            <div class="min-h-screen px-4 py-8 mx-auto bg-[#86efac]">
                <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                    <h1 class="text-4xl font-bold">Acesso Negado</h1>
                    <p class="my-4">Você precisa estar logado para acessar o dashboard.</p>
                    <a href="/" class="underline">Voltar para a página inicial</a>
                </div>
            </div>
            <Rod/>
            </>
        );
    }
    return (
        <>
        <Cab/>
            <div class="min-h-screen px-4 py-8 mx-auto bg-[#86efac]">
                <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center h-full">
                    <h1 class="text-4xl font-bold">Dashboard</h1>
                    <a hx-post="/api/sair" class="text-red-500 hover:underline">Sair</a>

                    <p class="my-4">Bem-vindo ao seu dashboard! {user}</p>
                    <div class="mt-4" id="message-container">
                    </div>
                    <div>
                        <p class="bg-red-700">Edite o formulario clicando sobre o texto</p>
                    </div>
                    <div className="mt-4 flex-auto grid grid-cols-2 gap-4">
                        <Form />
                        <FormLista />
                    </div>
                </div>
            </div>
            <Rod/>
        </>
    );
}