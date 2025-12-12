import React from 'react';
import { NodeFactory } from './NodeFactory';

export const InputNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Input',
        inputs: [],
        outputs: [{ id: 'output', type: 'source', position: 'Right' }],
        className: 'input-node',
        fields: [
          { name: 'inputName', label: 'Name', defaultValue: id.replace('customInput-', 'input_'), placeholder: 'Input name...' },
          { name: 'inputType', label: 'Type', type: 'select', defaultValue: 'Text', options: [
            { value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }
          ]},
          { name: 'value', label: 'Value', placeholder: 'Enter input...' },
        ],
      }}
    />
  );
};
