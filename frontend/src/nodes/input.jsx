import React from 'react';
import { NodeFactory } from './NodeFactory';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Input',
        inputs: [],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        className: 'input-node border-nodeborder border-4 w-80',
        fields: [
          { name: 'inputName', label: 'Name', defaultValue: id.replace('customInput-', 'input_'), placeholder: 'Input name...' },
          {
            name: 'inputType', label: 'Type', type: 'select', defaultValue: 'Text', options: [
              { value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }
            ]
          },
          { name: 'value', label: 'Value', placeholder: 'Enter input...' },
        ],
        style: { display: 'flex', flexDirection: 'column', gap: '18px', padding: '10px' },
      }}
    />
  );
};
