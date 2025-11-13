import { fetchClientes } from '../lib/api';

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export default async function ClientesPage() {
  const clientes: Cliente[] = await fetchClientes();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>
      
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full text-gray-900">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th className="px-4 py-5 font-medium">ID</th>
                  <th className="px-3 py-5 font-medium">Nombre</th>
                  <th className="px-3 py-5 font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="w-full border-b py-3 text-sm">
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {cliente.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {cliente.nombre}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {cliente.correo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}