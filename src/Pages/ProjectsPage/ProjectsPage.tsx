import { useEffect, useState } from "react"
import Layout from "../../Components/Layout"
import useGoogleAuth from "../../Hooks/useGoogleAuth"
import ProjectCard from "./ProjectCard"
import { RequestAddSong, RequestGetUserSongs } from "../../Utils/Requests"
import { getIdTokenData } from "../../Utils/Authorization"
import { DtoSong } from "../../Utils/Dtos"
import Status from "../../Components/Status"
import Loading from "../../Components/Loading"
import Error from "../../Components/Error"
import Input from "../../Components/Input"
import NewProjectModal from "./NewProjectModal"
import ProjectDetails from "./ProjectDetails"
import useWindowSize from "../../Hooks/useWindowSize"
import useVerticalPage from "../../Hooks/useVerticalPage"
import { FaPlus } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import IconButton from "../../Components/IconButton"
import "./ProjectsPage.css"
import ProjectSettingsModal from "./ProjectSettingsModal"
import Button from "../../Components/Button"
import { compareIsoDates } from "../../Utils/DateTime"


function ProjectsPage() {

  const { runWithAuth } = useGoogleAuth()
  const [projects, setProjects] = useState<DtoSong[]>([])
  const [selectedProject, setSelectedProject] = useState("")
  const [status, setStatus] = useState<"loading" | "fail" | "success">("loading")
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const searchedProjects = projects.filter(proj => proj.name.toLowerCase().includes(search.toLowerCase()))
  const sortedProjects = searchedProjects.sort((p1, p2) => -compareIsoDates(p1.lastUpdateDate, p2.lastUpdateDate))

  const selectFirstProject = (data: DtoSong[]) => {
    if (selectedProject === "" && data.length > 0)
      setSelectedProject(data[0].id)
  }

  const loadProjects = () => {
    setStatus("loading")
    runWithAuth(auth => {
      const idTokenData = getIdTokenData(auth)
      if (idTokenData !== null) {
        RequestGetUserSongs(auth, response => {
          if (response.ok) {
            response.json().then(data => {
              const castedData = data as DtoSong[]
              setProjects(_ => {
                setStatus("success")
                return castedData
              })
              selectFirstProject(castedData)
            })
          } else {
            setStatus("fail")
            console.log("Failed to get user projects.")
          }
        })
      }
    })
  }

  const addProject = (name: string, accessFor: number) => {
    let noSpacesName = name
    while (noSpacesName.includes(" "))
      noSpacesName = noSpacesName.replace(" ", "")

    const nonEmptyName = noSpacesName.length > 0 ? name : "proiectul meu"

    RequestAddSong(runWithAuth, response => {
      if (response.ok) {
        console.log(`Added new project ${name} with access ${accessFor}.`)
        loadProjects()
      } else {
        console.log(`Failed to add new project ${name} with access ${accessFor}.`)
      }
    }, nonEmptyName, accessFor)
  }

  const selectedProjectDto = projects.find(proj => proj.id === selectedProject)

  useEffect(() => {
    loadProjects()
  }, [])

  const windowSize = useWindowSize()
  const verticalPage = useVerticalPage()
  const projectsHeight = verticalPage ? windowSize.height - 130 : windowSize.height - 60
  const projectsPageClasses = "page " + (verticalPage ? "projects-page-vertical" : "projects-page")
  const projectsClasses = "projects"

  const ProjectsJSX =
    projects.length === 0
      ? <>Nu ai proiecte...</>
      :
      <div className={projectsClasses} style={{ height: projectsHeight }}>
        {
          sortedProjects.map(project =>
            <span
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
            >
              <ProjectCard
                dto={project}
                selected={selectedProject === project.id}
                loadProjects={loadProjects}
              />
            </span>
          )
        }
      </div>

  return (
    <Layout>
      <NewProjectModal
        open={newProjectModalOpen}
        setOpen={setNewProjectModalOpen}
        addProject={addProject}
      />
      {
        selectedProjectDto === undefined
          ? <></>
          :
          <ProjectSettingsModal
            open={settingsOpen}
            setOpen={setSettingsOpen}
            dto={selectedProjectDto}
            loadProjects={loadProjects}
          />
      }

      <div className={projectsPageClasses}>
        <div className="project-selection">
          <div className="projects-page-header">
            <Input
              inputProps={{
                placeholder: "Cauta...",
                value: search,
                onChange: e => setSearch(e.target.value)
              }}
            />
            <div className="projects-page-header-buttons">
              {
                verticalPage
                  ? <IconButton icon={FaPlus} iconClassName="icon" onClick={() => setNewProjectModalOpen(true)} />
                  : <Button onClick={() => setNewProjectModalOpen(true)}>Proiect Nou</Button>
              }
              {
                verticalPage
                  ?
                  <IconButton
                    disabled={selectedProjectDto === undefined}
                    iconClassName="small-icon"
                    icon={MdSettings}
                    onClick={() => setSettingsOpen(true)}
                  />
                  : <></>
              }
            </div>
          </div>
          {
            <Status
              status={status}
              contentByStatus={{
                "loading":
                  <div>
                    {ProjectsJSX}
                    <Loading />
                  </div>,
                "fail": <Error text="Failed to load projects." />,
                "success": ProjectsJSX
              }}
            />
          }
        </div>
        {
          selectedProjectDto === undefined || verticalPage
            ? <></>
            : <ProjectDetails dto={selectedProjectDto} loadProjects={loadProjects} />
        }
      </div>
    </Layout>
  )
}

export default ProjectsPage