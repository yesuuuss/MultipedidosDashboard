'use client';

import { useState } from 'react';

interface FormularioClienteProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormularioCliente({ onClose, onSuccess }: FormularioClienteProps) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      console.log('Enviando datos:', { nombre, correo });
      
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo }),
      });

      console.log('Respuesta status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Cliente creado:', data);
        alert('✅ Cliente creado exitosamente');
        onSuccess();
        onClose();
      } else {
        const errorText = await response.text();
        console.error('Error del servidor:', errorText);
        alert(` Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert(' Error de conexión con el servidor. Verifica que Componente A esté ejecutándose.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Crear Nuevo Cliente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">Nombre *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              placeholder="nombre apellido"
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
              placeholder="tucorreo@tudominio.com"
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
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50 transition-colors"
            >
              {cargando ? 'Creando...' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}