import React, { useRef } from "react";

const DraggableResizableBox = ({
  id,
  position,
  size,
  borderRadius,
  backgroundColor,
  name,
  isSelected,
  onUpdate,
  onSelect,
}) => {
  const isResizing = useRef(false);
  const resizeDirection = useRef(null);
  const start = useRef({});

  const onMouseDownDrag = (e) => {
    if (e.target.dataset.resize || e.target.tagName === "INPUT") return;
    onSelect(id);
    start.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    window.addEventListener("mousemove", onMouseMoveDrag);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMoveDrag = (e) => {
    onUpdate(id, {
      position: {
        x: e.clientX - start.current.x,
        y: e.clientY - start.current.y,
      },
    });
  };

  const onMouseDownResize = (e, direction) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeDirection.current = direction;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      left: position.x,
      top: position.y,
    };
    window.addEventListener("mousemove", onMouseMoveResize);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMoveResize = (e) => {
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    const dir = resizeDirection.current;

    let newWidth = start.current.width;
    let newHeight = start.current.height;
    let newLeft = start.current.left;
    let newTop = start.current.top;

    if (dir.includes("right"))
      newWidth = Math.max(50, start.current.width + dx);
    if (dir.includes("bottom"))
      newHeight = Math.max(50, start.current.height + dy);
    if (dir.includes("left")) {
      newWidth = Math.max(50, start.current.width - dx);
      newLeft = start.current.left + dx;
    }
    if (dir.includes("top")) {
      newHeight = Math.max(50, start.current.height - dy);
      newTop = start.current.top + dy;
    }

    onUpdate(id, {
      position: { x: newLeft, y: newTop },
      size: { width: newWidth, height: newHeight },
    });
  };

  const onMouseUp = () => {
    isResizing.current = false;
    resizeDirection.current = null;
    window.removeEventListener("mousemove", onMouseMoveDrag);
    window.removeEventListener("mousemove", onMouseMoveResize);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const resizeHandles = [
    { dir: "top-left", style: { top: -5, left: -5, cursor: "nwse-resize" } },
    { dir: "top-right", style: { top: -5, right: -5, cursor: "nesw-resize" } },
    {
      dir: "bottom-left",
      style: { bottom: -5, left: -5, cursor: "nesw-resize" },
    },
    {
      dir: "bottom-right",
      style: { bottom: -5, right: -5, cursor: "nwse-resize" },
    },
    {
      dir: "top",
      style: {
        top: -5,
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "ns-resize",
      },
    },
    {
      dir: "bottom",
      style: {
        bottom: -5,
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "ns-resize",
      },
    },
    {
      dir: "left",
      style: {
        left: -5,
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "ew-resize",
      },
    },
    {
      dir: "right",
      style: {
        right: -5,
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "ew-resize",
      },
    },
  ];

  const renderResizeHandles = () =>
    isSelected &&
    resizeHandles.map((handle) => (
      <div
        key={handle.dir}
        data-resize
        onMouseDown={(e) => onMouseDownResize(e, handle.dir)}
        style={{
          position: "absolute",
          width: 12,
          height: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          ...handle.style,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 2,
            backgroundColor: "black",
            transform: "rotate(45deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 2,
            backgroundColor: "black",
            transform: "rotate(-45deg)",
          }}
        />
      </div>
    ));

  return (
    <div
      onMouseDown={onMouseDownDrag}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        backgroundColor: backgroundColor || "lightblue",
        border: "2px solid black",
        boxSizing: "border-box",
        borderRadius: borderRadius,
        padding: 8,
        userSelect: "none",
      }}
    >
      <input
        type="text"
        value={name}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onUpdate(id, { name: e.target.value })}
        style={{
          width: "100%",
          marginBottom: 4,
          border: "none",
          background: "transparent",
          fontWeight: "bold",
          fontSize: 14,
          textAlign: "center",
        }}
      />
      {renderResizeHandles()}
    </div>
  );
};

export default DraggableResizableBox;
