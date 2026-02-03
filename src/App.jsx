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

  // ADD SLOT
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
    setMessage(`Slot ${slotNo} added`);
    setSlotNo("");
  };

  // PARK VEHICLE
  const parkVehicle = () => {
    const available = slots.filter((slot) => {
      if (slot.isOccupied) return false;
      if (needsEV && !slot.isEVCharging) return false;
      if (needsCover && !slot.isCovered) return false;
      return true;
    });

    if (available.length === 0) {
      setMessage("No slot available");
      return;
    }

    const nearest = available[0];

    setSlots(
      slots.map((slot) =>
        slot.slotNo === nearest.slotNo
          ? { ...slot, isOccupied: true }
          : slot
      )
    );

    setMessage(`Vehicle parked at Slot ${nearest.slotNo}`);
  };

  // REMOVE VEHICLE
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

    setMessage(`Slot ${removeSlotNo} is now free`);
    setRemoveSlotNo("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🚗 Smart Parking Lot System</h2>

      <h3>Add Parking Slot</h3>
      <input
        type="number"
        placeholder="Slot No"
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

      <hr />

      <h3>All Slots</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot.slotNo}>
            Slot {slot.slotNo} |{" "}
            {slot.isCovered ? "Covered" : "Open"} |{" "}
            {slot.isEVCharging ? "EV" : "Non-EV"} |{" "}
            {slot.isOccupied ? "❌ Occupied" : "✅ Free"}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Park Vehicle</h3>
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
        Needs Covered
      </label>
      <button onClick={parkVehicle}>Park</button>

      <hr />

      <h3>Remove Vehicle</h3>
      <input
        type="number"
        placeholder="Slot No"
        value={removeSlotNo}
        onChange={(e) => setRemoveSlotNo(e.target.value)}
      />
      <button onClick={removeVehicle}>Remove</button>

      <hr />

      <h3>Output</h3>
      <p>{message}</p>
    </div>
  );
}

export default App;
