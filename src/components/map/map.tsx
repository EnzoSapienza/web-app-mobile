import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './style.module.css';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const position: [number, number] = [-34.9215, -57.9536];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Catedral de la Plata</Popup>
      </Marker>
    </MapContainer>
  );
}
