import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { RequestGetSong, RequestUpdateSong } from "../../Utils/Requests"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import { DtoSong, DtoSongUpdate } from "../../Utils/Dtos"
import Status from "../../Components/Status"
import Loading, { LoadingCircle } from "../../Components/Loading"
import Error from "../../Components/Error"
import "./EditorPage.css"
import Button from "../../Components/Button"
import Select from "../../Components/Select"
import EditorTextbox from "./EditorTextbox"
import DefinitionTab from "./DefinitionTab"
import RhymesTab from "./RhymesTab"

function EditorPage() {

  const { runWithAuth } = useGoogleAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const songId = params["id"]
  const [dto, setDto] = useState<DtoSong | null>(null)
  const [status, setStatus] = useState<"loading" | "success" | "fail">("loading")
  const [saveStatus, setSaveStatus] = useState<"loading" | "success" | "fail">("success")
  const [content, setContent] = useState("")
  const [option, setOption] = useState<"Editor" | "Definitie" | "Rime" | "Sinonime" | "Antonime">("Editor")
  const [functionInput, setFunctionInput] = useState("")
  const [wordList, setWordList] = useState<string[]>([])

  const loadWordList = () => {
    fetch('/RomanianWordlist.txt')
      .then(response => {
        return response.text()
      })
      .then(text => setWordList(text.split(",")))
  }

  const loadContent = () => {
    if (songId === undefined) {
      console.log("Id parameter is not defined.")
      return
    }

    setStatus("loading")
    RequestGetSong(runWithAuth, response => {
      if (response.ok) {
        response.json().then(data => {
          setDto(_ => {
            setStatus("success")
            return data
          })
          console.log(`Loaded project ${songId}`)
        })
      } else {
        setStatus("fail")
        console.log(`Failed to load project ${songId}`)
      }
    }, songId)
  }

  const saveContent = () => {
    if (dto === null) {
      setSaveStatus("fail")
      console.log("Failed to save project.")
      return
    }

    const song: DtoSongUpdate = {
      id: dto.id,
      name: dto.name,
      lyrics: content,
      description: dto.description,
      accessFor: dto.accessFor,
    }

    setSaveStatus("loading")
    RequestUpdateSong(runWithAuth, response => {
      if (response.ok) {
        setSaveStatus("success")
      } else {
        setSaveStatus("fail")
      }
    }, song)
  }

  useEffect(() => {
    if (location.pathname === "/editor")
      navigate("/projects")
  }, [])

  useEffect(() => {
    loadContent()
  }, [])

  useEffect(() => {
    if (dto !== null)
      setContent(dto.lyrics)
  }, [dto])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault()
        saveContent()
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dto, content])

  useEffect(() => {
    loadWordList()
  }, [])

  return (
    <div className="editor-page">
      <div className="editor-page-header">
        <Button small variant="text" onClick={() => navigate("/projects")}>Proiecte</Button>
        <Button small variant="text" onClick={saveContent}>
          <div className="editor-page-save-button-content">
            {
              saveStatus === "loading"
                ? <LoadingCircle small />
                : "Save"
            }
          </div>
        </Button>
        {/* <Button small variant="text">File</Button>
        <Button small variant="text">Sync with Docs</Button>
        <Button small variant="text">Settings</Button> */}
      </div>
      <div className="editor-page-content">
        <div className="editor-page-options">
          <Select vertical
            options={["Editor", "Definitie", "Rime", "Sinonime", "Antonime"]}
            selected={option}
            onOptionClick={option => {
              setOption(option)
            }}
          />
        </div>
        <Status
          status={option}
          contentByStatus={{
            "Editor": <></>,
            "Definitie": <DefinitionTab key="def" type="definitie" input={functionInput} setInput={setFunctionInput} />,
            "Rime": <RhymesTab input={functionInput} setInput={setFunctionInput} wordList={wordList} />,
            "Sinonime": <DefinitionTab key="syn" type="definitie-sinonime" input={functionInput} setInput={setFunctionInput} />,
            "Antonime": <DefinitionTab key="ant" type="definitie-antonime" input={functionInput} setInput={setFunctionInput} />,
          }}
        />
        <Status
          status={status}
          contentByStatus={{
            "loading": <div className="editor-content-message"><Loading text="Loading project..." /></div>,
            "fail": <div className="editor-content-message"><Error text="Failed to load project." /></div>,

            "success": <EditorTextbox content={content} setContent={setContent} />
            // success: <div className="editor-content-message"><LoadingCircle /></div>
          }}
        />
      </div>
    </div>
  )
}

export default EditorPage