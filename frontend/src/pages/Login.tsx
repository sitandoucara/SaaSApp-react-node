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
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { arrowBackCircleSharp } from "ionicons/icons";

const Login: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    if (message) {
      setToastMessage(message);
      localStorage.removeItem("toastMessage");
    }
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <h2 style={{ fontWeight: "bold", margin: "0 10px" }}>
                  <a href="/profile" style={{ color: "#32221e" }}>
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
                  Login
                </h3>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Welcome!</h2>
        <IonButton
          type="submit"
          className="custom-button-active2"
          expand="block"
          shape="round"
          href="/signin"
        >
          Sign In
        </IonButton>
        <IonButton
          type="submit"
          className="custom-button-active"
          expand="block"
          shape="round"
          href="/signup"
        >
          Sign Up
        </IonButton>
        <IonToast
          isOpen={toastMessage !== null}
          message={toastMessage ?? ""}
          duration={2000}
          color="danger"
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
