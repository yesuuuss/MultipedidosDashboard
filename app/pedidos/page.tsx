'use client';

import { useState, useEffect } from 'react';
import { fetchPedidos, eliminarPedido } from '../lib/api';
import { CrearPedido } from '../components/botones';
import Search from '../components/search';
import AccionesTabla from '../components/acciones-tabla';
import FormularioEditarPedido from '../components/formulario-editar-pedido';

interface Producto {
  nombre: string;
  precio: number;
}

interface Pedido {
  id: number;
  clienteId: number;
  productos: Producto[];
  total: number;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [pedidoEditando, setPedidoEditando] = useState<Pedido | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarPedidos = async () => {
    try {
      setCargando(true);
      const datos = await fetchPedidos();
      setPedidos(datos);
      setPedidosFiltrados(datos);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
      alert('Error cargando pedidos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  useEffect(() => {
    const filtrados = pedidos.filter(pedido =>
      pedido.id.toString().includes(busqueda) ||
      pedido.clienteId.toString().includes(busqueda) ||
      pedido.total.toString().includes(busqueda)
    );
    setPedidosFiltrados(filtrados);
  }, [busqueda, pedidos]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarPedido(id);
      await cargarPedidos();
      alert('✅ Pedido eliminado exitosamente');
    } catch (error) {
      alert('❌ Error eliminando pedido');
    }
  };

  const handleEditar = (id: number) => {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) setPedidoEditando(pedido);
  };

  const handleVer = (id: number) => {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
      const productosInfo = pedido.productos.map(p => `  • ${p.nombre}: $${p.precio}`).join('\n');
      alert(`📦 Pedido #${pedido.id}\nCliente ID: ${pedido.clienteId}\nTotal: $${pedido.total}\nProductos:\n${productosInfo}`);
    }
  };

  const handleGuardarEdicion = () => {
    setPedidoEditando(null);
    cargarPedidos();
  };

  if (cargando) {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search 
          placeholder="Buscar pedidos..." 
          onSearch={setBusqueda}
        />
        <CrearPedido onSuccess={cargarPedidos} />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {pedidosFiltrados.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {busqueda ? 'No se encontraron pedidos' : 'No hay pedidos registrados'}
                </p>
              </div>
            ) : (
              <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">ID</th>
                    <th className="px-3 py-5 font-medium">Cliente ID</th>
                    <th className="px-3 py-5 font-medium">Productos</th>
                    <th className="px-3 py-5 font-medium">Total</th>
                    <th className="px-3 py-5 font-medium text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id} className="w-full border-b py-3 text-sm">
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">{pedido.id}</td>
                      <td className="whitespace-nowrap px-3 py-3">{pedido.clienteId}</td>
                      <td className="whitespace-nowrap px-3 py-3">{pedido.productos?.length || 0} productos</td>
                      <td className="whitespace-nowrap px-3 py-3">${pedido.total || 0}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <AccionesTabla
                          id={pedido.id}
                          tipo="pedido"
                          onEditar={handleEditar}
                          onEliminar={handleEliminar}
                          onVer={handleVer}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {pedidoEditando && (
        <FormularioEditarPedido
          pedido={pedidoEditando}
          onClose={() => setPedidoEditando(null)}
          onSuccess={handleGuardarEdicion}
        />
      )}
    </div>
  );
}