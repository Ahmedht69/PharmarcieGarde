'use client';

import { useState, useEffect } from 'react';
import { Pharmacy } from '@/types';
import { parseAddress } from '@/utils/parseAddress';
import { isFavorite, toggleFavorite } from '@/utils/favorites';

interface PharmacyCardProps {
    pharmacy: Pharmacy;
    isNearest?: boolean;
    onFavoriteChange?: () => void;
}

export default function PharmacyCard({ pharmacy, isNearest, onFavoriteChange }: PharmacyCardProps) {
    const { name, phone, lat, lon, quartier, distance, address } = pharmacy;
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        setFavorited(isFavorite(phone));
    }, [phone]);

    const handleCall = () => {
        window.location.href = `tel:${phone.replace(/\s/g, '')}`;
    };

    const handleRoute = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        window.open(url, '_blank');
    };

    const handleShare = () => {
        const cleanAddr = parseAddress(address);
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        const text = `🏥 *${name}*\n📍 ${cleanAddr || quartier || 'Fès'}\n📞 ${phone}\n🗺️ Itinéraire : ${mapsUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleFavorite = () => {
        const next = toggleFavorite(phone);
        setFavorited(next);
        onFavoriteChange?.();
    };

    const cleanAddress = parseAddress(address);

    return (
        <div className={`bg-white rounded-xl p-4 shadow-sm border transition-shadow flex flex-col gap-3 group hover:shadow-md
            ${isNearest ? 'border-green-300 ring-1 ring-green-200' : 'border-gray-100'}`}>

            {/* Top row: badges + distance + favorite */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
                        Garde Nuit
                    </span>
                    {isNearest && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide animate-pulse">
                            ✦ Plus proche
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {distance !== undefined && (
                        <span className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-full">
                            📍 {distance} km
                        </span>
                    )}
                    <button
                        onClick={handleFavorite}
                        aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                        className={`text-lg leading-none transition-transform active:scale-75 ${favorited ? 'text-yellow-400' : 'text-gray-200 hover:text-yellow-300'}`}
                    >
                        ★
                    </button>
                </div>
            </div>

            {/* Name + address */}
            <div>
                <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-green-600 transition-colors">
                    {name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                    {cleanAddress && (
                        <p className="text-xs text-gray-400 w-full flex items-start gap-1">
                            <span className="mt-0.5 shrink-0">📍</span>
                            {cleanAddress}
                        </p>
                    )}
                    <span className="inline-flex items-center gap-1">
                        🏙️ {quartier || 'Fès'}
                    </span>
                </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                <button
                    onClick={handleCall}
                    className="flex items-center justify-center gap-1.5
                    bg-[#DCFCE7] text-[#16A34A]
                    md:bg-green-500 md:text-white
                    hover:opacity-90 active:scale-95
                    font-semibold py-2.5 px-2 rounded-lg transition-all shadow-sm text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" clipRule="evenodd" />
                    </svg>
                    Appeler
                </button>

                <button
                    onClick={handleRoute}
                    className="flex items-center justify-center gap-1.5
                    bg-[#2563EB] text-white
                    md:bg-blue-50 md:text-blue-600 md:border md:border-blue-100
                    hover:opacity-90 active:scale-95
                    font-semibold py-2.5 px-2 rounded-lg transition-all shadow-sm text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                        <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.171 1.522-.93 1.522-1.838V6.375c0-1.036-.84-1.875-1.875-1.875h-4.148z" />
                    </svg>
                    Itinéraire
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1.5
                    bg-[#25D366] text-white
                    hover:opacity-90 active:scale-95
                    font-semibold py-2.5 px-2 rounded-lg transition-all shadow-sm text-sm"
                    title="Partager sur WhatsApp"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.852L0 24l6.293-1.512A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.806 9.806 0 01-5.001-1.369l-.358-.213-3.716.893.924-3.62-.235-.372A9.769 9.769 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                    </svg>
                    Partager
                </button>
            </div>
        </div>
    );
}
