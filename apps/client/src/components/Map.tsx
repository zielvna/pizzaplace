'use client';

import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

type Props = {
    position: [number, number];
};

const markerIcon = icon({
    iconUrl: '/marker-icon.png',
    iconSize: [24, 41],
    iconAnchor: [12, 41],
});

export default function Map({ position }: Props) {
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon} />
        </MapContainer>
    );
}
