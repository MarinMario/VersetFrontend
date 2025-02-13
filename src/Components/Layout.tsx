import { useLocation, useNavigate } from "react-router-dom"
import Select, { IconSelectButtonContent } from "./Select"
import { FaUserFriends } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaToolbox } from "react-icons/fa6";
import { FaAt } from "react-icons/fa";
import "./Layout.css"
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {

  const navigate = useNavigate()
  const location = useLocation()
  const selected = location.pathname

  const handleOnSelect = (option: string) => {
    navigate(option)
  }

  return (
    <div className="layout-page">
      <div className="layout-container">
        <div className="app-name">Verset</div>
        <Select
          vertical
          options={["/home", "/friends", "/projects", "/profile"]}
          selected={selected}
          onClick={handleOnSelect}
          optionContent={{
            "/home": <IconSelectButtonContent icon={FaHouse} text="Acasa" />,
            "/friends": <IconSelectButtonContent icon={FaUserFriends} text="Prieteni" />,
            "/projects": <IconSelectButtonContent icon={FaToolbox} text="Proiecte" />,
            "/profile": <IconSelectButtonContent icon={FaAt} text="Profil" />
          }}
        />
      </div>
      <div className="">
        {props.children}
      </div>
    </div>
  )
}

export default Layout