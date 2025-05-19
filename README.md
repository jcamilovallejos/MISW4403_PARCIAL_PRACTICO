# Gestión de Restaurantes - Instrucciones de Base de Datos y Migraciones

## Requisitos

- **Node.js**: v20.12.2
- **PostgreSQL**: (recomendado 13+)
- **npm**: (viene con Node.js)
- Acceso a la terminal y permisos para crear bases de datos

---

## 1. Crear la base de datos en PostgreSQL

Abre tu terminal y ejecuta:

```bash
psql -U postgres
```

En la consola de PostgreSQL, crea la base de datos:

```sql
CREATE DATABASE "gestionRestaurantes";
\q
```


---

## 2. Generar migraciones

Para generar una nueva migración basada en los cambios de tus entidades:

```bash
npm run migration:generate
```
---

## 3. Ejecutar migraciones

Para aplicar todas las migraciones pendientes a la base de datos:

```bash
npm run migration:run
```


---

## 4. Borrar todo el esquema (opcional, solo para desarrollo)

Si necesitas **eliminar todas las tablas y datos** de la base de datos (útil para empezar de cero):

```bash
npm run schema:drop
```

## 5. Ejecutar la app

Para ejecutar la app solamente necesitaras correr el siguiente comando:

```bash
npm run start:dev
```
