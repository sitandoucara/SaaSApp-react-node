import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { homeSharp, newspaperSharp, personSharp } from "ionicons/icons";

const Footer: React.FC = () => {
  return (
    <IonTabBar slot="bottom" className="footer-tab-bar">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={homeSharp} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="news" href="/news">
        <IonIcon icon={newspaperSharp} />
        <IonLabel>News</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={personSharp} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
