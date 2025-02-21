import { Dispatch, SetStateAction, useEffect, useState } from "react"
import "./DefinitionTab.css"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import { LoadingCircle } from "../../Components/Loading"
import Error from "../../Components/Error"
import Status from "../../Components/Status"
import { getDefinition } from "../../Utils/Misc"

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
    <div className="editor-page-function">
      <div className="editor-function-header">
        <Input
          inputProps={{
            placeholder: "Cauta cuvant...",
            onChange: e => props.setInput(e.target.value),
            value: props.input
          }} />
        <Button onClick={loadDefinitions}>Cauta</Button>
      </div>
      <div className="editor-function-body">
        <Status
          status={status}
          contentByStatus={{
            "Success": definitions.map(def => <div key={def} dangerouslySetInnerHTML={{ __html: def }}></div>),
            "Loading": <LoadingCircle />,
            "Empty": <Error text="Nu exista definitii." />
          }}
        />
      </div>
    </div>
  )
}

export default DefinitionTab