import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Pharmacy } from '@/types';
import L from 'leaflet';
import { useEffect } from 'react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RecenterAutomatically({ lat, lon }: { lat: number; lon: number }) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lon], map.getZoom());
    }, [lat, lon, map]);
    return null;
}

interface MapProps {
    userLocation: { lat: number; lon: number } | null;
    pharmacies: Pharmacy[];
}

export default function Map({ userLocation, pharmacies }: MapProps) {
    const center = userLocation ? [userLocation.lat, userLocation.lon] : [34.0331, -5.0003];

    return (
        <div className="h-[calc(100vh-200px)] w-full rounded-xl overflow-hidden shadow-md border border-gray-200 z-0">
            <MapContainer
                center={center as [number, number]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {userLocation && (
                    <>
                        <RecenterAutomatically lat={userLocation.lat} lon={userLocation.lon} />
                        <Marker position={[userLocation.lat, userLocation.lon]}>
                            <Popup>📍 Vous êtes ici</Popup>
                        </Marker>
                    </>
                )}

                {pharmacies.map((pharmacy, idx) => (
                    (pharmacy.lat && pharmacy.lon) && (
                        <Marker
                            key={idx}
                            position={[pharmacy.lat, pharmacy.lon]}
                        >
                            <Popup>
                                <div className="text-center">
                                    <h3 className="font-bold">{pharmacy.name}</h3>
                                    <p className="text-xs text-gray-500">{pharmacy.address}</p>
                                    <a href={`tel:${pharmacy.phone}`} className="block mt-2 text-green-600 font-bold">
                                        📞 Appeler
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
}
