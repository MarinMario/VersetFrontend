import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RequestGetDexDefinition } from "../../Utils/Requests"
import "./DefinitionTab.css"
import Input from "../../Components/Input"
import Button from "../../Components/Button"
import he from "he"

interface DefinitionTabProps {
  input: string
  setInput: Dispatch<SetStateAction<string>>
}

function DefinitionTab(props: DefinitionTabProps) {


  const [status, setStatus] = useState<"Loading" | "Success" | "Fail">("Success")
  const [definitions, setDefinitions] = useState<string[]>([])

  const loadDefinitions = () => {
    setStatus("Loading")
    RequestGetDexDefinition(props.input).then(response => {
      if (response.ok) {
        setStatus("Success")
        response.json().then(data => {
          const defs = data["definitions"] as Record<string, string>[]
          const strDefs = defs.map(def => he.decode(def["internalRep"]))
          setDefinitions(strDefs)
        })
      } else {
        setStatus("Fail")
      }
    })
  }

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
        {definitions.map(def => <div key={def}>{def}</div>)}
      </div>
    </div>
  )
}

export default DefinitionTab