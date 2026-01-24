# Arquitectura - Estación de Bomberos Voluntarios

## Estructura de Base de Datos Normalizada

### Tablas Principales

#### 1. **users** (Existente - Extendida)
Tabla de autenticación con roles para control de acceso.

```
- id: int (PK)
- openId: varchar (UNIQUE)
- name: text
- email: varchar
- role: enum('user', 'admin')
- createdAt: timestamp
- updatedAt: timestamp
```

#### 2. **news** (Noticias y Comunicados)
```
- id: int (PK)
- title: varchar (255)
- content: text
- imageUrl: varchar (500)
- imageKey: varchar (255) - Referencia S3
- author: varchar (255)
- publishedAt: timestamp
- createdAt: timestamp
- updatedAt: timestamp
- status: enum('draft', 'published')
```

#### 3. **services** (Servicios)
```
- id: int (PK)
- name: varchar (255)
- description: text
- icon: varchar (255)
- imageUrl: varchar (500)
- imageKey: varchar (255)
- order: int
- createdAt: timestamp
- updatedAt: timestamp
```

#### 4. **stations** (Estaciones de Bomberos)
```
- id: int (PK)
- name: varchar (255)
- address: text
- phone: varchar (20)
- latitude: decimal(10, 8)
- longitude: decimal(11, 8)
- email: varchar (255)
- commander: varchar (255)
- personnel: int
- createdAt: timestamp
- updatedAt: timestamp
```

#### 5. **courses** (Cursos y Capacitaciones)
```
- id: int (PK)
- title: varchar (255)
- description: text
- instructor: varchar (255)
- startDate: date
- endDate: date
- capacity: int
- enrolled: int
- location: varchar (255)
- imageUrl: varchar (500)
- imageKey: varchar (255)
- status: enum('scheduled', 'ongoing', 'completed', 'cancelled')
- createdAt: timestamp
- updatedAt: timestamp
```

#### 6. **gallery_items** (Galería)
```
- id: int (PK)
- title: varchar (255)
- description: text
- imageUrl: varchar (500)
- imageKey: varchar (255)
- videoUrl: varchar (500)
- category: varchar (100)
- order: int
- createdAt: timestamp
- updatedAt: timestamp
```

#### 7. **service_requests** (Solicitudes de Servicios)
```
- id: int (PK)
- type: enum('inspection', 'event', 'other')
- name: varchar (255)
- email: varchar (255)
- phone: varchar (20)
- address: text
- description: text
- requestedDate: date
- status: enum('pending', 'approved', 'rejected', 'completed')
- notes: text
- createdAt: timestamp
- updatedAt: timestamp
```

#### 8. **volunteers** (Voluntarios)
```
- id: int (PK)
- name: varchar (255)
- email: varchar (255)
- phone: varchar (20)
- address: text
- birthDate: date
- idNumber: varchar (20)
- experience: text
- status: enum('pending', 'approved', 'rejected', 'active', 'inactive')
- joinDate: date
- createdAt: timestamp
- updatedAt: timestamp
```

#### 9. **emergency_stats** (Estadísticas de Emergencias)
```
- id: int (PK)
- type: varchar (100) - Tipo de emergencia (incendio, rescate, etc.)
- stationId: int (FK)
- date: date
- count: int
- description: text
- createdAt: timestamp
- updatedAt: timestamp
```

#### 10. **institutional_info** (Información Institucional)
```
- id: int (PK)
- section: varchar (100) - 'history', 'organizational', 'policies'
- title: varchar (255)
- content: text
- imageUrl: varchar (500)
- imageKey: varchar (255)
- order: int
- createdAt: timestamp
- updatedAt: timestamp
```

## Relaciones

- `emergency_stats.stationId` → `stations.id`
- Todas las tablas con `imageKey` almacenan referencias a S3

## Stack Tecnológico

### Backend
- **Framework**: Express.js 4
- **API**: tRPC 11 (type-safe RPC)
- **Base de Datos**: MySQL/TiDB con Drizzle ORM
- **Autenticación**: Manus OAuth
- **Almacenamiento**: AWS S3 (Manus)

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Mapas**: Google Maps API (Manus proxy)
- **Gráficos**: Recharts
- **Formularios**: React Hook Form + Zod
- **Routing**: Wouter

## Flujo de Datos

1. **Público**: Acceso a noticias, servicios, estaciones, cursos, galería, información institucional
2. **Autenticado**: Acceso a formularios de solicitud y voluntariado
3. **Admin**: Acceso completo al panel administrativo para CRUD de contenido

## Consideraciones de Diseño

- Todas las imágenes se almacenan en S3 con claves únicas
- Las URLs de imágenes se guardan en la base de datos para referencia rápida
- Los datos se cachean en el cliente mediante React Query
- Las estadísticas se actualizan periódicamente
- El panel administrativo está protegido por autenticación y verificación de rol
