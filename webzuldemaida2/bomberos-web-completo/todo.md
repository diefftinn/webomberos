# Proyecto: Estación de Bomberos Voluntarios - TODO

## Base de Datos y Backend
- [x] Crear esquema de base de datos normalizado (tablas: noticias, servicios, estaciones, cursos, galería, solicitudes, usuarios, voluntarios, estadísticas)
- [x] Implementar migraciones de Drizzle ORM
- [x] Crear funciones de consulta en server/db.ts para todas las entidades
- [x] Implementar routers tRPC para noticias
- [x] Implementar routers tRPC para servicios
- [x] Implementar routers tRPC para estaciones
- [x] Implementar routers tRPC para cursos
- [x] Implementar routers tRPC para galería
- [x] Implementar routers tRPC para solicitudes
- [x] Implementar routers tRPC para voluntarios
- [x] Implementar routers tRPC para estadísticas
- [ ] Crear tests unitarios con Vitest para funciones críticas

## Frontend - Estructura General
- [x] Configurar tema global (colores, tipografía, estilos elegantes)
- [x] Crear componentes de layout base (Header, Footer, Navigation)
- [x] Implementar navegación responsiva y menú móvil
- [x] Crear página de inicio (Home) con slider de noticias y servicios destacados
- [x] Implementar sistema de rutas en App.tsx

## Frontend - Páginas Públicas
- [x] Crear página de Noticias y Comunicados
- [ ] Crear página de detalle de noticia
- [x] Crear página de Servicios
- [ ] Crear página de detalle de servicio
- [x] Crear página de Estaciones (directorio)
- [ ] Crear página de detalle de estación con mapa
- [x] Crear página de Cursos y Capacitaciones
- [ ] Crear página de detalle de curso
- [x] Crear página de Galería (imágenes y videos)
- [x] Crear página de Información Institucional (Historia, Organigrama, Políticas)
- [x] Crear página de Voluntariado
- [x] Crear página de Contacto

## Frontend - Formularios y Solicitudes
- [ ] Crear formulario de solicitud de inspecciones técnicas
- [x] Crear formulario de inscripción a voluntariado
- [x] Crear formulario de contacto general
- [x] Implementar validación de formularios con Zod
- [x] Implementar notificaciones de envío exitoso

## Frontend - Panel Administrativo
- [ ] Crear layout del panel administrativo con sidebar
- [ ] Implementar gestión de noticias (CRUD)
- [ ] Implementar gestión de servicios (CRUD)
- [ ] Implementar gestión de estaciones (CRUD)
- [ ] Implementar gestión de cursos (CRUD)
- [ ] Implementar gestión de galería (CRUD)
- [ ] Implementar gestión de solicitudes (visualización y respuesta)
- [ ] Implementar gestión de voluntarios
- [ ] Crear dashboard con estadísticas principales
- [ ] Implementar control de acceso (solo admin)

## Integraciones Especiales
- [ ] Integrar Google Maps para ubicación de estaciones
- [ ] Implementar carga de imágenes a S3
- [ ] Crear componente de galería con lightbox
- [ ] Implementar gráficos de estadísticas con Recharts
- [ ] Crear slider/carrusel para noticias destacadas

## Optimización y Pruebas
- [ ] Optimizar imágenes y lazy loading
- [ ] Implementar caché de datos
- [ ] Realizar pruebas de responsividad en móvil
- [ ] Pruebas de funcionalidad en navegadores
- [ ] Optimizar rendimiento (Core Web Vitals)

## Documentación
- [ ] Documentar estructura de base de datos
- [ ] Documentar API endpoints disponibles
- [ ] Crear guía de uso del panel administrativo
- [ ] Documentar variables de entorno requeridas
