'use client';

import { useState, useEffect } from 'react';
import { fetchProveedores, eliminarProveedor } from '../lib/api';
import { CrearProveedor } from '../components/botones';
import Search from '../components/search';
import AccionesTabla from '../components/acciones-tabla';
import FormularioEditarProveedor from '../components/formulario-editar-proveedor';

interface Proveedor {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
}

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState<Proveedor[]>([]);
  const [cargando, setCargando] = useState(true);
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarProveedores = async () => {
    try {
      setCargando(true);
      const datos = await fetchProveedores();
      setProveedores(datos);
      setProveedoresFiltrados(datos);
    } catch (error) {
      console.error('Error cargando proveedores:', error);
      alert('Error cargando proveedores');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  useEffect(() => {
    const filtrados = proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      proveedor.correo.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProveedoresFiltrados(filtrados);
  }, [busqueda, proveedores]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarProveedor(id);
      await cargarProveedores();
      alert('✅ Proveedor eliminado exitosamente');
    } catch (error) {
      alert('❌ Error eliminando proveedor');
    }
  };

  const handleEditar = (id: number) => {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) setProveedorEditando(proveedor);
  };

  const handleVer = (id: number) => {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
      alert(`🏪 Proveedor #${proveedor.id}\nNombre: ${proveedor.nombre}\nEmail: ${proveedor.correo}`);
    }
  };

  const handleGuardarEdicion = () => {
    setProveedorEditando(null);
    cargarProveedores();
  };

  if (cargando) {
    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Proveedores</h1>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando proveedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Proveedores</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search 
          placeholder="Buscar proveedores..." 
          onSearch={setBusqueda}
        />
        <CrearProveedor onSuccess={cargarProveedores} />
      </div>

      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {proveedoresFiltrados.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {busqueda ? 'No se encontraron proveedores' : 'No hay proveedores registrados'}
                </p>
              </div>
            ) : (
              <table className="min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th className="px-4 py-5 font-medium sm:pl-6">ID</th>
                    <th className="px-3 py-5 font-medium">Nombre</th>
                    <th className="px-3 py-5 font-medium">Email</th>
                    <th className="px-3 py-5 font-medium text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {proveedoresFiltrados.map((proveedor) => (
                    <tr key={proveedor.id} className="w-full border-b py-3 text-sm">
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">{proveedor.id}</td>
                      <td className="whitespace-nowrap px-3 py-3">{proveedor.nombre}</td>
                      <td className="whitespace-nowrap px-3 py-3">{proveedor.correo}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <AccionesTabla
                          id={proveedor.id}
                          tipo="proveedor"
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

      {proveedorEditando && (
        <FormularioEditarProveedor
          proveedor={proveedorEditando}
          onClose={() => setProveedorEditando(null)}
          onSuccess={handleGuardarEdicion}
        />
      )}
    </div>
  );
}