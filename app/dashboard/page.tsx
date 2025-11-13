import { fetchClientes, fetchFacturas, fetchProveedores, fetchPedidos } from '../lib/api';


interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

interface Factura {
  id: number;
  numeroFactura: string;
  totalFactura: number;
  clienteId?: number;
  proveedor?: {
    id: number;
    nombre: string;
    correo: string;
  };
}

interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
}

interface Pedido {
  id: number;
  clienteId: number;
  productos: Array<{
    nombre: string;
    precio: number;
  }>;
  total: number;
}

export default async function DashboardPage() {
 
  const [clientes, facturas, proveedores, pedidos] = await Promise.all([
    fetchClientes() as Promise<Cliente[]>,
    fetchFacturas() as Promise<Factura[]>,
    fetchProveedores() as Promise<Proveedor[]>,
    fetchPedidos() as Promise<Pedido[]>
  ]);


  const totalClientes = clientes.length;
  const totalFacturas = facturas.length;
  const totalProveedores = proveedores.length;
  const totalPedidos = pedidos.length;
  
 
  const totalFacturado = facturas.reduce((sum: number, factura: Factura) => 
    sum + (factura.totalFactura || 0), 0
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard MultiPedidos</h1>
      
      {/* Métricas en tiempo real */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-600">Total Facturado</h3>
          <p className="text-2xl font-bold text-gray-900">${totalFacturado.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">{totalFacturas} facturas</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-600">Clientes Activos</h3>
          <p className="text-2xl font-bold text-gray-900">{totalClientes}</p>
          <p className="text-sm text-gray-500 mt-2">Registrados en el sistema</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-600">Proveedores</h3>
          <p className="text-2xl font-bold text-gray-900">{totalProveedores}</p>
          <p className="text-sm text-gray-500 mt-2">Colaborando</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-gray-600">Pedidos</h3>
          <p className="text-2xl font-bold text-gray-900">{totalPedidos}</p>
          <p className="text-sm text-gray-500 mt-2">Procesados</p>
        </div>
      </div>

      {/* Gráficos y estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de actividad reciente */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resumen de Actividad</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Facturas creadas</span>
              <span className="font-semibold">{totalFacturas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Clientes registrados</span>
              <span className="font-semibold">{totalClientes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Proveedores activos</span>
              <span className="font-semibold">{totalProveedores}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pedidos procesados</span>
              <span className="font-semibold">{totalPedidos}</span>
            </div>
          </div>
        </div>

        {/* Placeholder para gráfico futuro */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribución por Categoría</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Gráfico de distribución</p>
              <p className="text-sm text-gray-400">
                {totalClientes} clientes • {totalProveedores} proveedores
              </p>
              <p className="text-sm text-gray-400">
                {totalFacturas} facturas • {totalPedidos} pedidos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/facturas" className="bg-blue-50 text-blue-700 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors">
            <div className="font-semibold">Ver Facturas</div>
            <div className="text-sm text-blue-600">{totalFacturas} registros</div>
          </a>
          <a href="/clientes" className="bg-green-50 text-green-700 p-4 rounded-lg text-center hover:bg-green-100 transition-colors">
            <div className="font-semibold">Ver Clientes</div>
            <div className="text-sm text-green-600">{totalClientes} registros</div>
          </a>
          <a href="/proveedores" className="bg-purple-50 text-purple-700 p-4 rounded-lg text-center hover:bg-purple-100 transition-colors">
            <div className="font-semibold">Ver Proveedores</div>
            <div className="text-sm text-purple-600">{totalProveedores} registros</div>
          </a>
          <a href="/pedidos" className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center hover:bg-yellow-100 transition-colors">
            <div className="font-semibold">Ver Pedidos</div>
            <div className="text-sm text-yellow-600">{totalPedidos} registros</div>
          </a>
        </div>
      </div>
    </div>
  );
}