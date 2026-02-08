'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import PharmacyCard from '@/components/PharmacyCard';
import FilterBar from '@/components/FilterBar';
import { Pharmacy } from '@/types';
import { calculateDistance } from '@/utils/distance';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });
import BottomNav from '@/components/BottomNav';

export default function Home() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    useEffect(() => {
        const isProd = process.env.NODE_ENV === 'production';
        const basePath = isProd ? '/PharmarcieGarde' : '';

        fetch(`${basePath}/data/pharmacies.json`)
            .then((res) => res.json())
            .then((data: Pharmacy[]) => {
                setPharmacies(data);
            })
            .catch((err) => console.error('Failed to load pharmacies', err));
    }, []);

    const handleLocateMe = () => {
        setIsLoadingLocation(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    setIsLoadingLocation(false);
                },
                (error) => {
                    console.error('Error getting location', error);
                    alert('Impossible de récupérer votre position. Vérifiez vos paramètres navigateur.');
                    setIsLoadingLocation(false);
                }
            );
        } else {
            alert('La géolocalisation n\'est pas supportée par votre navigateur.');
            setIsLoadingLocation(false);
        }
    };

    const filteredAndSortedPharmacies = useMemo(() => {
        let result = [...pharmacies];

        if (userLocation) {
            result = result.map(p => ({
                ...p,
                distance: (p.lat && p.lon)
                    ? calculateDistance(userLocation.lat, userLocation.lon, p.lat, p.lon)
                    : undefined
            }));

            result.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.quartier && p.quartier.toLowerCase().includes(query)) ||
                (p.address && p.address.toLowerCase().includes(query))
            );
        }

        return result;
    }, [pharmacies, userLocation, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header onLocateMe={handleLocateMe} isLoadingLocation={isLoadingLocation} />

            <div className="sticky top-[60px] z-40">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
            </div>

            <main className="flex-1 max-w-4xl mx-auto w-full p-4">
                {viewMode === 'list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {filteredAndSortedPharmacies.length > 0 ? (
                            filteredAndSortedPharmacies.map((pharmacy, index) => (
                                <PharmacyCard key={index} pharmacy={pharmacy} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                Aucune pharmacie trouvée pour "{searchQuery}".
                            </div>
                        )}
                    </div>
                )}

                {viewMode === 'map' && (
                    <div className="h-full">
                        <Map userLocation={userLocation} pharmacies={filteredAndSortedPharmacies} />
                    </div>
                )}


            </main>

            <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500 mt-auto mb-16 md:mb-0">
                <p>© {new Date().getFullYear()} Pharmacie de Garde Fès. Données à titre indicatif.</p>
            </footer>

            <BottomNav currentMode={viewMode} setMode={setViewMode} />
        </div>
    );
}
