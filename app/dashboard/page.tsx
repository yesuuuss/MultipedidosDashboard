import { fetchClientes, fetchFacturas, fetchProveedores, fetchPedidos } from '../lib/api';
import GraficoFacturas from '../components/grafico-facturas';
import GraficoDistribucion from '../components/grafico-distribucion';
import GraficoTendencia from '../components/grafico-tendencia';

// Definir interfaces para los tipos
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
  // Obtener datos reales de todas las APIs
  const [clientes, facturas, proveedores, pedidos] = await Promise.all([
    fetchClientes() as Promise<Cliente[]>,
    fetchFacturas() as Promise<Factura[]>,
    fetchProveedores() as Promise<Proveedor[]>,
    fetchPedidos() as Promise<Pedido[]>
  ]);

  // Calcular métricas
  const totalClientes = clientes.length;
  const totalFacturas = facturas.length;
  const totalProveedores = proveedores.length;
  const totalPedidos = pedidos.length;
  
  // Calcular total facturado
  const totalFacturado = facturas.reduce((sum: number, factura: Factura) => 
    sum + (factura.totalFactura || 0), 0
  );

  // Top 5 facturas más grandes
  const topFacturas = [...facturas]
    .sort((a, b) => (b.totalFactura || 0) - (a.totalFactura || 0))
    .slice(0, 5);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de facturas por mes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Facturación Mensual</h3>
          <GraficoFacturas facturas={facturas} />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Últimos 6 meses - Datos reales integrados
          </p>
        </div>

        {/* Gráfico de distribución */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribución del Sistema</h3>
          <GraficoDistribucion 
            totalClientes={totalClientes}
            totalProveedores={totalProveedores}
            totalFacturas={totalFacturas}
            totalPedidos={totalPedidos}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Proporción de entidades en el sistema
          </p>
        </div>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tendencias */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Crecimiento</h3>
          <GraficoTendencia facturas={facturas} />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Evolución mensual del negocio
          </p>
        </div>

        {/* Top facturas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top 5 Facturas Más Grandes</h3>
          <div className="space-y-3">
            {topFacturas.length > 0 ? (
              topFacturas.map((factura, index) => (
                <div key={factura.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center">
                    <span className={`font-bold mr-3 ${
                      index === 0 ? 'text-yellow-600' : 
                      index === 1 ? 'text-gray-600' : 
                      index === 2 ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      #{index + 1}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-gray-900 block">
                        {factura.numeroFactura || `Factura ${factura.id}`}
                      </span>
                      {factura.proveedor?.nombre && (
                        <span className="text-xs text-gray-500">
                          {factura.proveedor.nombre}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold text-green-600 text-lg">
                    ${(factura.totalFactura || 0).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No hay facturas registradas</p>
                <p className="text-sm text-gray-400 mt-2">
                  Crea algunas facturas para ver estadísticas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumen de actividad y enlaces rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resumen de actividad */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Resumen de Actividad</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Facturas totales</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">{totalFacturas}</span>
                <div className="ml-2 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Clientes registrados</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">{totalClientes}</span>
                <div className="ml-2 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Proveedores activos</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">{totalProveedores}</span>
                <div className="ml-2 w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pedidos procesados</span>
              <div className="flex items-center">
                <span className="font-semibold text-gray-900">{totalPedidos}</span>
                <div className="ml-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enlaces rápidos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="/facturas" className="bg-blue-50 text-blue-700 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors border border-blue-200">
              <div className="font-semibold">Ver Facturas</div>
              <div className="text-sm text-blue-600 mt-1">{totalFacturas} registros</div>
            </a>
            <a href="/clientes" className="bg-green-50 text-green-700 p-4 rounded-lg text-center hover:bg-green-100 transition-colors border border-green-200">
              <div className="font-semibold">Ver Clientes</div>
              <div className="text-sm text-green-600 mt-1">{totalClientes} registros</div>
            </a>
            <a href="/proveedores" className="bg-purple-50 text-purple-700 p-4 rounded-lg text-center hover:bg-purple-100 transition-colors border border-purple-200">
              <div className="font-semibold">Ver Proveedores</div>
              <div className="text-sm text-purple-600 mt-1">{totalProveedores} registros</div>
            </a>
            <a href="/pedidos" className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center hover:bg-yellow-100 transition-colors border border-yellow-200">
              <div className="font-semibold">Ver Pedidos</div>
              <div className="text-sm text-yellow-600 mt-1">{totalPedidos} registros</div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer del dashboard */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Sistema MultiPedidos • Actualizado en tiempo real • {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}