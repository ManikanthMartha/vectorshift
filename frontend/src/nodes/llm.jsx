import * as React from 'react';
import { NodeFactory } from './NodeFactory';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'LLM Node',
        inputs: [
          { id: 'input', type: 'target', position: Position.Left },
          // { id: 'input2', type: 'target', position: 'Left', style: { top: 40 } }
        ],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        className: 'llm-node border-nodeborder border-4 w-full p-4 rounded-md',
        fields: [
          {
            name: 'model',
            label: 'Model',
            type: 'select',
            defaultValue: 'gpt-3.5-turbo',
            options: [
              { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
              { value: 'gpt-4', label: 'gpt-4' },
            ],
          },
          { name: 'prompt', label: 'Prompt', placeholder: 'Enter your prompt here...' },
        ],
        
      }}
    />
  );
};