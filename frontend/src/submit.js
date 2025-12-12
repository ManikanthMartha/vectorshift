// submit.js
import { useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import * as React from 'react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = useCallback(async () => {
        try {
            const formData = new FormData();
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            formData.append('pipeline', JSON.stringify(pipelineData));

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            alert(
                `Pipeline Analysis:\n
                Number of Nodes: ${result.num_nodes}\n
                Number of Edges: ${result.num_edges}\n
                Is Directed Acyclic Graph: ${result.is_dag ? 'Yes' : 'No'}`
            );

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to analyze pipeline. Please try again.');
        }
    }, [nodes, edges]);

    return (
        <div className='w-full flex justify-center items-center'>
            <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit Pipeline
            </button>
        </div>

    );
};
