interface FilterBarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    viewMode: 'list' | 'map';
    setViewMode: (mode: 'list' | 'map') => void;
}

export default function FilterBar({ searchQuery, setSearchQuery, viewMode, setViewMode }: FilterBarProps) {
    return (
        <div className="sticky top-[73px] z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 py-3 px-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">

                <div className="relative w-full sm:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Filtrer par quartier (ex: Agdal, Saiss...)"
                        className="block w-full rounded-lg border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 shadow-sm bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto">
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
        </div>
    );
}
