import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";

const Login: React.FC = () => {
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
                  Connexion
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Connexion</h2>

        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          Pas de compte ? <a href="/signup">S'inscrire</a>
        </h2>
        <IonButton
          type="submit"
          className="custom-button-active"
          expand="block"
          shape="round"
          href="/signin"
        >
          signin
        </IonButton>
        <IonButton
          type="submit"
          className="custom-button-active"
          expand="block"
          shape="round"
        >
          signup
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
