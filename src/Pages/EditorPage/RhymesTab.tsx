import { Dispatch, SetStateAction, useEffect, useState } from "react"
import EditorFunction from "./EditorFunction"
import { findRhymingWords } from "../../Utils/Misc"

interface RhymesTabProps {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  wordList: string[]
}

function RhymesTab(props: RhymesTabProps) {

  // const rhymes = findRhymingWords()
  const wordList = props.wordList
  const [rhymes, setRhymes] = useState<string[]>([])

  useEffect(() => {
    onSearch()
  }, [])

  const onSearch = () => {
    setRhymes(findRhymingWords(wordList, props.input))
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
          rhymes
            .sort((a, b) => a.length > b.length ? 1 : -1)
            .filter(r => r.length >= 5)
            .map((rhyme, index) => <span key={index}>{rhyme}</span>)
        }
      </div>
    </EditorFunction>
  )
}

export default RhymesTab