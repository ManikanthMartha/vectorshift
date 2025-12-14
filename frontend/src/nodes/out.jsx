import React from 'react';
import { NodeFactory } from './NodeFactory';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Output',
        inputs: [{ id: 'input', type: 'target', position: Position.Left }],
        className: 'output-node border-nodeborder border-4 w-80',
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