# Samsung Bespoke Design Studio

Este proyecto requiere Node.js y npm instalados en su computadora.

## Iniciar el proyecto en modo desarrollo

Para instalar las dependencias del proyecto, puede ejecutar el siguiente comando:

```bash
npm run install-all
```

Este comando instalará las dependencias tanto para el código principal como para las subcarpetas `signage` y `tablet`.

**Nota:** Los archivos correspondientes a la carpeta `assets` no están incluidos en el repositorio remoto.

## Tecnologías Utilizadas

- **Frontend:** Vue.js
- **Backend:** Node.js

# prj-bespoke-desktop

Este proyecto implica el desarrollo adicional de una función de vista previa vertical utilizando el código fuente del simulador existente de Bespoke. Se instala la aplicación en un televisor vertical como un kiosco y se conecta con una tableta a través de una aplicación llamada Second Screen, comunicándose a través de sockets.

- [http://localhost:3000](http://localhost:3000): Simulador de Bespoke existente.
- [http://localhost:3000/viewer](http://localhost:3000/viewer): Pantalla de Señalización Bespoke recién creada.

## Configuración del Proyecto

### Instalación
```
yarn install
```
### Ejecutar servidor express
```
yarn dev
```
### Ejecutar electron
```
yarn start
```
### Construir electron
```
yarn build
```
## Ramas de trabajo

- **main**: Rama de la versión de 43 pulgadas de Bespoke.
- **feature/85-inch-monitor**: Rama de la versión de 85 pulgadas de Bespoke.
- **feature/sena**: Rama para la configuración de 43 pulgadas en español.
- **feature/smartthings**: Rama de SmartThings.

---

© 2021 CHI Technologies & Solutions. Todos los derechos reservados.

Contáctanos: [contacto@chi.com.pa](mailto:contacto@chi.com.pa) | [patricia.hung@chi.com.pa](mailto:patricia.hung@chi.com.pa)
