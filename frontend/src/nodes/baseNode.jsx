import { Handle, Position } from "reactflow";
import { memo } from "react";
import { useStore } from "../store";
import React from "react";

/**
 * BaseNode: Pure render component for nodes.
 * Everything (handles, layout, fields) is passed from the NodeFactory.
 */
export const BaseNode = memo(
  ({
    id,
    title,
    className = "",
    style = {},
    children,
    handles = [],
    onDelete
  }) => {
    const onNodesChange = useStore((state) => state.onNodesChange);

    const handleDelete = () => {
      if (onDelete) onDelete();
      onNodesChange([{ id, type: "remove" }]);
    };

    return (
      <div
        className={`node-container bg-[#faf9f6] rounded-lg shadow-sm border p-3  relative ${className}`}
        style={style}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2 bg-[#eef2fe] p-2 rounded-md">
          <div className="text-base font-semibold text-gray-600">{title}</div>

          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
              <path d="M 12 2 C 6.4666667 2 2 6.4666667 2 12 C 2 17.533333 6.4666667 22 12 22 C 17.533333 22 22 17.533333 22 12 C 22 6.4666667 17.533333 2 12 2 z M 12 4 C 16.466667 4 20 7.5333333 20 12 C 20 16.466667 16.466667 20 12 20 C 7.5333333 20 4 16.466667 4 12 C 4 7.5333333 7.5333333 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
            </svg>
          </button>
        </div>

        {/* Dynamic Handles */}
        {handles.map((h, i) => (
          <Handle
            key={h.id || i}
            type={h.type}
            id={h.id}
            position={h.position || Position.Left}
            style={{
              width: 16,
              height: 16,
              background: h.color || "#a29af3",
              border: "2px solid white",
              borderRadius: "50%",
              ...h.style
            }}
          />
        ))}

        {/* Content */}
        <div className="node-content">{children}</div>
      </div>
    );
  }
);