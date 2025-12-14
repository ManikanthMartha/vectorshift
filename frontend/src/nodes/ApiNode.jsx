import React from 'react'
import { NodeFactory } from './NodeFactory'
import { Position } from 'reactflow'

export const ApiNode = ({id, data}) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'API',
        inputs: [{ id: 'input', type: 'target', position: Position.Left }],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        className: 'api-node border-nodeborder border-4 w-[650px]',
        fields: [
          { name: 'method', label: 'Method', type: 'select', defaultValue: 'GET', 
            options: [
              { value: 'GET', label: 'GET' }, 
              { value: 'POST', label: 'POST' }, 
              { value: 'PUT', label: 'PUT' }, 
              { value: 'DELETE', label: 'DELETE' }]},
          { name: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com/endpoint'},
          {name: 'parameters', label: 'Parameters (JSON)', type: 'table' },
        ],
      }}
    />
  )
}