crear base de datos

psql -U postgres          

psql (14.17 (Homebrew))
Type "help" for help.

postgres=# CREATE DATABASE "gestionRestaurantes";
\q


generr las migraciones  npm run  migration:generate

ejeuctar migraciones npm run migration:run


// borrar todo
npm run schema:drop

