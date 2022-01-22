import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div<CircleProps>`
    background-color: ${props => props.bgColor};
    width:200px;
    height:200px;
    border-radius: 100px;
    border: 10px solid ${props=> props.borderColor};
`

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}


function Circle ({ bgColor, borderColor, text="default text" }: CircleProps) {
    const [counter, setCounter] = useState<number | boolean>(true)
    setCounter(false)

    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? 'yellow'}>
            {text}
        </Container> 
    )
}

export default Circle