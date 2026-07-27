import {
  Play,
  Volume2,
  Maximize,
  RotateCcw,
  RotateCw,
  Monitor,
} from "lucide-react";
import heroThumb from "@/assets/hero-video-thumbnail.jpg";

const VideoPlayer = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* <img src={"img/studentLanding1.png"} alt="Campus Interview event" className="w-full aspect-video object-cover" /> */}
      <video
        className="w-full aspect-video object-cover"
        controls
        autoPlay
        muted
        loop
        playsInline
        poster="https://cdn.campusinterview.ch/promo/CI-promo-preview.png"
      >
        <source
          src="https://cdn.campusinterview.ch/promo/CI-promo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden lg:flex text-primary-foreground"><RotateCcw size={18} /></button>
          <button className="text-primary-foreground"><Play size={18} fill="currentColor" /></button>
          <button className="hidden lg:flex text-primary-foreground"><RotateCw size={18} /></button>
          <span className="text-xs text-primary-foreground/90">5:23</span>
          <span className="hidden lg:inline text-xs text-primary-foreground/50">/ 23:28</span>
          <div className="flex-1 mx-2">
            <div className="relative h-1 bg-primary-foreground/30 rounded-full">
              <div className="absolute left-0 top-0 h-full w-[23%] bg-primary-foreground rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[23%] h-3 w-3 rounded-full bg-primary-foreground"></div>
            </div>
          </div>
          <button className="hidden lg:flex text-primary-foreground"><Monitor size={16} /></button>
          <button className="text-primary-foreground"><Volume2 size={18} /></button>
          <button className="text-primary-foreground"><Maximize size={18} /></button>
        </div>
      </div> */}
    </div>
  );
};

export default VideoPlayer;
