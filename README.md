# ¿Casualidades?

Obra web interactiva para Artes Multimediales 1, Cátedra Groisman. El usuario construye un mapa vivo de imágenes, fragmentos de texto y conexiones sobre formas ramificadas que se repiten en la naturaleza.

## Publicar en GitHub Pages

La página es estática: no requiere servidor propio, compilación ni dependencias de JavaScript. Subí la carpeta del proyecto a un repositorio de GitHub y, en **Settings → Pages**, elegí la rama y la carpeta donde está `index.html` (normalmente `main` y `/ (root)`).

También podés abrir `index.html` directamente o usar Live Server desde Visual Studio Code.

## Cómo se recorre

- Posicioná el mouse y mantené el click para sumar imágenes, textos y vínculos en ese lugar. En el teléfono, mantené el dedo presionado.
- Soltá para detener el crecimiento. El mapa queda visible para explorarlo.
- Usá la rueda del mouse, los botones **+ / −**, o el gesto de pellizcar para hacer zoom. Con **Espacio + arrastre** podés desplazar el mapa en una computadora; en el teléfono, arrastrá con dos dedos.
- **Ver mapa completo** centra y encuadra los fragmentos. **Reiniciar** atenúa el mapa actual para que quede de fondo y permite empezar otro.
- Los mapas se guardan en `localStorage` de ese navegador y pueden reaparecer atenuados en visitas posteriores desde el mismo navegador. Cada instalación de navegador conserva su propia memoria.

## Imágenes

La carpeta `img/` incluye `gota.png`, `ombu.jpg`, `roble_vivo.jpeg`, `rio_parana.jpg`, `hoja1.jpg`, `hoja2.jpg` y `hoja3.jpg`. La página combina al azar imágenes disponibles con tarjetas de texto; también puede mostrar fenómenos sin imagen.

Para sumar un referente visual, guardá la imagen dentro de `img/` y agregá un objeto a la lista `topics` en `script.js`. Por ejemplo:

```js
{ title: 'El coral', category: 'MAR · COLONIA', image: 'img/coral.jpg', alt: 'Una estructura ramificada de coral', text: 'Una colonia construye una forma compartida.', color: '#c7888d' }
```

Si querés que el referente aparezca solo como texto, dejá `image: ''`. Se aceptan rutas relativas dentro de `img/` y formatos habituales de navegador como JPG, PNG, WebP o GIF.

## Créditos

Integrantes: Juan Carol Lugones y Germán Zariz Lüchter | 2026  
Artes Multimediales 1 | Cátedra Groisman
