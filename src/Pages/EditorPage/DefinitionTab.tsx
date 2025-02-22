import { Dispatch, SetStateAction, useEffect, useState } from "react"
import "./DefinitionTab.css"
import { getDefinition } from "../../Utils/Misc"
import EditorFunction from "./EditorFunction"

interface DefinitionTabProps {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  type: "definitie-sinonime" | "definitie-antonime" | "definitie"
}

function DefinitionTab(props: DefinitionTabProps) {


  const [status, setStatus] = useState<"Loading" | "Success" | "Empty">("Success")
  const [definitions, setDefinitions] = useState<string[]>([])
  // const [test, setTest] = useState<

  const loadDefinitions = () => {
    if (props.input === "")
      return

    setStatus("Loading")
    getDefinition(props.type, props.input, defs => {
      setStatus("Success")
      setDefinitions(defs)
    })
  }

  useEffect(() => {
    if (definitions.length === 0)
      setStatus("Empty")
  }, [definitions])


  useEffect(() => {
    loadDefinitions()
  }, [])

  return (
    <EditorFunction
      input={props.input}
      setInput={props.setInput}
      onSearch={loadDefinitions}
      status={status}
    >
      {
        definitions.map((def, index) => <div key={index} dangerouslySetInnerHTML={{ __html: def }}></div>)
      }
    </EditorFunction>
  )
}

export default DefinitionTab