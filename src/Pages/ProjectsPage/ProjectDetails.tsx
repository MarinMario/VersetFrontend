import { DtoSong } from "../../Utils/Dtos"
import { replaceAll } from "../../Utils/Misc"
import { MdSettings } from "react-icons/md";
import "./ProjectDetails.css"
import IconButton from "../../Components/IconButton";
import ProjectSettingsModal from "./ProjectSettingsModal";
import { useState } from "react";
import Button from "../../Components/Button";

interface ProjectDetailsProps {
  dto: DtoSong
  loadProjects: () => void
}

function ProjectDetails(props: ProjectDetailsProps) {

  const [settingsOpen, setSettingsOpen] = useState(false)

  const dto = props.dto
  const visibleName = dto.name.length <= 60 ? dto.name : dto.name.slice(0, 57) + "..."
  const lyrics = dto.lyrics.split("\n")

  const lyricsNoSpaces = replaceAll(dto.lyrics, " ", "")

  return (
    <div>
      <ProjectSettingsModal open={settingsOpen} setOpen={setSettingsOpen} dto={props.dto} loadProjects={props.loadProjects} />

      <div className="project-details-container">
        <div className="project-details-header">
          <h3>{visibleName}</h3>
          <div className="project-details-header-buttons">
            <Button>Editeaza</Button>
            <IconButton iconClassName="small-icon" icon={MdSettings} onClick={() => setSettingsOpen(true)} />
          </div>
        </div>
        <div className="project-lyrics">
          {
            lyricsNoSpaces.length > 0
              ? lyrics.map((verse, index) => <span className="project-verse" key={index}>{verse}</span>)
              : "proiectul n-are versuri..."
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails