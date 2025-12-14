import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, BackgroundVariant, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/input';
import { LLMNode } from './nodes/llm';
import { OutputNode } from './nodes/out';
import { TextNode } from './nodes/text';
import { ImageNode } from './nodes/ImageNode';
import { ApiNode } from './nodes/ApiNode';
import { TranslatorNode } from './nodes/TranslatorNode';
// import { ListNode } from './nodes/list';
import { EmailNode } from './nodes/EmailNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  image: ImageNode,
  api: ApiNode,
  translator: TranslatorNode,
  emailValidation: EmailNode,
  // list: ListNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

const getInitNodeData = (nodeID, type) => {
  return {
    id: nodeID,
    nodeType: type,
    onChange: (value) => {
      useStore.getState().updateNodeField(nodeID, 'value', value);
    }
  };
};


    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [addNode, getNodeID, reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '85vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                  style: {
                    stroke: '#6366e9',
                    strokeWidth: 3,
                  },
                  animated: true
                }}
            >
                <Background color="#fff" gap={gridSize} variant={BackgroundVariant.Dots} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    )
}
