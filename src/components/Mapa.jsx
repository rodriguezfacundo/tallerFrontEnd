import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import markerIcon from '../img/ubi.png';
import 'leaflet/dist/leaflet.css';

//para instalar leaflet: npm  i react-leaflet leaflet

//recibe una lista de marcas, cada una tiene un titulo, contenido y lat, lng, 
function Mapa({ markersData }) {
    const center = [-17, -65];
    const zoom = 3;
    const size = { minWidth: '400px', minHeight: '400px' }
    const urlTileLayer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const customMarkerIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    });

    return (
        <div >
            <div  >
                <MapContainer center={center} zoom={zoom} style={size}>
                    <TileLayer url={urlTileLayer} />
                    {markersData?.map(marker => {
                        const posMarker = [marker.latitude, marker.longitude];
                        const keyMarker = `${marker.latitude}-${marker.longitude}`;
                        return (
                            <Marker key={keyMarker} position={posMarker} icon={customMarkerIcon}>
                                <Popup>
                                    <h3>Pais: {marker.name}</h3>
                                    <p>Cantidad de usuarios: {marker.cantidadDeUsuarios}</p>
                                </Popup>
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>
        </div>
    )
}

export default Mapa