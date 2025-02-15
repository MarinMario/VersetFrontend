import { useLocation, useNavigate } from "react-router-dom"
import Select, { IconSelectButtonContent } from "./Select"
import { BiSolidNavigation } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import { FaToolbox } from "react-icons/fa6";
import { FaAt } from "react-icons/fa";
import { ReactNode } from "react";
import "./Layout.css"
import useVerticalPage from "../Hooks/useVerticalPage";


interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {

  const navigate = useNavigate()
  const location = useLocation()
  const selected = location.pathname

  const handleOnSelect = (option: string) => navigate(option)

  const verticalPage = useVerticalPage()

  const layoutPageClasses = verticalPage ? "layout-page-vertical" : "layout-page"
  const layoutContainerClasses = verticalPage ? "layout-container-vertical" : "layout-container"

  return (
    <div className={layoutPageClasses}>
      <div className={layoutContainerClasses}>
        {
          verticalPage ? <></> : <div className="app-name">Verset</div>
        }
        <Select
          vertical={!verticalPage}
          options={["/feed", "/notifications", "/projects", "/profile"]}
          selected={selected}
          onOptionClick={handleOnSelect}
          optionContent={{
            "/feed": <IconSelectButtonContent icon={BiSolidNavigation} text="Feed" iconClassName="icon" />,
            "/notifications": <IconSelectButtonContent icon={MdNotifications} text="Notificari" iconClassName="small-icon" />,
            "/projects": <IconSelectButtonContent icon={FaToolbox} text="Proiecte" iconClassName="icon" />,
            "/profile": <IconSelectButtonContent icon={FaAt} text="Profil" iconClassName="icon" />
          }}
        />
      </div>
      <div className="layout-content">
        {props.children}
      </div>
    </div>
  )
}

export default Layout