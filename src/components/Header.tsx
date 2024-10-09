import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { arrowBackCircleSharp } from "ionicons/icons";

interface HeaderProps {
  title: string;
  backUrl: string;
}

const Header: React.FC<HeaderProps> = ({ title, backUrl }) => {
  return (
    <IonHeader collapse="fade">
      <IonToolbar>
        <IonGrid fixed={true}>
          <IonRow class="ion-justify-content-between">
            <IonCol size="6" className="flex">
              <h2 style={{ fontWeight: "bold", margin: "0 10px" }}>
                <a href={backUrl} style={{ color: "#32221e" }}>
                  <IonIcon size="large" icon={arrowBackCircleSharp} />
                </a>
              </h2>
            </IonCol>

            <IonCol size="6">
              <h3
                style={{
                  fontWeight: "bold",
                  margin: "0 10px",
                  color: "#32221e",
                }}
              >
                {title}
              </h3>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
