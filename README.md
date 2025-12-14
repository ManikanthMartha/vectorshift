# VectorShift Pipeline Builder

A visual node-based pipeline builder application built with React Flow, featuring an elegant abstraction layer for creating custom nodes with minimal boilerplate.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![ReactFlow](https://img.shields.io/badge/ReactFlow-11.11-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?logo=fastapi)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Node Abstraction](#node-abstraction)
  - [BaseNode Component](#basenode-component)
  - [NodeFactory Pattern](#nodefactory-pattern)
- [Styling System](#styling-system)
- [Getting Started](#getting-started)
- [Creating Custom Nodes](#creating-custom-nodes)
- [API Reference](#api-reference)

---

## Overview

VectorShift Pipeline Builder is a drag-and-drop visual programming interface that allows users to create data processing pipelines by connecting various nodes. The application features a sophisticated node abstraction system that makes it incredibly easy to create new node types with just a configuration object.

---

## Features

- 🎨 **Drag & Drop Interface** - Intuitive node placement and connection
- 🔗 **Smart Connections** - Animated edges with arrow markers
- 📦 **Node Abstraction** - Create new nodes with minimal code
- 🎯 **Dynamic Handles** - Auto-generated connection points based on content
- 📝 **Multiple Field Types** - Text, textarea, select, file upload, tables
- 🖼️ **Image Preview** - Built-in image upload with preview
- 📊 **DAG Validation** - Backend validates pipeline is a Directed Acyclic Graph
- 🎨 **Consistent Styling** - Tailwind CSS with custom theme

---

## Project Structure

```
vectorshift/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── baseNode.jsx      # Base rendering component
│   │   │   ├── NodeFactory.jsx   # Node configuration factory
│   │   │   ├── input.jsx         # Input node
│   │   │   ├── llm.jsx           # LLM node
│   │   │   ├── out.jsx           # Output node
│   │   │   ├── text.jsx          # Text node with dynamic handles
│   │   │   └── ...               # Other node types
│   │   ├── store.js              # Zustand state management
│   │   ├── ui.js                 # Main React Flow canvas
│   │   ├── toolbar.js            # Node palette/toolbar
│   │   └── submit.js             # Pipeline submission
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json
│
└── backend/
    ├── main.py                   # FastAPI server
    └── requirements.txt
```

---

## Architecture

### Node Abstraction

The project implements a **two-layer abstraction** for nodes that separates concerns and minimizes code duplication:

```
┌─────────────────────────────────────────────────────────┐
│                    Your Custom Node                      │
│  (e.g., LLMNode, TextNode, InputNode)                   │
│  Just a config object!                                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    NodeFactory                           │
│  - Manages state for all fields                         │
│  - Renders different field types                        │
│  - Handles dynamic handles generation                    │
│  - Passes everything to BaseNode                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    BaseNode                              │
│  - Pure rendering component                             │
│  - Renders header with delete button                    │
│  - Renders all handles (inputs/outputs)                 │
│  - Renders children (field content)                     │
└─────────────────────────────────────────────────────────┘
```

### BaseNode Component

The `BaseNode` is a **pure rendering component** that handles:

- Node container with consistent styling
- Header with title and delete button
- Dynamic handle rendering at specified positions
- Children rendering for node content

```jsx
// baseNode.jsx - Simplified structure
export const BaseNode = memo(({ id, title, className, style, children, handles }) => {
  return (
    <div className={`node-container bg-[#faf9f6] rounded-lg border shadow-sm p-3 relative ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2 bg-[#eef2fe] p-2 rounded-md">
        <div className="text-base font-semibold text-gray-600">{title}</div>
        <button onClick={handleDelete}>✕</button>
      </div>

      {/* Dynamic Handles */}
      {handles.map((h) => (
        <Handle key={h.id} type={h.type} id={h.id} position={h.position} style={h.style} />
      ))}

      {/* Body */}
      <div className="node-content">{children}</div>
    </div>
  );
});
```

### NodeFactory Pattern

The `NodeFactory` is the **brain of the abstraction**. It:

1. **Manages State** - Initializes and tracks all field values
2. **Renders Fields** - Supports multiple field types out of the box
3. **Dynamic Handles** - Generates handles based on field content
4. **Passes to BaseNode** - Combines everything for rendering

#### Supported Field Types

| Type | Description | Features |
|------|-------------|----------|
| `text` | Standard input | Default type |
| `textarea` | Multi-line input | Auto-resizing height |
| `select` | Dropdown menu | Options array |
| `file` | File upload | Image preview, accepts JPG/PNG |
| `table` | Key-value pairs | Add/delete rows |
| `custom` | Custom renderer | Full control |

---

## Styling System

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom theme extensions:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        nodeborder: '#a29af3',  // Purple accent for node borders
        // ... shadcn/ui color system
      },
    },
  },
};
```

### Node Styling Convention

All nodes follow a consistent styling pattern:

```jsx
className: 'border-nodeborder border-4 w-80'  // Purple border, fixed width
```

### Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Node Background | `#faf9f6` | Warm off-white |
| Header Background | `#eef2fe` | Light purple-blue |
| Node Border | `#a29af3` | Purple accent |
| Handle Color | `#a29af3` | Matches border |
| Text Primary | `gray-600` | Labels and titles |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend runs on `http://localhost:3000` and backend on `http://localhost:8000`.

---

## Creating Custom Nodes

Creating a new node is incredibly simple - just define a config object:

### Basic Example

```jsx
import { NodeFactory } from './NodeFactory';
import { Position } from 'reactflow';

export const MyCustomNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'My Custom Node',
        className: 'border-nodeborder border-4 w-80',
        
        // Define input/output handles
        inputs: [{ id: 'input', type: 'target', position: Position.Left }],
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
        
        // Define form fields
        fields: [
          { name: 'myField', label: 'My Field', placeholder: 'Enter value...' },
          { 
            name: 'dropdown', 
            label: 'Options', 
            type: 'select',
            options: [
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]
          },
        ],
      }}
    />
  );
};
```

### Advanced Example with Dynamic Handles

The Text Node demonstrates dynamic handle generation based on content:

```jsx
export const TextNode = ({ id, data }) => {
  return (
    <NodeFactory
      id={id}
      data={data}
      config={{
        title: 'Text Node',
        fields: [
          { name: 'text', type: 'textarea', defaultValue: '{{input}}' },
        ],
        
        // Dynamic handles based on {{variable}} patterns
        dynamicHandles: (state) => {
          const regex = /{{([^{}]+)}}/g;
          const matches = [...(state.text || '').matchAll(regex)];
          return matches.map((m, i) => ({
            id: m[1].trim(),
            type: 'target',
            position: Position.Left,
            style: { top: 10 + (i * 20) }
          }));
        },
        
        // Extra content (labels for handles)
        extraContent: ({ state }) => (
          // Render labels next to dynamic handles
        ),
        
        outputs: [{ id: 'output', type: 'source', position: Position.Right }],
      }}
    />
  );
};
```

### Register Your Node

Add your node to the `nodeTypes` in `ui.js`:

```javascript
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  myCustom: MyCustomNode,  // Add here
  // ...
};
```

---

## API Reference

### Backend Endpoints

#### `POST /pipelines/parse`

Parses and validates a pipeline configuration.

**Request:**
```
Content-Type: multipart/form-data
pipeline: JSON string of { nodes: [], edges: [] }
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### NodeFactory Config Options

| Property | Type | Description |
|----------|------|-------------|
| `title` | `string` | Node header title |
| `className` | `string` | Tailwind classes for container |
| `style` | `object` | Inline styles |
| `inputs` | `Handle[]` | Static input handles |
| `outputs` | `Handle[]` | Static output handles |
| `fields` | `Field[]` | Form field definitions |
| `dynamicHandles` | `(state) => Handle[]` | Function returning dynamic handles |
| `extraContent` | `(props) => JSX` | Additional content renderer |

### Handle Object

```typescript
{
  id: string;           // Unique handle ID
  type: 'source' | 'target';
  position: Position;   // Left, Right, Top, Bottom
  style?: object;       // Custom positioning
  size?: number;        // Handle size (default: 16)
  color?: string;       // Handle color
  label?: string;       // Optional label
}
```

### Field Object

```typescript
{
  name: string;         // Field key in state
  label: string;        // Display label
  type?: string;        // text, textarea, select, file, table, custom
  defaultValue?: any;   // Initial value
  placeholder?: string; // Input placeholder
  options?: Array<{value, label}>;  // For select type
  render?: (props) => JSX;          // For custom type
}
```

---

## State Management

The application uses **Zustand** for state management:

```javascript
// store.js
export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge({...connection, animated: true}, get().edges) }),
}));
```

---