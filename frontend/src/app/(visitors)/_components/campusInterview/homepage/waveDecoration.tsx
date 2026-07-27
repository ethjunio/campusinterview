const WaveDecoration = () => {
    return (
      <div className="relative w-full overflow-hidden h-24 sm:h-32">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C200 20 400 100 600 60C800 20 1000 100 1200 60C1300 40 1380 50 1440 60V120H0V60Z"
            className="fill-wave/40"
          />
          <path
            d="M0 80C240 40 480 110 720 70C960 30 1200 100 1440 80V120H0V80Z"
            className="fill-wave/20"
          />
        </svg>
      </div>
    );
  };
  
  export default WaveDecoration;
  