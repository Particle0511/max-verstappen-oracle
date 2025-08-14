import React from 'react';

// In a real application, the track name would come from props or an API.
const trackName = "12_great_britain"; // Example: Silverstone

const TrackMap = () => {
  return (
    <div className="bg-oracle-lightblue p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-semibold text-oracle-lightgray mb-4">Live Track Map</h2>
      <div className="flex items-center justify-center h-full">
        <img 
          src={`/images/track-layouts/${trackName}.svg`} 
          alt="Race Track Layout" 
          className="w-full h-auto max-h-80" 
          style={{ filter: 'invert(1) brightness(1.5)' }}
        />
      </div>
    </div>
  );
};

export default TrackMap;