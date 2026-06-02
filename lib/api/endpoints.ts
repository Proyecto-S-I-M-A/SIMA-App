export const ENDPOINTS = {
  accesos: {
    base: '/accesos',
    byId: (id: string) => `/accesos/${id}`,
  },

  clientes: {
    all: '/clientes/all',
    byId: (id: string | number) => `/clientes/${id}`,
    byCedula: (cedula: string) => `/clientes/cedula/${cedula}`,
  },

  dosis: {
    base: '/dosis',
    byId: (id: string | number) => `/dosis/${id}`,
    byReceta: (id_receta: string | number) => `/dosis/receta/${id_receta}`,
  },

  inventario: {
    base: '/inventario',
    all: '/inventario/all',
    byId: (id: string | number) => `/inventario/${id}`,
  },

  maquinas: {
    base: '/maquinas',
    all: '/maquinas/all',
    byId: (id: string | number) => `/maquinas/${id}`,
  },

  maquinaInventario: {
    base: '/maquina-inventario',
    byId: (id: string | number) => `/maquina-inventario/${id}`,
    byMaquina: (id_maquina: number) => `/maquina-inventario/maquina/${id_maquina}`,
    byInventario: (id_inventario: number) => `/maquina-inventario/inventario/${id_inventario}`,
    inventarioMaquina: (id_maquina: number) => `/maquina-inventario/inventario-maquina/${id_maquina}`,
  },

  recetas: {
    base: '/recetas',
    withDosis: '/recetas/dosis',
    byId: (id: string | number) => `/recetas/${id}`,
    byCliente: (cedula: string) => `/recetas/cliente/${cedula}`,
    dosisCliente: (cedula: string) => `/recetas/dosis/cliente/${cedula}`,
  },

  usuarios: {
    byId: (id: string | number) => `/usuarios/${id}`,
    byAcceso: (id_acceso: string) => `/usuarios/acceso/${id_acceso}`,
  },
} as const;
