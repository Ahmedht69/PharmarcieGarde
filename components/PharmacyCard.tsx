import { Pharmacy } from '@/types';

interface PharmacyCardProps {
    pharmacy: Pharmacy;
}

export default function PharmacyCard({ pharmacy }: PharmacyCardProps) {
    const { name, phone, lat, lon, quartier, distance } = pharmacy;

    const handleCall = () => {
        window.location.href = `tel:${phone.replace(/\s/g, '')}`;
    };

    const handleRoute = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-3 group">
            <div className="flex justify-between items-start">
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide">
                    Garde Nuit
                </span>
                {distance && (
                    <span className="flex items-center gap-1 text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-full">
                        📍 {distance} km
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-gray-900 font-bold text-lg leading-tight group-hover:text-green-600 transition-colors">
                    {name}
                </h3>

                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                    {pharmacy.address && (
                        <p className="text-xs text-gray-400 w-full flex items-start gap-1">
                            <span className="mt-0.5">📍</span>
                            {pharmacy.address}
                        </p>
                    )}
                    <span className="inline-flex items-center gap-1">
                        🏙️ {quartier || 'Fès'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                <button
                    onClick={handleCall}
                    className="flex items-center justify-center gap-2 
                    bg-[#DCFCE7] text-[#16A34A] 
                    md:bg-green-500 md:text-white
                    hover:opacity-90 active:scale-95
                    font-semibold py-2.5 px-3 rounded-lg transition-all shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" clipRule="evenodd" />
                    </svg>
                    Appeler
                </button>

                <button
                    onClick={handleRoute}
                    className="flex items-center justify-center gap-2 
                    bg-[#2563EB] text-white
                    md:bg-blue-50 md:text-blue-600 md:border md:border-blue-100
                    hover:opacity-90 active:scale-95
                    font-semibold py-2.5 px-3 rounded-lg transition-all shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                        <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.171 1.522-.93 1.522-1.838V6.375c0-1.036-.84-1.875-1.875-1.875h-4.148z" />
                    </svg>
                    Itinéraire
                </button>
            </div>
        </div>
    );
}
