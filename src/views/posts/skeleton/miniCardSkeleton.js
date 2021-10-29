import React from 'react';

export default function MiniCardSkeleton() {
    return(
        <div className="animate-pulse space-y-6">
            <div className="space-y-2">
                <div className="bg-gray h-36 w-full object-cover"></div>
                <div className="h-10 bg-gray w-7/12"></div>
                <div className="space-y-2`">
                    <div className="h-6 bg-gray"></div>
                    <div className="h-6 bg-gray"></div>
                </div>
            </div>
        </div>
    );
}