import { Link,useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./SidebarButtons.css";

export default function SidebarButtons(props) {
  const location = useLocation();
  const isActive=location.pathname===props.to;
  const btnclasses = isActive?"buttons-container active":"buttons-container";

  return (
    <Link to={props.to} >
    <div className={btnclasses}>
      
        <div className="sidebar-options">
          <div className="sidebar-icon">{props.icon}</div>
          <div className="sidebar-title">{props.title}</div>
        </div>
      
    </div></Link>
  );
}

SidebarButtons.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
