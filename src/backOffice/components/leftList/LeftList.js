import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import "./LeftList.css";
import PersonIcon from "@material-ui/icons/Person";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SchoolIcon from "@material-ui/icons/School";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EventIcon from "@material-ui/icons/Event";
import DescriptionIcon from "@material-ui/icons/Description";
import CategoryIcon from "@material-ui/icons/Category";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SmsFailedIcon from "@material-ui/icons/SmsFailed";
import SecurityIcon from "@material-ui/icons/Security";
import MessageIcon from "@material-ui/icons/Message";
import ShopIcon from "@material-ui/icons/Shop";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import StarsIcon from "@material-ui/icons/Stars";
import {Link}  from "react-router-dom";

// Routes instructeur
const routes5 = [
  {
    icon: <PersonIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <DescriptionIcon />,
    name: "Mes formations",
    path: "/mes-formations",
  },
  {
    icon: <EventIcon />,
    name: "Mes événements",
    path: "/mes-evenements",
  },
  {
    icon: <MonetizationOnIcon />,
    name: "Mes gains",
    path: "/mes-gains",
  },
  {
    icon: <ShopIcon />,
    name: "Mes achats",
    path: "/mes-achats",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramétres",
    path: "/parametres",
  },
  {
    icon: <ExitToAppIcon />,
    name: "Se déconnecter",
  },
];
// Routes instructeur

const routes0 = [
  {
    icon: <PersonIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <DescriptionIcon />,
    name: "Mes formations",
    path: "/mes-formations",
  },
  {
    icon: <EventIcon />,
    name: "Mes événements",
    path: "/mes-evenements",
  },
  {
    icon: <MonetizationOnIcon />,
    name: "Mes gains",
    path: "/mes-gains",
  },
  {
    icon: <ShopIcon />,
    name: "Mes achats",
    path: "/mes-achats",
  },
  {
    icon: <MessageIcon />,
    name: "Messages",
    path: "/msginst",
  },
  {
    icon: <SmsFailedIcon />,
    name: "Réclamtions",
    path: "/reclamations",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramétres",
    path: "/parametres",
  },
  {
    icon: <ExitToAppIcon />,
    name: "Se déconnecter",
    path: "/se-deconnecter",
  },
  {
    
    name: "",
    path: "",
  },
  {
    
    name: "",
    path: "",
  },
  {
   
    name: "",
    path: "",
  },
  
];

// Routes apprenant
const routes1 = [
  {
    icon: <PersonIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <ShopIcon />,
    name: "Mes achats",
    path: "/mes-achats",
  },
  {
    icon: <StarsIcon />,
    name: "Mes favoris",
    path: "/mes-favoris",
  },
  {
    icon: <MessageIcon />,
    name: "Messages",
    path: "/messages",
  },
  {
    icon: <SmsFailedIcon />,
    name: "Réclamtions",
    path: "/reclamations",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramétres",
    path: "/parametres",
  },
  {
    icon: <ExitToAppIcon />,
    name: "Se déconnecter",
    path: "/se-deconnecter",
  },{
    
    name: "",
    path: "",
  },{
    
    name: "",
    path: "",
  },{
    
    name: "",
    path: "",
  },
];
// Routes admin
const routes2 = [
  {
    icon: <DashboardIcon />,
    name: "Tableau du bord",
    path: "/tableau-bord",
  },
  {
    icon: <PersonIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <BusinessCenterIcon />,
    name: "Instructeurs",
    path: "/instructeurs",
  },
  {
    icon: <SchoolIcon />,
    name: "Apprenants",
    path: "/apprenants",
  },
  {
    icon: <DescriptionIcon />,
    name: "Formations",
    path: "/all-formations",
  },
  {
    icon: <EventIcon />,
    name: "Événements",
    path: "/evenements",
  },
  {
    icon: <SmsFailedIcon />,
    name: "Réclamtions",
    path: "/all-reclamation",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramétres",
    path: "/parametres",
  },
  {
    icon: <ExitToAppIcon />,
    name: "Se déconnecter",
    path: "/se-deconnecter",
  },
  {
    
    name: "",
    path: "",
  },
  
];
// Routes super admin
const routes3 = [
  {
    icon: <DashboardIcon />,
    name: "Tableau du bord",
    path: "/tableau-bord",
  },
  {
    icon: <PersonIcon />,
    name: "Profile",
    path: "/profile",
  },
  {
    icon: <SecurityIcon />,
    name: "Administrateur",
    path: "/administrateurs",
  },
  {
    icon: <BusinessCenterIcon />,
    name: "Instructeurs",
    path: "/instructeurs",
  },
  {
    icon: <SchoolIcon />,
    name: "Apprenants",
    path: "/apprenants",
  },
  {
    icon: <CategoryIcon />,
    name: "Catégories",
    path: "/categories",
  },
  {
    icon: <DescriptionIcon />,
    name: "Formations",
    path: "/all-formations",
  },
  {
    icon: <EventIcon />,
    name: "Événements",
    path: "/evenements",
  },
  {
    icon: <SmsFailedIcon />,
    name: "Réclamtions",
    path: "/all-reclamation",
  },
  {
    icon: <SettingsIcon />,
    name: "Paramétres",
    path: "/parametres",
  }
  
];

function mapping(x) {
  return x.map((routes,i) => (
    <Menu.Item key={i} icon={routes.icon} className="menu-item-left">
      <Link to={routes.path} className="menu-title-item">
        {routes.name}
      </Link>
    </Menu.Item>
  ));
}

export default function LeftList({ children }) {
  
  
  const user = useSelector((state) => state.auth.user); 
  
  
  return (
    < >
      <div className="leftList">
        <Menu
          mode="inline"
          style={{ backgroundColor: "#ffffff", marginTop: "50px" }} 
        >
        
         {   user!==null && user.role==='instructeur'&& mapping(routes0)}
          {   user!==null && user.role==='apprenant'&& mapping(routes1)}
          {/* {isLogged&&loginUser.role==='admin' && mapping(routes2)} */}
           {user!==null && user.role==='admin' &&  mapping(routes2)}
          {  user!==null && user.role==='super admin' && mapping(routes3)}
         
        </Menu>
      </div>
      <main className="children-content">{children}</main>
    </>
  );
}
