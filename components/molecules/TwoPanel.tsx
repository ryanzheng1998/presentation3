import React from 'react'
import styled from 'styled-components'

interface Props {
  children: JSX.Element[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const Panel1 = styled.div`
  background: red;
  overflow-y: auto;
`

const Divisor = styled.div`
  width: 3px;
  cursor: col-resize;
  background: grey;
`

const Panel2 = styled.div`
  background: green;
  display: grid;
  align-items: center;
  overflow-y: auto;
`

const SlideContainer = styled.div`
  background: black;
  aspect-ratio: 16 / 9;
`
const TwoPanel: React.FC<Props> = (p) => {
  const [width, setWidth] = React.useState(100)
  const [drag, setDrag] = React.useState(false)
  const divisorRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const divisorElement = divisorRef.current
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!drag) return
      setWidth(e.pageX)
    }

    const mouseUpHandler = () => {
      setDrag(false)
    }

    const DivisorMouseDownHandler = () => {
      console.log(drag)
      setDrag(true)
      console.log(drag)
    }

    divisorElement?.addEventListener('mousedown', DivisorMouseDownHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('mouseup', mouseUpHandler)

    return () => {
      divisorElement?.removeEventListener('mousedown', DivisorMouseDownHandler)
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [drag])

  return (
    <Container>
      <Panel1 style={{ width: width }}>{p.children[0]}</Panel1>
      <Divisor ref={divisorRef} />
      <Panel2>
        <SlideContainer>{p.children[1]}</SlideContainer>
      </Panel2>
    </Container>
  )
}

export default TwoPanel
