import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";
//import "./Contact.css";

const Legal: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <IonIcon size="large" icon={chevronBackSharp} />
                <h2
                  style={{
                    color: "#7b635a",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
                >
                  <a href="/profile" style={{ color: "#7b635a" }}>
                    Back
                  </a>
                </h2>
              </IonCol>

              <IonCol size="6">
                <p
                  style={{
                    color: "#7b635a",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
                >
                  Legals
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Mentions Légal</h2>
        <p style={{ color: "#7b635a" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque,
          asperiores.
        </p>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Conditions générales
        </h2>
        <p style={{ color: "#7b635a" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque,
          asperiores.
        </p>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Politique de Confidentialité
        </h2>
        <p style={{ color: "#7b635a" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum in ex
          minus eaque enim, laboriosam voluptatum asperiores quasi id quibusdam
          mollitia qui ipsum animi praesentium quo quidem officiis ut molestiae
          cum nam velit corporis cumque doloribus. Sed ut, debitis, quam, est
          labore dolorem quisquam veritatis natus voluptatibus cupiditate esse
          tempore?
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Legal;
