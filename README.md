# ¿Casualidades?

Obra web interactiva para Artes Multimediales 1, Cátedra Groisman. Una ramificación aparece con el movimiento del cursor o del dedo y conecta, al azar, la gota, las raíces, los ríos, las hojas, la DLA y otras formas del mundo natural.

## Publicar en GitHub Pages

La página es estática: no necesita servidor propio, compilación ni dependencias de JavaScript. Para publicarla, subí la carpeta del proyecto a un repositorio de GitHub y, en **Settings → Pages**, elegí la rama y la carpeta donde está `index.html` (normalmente `main` y `/ (root)`).

También podés abrir `index.html` directamente o usar Live Server desde Visual Studio Code.

## Interacción

- Mové el cursor para hacer crecer las ramas como si soplaras una gota; mantené presionado para darles más impulso. En el celular, deslizá el dedo.
- Girá el recorrido para encontrar otras formas. Usá la rueda del mouse o el gesto de acercar/alejar para cambiar de escala y de referente.
- Si dejás de intervenir, las ramas finas se desvanecen. Al volver al punto inicial queda un eco de la sesión.
- Las topologías se guardan en `localStorage` de ese navegador y pueden aparecer como un eco en visitas posteriores desde el mismo navegador. Cada instalación del navegador conserva su propio archivo de huellas.

## Imágenes

La carpeta `img/` ya incluye `gota.png`, `ombu.jpg`, `roble_vivo.jpeg`, `rio_parana.jpg`, `hoja1.jpg`, `hoja2.jpg` y `hoja3.jpg`; la obra usa algunas como referentes al azar. No hace falta instalar nada para probarla.

Para agregar otra imagen, guardala dentro de `img/` (por ejemplo `coral.jpg`) y agregá o editá un objeto de la lista `motifs` en `script.js`:

```js
{ name: 'El coral', family: 'MAR', image: 'img/coral.jpg', alt: 'Estructura ramificada de un coral', text: 'Una colonia construye una forma compartida.', scale: 'MAR · COLONIA' }
```

Si la imagen es solo decorativa, podés dejar `image: ''`; la tarjeta muestra igual el texto del fenómeno. Se aceptan rutas relativas bajo `img/` y formatos habituales de navegador como JPG, PNG, WebP o GIF.

## Créditos

Integrantes: Juan Carol Lugones y Germán Zariz Lüchter | 2026  
Artes Multimediales 1 | Cátedra Groisman
