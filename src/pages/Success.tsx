import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import useSuccess from "../hooks/useSuccess";

const Success: React.FC = () => {
  const { session, handleManageSubscription } = useSuccess();

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="font shadow_none" style={{ background: "#FBF8F5" }}>
          <IonCardHeader>
            <IonCardTitle>Payment Succeeded!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <h2>
                <strong>Amount Paid:</strong>
                {(session?.amount_total / 100).toFixed(2)}
                {session?.currency.toUpperCase()}
              </h2>
            </IonLabel>
            <IonLabel>
              <h2>
                <strong>Date:</strong>
                {new Date(session?.created * 1000).toLocaleDateString()}
              </h2>
            </IonLabel>

            <IonButton
              type="button"
              className="custom-button-active"
              shape="round"
              expand="block"
              onClick={handleManageSubscription}
            >
              More
            </IonButton>
            <IonButton
              type="button"
              className="custom-button-active2"
              shape="round"
              expand="block"
              href="/home"
            >
              Home
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Success;
