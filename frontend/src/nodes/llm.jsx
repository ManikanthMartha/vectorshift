import * as React from 'react';
import { NodeFactory } from './NodeFactory';

export const LLMNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'LLM Node',
        inputs: [
          { id: 'input', type: 'target', position: 'Left' },
          { id: 'input2', type: 'target', position: 'Left', style: { top: 40 } }
        ],
        outputs: [{ id: 'output', type: 'source', position: 'Right' }],
        className: 'llm-node border-nodeborder border-2',
        fields: [
          {
            name: 'model',
            label: 'Model',
            type: 'select',
            defaultValue: 'gpt-3.5-turbo',
            options: [
              { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
              { value: 'gpt-4', label: 'GPT-4' },
            ],
          },
        ],
      }}
    />
  );
};