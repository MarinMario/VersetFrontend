import { FaMusic } from "react-icons/fa";
import "./ProjectCard.css"
import { DtoSong } from "../../Utils/Dtos";
import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import IconButton from "../../Components/IconButton";
import AreYouSureModal from "../../Components/AreYouSureModal";
import { isoToText } from "../../Utils/DateTime";
import { RequestDeleteSong } from "../../Utils/Requests";
import useGoogleAuth from "../../Hooks/useGoogleAuth";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  dto: DtoSong
  selected: boolean
  loadProjects: () => void
}

function ProjectCard(props: ProjectCardProps) {

  const [hovered, setHovered] = useState(false)
  const [deleteProjectModalOpen, setDeleteProjectModalOpen] = useState(false)
  const selected = props.selected

  const musicIconClassNames = "music-icon" + (hovered || selected ? " music-icon-hovered" : "")
  const cardContainerClassNames = "project-card-container" + (hovered || selected ? " project-card-container-hovered" : "")
  const name = props.dto.name
  const visibleName = name.length <= 30 ? name : name.slice(0, 28) + "..."

  const lastUpdateText = isoToText(props.dto.lastUpdateDate + "Z")

  const { runWithAuth } = useGoogleAuth()

  const deleteProject = () => {
    setDeleteProjectModalOpen(false)

    RequestDeleteSong(runWithAuth, response => {
      if (response.ok) {
        console.log(`Deleted project with id ${props.dto.id}.`)
        props.loadProjects()
      } else {
        console.log(`Failed to delete project with id ${props.dto.id}.`)
      }
    }, props.dto.id)
  }

  const navigate = useNavigate()

  const goToEditor = () => {
    navigate(`/editor/${props.dto.id}`)
  }

  return (
    <div
      className={cardContainerClassNames}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AreYouSureModal
        open={deleteProjectModalOpen}
        setOpen={setDeleteProjectModalOpen}
        question={"Esti sigur ca vrei sa stergi proiectul " + props.dto.name + "?"}
        confirmText="Da, sterge-l"
        cancelText="Nu, nu-l sterge"
        onConfirm={deleteProject}
      />

      <div className="project-info">
        <FaMusic className={musicIconClassNames} />
        <div>
          <div className="project-name">{visibleName}</div>
          <div>{lastUpdateText}</div>
        </div>
      </div>
      <div className="project-card-buttons">
        <IconButton icon={MdEdit} iconClassName="small-icon" onClick={goToEditor} />
        <IconButton icon={MdDelete} iconClassName="small-icon" onClick={() => setDeleteProjectModalOpen(true)} />
      </div>
    </div>
  )
}

export default ProjectCard