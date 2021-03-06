import React from "react"
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"

const Card = styled.div<{isDragging: boolean}>`
  border-radius: 5px; 
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${props => props.isDragging ? "#00a8ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.05)" : "none"};
`

interface IDragabbleCardProps {
    toDoId: number,
    toDoText: string;
    index: number;
}

function DragabbleCard ({toDoId, index, toDoText}: IDragabbleCardProps) {
    console.log(toDoId, "has been rendered")
    return (
        <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
            <Card
                isDragging={snapshot.isDragging}
                ref={magic.innerRef} 
                {...magic.draggableProps} 
                {...magic.dragHandleProps}
            >
                {toDoText}
            </Card>
            )}
        </Draggable>
    )
}

export default React.memo(DragabbleCard)