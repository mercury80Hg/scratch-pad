import "./resizable.css"
import { ResizableBox, ResizableBoxProps } from "react-resizable"
import { useEffect, useState } from "react"

interface ResizableProps {
	direction: "horizontal" | "vertical"
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps
	const [innerHeight, setInnerHeight] = useState(window.innerHeight)
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const [width, setWidth] = useState(window.innerWidth * 0.75)

	/* accounting for code editor box's resizing when browser window is
  resized.  It will update the code editor box's size too. */
	useEffect(() => {
		/* debouncing */
		let timer: any
		const listener = () => {
			timer = setTimeout(() => {
				if (timer) {
					clearTimeout(timer)
				}
				setInnerHeight(window.innerHeight)
				setInnerWidth(window.innerWidth)
        /* accounting for a bug in ResizableBox library that thows out 
        the maxConstraing values under our scenario */
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
			}, 100)
		}
		window.addEventListener("resize", listener)

		return () => {
			window.removeEventListener("resize", listener)
		}
	}, [width])

	if (direction === "horizontal") {
		resizableProps = {
			className: "resize-horizontal",
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			height: Infinity,
			width,
			resizeHandles: ["e"],
			onResizeStop: (event, data) => {
				setWidth(data.size.width)
			},
		}
	} else {
		resizableProps = {
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.9],
			height: 300,
			width: Infinity,
			resizeHandles: ["s"],
		}
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
