'use client';

import { useState, useEffect } from 'react';
import { actualizarPedido, fetchClientes } from '../lib/api';

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

interface FormularioEditarPedidoProps {
  pedido: Pedido;
  onClose: () => void;
  onSuccess: () => void;
}

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export default function FormularioEditarPedido({ pedido, onClose, onSuccess }: FormularioEditarPedidoProps) {
  const [clienteId, setClienteId] = useState(pedido.clienteId.toString());
  const [productos, setProductos] = useState<Producto[]>(pedido.productos || []);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const clientesData = await fetchClientes();
        setClientes(clientesData);
      } catch (error) {
        console.error('Error cargando clientes:', error);
        alert('Error cargando clientes');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarClientes();
  }, []);

  const agregarProducto = () => {
    setProductos([...productos, { nombre: '', precio: 0 }]);
  };

  const eliminarProducto = (index: number) => {
    if (productos.length > 1) {
      const nuevosProductos = productos.filter((_, i) => i !== index);
      setProductos(nuevosProductos);
    }
  };

  const actualizarProducto = (index: number, campo: keyof Producto, valor: string | number) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [campo]: campo === 'precio' ? parseFloat(valor as string) || 0 : valor
    };
    setProductos(nuevosProductos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const productosValidos = productos.filter(p => p.nombre.trim() !== '');

      const pedidoData = {
        clienteId: parseInt(clienteId),
        productos: productosValidos
      };

      await actualizarPedido(pedido.id, pedidoData);
      alert('Pedido actualizado exitosamente');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error actualizando pedido:', error);
      alert('Error al actualizar pedido');
    } finally {
      setCargando(false);
    }
  };

  if (cargandoDatos) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Pedido</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Cliente *</label>
            <select
              required
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} - {cliente.correo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-900">Productos *</label>
              <button
                type="button"
                onClick={agregarProducto}
                className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
              >
                + Agregar Producto
              </button>
            </div>
            
            {productos.map((producto, index) => (
              <div key={index} className="flex space-x-2 mb-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    value={producto.nombre}
                    onChange={(e) => actualizarProducto(index, 'nombre', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={producto.precio}
                    onChange={(e) => actualizarProducto(index, 'precio', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Precio"
                  />
                </div>
                {productos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarProducto(index)}
                    className="text-red-600 hover:text-red-800 px-2 py-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md disabled:opacity-50 transition-colors"
            >
              {cargando ? 'Actualizando...' : 'Actualizar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}