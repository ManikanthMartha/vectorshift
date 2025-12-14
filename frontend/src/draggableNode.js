export const DraggableNode = ({ type, label, icon: Icon }) => {
    const onDragStart = (event) => {
        event.dataTransfer.setData(
            "application/reactflow",
            JSON.stringify({ nodeType: type })
        );
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            className="draggable-node"
        >
            <div className="icon-wrapper">
                <Icon />
            </div>
            <span className="node-label">{label}</span>
        </div>
    );
};
