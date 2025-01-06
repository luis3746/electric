// Lista de archivos KMZ con nombres y rutas dentro de la carpeta "kmzBQuilla"
const kmzBQuilla = [
    { name: "Ruta B5-4121", url: "kmzBQuilla/B5-4121.kml" },
];

// Inicializa el mapa
const baseMaps = {
    satellite: new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        }),
    }),
    traffic: new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        }),
    }),
};

let currentBase = 'satellite';

const map = new ol.Map({
    target: 'map',
    layers: [baseMaps[currentBase]],
    view: new ol.View({
        center: ol.proj.fromLonLat([-74.7813, 10.9639]), // Coordenadas de Barranquilla
        zoom: 12,
    }),
});

// Contenedor para los checkboxes de las capas
const layerContainer = document.getElementById('kmz-layers');

// Itera sobre los archivos KMZ definidos en la carpeta "kmzBQuilla"
kmzBQuilla.forEach((file) => {
    const { name, url } = file;

    // Crea una capa para el archivo KMZ
    const kmzLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.KML(), // OpenLayers interpreta KMZ como KML
        }),
    });

    // Agrega el archivo al menú de capas
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = name;
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            map.addLayer(kmzLayer);
        } else {
            map.removeLayer(kmzLayer);
        }
    });

    const label = document.createElement('label');
    label.htmlFor = name;
    label.textContent = name;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    layerContainer.appendChild(listItem);
});

// Alternar entre mapas base (satélite/tráfico)
document.getElementById('toggle-base').addEventListener('click', () => {
    map.removeLayer(baseMaps[currentBase]);
    currentBase = currentBase === 'satellite' ? 'traffic' : 'satellite';
    map.addLayer(baseMaps[currentBase]);
});
