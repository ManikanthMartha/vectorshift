import React from 'react';
import { NodeFactory } from './NodeFactory';

const HANDLE_SIZE = 18;

export const TextNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Text Node',
        className: 'border-nodeborder border-2 w-80',
        fields: [
          { name: 'text', label: 'Text', type: 'textarea', defaultValue: '{{input}}', placeholder: 'Enter text...' },
        ],
        dynamicHandles: (state) => {
          const regex = /{{([^{}]+)}}/g;
          const matches = [...(state.text || '').matchAll(regex)];
          return matches.map((m, i) => ({
            id: m[1].trim(),
            type: 'target',
            position: 'Left',
            style: {
              width: `${HANDLE_SIZE}px`,
              height: `${HANDLE_SIZE}px`,
              top: 20 + (i * 40),
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
            <div className="relative">
              {vars.map((label, i) => (
                <span
                  key={`${id}-${label}`}
                  className="absolute text-lg text-white whitespace-nowrap"
                  style={{
                    left: '-26px',
                    top: `${20 + (i * 20)}px`,
                    transform: 'translateX(-100%)',
                    lineHeight: `${HANDLE_SIZE}px`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          );
        },
      }}
    />
  );
};
// ...existing code...