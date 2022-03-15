import "./text-editor.css"
import { useState, useEffect, useRef } from "react"
import MDEditor from "@uiw/react-md-editor"
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
	cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const [editing, setEditing] = useState(false)
	const { updateCell } = useActions()


	/* listener in the body to toggle off edit mode with some logic
  to keep the text window from toggling off as well */
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return
			}

			setEditing(false)
		}
		document.addEventListener("click", listener, { capture: true })

		return () => {
			document.removeEventListener("click", listener, { capture: true })
		}
	}, [])

	if (editing) {
		return (
			<div className="text-editor" ref={ref}>
				<MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || "")} />
			</div>
		)
	}

	return (
		/* onClick toggles into preview mode */
		<div className="text-editor card" onClick={() => setEditing(true)}>
			<div className="card-content" >
				<MDEditor.Markdown source={cell.content || 'Click to edit'} />
			</div>
		</div>
	)
}

export default TextEditor
