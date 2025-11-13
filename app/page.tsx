export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          MultiPedidos Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Sistema de gestión de pedidos y facturas
        </p>
        <a 
          href="/dashboard" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Ir al Dashboard
        </a>
      </div>
    </div>
  );
}