export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard MultiPedidos</h1>
      
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Facturado</h3>
          <p className="text-2xl font-bold">$2,689.26</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Clientes Activos</h3>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pedidos Pendientes</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>

      {/* Gráfico de revenue (placeholder) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Revenue Últimos 6 Meses</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Gráfico de Revenue</p>
        </div>
      </div>
    </div>
  );
}