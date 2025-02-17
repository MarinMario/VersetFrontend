import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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

function EditorPage() {

  const { runWithAuth } = useGoogleAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const songId = location.pathname.replace("/editor/", "")
  const [dto, setDto] = useState<DtoSong | null>(null)
  const [status, setStatus] = useState<"loading" | "success" | "fail">("loading")
  const [saveStatus, setSaveStatus] = useState<"loading" | "success" | "fail">("success")
  const [content, setContent] = useState("")

  const loadContent = () => {
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


  return (
    <div className="editor-page">
      <div className="editor-page-header">
        <Button small variant="text" onClick={() => navigate("/projects")}>Proiecte</Button>
        <Button small variant="text" onClick={saveContent}>
          <div className="editor-page-save-button-content">
            <div>
              {
                saveStatus === "loading"
                  ? <LoadingCircle small />
                  : <></>
              }
            </div>
            <div>Save</div>
            <div></div>
          </div>
        </Button>
        <Button small variant="text">File</Button>
        <Button small variant="text">Sync with Docs</Button>
        <Button small variant="text">Settings</Button>
      </div>
      <div className="editor-page-content">
        <div className="editor-page-options">
          <Select vertical
            options={["Nimic", "Definitie", "Rime", "Sinonime", "Antonime"]}
            selected={"Nimic"}
            onOptionClick={() => { }}
          />
        </div>
        <div className="editor-page-function">

        </div>
        <Status
          status={status}
          contentByStatus={{
            "loading": <div className="editor-content-message"><Loading text="Loading project..." /></div>,
            "fail": <div className="editor-content-message"><Error text="Failed to load project." /></div>,
            "success": <EditorTextbox content={content} setContent={setContent} />
          }}
        />
      </div>
    </div>
  )
}

export default EditorPage