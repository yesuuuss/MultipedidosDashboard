'use client';

import { useState, useEffect } from 'react';

interface FormularioFacturaProps {
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

export default function FormularioFactura({ onClose, onSuccess }: FormularioFacturaProps) {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [totalFactura, setTotalFactura] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        console.log('Cargando proveedores y clientes...');
        
        const [proveedoresRes, clientesRes] = await Promise.all([
          fetch('http://localhost:8081/proveedores'),
          fetch('http://localhost:8080/clientes')
        ]);

        console.log('Proveedores status:', proveedoresRes.status);
        console.log('Clientes status:', clientesRes.status);

        if (proveedoresRes.ok) {
          const proveedoresData = await proveedoresRes.json();
          console.log('Proveedores cargados:', proveedoresData);
          setProveedores(proveedoresData);
        } else {
          console.error('Error cargando proveedores:', await proveedoresRes.text());
        }

        if (clientesRes.ok) {
          const clientesData = await clientesRes.json();
          console.log('Clientes cargados:', clientesData);
          setClientes(clientesData);
        } else {
          console.error('Error cargando clientes:', await clientesRes.text());
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
        alert('Error cargando datos. Verifica que los servicios estén ejecutándose.');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proveedorId) {
      alert('Por favor selecciona un proveedor');
      return;
    }

    setCargando(true);

    try {
      const facturaData = {
        numeroFactura: numeroFactura || undefined,
        totalFactura: totalFactura ? parseFloat(totalFactura) : undefined,
        clienteId: clienteId ? parseInt(clienteId) : undefined
      };

      console.log('Enviando factura:', facturaData);
      console.log('Proveedor ID:', proveedorId);

      const response = await fetch(`http://localhost:8081/facturas?proveedorId=${proveedorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaData),
      });

      console.log('Respuesta factura:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Factura creada:', data);
        alert(' Factura creada exitosamente');
        onSuccess();
        onClose();
      } else {
        const error = await response.text();
        console.error('Error del servidor:', error);
        alert(` Error al crear factura: ${error}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert(' Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Crear Nueva Factura</h2>
        
        {cargandoDatos ? (
          <div className="text-center py-4">
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Número de Factura</label>
              <input
                type="text"
                value={numeroFactura}
                onChange={(e) => setNumeroFactura(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="FAC-001 (opcional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Proveedor *</label>
              <select
                required
                value={proveedorId}
                onChange={(e) => setProveedorId(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              >
                <option value="" className="text-gray-500">Seleccionar proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id} className="text-gray-900">
                    {proveedor.nombre} - {proveedor.correo}
                  </option>
                ))}
              </select>
              {proveedores.length === 0 && (
                <p className="text-sm text-red-600 mt-1">No hay proveedores disponibles</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">Cliente</label>
              <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              >
                <option value="" className="text-gray-500">Sin cliente (opcional)</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id} className="text-gray-900">
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
                placeholder="0.00 (opcional)"
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
                disabled={cargando || proveedores.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 transition-colors"
              >
                {cargando ? 'Creando...' : 'Crear Factura'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}