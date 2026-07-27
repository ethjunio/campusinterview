// src/app/admin/dashboard/info-box/_components/InfoBoxFeatureSkeleton.tsx
import React from "react";

export const InfoboxFeatureSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Candidate Info Box Section */}
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>
      <hr />

      {/* Candidate Top Picks Section */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>
      <hr />

      {/* Company Info Box Section */}
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>

      {/* Business Menu Section */}
      <div>
        <div className="h-8 w-56 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>

      {/* Economy Menu Section */}
      <div>
        <div className="h-8 w-56 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>

      {/* Company Button Description Section */}
      <div>
        <div className="h-8 w-64 bg-gray-200 rounded mb-6" /> {/* Title */}
        <div className="h-108 max-w-screen-sm 2lg:w-1/2 bg-gray-200 rounded-md" />
      </div>

      {/* Button Text Input */}
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-2" /> {/* Label */}
        <div className="h-10 max-w-screen-sm bg-gray-200 rounded" />
      </div>

      {/* Button Link Input */}
      <div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-2" /> {/* Label */}
        <div className="h-10 max-w-screen-sm bg-gray-200 rounded" />
      </div>

      {/* Checkbox */}
      <div className="flex items-center mt-6">
        <div className="h-5 w-5 bg-gray-200 rounded" />
        <div className="h-5 w-48 bg-gray-200 rounded ml-3" />
      </div>

      {/* Save Button */}
      <div className="h-10 w-24 bg-gray-200 rounded" />
    </div>
  );
};
