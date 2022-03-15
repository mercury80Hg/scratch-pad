import './preview.css'
import { useRef, useEffect } from "react"

interface PreviewProps {
	code: string;
	err: string;
}

const html = `
		<html>
			<head>
				<style>html { background-color: white; </style>
			</head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const root = document.querySelector('#root')
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
						console.error(err)
					}

					window.addEventListener('error', (event) => {
						event.preventDefault()
						handleError(event.error)
					})

					window.addEventListener('message', (event) => {
						try {
							eval(event.data)
						} catch (err) {
							handleError(err)
						}
					}, false)
				</script>
			</body>
		</html>
	`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<any>()

	useEffect(() => {
		//resets the iframe html for fresh html after each click
		iframe.current.srcdoc = html
		/* giving the browser time to update the source doc and setup a
		message event listener early enough in advance and watch for the
		post message event */
		setTimeout(() => {
				iframe.current.contentWindow.postMessage(code, "*")
		},50)
	}, [code])

	console.log(err)

	return (
		<div className="preview-wrapper" >
			<iframe
				
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
			{err && <div className="preview-error">{err}</div>}
		</div>
	)
}

export default Preview
