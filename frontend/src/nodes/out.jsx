import React from 'react';
import { NodeFactory } from './NodeFactory';

export const OutputNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Output',
        inputs: [{ id: 'input', type: 'target', position: 'Left' }],
        className: 'output-node',
        fields: [
          { name: 'outputName', label: 'Name', defaultValue: id.replace('customOutput-', 'output_'), placeholder: 'Output name...' },
          { name: 'outputType', label: 'Type', type: 'select', defaultValue: 'Text', options: [
            { value: 'Text', label: 'Text' }, { value: 'Number', label: 'Number' }
          ]},
        ],
      }}
    />
  );
};