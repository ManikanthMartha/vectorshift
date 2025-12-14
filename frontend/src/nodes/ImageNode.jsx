import React from 'react'
import { NodeFactory } from './NodeFactory'
import { Position } from 'reactflow'
export const ImageNode = ({id, data}) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Image',
        inputs: [{ id: 'input', type: 'target', position: Position.Left }],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        className: 'image-node border-nodeborder border-4',
        fields: [
            { name: 'imageUrl', label: 'Image URL', placeholder: 'Enter image URL...' },
            { name: 'filename', label: 'Filename', type: 'file', placeholder: 'Upload an image...' },
        ]
      }}
    />
  )
}