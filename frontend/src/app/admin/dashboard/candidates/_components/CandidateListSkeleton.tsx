import React from "react";

export default function CandidateListSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
      </div>
      <div className="mb-4">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
      </div>

      <ul className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
              <div className="flex-1">
                <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="mt-4">
              <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
