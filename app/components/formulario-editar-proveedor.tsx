'use client';

import { useState } from 'react';
import { actualizarProveedor } from '../lib/api';

interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
}

interface FormularioEditarProveedorProps {
  proveedor: Proveedor;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormularioEditarProveedor({ proveedor, onClose, onSuccess }: FormularioEditarProveedorProps) {
  const [nombre, setNombre] = useState(proveedor.nombre);
  const [correo, setCorreo] = useState(proveedor.correo);
  const [telefono, setTelefono] = useState(proveedor.telefono || '');
  const [direccion, setDireccion] = useState(proveedor.direccion || '');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      await actualizarProveedor(proveedor.id, { 
        nombre, 
        correo, 
      });
      alert('✅ Proveedor actualizado exitosamente');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error actualizando proveedor:', error);
      alert(' Error al actualizar proveedor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Editar Proveedor</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Tecnología S.A."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900">Correo *</label>
            <input
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="contacto@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="+1234567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="Av. Principal #123"
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
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md disabled:opacity-50 transition-colors"
            >
              {cargando ? 'Actualizando...' : 'Actualizar Proveedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}