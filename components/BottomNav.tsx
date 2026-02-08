interface BottomNavProps {
    currentMode: 'list' | 'map' | 'favorites';
    setMode: (mode: 'list' | 'map' | 'favorites') => void;
}

export default function BottomNav({ currentMode, setMode }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-around items-center z-50 md:hidden pb-safe">
            <button
                onClick={() => setMode('list')}
                className={`flex flex-col items-center gap-1 ${currentMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                <span className="text-[10px] font-medium">Garde</span>
            </button>

            <button
                onClick={() => setMode('map')}
                className={`flex flex-col items-center gap-1 ${currentMode === 'map' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.032 1.675l-4.862 2.43a1.875 1.875 0 01-1.678 0l-4.993-2.497a.375.375 0 00-.336 0L4.98 20.849a1.875 1.875 0 01-2.73-1.675V6.689c0-.71.401-1.36 1.032-1.675l4.88-2.433zM16.5 15.75a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-medium">Carte</span>
            </button>

            <button
                onClick={() => setMode('favorites')}
                className={`flex flex-col items-center gap-1 ${currentMode === 'favorites' ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                    <path d="M6.75 12c0-.619.107-1.215.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.113 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
                <span className="text-[10px] font-medium">Favoris</span>
            </button>
        </div>
    );
}
