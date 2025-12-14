import React from 'react'
import { NodeFactory } from './NodeFactory'
import { Position } from 'reactflow'

const Languages = [
    {value: 'auto', label: 'Detect Language' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hi', label: 'Hindi' },
    { value: 'pt', label: 'Portuguese' },
]

export const TranslatorNode = ({id, data}) => {
  return (
    <NodeFactory
        id={id}
        data={data}
        config={{
            title: 'Translator',
            inputs: [{ id: 'input', type: 'target', position: Position.Left }],
            outputs: [{ id: 'output', type: 'source', position: Position.Right }],
            className: 'translator-node border-nodeborder border-4',
            fields: [
                { name: 'text', label: 'Text to Translate', placeholder: 'Enter text...' },
                { name: 'sourceLanguage', label: 'Source Language', type: 'select', defaultValue: 'auto', options: Languages },
                { name: 'targetLanguage', label: 'Target Language', type: 'select', defaultValue: 'en', options: Languages.filter(lang => lang.value !== 'auto') },
            ],
        }}
    />
  )
}