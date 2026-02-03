// Smart Parking Lot System - Assignment Implementation
import { useState } from "react";

function App() {
  const [slots, setSlots] = useState([]);

  const [slotNo, setSlotNo] = useState("");
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);

  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);

  const [removeSlotNo, setRemoveSlotNo] = useState("");
  const [message, setMessage] = useState("");

  // Add parking slot
  const addSlot = () => {
    if (!slotNo) {
      setMessage("Slot number required");
      return;
    }

    if (slots.find((s) => s.slotNo === Number(slotNo))) {
      setMessage("Slot already exists");
      return;
    }

    const newSlot = {
      slotNo: Number(slotNo),
      isCovered,
      isEVCharging,
      isOccupied: false,
    };

    setSlots([...slots, newSlot].sort((a, b) => a.slotNo - b.slotNo));
    setSlotNo("");
    setMessage(`Slot ${slotNo} added`);
  };

  // Park vehicle
  const parkVehicle = () => {
    const available = slots.filter((s) => {
      if (s.isOccupied) return false;
      if (needsEV && !s.isEVCharging) return false;
      if (needsCover && !s.isCovered) return false;
      return true;
    });

    if (available.length === 0) {
      setMessage("No slot available");
      return;
    }

    const chosen = available[0];

    setSlots(
      slots.map((s) =>
        s.slotNo === chosen.slotNo ? { ...s, isOccupied: true } : s
      )
    );

    setMessage(`Vehicle parked at Slot ${chosen.slotNo}`);
  };

  // Remove vehicle
  const removeVehicle = () => {
    const slot = slots.find((s) => s.slotNo === Number(removeSlotNo));

    if (!slot) {
      setMessage("Slot not found");
      return;
    }

    if (!slot.isOccupied) {
      setMessage("Slot already free");
      return;
    }

    setSlots(
      slots.map((s) =>
        s.slotNo === Number(removeSlotNo)
          ? { ...s, isOccupied: false }
          : s
      )
    );

    setRemoveSlotNo("");
    setMessage(`Slot ${removeSlotNo} is now free`);
  };

  return (
    <div className="app">
      <h1>🚗 Smart Parking Lot System</h1>

      <div className="card">
        <h2>Add Parking Slot</h2>
        <div className="row">
          <input
            type="number"
            placeholder="Slot Number"
            value={slotNo}
            onChange={(e) => setSlotNo(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={isCovered}
              onChange={() => setIsCovered(!isCovered)}
            />
            Covered
          </label>
          <label>
            <input
              type="checkbox"
              checked={isEVCharging}
              onChange={() => setIsEVCharging(!isEVCharging)}
            />
            EV Charging
          </label>
          <button onClick={addSlot}>Add Slot</button>
        </div>
      </div>

      <div className="card">
        <h2>All Parking Slots</h2>
        <div className="slots">
          {slots.length === 0 && <p>No slots added yet</p>}
          {slots.map((slot) => (
            <div
              key={slot.slotNo}
              className={`slot ${slot.isOccupied ? "occupied" : "free"}`}
            >
              <strong>Slot {slot.slotNo}</strong>
              <p>{slot.isCovered ? "Covered" : "Open"}</p>
              <p>{slot.isEVCharging ? "EV" : "Non-EV"}</p>
              <p>{slot.isOccupied ? "Occupied ❌" : "Available ✅"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Park Vehicle</h2>
        <label>
          <input
            type="checkbox"
            checked={needsEV}
            onChange={() => setNeedsEV(!needsEV)}
          />
          Needs EV
        </label>
        <label>
          <input
            type="checkbox"
            checked={needsCover}
            onChange={() => setNeedsCover(!needsCover)}
          />
          Needs Cover
        </label>
        <button onClick={parkVehicle}>Park Vehicle</button>
      </div>

      <div className="card">
        <h2>Remove Vehicle</h2>
        <input
          type="number"
          placeholder="Slot Number"
          value={removeSlotNo}
          onChange={(e) => setRemoveSlotNo(e.target.value)}
        />
        <button onClick={removeVehicle}>Remove</button>
      </div>

      <div className="output">
        <strong>Status:</strong> {message}
      </div>
    </div>
  );
}

export default App;
