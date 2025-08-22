export default function FormLista() {
    return (
        <div className="flex flex-col p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Lista de Formulários</h2>                
                {}
                <div 
                    id="lista-container" 
                    className="mt-4 max-h-96 overflow-y-auto"
                    hx-get="/api/lista"
                    hx-trigger="load, updateList"
                >
                </div>
            </div>
        </div>
    );
}