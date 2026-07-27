import React from "react";

export default function InterviewListSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-3 justify-end mb-10">
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-full" />
        </div>
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-full" />
        </div>
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-full" />
        </div>
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-full" />
        </div>
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {" "}
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="mb-4">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="mb-4">
          <div className="h-14 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>

      <ul className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="mb-4">
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-full" />
              </div>
              <div className="mb-4">
                <div className="h-5 w-5 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
