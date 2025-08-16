import React from 'react';

const trackName = "12_great_britain";

const TrackMap = () => {
  return (
    <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-oracle-lightgray mb-4">Live Track Map</h2>
      <div className="flex-grow flex items-center justify-center">
        <img 
          src={`/images/track-layouts/${trackName}.svg`} 
          alt="Race Track Layout" 
          className="w-full h-auto max-h-80" 
          style={{ filter: 'invert(0.8) brightness(1.2) contrast(1.2)' }}
        />
      </div>
    </div>
  );
};

export default TrackMap;
