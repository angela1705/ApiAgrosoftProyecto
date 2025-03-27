import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Agrosis',
      description: "Documentación de la api Agrosis",
      social: {
				github: 'https://github.com/angela1705/ApiAgrosoftProyecto',
			},
      logo: {
        src: "/public/logo.png", 
        alt: "Mi Logo",
      },
      customCss: ['./src/estilos/logo.css'],
      sidebar: [
        {
          label: 'Introducción',
          items: [
            { label: 'introduccion', slug: 'guides/intro' },
            { label: 'Instalación', slug: 'guides/install' },
            { label: 'Autenticación', slug: 'guides/authentication' },
          ],
        },
        {
          label: 'Usuarios',
          items: [
            { label: 'Introducción', slug: 'modules/usuarios/index' },
            { label: 'usuarios', slug: 'modules/usuarios/usuarios' },
            { label: 'permisos', slug: 'modules/usuarios/permisos' },


          ],
        },
        {
          label: 'Trazabilidad del Cultivo',
          items: [
            { label: 'Introducción', slug: 'modules/trazabilidad/index' },
            { label: 'Lotes', slug: 'modules/trazabilidad/lotes' },
            { label: 'Bancales', slug: 'modules/trazabilidad/bancal' },
            { label: 'Tipo de Especie', slug: 'modules/trazabilidad/tipoespecie' },
            { label: 'Especie', slug: 'modules/trazabilidad/especie' },
            { label: 'Cultivo', slug: 'modules/trazabilidad/cultivo' },
            { label: 'Tipo de actividad', slug: 'modules/trazabilidad/tipoactividad' },
            { label: 'Actividad', slug: 'modules/trazabilidad/actividad' },
          ],
        },
        {
          label: 'Inventario',
          items: [
            { label: 'Gestión de Inventario', slug: 'modules/inventario/index' },
          ],
        },
        {
          label: 'Finanzas',
          items: [
            { label: 'Panel de Finanzas', slug: 'modules/finanzas/index' },
            { label: 'Gestión de Pagos', slug: 'modules/finanzas/pagos' },
            { label: 'Gestión de Salario', slug: 'modules/finanzas/salarios' },
            { label: 'Gestión de Ventas', slug: 'modules/finanzas/ventas' },
          ],
        },
        {
          label: 'IoT (Sensores)',
          items: [
            { label: 'Introducción', slug: 'modules/IoT/index' },
            { label: 'Gestión de Sensores', slug: 'modules/IoT/sensores' },
            { label: 'Datos Meteorológicos', slug: 'modules/IoT/datos-meteorologicos' },
            { label: 'Configuración', slug: 'modules/IoT/configuracion' }, 
          ],
        },
      ],
    }),
  ],
});