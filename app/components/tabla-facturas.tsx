import { fetchFacturas } from '../lib/api';

interface Factura {
  id: number;
  numeroFactura: string;
  totalFactura: number;
  clienteId?: number;
  proveedor?: {
    nombre: string;
    correo: string;
  };
}

export default async function TablaFacturas() {
  
  const facturas: Factura[] = await fetchFacturas();

  
  if (facturas.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-gray-500">No hay facturas registradas</p>
        <p className="text-sm text-gray-400">
          Asegúrate de que el Componente B esté ejecutándose en http://localhost:8081
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Factura
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Proveedor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Cliente ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {facturas.map((factura) => (
                <tr
                  key={factura.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {factura.numeroFactura || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {factura.proveedor?.nombre || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {factura.proveedor?.correo || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${factura.totalFactura || 0}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {factura.clienteId || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}