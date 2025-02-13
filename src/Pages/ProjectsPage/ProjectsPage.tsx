import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import ProjectCard from "./ProjectCard"
import { RequestGetUserSongs } from "../../Utils/Requests"
import { getIdTokenData } from "../../Utils/Authorization"
import { DtoSong } from "../../Utils/Dtos"


function ProjectsPage() {

  const { runWithAuth } = useGoogleAuth()
  const [projects, setProjects] = useState<DtoSong[]>([])

  useEffect(() => {
    runWithAuth(auth => {
      const idTokenData = getIdTokenData(auth)
      if (idTokenData !== null) {
        RequestGetUserSongs(auth, response => {
          if (response.ok) {
            response.json().then(data => setProjects(data))
          } else {
            console.log("Failed to get user projects.")
          }
        }, idTokenData.email.split("@")[0])
      }
    })
  }, [])

  return (
    <Layout>
      <div>projects</div>
      {
        projects.map(project => <ProjectCard key={project.id} dto={project} />)
      }
    </Layout>
  )
}

export default ProjectsPage