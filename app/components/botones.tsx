'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import FormularioCliente from './formulario-cliente';
import FormularioProveedor from './formulario-proveedor';
import FormularioFactura from './formulario-factura';
import FormularioPedido from './formulario-pedido';


interface CrearClienteProps {
  onSuccess?: () => void;
}

interface CrearProveedorProps {
  onSuccess?: () => void;
}

interface CrearFacturaProps {
  onSuccess?: () => void;
}

interface CrearPedidoProps {
  onSuccess?: () => void;
}


export function CrearCliente({ onSuccess }: CrearClienteProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSuccess = () => {
    setMostrarFormulario(false);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <button 
        onClick={() => setMostrarFormulario(true)}
        className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <span className="hidden md:block">Crear Cliente</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      {mostrarFormulario && (
        <FormularioCliente 
          onClose={() => setMostrarFormulario(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}


export function CrearProveedor({ onSuccess }: CrearProveedorProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSuccess = () => {
    setMostrarFormulario(false);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <button 
        onClick={() => setMostrarFormulario(true)}
        className="flex h-10 items-center rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
      >
        <span className="hidden md:block">Crear Proveedor</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      {mostrarFormulario && (
        <FormularioProveedor 
          onClose={() => setMostrarFormulario(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}


export function CrearFactura({ onSuccess }: CrearFacturaProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSuccess = () => {
    setMostrarFormulario(false);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <button 
        onClick={() => setMostrarFormulario(true)}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Crear Factura</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      {mostrarFormulario && (
        <FormularioFactura 
          onClose={() => setMostrarFormulario(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}


export function CrearPedido({ onSuccess }: CrearPedidoProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSuccess = () => {
    setMostrarFormulario(false);
    if (onSuccess) {
      onSuccess();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <button 
        onClick={() => setMostrarFormulario(true)}
        className="flex h-10 items-center rounded-lg bg-yellow-600 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
      >
        <span className="hidden md:block">Crear Pedido</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>

      {mostrarFormulario && (
        <FormularioPedido 
          onClose={() => setMostrarFormulario(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}