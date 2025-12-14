import React from 'react'
import { NodeFactory } from './NodeFactory'
import { Position } from 'reactflow'

export const EmailNode = ({id, data}) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Validate Email',
        inputs: [{ id: 'input', type: 'target', position: Position.Left }],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        className: 'email-node border-nodeborder border-4',
        fields: [
            { name: 'emailAddress', label: 'Email Address', placeholder: 'Enter email address...' },
            { name: 'validationType', label: 'Validation Type', type: 'select', defaultValue: 'basic', options: [
              { value: 'basic', label: 'Basic' },
              { value: 'regex', label: 'Regex' },
            ]},
        ]
      }}
    />
  )
}