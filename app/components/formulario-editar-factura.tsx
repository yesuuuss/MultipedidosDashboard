'use client';

import { useState, useEffect } from 'react';
import { actualizarFactura, fetchProveedores, fetchClientes } from '../lib/api';

interface Factura {
  id: number;
  numeroFactura: string;
  totalFactura: number;
  clienteId?: number;
  proveedor?: {
    id: number;
    nombre: string;
  };
}

interface FormularioEditarFacturaProps {
  factura: Factura;
  onClose: () => void;
  onSuccess: () => void;
}

interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
}

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

export default function FormularioEditarFactura({ factura, onClose, onSuccess }: FormularioEditarFacturaProps) {
  const [numeroFactura, setNumeroFactura] = useState(factura.numeroFactura || '');
  const [totalFactura, setTotalFactura] = useState(factura.totalFactura?.toString() || '');
  const [clienteId, setClienteId] = useState(factura.clienteId?.toString() || '');
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [proveedoresData, clientesData] = await Promise.all([
          fetchProveedores(),
          fetchClientes()
        ]);
        setProveedores(proveedoresData);
        setClientes(clientesData);
      } catch (error) {
        console.error('Error cargando datos:', error);
        alert('Error cargando datos');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const facturaData = {
        numeroFactura: numeroFactura || undefined,
        totalFactura: totalFactura ? parseFloat(totalFactura) : undefined,
        clienteId: clienteId ? parseInt(clienteId) : undefined
      };

      await actualizarFactura(factura.id, facturaData);
      alert(' Factura actualizada exitosamente');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error actualizando factura:', error);
      alert(' Error al actualizar factura');
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
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Factura</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Número de Factura</label>
            <input
              type="text"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="FAC-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Proveedor</label>
            <div className="mt-1 p-2 bg-gray-100 rounded text-gray-700">
              {factura.proveedor?.nombre || 'N/A'}
            </div>
            <p className="text-xs text-gray-500 mt-1">El proveedor no se puede cambiar</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Cliente</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Sin cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} - {cliente.correo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Total Factura</label>
            <input
              type="number"
              step="0.01"
              value={totalFactura}
              onChange={(e) => setTotalFactura(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="0.00"
            />
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 transition-colors"
            >
              {cargando ? 'Actualizando...' : 'Actualizar Factura'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}