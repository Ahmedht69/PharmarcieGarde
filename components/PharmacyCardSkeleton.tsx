export default function PharmacyCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 animate-pulse">
            {/* Top row */}
            <div className="flex justify-between items-start">
                <div className="h-5 w-20 bg-gray-100 rounded-md" />
                <div className="h-5 w-14 bg-gray-100 rounded-full" />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
                <div className="h-5 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-1/3 bg-gray-100 rounded" />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                <div className="h-10 bg-gray-100 rounded-lg" />
                <div className="h-10 bg-gray-100 rounded-lg" />
                <div className="h-10 bg-gray-100 rounded-lg" />
            </div>
        </div>
    );
}
