import { Dispatch, SetStateAction } from "react"
import "./EditorTextbox.css"
import useWindowSize from "../../Hooks/useWindowSize"

interface EditorTextboxProps {
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

function EditorTextbox(props: EditorTextboxProps) {

  const windowSize = useWindowSize()

  return (
    <textarea
      style={{ height: windowSize.height - 80 }}
      className="editor-textarea"
      placeholder="e 4 ziua, ma uit la ceas..."
      value={props.content}
      onChange={e => {
        props.setContent(e.target.value)
      }}
    />
  )
}

export default EditorTextbox