import React from "react";
import "./footer.scss";
import { Typography } from "antd";
import { Instagram, LinkedIn, Twitter } from "@material-ui/icons";
import { FacebookRounded } from "@mui/icons-material";
import Link from '@mui/material/Link';
import logo2 from './logo2.png'

const Footer = () => {
  return (
    <div className={"footer"}>
      <div className={"logo-description-container"}>
        <img alt={"logo"} className={"logo"} src={logo2} />
        <Typography className={"site-description"}>
          Notre projet ayant comme objectifs la conception et la réalisation
          d’une plateforme de « e-Learning » qui consiste à mettre en place une
          plateforme web destinée à l’apprentissage en ligne.
        </Typography>
        <Typography className={"copyright"}>
          Tous les droits sont réservés © {new Date().getFullYear()}{" "}
          Uvct-Training
        </Typography>
      </div>
      <div className={"enterprise-container"}>

        <Typography className={"title"}>Entreprise</Typography>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>À propos d'Uvct</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Enseigner sur Uvct</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Contactez-nous</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Blog</Link></p>

      </div>
      <div className={"links-container"}>
        <Typography className={"title"}>Liens</Typography>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Cours</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Instructeurs</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Événements</Link></p>
        <p><Link href="#" color={'white'} underline="none" className={"site-description"}>Offres</Link></p>
      </div>
      <div className={"social-links"}>
        <Typography className={"title"}>Réseaux sociaux</Typography>
        <div>
          <FacebookRounded className={"icons"} />
          <Instagram className={"icons"} />
          <Twitter className={"icons"} />
          <LinkedIn className={"icons"} />
        </div>
      </div>
    </div>
  );
};
export default Footer;
