import "./Sidebar.css";
import { CgFeed } from "react-icons/cg";
import { BsFire } from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";



import SidebarButtons from "./SidebarButtons";
import { useEffect, useState } from "react";
import { apiClient } from "../../spotify";

const Sidebar = () => {
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImageUrl(response.data.images[0].url);
    });
  }, []);

  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
  );

  return (
    <div className="sidebar-container">
      <img src={imageUrl} alt="profile" className="profile-image"></img>
      <div className="sidebar-buttons-container">
        <SidebarButtons
          title="Feed"
          to="/feed"
          icon={<BiHome />}
        ></SidebarButtons>
        <SidebarButtons
          title="Trending"
          to="/trending"
          icon={<BsFire />}
        ></SidebarButtons>
        <SidebarButtons
          title="Player"
          to="/player"
          icon={<BsPlayCircleFill />}
        ></SidebarButtons>
        <SidebarButtons
          title="Favorites"
          to="/favourites"
          icon={<FaRegHeart />}
        ></SidebarButtons>
        <SidebarButtons
          title="Playlist"
          to="/"
          icon={<CgFeed />}
        ></SidebarButtons>
        <SidebarButtons
        title="Search"
        to="/search"
        icon={<BiSearchAlt/>}/>
      </div>
      <div className="sidebar-bottom">
        <SidebarButtons
          to="/notdeveloped"
          title="Sign out"
          icon={<FaSignOutAlt />}
        ></SidebarButtons>
      </div>
    </div>
  );
};

export default Sidebar;
