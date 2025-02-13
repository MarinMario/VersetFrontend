import { FaMusic } from "react-icons/fa";
import "./ProjectCard.css"
import { DtoSong } from "../../Utils/Dtos";

interface ProjectCardProps {
  dto: DtoSong
}

function ProjectCard(props: ProjectCardProps) {


  return (
    <div>
      <FaMusic className="music-icon" />
      {props.dto.name}
    </div>
  )
}

export default ProjectCard