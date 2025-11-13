import { fetchPedidos } from '../lib/api';
import { CrearPedido } from '../components/botones';
import Search from '../components/search';

interface Pedido {
  id: number;
  clienteId: number;
  productos: Array<{
    nombre: string;
    precio: number;
  }>;
  total: number;
}

export default async function PedidosPage() {
  const pedidos: Pedido[] = await fetchPedidos();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>
      
      {/* Barra de búsqueda y botón */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar pedidos..." />
        <CrearPedido />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {pedidos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No hay pedidos registrados</p>
                <p className="text-sm text-gray-400 mt-2">
                  Los pedidos se muestran con datos de ejemplo
                </p>
              </div>
            ) : (
              <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Cliente ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Productos
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {pedidos.map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {pedido.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pedido.clienteId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {pedido.productos?.length || 0} productos
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        ${pedido.total || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}