interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    viewMode: 'list' | 'map';
    setViewMode: (mode: 'list' | 'map') => void;
    count: number;
    quartiers: string[];
    selectedQuartier: string;
    setSelectedQuartier: (q: string) => void;
    showFavoritesOnly: boolean;
    setShowFavoritesOnly: (v: boolean) => void;
    favoritesCount: number;
}

export default function FilterBar({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    count,
    quartiers,
    selectedQuartier,
    setSelectedQuartier,
    showFavoritesOnly,
    setShowFavoritesOnly,
    favoritesCount,
}: FilterBarProps) {
    return (
        <div className="sticky top-[73px] z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 py-3 px-4">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
                {/* Row 1: Search + view toggle */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher une pharmacie ou une adresse..."
                            className="block w-full rounded-lg border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 shadow-sm bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="hidden sm:flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2
                    ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🗒️ Liste
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2
                    ${viewMode === 'map' ? 'bg-gray-100 text-gray-900 shadow-inner' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            🗺️ Carte
                        </button>
                    </div>
                </div>

                {/* Row 2: Quartier dropdown + Favoris toggle + Results count */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Quartier dropdown */}
                    {quartiers.length > 0 && (
                        <select
                            value={selectedQuartier}
                            onChange={(e) => setSelectedQuartier(e.target.value)}
                            className="text-sm rounded-lg border-0 py-1.5 pl-3 pr-8 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-500 bg-white shadow-sm cursor-pointer"
                        >
                            <option value="">Tous les quartiers</option>
                            {quartiers.map((q) => (
                                <option key={q} value={q}>{q}</option>
                            ))}
                        </select>
                    )}

                    {/* Favoris toggle */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all shadow-sm
                            ${showFavoritesOnly
                                ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                                : 'bg-white border-gray-200 text-gray-500 hover:border-yellow-300 hover:text-yellow-600'
                            }`}
                    >
                        ⭐ Mes favoris
                        {favoritesCount > 0 && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${showFavoritesOnly ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                                {favoritesCount}
                            </span>
                        )}
                    </button>

                    {/* Results count */}
                    <span className="ml-auto text-xs text-gray-400 font-medium">
                        {count} pharmacie{count !== 1 ? 's' : ''} trouvée{count !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>
        </div>
    );
}
