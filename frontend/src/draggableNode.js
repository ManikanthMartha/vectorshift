// draggableNode.js
export const DraggableNode = ({ type, label, style = {} }) => {
  const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
  };

  return (
      <div
          className={`draggable-node ${type}`}
          onDragStart={(event) => onDragStart(event, type)}
          onDragEnd={(event) => (event.target.style.cursor = 'grab')}
          style={{ 
              cursor: 'grab', 
              minWidth: '80px', 
              height: '60px',
              display: 'flex', 
              alignItems: 'center', 
              borderRadius: '8px',
              justifyContent: 'center', 
              flexDirection: 'column',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#fff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              ...style,
              '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }
          }} 
          draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
  );
};
