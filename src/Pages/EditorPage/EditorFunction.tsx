import { Dispatch, ReactNode, SetStateAction } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Status from "../../Components/Status";
import { LoadingCircle } from "../../Components/Loading";
import Error from "../../Components/Error";

interface EditorFunctionProps {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  onSearch: () => void
  children: ReactNode
  status: "Success" | "Empty" | "Loading"
}

function EditorFunction(props: EditorFunctionProps) {

  return (
    <div className="editor-page-function">
      <div className="editor-function-header">
        <Input
          inputProps={{
            placeholder: "Cauta cuvant...",
            onChange: e => props.setInput(e.target.value),
            value: props.input
          }} />
        <Button onClick={props.onSearch}>Cauta</Button>
      </div>
      <div className="editor-function-body">
        <Status
          status={props.status}
          contentByStatus={{
            "Success": props.children,
            "Loading": <LoadingCircle />,
            "Empty": <Error text="Nu exista." />
          }}
        />
      </div>
    </div>
  )
}

export default EditorFunction