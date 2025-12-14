import React from 'react';
import { NodeFactory } from './NodeFactory';
import { Position } from 'reactflow';

const HANDLE_SIZE = 16;

export const TextNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Text Node',
        className: 'border-nodeborder border-4 w-80',
        fields: [
          { name: 'text', label: 'Text', type: 'textarea', defaultValue: '{{input}}', placeholder: 'Enter text...' },
        ],
        dynamicHandles: (state) => {
          const regex = /{{([^{}]+)}}/g;
          const matches = [...(state.text || '').matchAll(regex)];
          return matches.map((m, i) => ({
            id: m[1].trim(),
            type: 'target',
            position: Position.Left,
            style: {
              width: `${HANDLE_SIZE}px`,
              height: `${HANDLE_SIZE}px`,
              top: 10 + (i * 20),
              background: '#a29af3',
              border: '2px solid white',
            }
          }));
        },
        extraContent: ({ state }) => {
          const regex = /{{([^{}]+)}}/g;
          const matches = [...(state.text || '').matchAll(regex)];
          const vars = matches.map(m => m[1].trim());
          return (
            <div className="absolute inset-0 pointer-events-none">
              {vars.map((label, i) => (
                <span
                  key={`${id}-${label}`}
                  className="absolute text-sm font-medium whitespace-nowrap pointer-events-none"
                  style={{
                    left: '-45px',
                    top: `${(i * 40)}px`,
                    marginRight: '8px',
                    lineHeight: `${HANDLE_SIZE}px`,
                    color: '#666',
                  }}
                >
                  {label} 
                </span>
              ))}
            </div>
          );
        },
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
      }}
    />
  );
};