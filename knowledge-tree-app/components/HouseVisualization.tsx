// components/HouseVisualization.tsx

import { h } from "preact";
import { useState } from "preact/hooks";

interface Room {
  id: number;
  label: string;
  notes: string;
  media?: string[];
}

export default function HouseVisualization() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomCounter, setRoomCounter] = useState(1);

  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      { id: roomCounter, label: `Room ${roomCounter}`, notes: "Notes for room", media: [] },
    ]);
    setRoomCounter((prevCount) => prevCount + 1);
  };

  return (
    <div class="house-visualization">
      <p class="text-xl mb-4">House Visualization 🏠</p>
      <button class="px-4 py-2 bg-yellow-600 text-white rounded" onClick={addRoom}>
        Add Room
      </button>
      <div class="house">
        {rooms.map((room) => (
          <div key={room.id} class="room">
            <div class="room-icon">🛋️</div>
            <p>{room.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
