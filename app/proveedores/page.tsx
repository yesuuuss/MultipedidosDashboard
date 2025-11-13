import { fetchProveedores } from '../lib/api';
import { CrearProveedor } from '../components/botones';
import Search from '../components/search';

interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
}

export default async function ProveedoresPage() {
  const proveedores: Proveedor[] = await fetchProveedores();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Proveedores</h1>
      </div>
      
      {/* Barra de búsqueda y botón */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar proveedores..." />
        <CrearProveedor />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {proveedores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No hay proveedores registrados</p>
                <p className="text-sm text-gray-400 mt-2">
                  Ve a tu Componente B y crea algunos proveedores primero
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
                      Nombre
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {proveedores.map((proveedor) => (
                    <tr
                      key={proveedor.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {proveedor.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {proveedor.nombre}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {proveedor.correo}
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