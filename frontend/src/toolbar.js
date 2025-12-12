import * as React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar" style={{ 
            padding: '20px',
            background: '#1a1b1f',
        }}>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '32px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <DraggableNode 
                    type='customInput' 
                    label='Input'
                    style={{
                        backgroundColor: '#6366E9', 
                        transition: 'all 0.2s ease-in-out',
                        minWidth: '100px',
                    }}
                />
                <DraggableNode 
                    type='llm' 
                    label='LLM'
                    style={{
                        backgroundColor: '#6366E9', 
                        transition: 'all 0.2s ease-in-out',
                        minWidth: '100px',
                    }}
                />
                <DraggableNode 
                    type='customOutput' 
                    label='Output'
                    style={{
                        backgroundColor: '#6366E9', 
                        transition: 'all 0.2s ease-in-out',
                        minWidth: '100px',
                    }}
                />
                <DraggableNode 
                    type='text' 
                    label='Text'
                    style={{
                        backgroundColor: '#6366E9', 
                        transition: 'all 0.2s ease-in-out',
                        minWidth: '100px',
                    }}
                />
            </div>
        </div>
    );
};
