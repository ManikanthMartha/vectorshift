from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import Dict, List
from collections import defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    
    graph = defaultdict(list)
    for edge in edges:
        graph[edge['source']].append(edge['target'])
    
    visited = set()
    temp = set()
    
    def has_cycle(node: str) -> bool:
        if node in temp:
            return True
        if node in visited:
            return False
            
        temp.add(node)
        
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
                
        temp.remove(node)
        visited.add(node)
        return False
    
    node_ids = [node['id'] for node in nodes]
    for node_id in node_ids:
        if node_id not in visited:
            if has_cycle(node_id):
                return False
    
    return True

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: str = Form(...)):
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data['nodes']
        edges = pipeline_data['edges']
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        is_dag_result = is_dag(nodes, edges)
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
        
    except Exception as e:
        return {"error": str(e)}, 400

