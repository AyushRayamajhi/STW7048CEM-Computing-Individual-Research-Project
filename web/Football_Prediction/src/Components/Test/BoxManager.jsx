import React, { useState } from "react";
import DraggableResizableBox from "./Draggable";

const BoxManager = () => {
  const [boxes, setBoxes] = useState([
    {
      id: 1,
      name: "Box 1",
      position: { x: 100, y: 100 },
      size: { width: 200, height: 200 },
      borderRadius: 0,
      backgroundColor: "#add8e6", // Light blue default
    },
  ]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const addBox = () => {
    const nextId = boxes.length ? boxes[boxes.length - 1].id + 1 : 1;
    setBoxes([
      ...boxes,
      {
        id: nextId,
        name: `Box ${nextId}`,
        position: { x: 100 + nextId * 20, y: 100 + nextId * 20 },
        size: { width: 200, height: 200 },
        borderRadius: 0,
        backgroundColor: "#add8e6",
      },
    ]);
  };

  const updateBox = (id, changes) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? {
              ...box,
              ...(changes.position ? { position: changes.position } : {}),
              ...(changes.size ? { size: changes.size } : {}),
              ...(changes.borderRadius !== undefined
                ? { borderRadius: changes.borderRadius }
                : {}),
              ...(changes.name !== undefined ? { name: changes.name } : {}),
              ...(changes.backgroundColor
                ? { backgroundColor: changes.backgroundColor }
                : {}),
            }
          : box
      )
    );
  };

  const selectedBox = boxes.find((b) => b.id === selectedBoxId);

  return (
    <div>
      <button onClick={addBox} style={{ marginBottom: 10 }}>
        Add Box
      </button>

      {/* Control Panel */}
      <div
        style={{
          marginBottom: 10,
          padding: 10,
          border: "1px solid #ccc",
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <label>
          Radius:
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            disabled={!selectedBox}
            value={selectedBox?.borderRadius || 0}
            onChange={(e) =>
              updateBox(selectedBoxId, {
                borderRadius: parseInt(e.target.value, 10),
              })
            }
            style={{ marginLeft: 10 }}
          />
          <span style={{ marginLeft: 10 }}>
            {selectedBox?.borderRadius || 0}px
          </span>
        </label>

        <label>
          Width:
          <input
            type="number"
            min="50"
            disabled={!selectedBox}
            value={selectedBox?.size.width || ""}
            onChange={(e) =>
              updateBox(selectedBoxId, {
                size: {
                  width: parseInt(e.target.value, 10),
                  height: selectedBox.size.height,
                },
              })
            }
            style={{ marginLeft: 5, width: 60 }}
          />
        </label>

        <label>
          Height:
          <input
            type="number"
            min="50"
            disabled={!selectedBox}
            value={selectedBox?.size.height || ""}
            onChange={(e) =>
              updateBox(selectedBoxId, {
                size: {
                  width: selectedBox.size.width,
                  height: parseInt(e.target.value, 10),
                },
              })
            }
            style={{ marginLeft: 5, width: 60 }}
          />
        </label>

        <label>
          Color:
          <input
            type="color"
            disabled={!selectedBox}
            value={selectedBox?.backgroundColor || "#add8e6"}
            onChange={(e) =>
              updateBox(selectedBoxId, { backgroundColor: e.target.value })
            }
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

      {/* Render Boxes */}
      {boxes.map((box) => (
        <DraggableResizableBox
          key={box.id}
          id={box.id}
          position={box.position}
          size={box.size}
          borderRadius={box.borderRadius}
          backgroundColor={box.backgroundColor}
          name={box.name}
          isSelected={box.id === selectedBoxId}
          onUpdate={updateBox}
          onSelect={setSelectedBoxId}
        />
      ))}
    </div>
  );
};

export default BoxManager;
