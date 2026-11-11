# DERIVA — Prototipo 04 (corrección de encuadre)

Prototipo interactivo de redes urbanas ramificadas, inspirado en la DLA y el recorrido por Recoleta.

## Para abrir

1. Descomprimí el ZIP.
2. En Visual Studio Code, abrí esa carpeta (Archivo → Abrir carpeta).
3. Abrí `index.html` y presioná **Go Live** (extensión Live Server).
4. Esperá a ver las calles en el mapa y presioná **Generar recorrido**.

También puede abrirse `index.html` directamente, pero Live Server es preferible.

## Corrección de la versión 04

- Se corrigió el error `Cannot read properties of undefined (reading 'layerPointToLatLng')`, que aparecía al generar un recorrido.
- El fallo venía de calcular los límites de un círculo de Leaflet que no estaba agregado al mapa. Ahora los límites geográficos se calculan directamente desde el punto inicial y el radio.
- Se reemplazaron **las dos** llamadas problemáticas (al preparar las calles y al comenzar la animación).

## Qué cambió respecto a las primeras versiones

- Quitamos las consultas a los servidores Overpass que se cancelaban después de 18 segundos.
- El prototipo **lee las calles reales de los mosaicos vectoriales ya cargados en OpenFreeMap**, sin hacer una segunda consulta al presionar Generar recorrido.
- Para obtener el grafo de calles, detecta los trazos de las calles visibles, conecta sus extremos e intersecciones, y anima una red de ramificaciones. Algunos cruces de distinto nivel o calles con geometría simplificada podrían no estar representados con precisión.
- Sigue usando una conexión a internet **para el mapa inicial, las bibliotecas y sus mosaicos**. No sirve sin conexión.
- Los datos disponibles dependen del nivel de zoom y de las teselas que estén cargadas. No es un sistema de navegación y no valida transitabilidad, acceso, obras ni seguridad.
- Puede haber diferencias entre las líneas generadas y los recorridos peatonales reales. La red es generativa, no una ruta garantizada.

## Controles

- Zona: Recoleta, Palermo, San Telmo o punto personalizado.
- Escala (radio) e intensidad de bifurcación.
- Generar, pausar, continuar, limpiar y exportar GeoJSON.
- Guardado local de la última red.

## Archivos

- `index.html`: estructura y mapa.
- `styles.css`: diseño responsive.
- `script.js`: generación, red vectorial, mapa y exportación.

**Créditos de datos de base:** © OpenStreetMap contributors y OpenFreeMap. Prototipo de concepto inspirado en procesos de ramificación estocástica; no es una simulación física exacta de DLA.
