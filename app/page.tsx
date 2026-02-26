'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import PharmacyCard from '@/components/PharmacyCard';
import PharmacyCardSkeleton from '@/components/PharmacyCardSkeleton';
import FilterBar from '@/components/FilterBar';
import BottomNav from '@/components/BottomNav';
import { Pharmacy } from '@/types';
import { calculateDistance } from '@/utils/distance';
import { getFavorites } from '@/utils/favorites';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [selectedQuartier, setSelectedQuartier] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);

    // Load pharmacy data
    useEffect(() => {
        const isProd = process.env.NODE_ENV === 'production';
        const basePath = isProd ? '/PharmarcieGarde' : '';

        fetch(`${basePath}/data/pharmacies.json`)
            .then((res) => res.json())
            .then((data: Pharmacy[]) => {
                setPharmacies(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load pharmacies', err);
                setIsLoading(false);
            });
    }, []);

    // Sync favorites from localStorage
    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    // Re-read favorites whenever showFavoritesOnly changes or after toggle
    const refreshFavorites = () => setFavorites(getFavorites());

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
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
            setIsLoadingLocation(false);
        }
    };

    // Unique sorted quartiers from data
    const quartiers = useMemo(() => {
        const all = pharmacies
            .map((p) => p.quartier)
            .filter((q): q is string => !!q);
        return [...new Set(all)].sort((a, b) => a.localeCompare(b, 'fr'));
    }, [pharmacies]);

    const filteredAndSortedPharmacies = useMemo(() => {
        let result = [...pharmacies];

        // Add distance and sort if geolocation is active
        if (userLocation) {
            result = result.map((p) => ({
                ...p,
                distance:
                    p.lat && p.lon
                        ? calculateDistance(userLocation.lat, userLocation.lon, p.lat, p.lon)
                        : undefined,
            }));
            result.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));
        }

        // Filter by text search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    (p.quartier && p.quartier.toLowerCase().includes(query)) ||
                    (p.address && p.address.toLowerCase().includes(query))
            );
        }

        // Filter by selected quartier
        if (selectedQuartier) {
            result = result.filter((p) => p.quartier === selectedQuartier);
        }

        // Filter favorites only
        if (showFavoritesOnly) {
            result = result.filter((p) => favorites.includes(p.phone));
        }

        return result;
    }, [pharmacies, userLocation, searchQuery, selectedQuartier, showFavoritesOnly, favorites]);

    const emptyMessage =
        showFavoritesOnly && filteredAndSortedPharmacies.length === 0
            ? 'Aucune pharmacie en favoris pour le moment.'
            : searchQuery || selectedQuartier
            ? `Aucune pharmacie trouvée pour votre recherche.`
            : null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header onLocateMe={handleLocateMe} isLoadingLocation={isLoadingLocation} />

            <div className="sticky top-[60px] z-40">
                <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    count={filteredAndSortedPharmacies.length}
                    quartiers={quartiers}
                    selectedQuartier={selectedQuartier}
                    setSelectedQuartier={setSelectedQuartier}
                    showFavoritesOnly={showFavoritesOnly}
                    setShowFavoritesOnly={setShowFavoritesOnly}
                    favoritesCount={favorites.length}
                />
            </div>

            <main className="flex-1 max-w-4xl mx-auto w-full p-4">
                {viewMode === 'list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {isLoading ? (
                            // Skeleton loading state
                            Array.from({ length: 6 }).map((_, i) => (
                                <PharmacyCardSkeleton key={i} />
                            ))
                        ) : filteredAndSortedPharmacies.length > 0 ? (
                            filteredAndSortedPharmacies.map((pharmacy, index) => (
                                <PharmacyCard
                                    key={pharmacy.phone}
                                    pharmacy={pharmacy}
                                    isNearest={index === 0 && !!userLocation}
                                    onFavoriteChange={refreshFavorites}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                <p className="text-4xl mb-3">🔍</p>
                                <p>{emptyMessage ?? 'Aucune pharmacie trouvée.'}</p>
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
