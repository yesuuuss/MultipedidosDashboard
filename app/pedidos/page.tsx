import { fetchPedidos } from '../lib/api';

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
      
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="min-w-full text-gray-900">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th className="px-4 py-5 font-medium">ID</th>
                  <th className="px-3 py-5 font-medium">Cliente ID</th>
                  <th className="px-3 py-5 font-medium">Productos</th>
                  <th className="px-3 py-5 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="w-full border-b py-3 text-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}