import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Agrosis',
      description: "Documentación de la api Agrosis",
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
            { label: 'Gestión de Usuarios', slug: 'modules/usuarios/index' },
          ],
        },
        {
          label: 'Trazabilidad del Cultivo',
          items: [
            { label: 'Introducción', slug: 'modules/trazabilidad/index' },
            { label: 'Lotes', slug: 'modules/trazabilidad/lotes' },
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
          ],
        },
        {
          label: 'IoT (Sensores)',
          items: [
            { label: 'Introducción', slug: 'modules/IoT/index' },
            { label: 'Gestión de sensores', slug: 'modules/IoT/sensores' },  
          ],
        },
      ],
    }),
  ],
});