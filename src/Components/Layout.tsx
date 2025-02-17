import { useLocation, useNavigate } from "react-router-dom"
import Select, { IconSelectButtonContent } from "./Select"
import { BiSolidNavigation } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import { FaToolbox } from "react-icons/fa6";
import { FaAt } from "react-icons/fa";
import { ReactNode } from "react";
import "./Layout.css"
import useVerticalPage from "../Hooks/useVerticalPage";
import useWindowSize from "../Hooks/useWindowSize";

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {

  const navigate = useNavigate()
  const location = useLocation()
  const selected = location.pathname

  const handleOnSelect = (option: string) => navigate(option)

  const verticalPage = useVerticalPage()
  const windowSize = useWindowSize()
  const smallHeader = !verticalPage && windowSize.height < 450

  const displayText = (text: string) => {
    if (verticalPage)
      return ""

    // if (smallHeader)
    //   return ""

    return text
  }

  return (
    <div className="layout-page">
      <div className="layout-container">
        {
          verticalPage || smallHeader ? <></> : <div className="app-name">Verset</div>
        }
        <Select
          vertical={!verticalPage}
          options={["/feed", "/notifications", "/projects", "/profile"]}
          selected={selected}
          onOptionClick={handleOnSelect}
          optionContent={{
            "/feed": <IconSelectButtonContent icon={BiSolidNavigation} text={displayText("Feed")} iconClassName="icon" />,
            "/notifications": <IconSelectButtonContent icon={MdNotifications} text={displayText("Notificari")} iconClassName="small-icon" />,
            "/projects": <IconSelectButtonContent icon={FaToolbox} text={displayText("Proiecte")} iconClassName="icon" />,
            "/profile": <IconSelectButtonContent icon={FaAt} text={displayText("Profil")} iconClassName="icon" />
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