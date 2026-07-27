import { MapPin } from "lucide-react";

const LocationCard = () => {
  return (
    <div className="rounded-xl bg-white p-4 md:p-5">
      <div className="flex items-start gap-3">
        <MapPin size={20} className="mt-2 shrink-0 text-PrimaryBlue" />
        <div>
          <p className="text-sm text-gray-400">Location</p>
          <p className="text-base font-semibold text-foreground">Mövenpick Hotel Zürich Airport</p>
          <p className="text-base text-foreground">Walter Mittelholzerstrasse 8</p>
          <p className="text-base text-foreground">8152 Opfikon</p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
