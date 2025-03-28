import React, { useState, useEffect } from 'react';

const RoomSetup = () => {
  // State for room and table dimensions
  const [roomLength, setRoomLength] = useState(50); // meters
  const [roomWidth, setRoomWidth] = useState(30); // meters
  const [danceFlorPercentage, setDanceFloorPercentage] = useState(20);
  const [totalGuests, setTotalGuests] = useState(200);
  const [numberOfTables, setNumberOfTables] = useState(20);
  
  // Table dimensions
  const TABLE_DIAMETER = 2; // meters
  const TABLE_SPACING = 0.5; // meters between tables

  // Calculate available space
  const calculateAvailableSpace = () => {
    const totalRoomArea = roomLength * roomWidth;
    const danceFlorArea = totalRoomArea * (danceFlorPercentage / 100);
    const availableArea = totalRoomArea - danceFlorArea;
    return availableArea;
  };

  // Calculate table layout
  const calculateTableLayout = () => {
    const availableArea = calculateAvailableSpace();
    const tableArea = Math.PI * Math.pow(TABLE_DIAMETER / 2, 2);
    const totalTableArea = tableArea * numberOfTables;

    // Basic validation
    if (totalTableArea > availableArea) {
      return {
        error: "Too many tables for available space"
      };
    }

    // Simplified grid layout
    const tablesPerRow = Math.ceil(Math.sqrt(numberOfTables));
    const rowSpacing = TABLE_DIAMETER + TABLE_SPACING;
    const columnSpacing = TABLE_DIAMETER + TABLE_SPACING;

    return {
      tablesPerRow,
      rowSpacing,
      columnSpacing
    };
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Room Setup</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Room Length (meters)</label>
          <input 
            type="number" 
            value={roomLength}
            onChange={(e) => setRoomLength(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2">Room Width (meters)</label>
          <input 
            type="number" 
            value={roomWidth}
            onChange={(e) => setRoomWidth(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2">Dance Floor Space (%)</label>
          <input 
            type="number" 
            value={danceFlorPercentage}
            onChange={(e) => setDanceFloorPercentage(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2">Total Number of Guests</label>
          <input 
            type="number" 
            value={totalGuests}
            onChange={(e) => setTotalGuests(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-2">Number of Tables</label>
          <input 
            type="number" 
            value={numberOfTables}
            onChange={(e) => setNumberOfTables(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Room Analysis</h3>
        <p>Total Room Area: {(roomLength * roomWidth).toFixed(2)} m²</p>
        <p>Dance Floor Area: {(roomLength * roomWidth * (danceFlorPercentage / 100)).toFixed(2)} m²</p>
        <p>Available Table Area: {calculateAvailableSpace().toFixed(2)} m²</p>
        
        {calculateTableLayout().error && (
          <p className="text-red-500">{calculateTableLayout().error}</p>
        )}
      </div>
    </div>
  );
};

export default RoomSetup;
