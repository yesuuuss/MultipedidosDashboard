// URLs de tus microservicios
const COMPONENTE_A_URL = "http://localhost:8080";
const COMPONENTE_B_URL = "http://localhost:8081";



export async function fetchClientes() {
  try {
    const res = await fetch(`${COMPONENTE_A_URL}/clientes`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching clientes");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching clientes:", error);
    return [];
  }
}

export async function fetchClientePorId(id: number) {
  try {
    const res = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching cliente");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching cliente:", error);
    return null;
  }
}

export async function crearCliente(cliente: { nombre: string; correo: string }) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando cliente:', error);
    throw error;
  }
}

export async function actualizarCliente(id: number, cliente: { nombre: string; correo: string }) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando cliente:', error);
    throw error;
  }
}

export async function eliminarCliente(id: number) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/clientes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error eliminando cliente:', error);
    throw error;
  }
}



export async function fetchPedidos() {
  try {
    const res = await fetch(`${COMPONENTE_A_URL}/pedidos`, {
      cache: "no-store",
    });
    
    if (res.ok) {
      const pedidosReales = await res.json();
      
    
      if (pedidosReales.length > 0) {
        return pedidosReales;
      }
      
     
      console.log('No hay pedidos en la BD');
      return [
        {
          id: 1,
          clienteId: 1,
          productos: [
            { nombre: "Laptop Gaming", precio: 1200 },
            { nombre: "Mouse Inalámbrico", precio: 25 }
          ],
          total: 1372.00
        },
        {
          id: 2,
          clienteId: 2, 
          productos: [
            { nombre: "Monitor 24\"", precio: 300 },
            { nombre: "Teclado Mecánico", precio: 80 }
          ],
          total: 425.60
        }
      ];
    } else {
      throw new Error('Error en el endpoint');
    }
  } catch (error) {
    console.error('Error fetching pedidos, usando datos de ejemplo:', error);
    return [
      {
        id: 1,
        clienteId: 1,
        productos: [{ nombre: "Producto Temporal", precio: 100 }],
        total: 112.00
      }
    ];
  }
}

export async function crearPedido(pedido: { clienteId: number; productos: Array<{ nombre: string; precio: number }> }) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando pedido:', error);
    throw error;
  }
}

export async function actualizarPedido(id: number, pedido: any) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando pedido:', error);
    throw error;
  }
}

export async function eliminarPedido(id: number) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error eliminando pedido:', error);
    throw error;
  }
}



export async function fetchProveedores() {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/proveedores`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching proveedores");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching proveedores:", error);
    return [];
  }
}

export async function fetchProveedorPorId(id: number) {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/proveedores/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching proveedor");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching proveedor:", error);
    return null;
  }
}

export async function crearProveedor(proveedor: { nombre: string; correo: string }) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/proveedores`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando proveedor:', error);
    throw error;
  }
}

export async function actualizarProveedor(id: number, proveedor: { nombre: string; correo: string }) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/proveedores/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proveedor),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando proveedor:', error);
    throw error;
  }
}

export async function eliminarProveedor(id: number) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/proveedores/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error eliminando proveedor:', error);
    throw error;
  }
}



export async function fetchFacturas() {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/facturas`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching facturas");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching facturas:", error);
    return [];
  }
}

export async function fetchFacturaPorId(id: number) {
  try {
    const res = await fetch(`${COMPONENTE_B_URL}/facturas/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Error fetching factura");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching factura:", error);
    return null;
  }
}

export async function crearFactura(facturaData: any, proveedorId: number) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas?proveedorId=${proveedorId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facturaData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando factura:', error);
    throw error;
  }
}

export async function actualizarFactura(id: number, factura: any) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(factura),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando factura:', error);
    throw error;
  }
}

export async function eliminarFactura(id: number) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error eliminando factura:', error);
    throw error;
  }
}



export async function aplicarDescuentoPedido(id: number, porcentajeDescuento: number) {
  try {
    const response = await fetch(`${COMPONENTE_A_URL}/pedidos/${id}/descuento?porcentajeDescuento=${porcentajeDescuento}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error aplicando descuento:', error);
    throw error;
  }
}

export async function aplicarDescuentoFactura(id: number, porcentajeDescuento: number) {
  try {
    const response = await fetch(`${COMPONENTE_B_URL}/facturas/${id}/descuento?porcentajeDescuento=${porcentajeDescuento}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error aplicando descuento a factura:', error);
    throw error;
  }
}