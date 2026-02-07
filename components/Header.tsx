import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
    onLocateMe: () => void;
    isLoadingLocation: boolean;
}

export default function Header({ onLocateMe, isLoadingLocation }: HeaderProps) {
    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="md:hidden mb-1 text-[10px] uppercase tracking-wide text-gray-500 font-bold">
                    Maroc  •  Fès
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <span className="text-2xl">🏥</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-lg leading-tight">
                                Pharmacies de Garde
                            </h1>
                            <p className="hidden md:block text-xs text-gray-500 font-medium">Fès, Maroc</p>
                            <p className="md:hidden text-xs text-gray-400">📅 {today}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:block bg-gray-50 px-3 py-1 rounded-full text-sm font-medium text-gray-600 border border-gray-200 shadow-sm">
                            📅 {today}
                        </div>

                        <button
                            onClick={onLocateMe}
                            disabled={isLoadingLocation}
                            className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm transition-all shadow-md active:scale-95
                    ${isLoadingLocation
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-50 text-blue-600 border border-blue-100 md:bg-green-500 md:text-white md:border-transparent'
                                }`}
                        >
                            {isLoadingLocation ? (
                                '...'
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                    <span>Autour de moi</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
