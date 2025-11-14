'use client';

import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface AccionesTablaProps {
  id: number;
  tipo: 'cliente' | 'proveedor' | 'factura' | 'pedido';
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
  onVer: (id: number) => void;
}

export default function AccionesTabla({ id, tipo, onEditar, onEliminar, onVer }: AccionesTablaProps) {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleEliminar = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    onEliminar(id);
    setMostrarConfirmacion(false);
  };

  return (
    <>
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => onVer(id)}
          className="text-blue-600 hover:text-blue-900 p-1 rounded"
          title="Ver detalles"
        >
          <EyeIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onEditar(id)}
          className="text-green-600 hover:text-green-900 p-1 rounded"
          title="Editar"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleEliminar}
          className="text-red-600 hover:text-red-900 p-1 rounded"
          title="Eliminar"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Modal de confirmación */}
      {mostrarConfirmacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar este {tipo}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}