import { Dispatch, SetStateAction, useEffect, useState } from "react"
import EditorFunction from "./EditorFunction"
import { findRhymes } from "../../Utils/Misc"
import "./RhymesTab.css"

interface RhymesTabProps {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  wordList: string[]
}

function RhymesTab(props: RhymesTabProps) {

  // const rhymes = findRhymingWords()
  const wordList = props.wordList
  const [rhymes, setRhymes] = useState<Record<number, string[]>>({})

  useEffect(() => {
    onSearch()
  }, [])

  const onSearch = () => {
    setRhymes(findRhymes(wordList, props.input))
  }


  return (
    <EditorFunction
      input={props.input}
      setInput={props.setInput}
      onSearch={onSearch}
      status="Success"
    >
      <div className="rhymes-content">
        {
          Object.keys(rhymes)
            .filter(key => {
              const intKey = parseInt(key)
              return intKey > 1 && rhymes[intKey].length > 0
            })
            .reverse()
            .map(key =>
              <div key={key}>
                <div className="rhymes-title">{key} litere finale identice</div>
                <div className="rhymes-list">
                  {
                    rhymes[parseInt(key)].map((rhyme, index) => <div key={index}>{rhyme}</div>)
                  }
                </div>
              </div>
            )
        }
      </div>
    </EditorFunction>
  )
}

export default RhymesTab