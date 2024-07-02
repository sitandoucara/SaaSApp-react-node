import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";

const Canceled: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payment Canceled</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Payment was canceled</h1>
        <IonButton onClick={() => history.push("/subscription")}>
          Go back to Subscriptions
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Canceled;
