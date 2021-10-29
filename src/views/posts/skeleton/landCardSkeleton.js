import React from "react";

export default function LandCardSkeleton() {
    return(
        <div className="animate-pulse grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-x-5">
            <div className="bg-gray h-54 w-80 object-cover"></div>
            <div className="col-span-2 space-y-2">
                <div className="h-3 bg-gray"></div>
                <div className="h-12 bg-gray"></div>
                <div className="bg-gray rounded-full w-8 h-8"></div>
                <div className="space-y-2">
                    <div className="h-6 bg-gray"></div>
                    <div className="h-6 bg-gray"></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-gray rounded-full w-8 h-8"></div>
                    <div className="bg-gray rounded-full w-8 h-8"></div>
                    <div className="bg-gray rounded-full w-8 h-8"></div>
                </div>
            </div>
        </div>
    );
}