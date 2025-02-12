import { useLocation, useNavigate } from "react-router-dom"
import Select, { IconSelectButtonContent } from "./Select"
import { FaUserFriends } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./Layout.css"


function Layout() {

  const navigate = useNavigate()
  const location = useLocation()
  const selected = location.pathname

  const handleOnSelect = (option: string) => {
    navigate(option)
  }

  return (
    <div className="layout-container">
      <div>Versuri</div>
      <Select
        options={["/home", "/friends", "/projects"]}
        selected={selected}
        onClick={handleOnSelect}
        optionContent={{
          "/home": <IconSelectButtonContent icon={FaHouse} text="Acasa" />,
          "/friends": <IconSelectButtonContent icon={FaUserFriends} text="Prieteni" />,
          "/projects": <IconSelectButtonContent icon={FaToolbox} text="Proiecte" />
        }}
      />
      <div className="profile-button"><IoPersonCircleOutline fontSize="35px" style={{ color: "white" }} /></div>
    </div>
  )
}

export default Layout