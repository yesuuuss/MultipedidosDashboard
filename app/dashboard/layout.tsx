export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">MultiPedidos</h1>
        </div>
        <nav className="mt-8">
          <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-800">
            Dashboard
          </a>
          <a href="/dashboard/facturas" className="block py-2 px-4 hover:bg-gray-800">
            Facturas
          </a>
          <a href="/dashboard/clientes" className="block py-2 px-4 hover:bg-gray-800">
            Clientes
          </a>
          <a href="/dashboard/pedidos" className="block py-2 px-4 hover:bg-gray-800">
            Pedidos
          </a>
          <a href="/dashboard/proveedores" className="block py-2 px-4 hover:bg-gray-800">
            Proveedores
          </a>
        </nav>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold">Panel de Control</h2>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}