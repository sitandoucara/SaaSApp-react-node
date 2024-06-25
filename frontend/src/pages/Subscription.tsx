import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronBackSharp } from "ionicons/icons";

const Subscription: React.FC = () => {
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
                  Subscriptions
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>50€/week</IonCardTitle>
            <IonCardSubtitle>Solo - One Person</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>°Access to all audio books.</p>
            <p>°No ads.</p>

            <IonButton
              type="submit"
              className="custom-button-active"
              expand="block"
              shape="round"
            >
              Choose
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <span style={{ textDecoration: "line-through", color: "red" }}>
                200€/month
              </span>{" "}
              180€/month
            </IonCardTitle>
            <IonCardSubtitle>Family - Up to 4 People</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>°Access to all audio books.</p>
            <p>°No ads.</p>
            <p>°Offline listening.</p>
            <p>°Save 20€/month compared to weekly subscription.</p>

            <IonButton
              type="submit"
              className="custom-button-active"
              shape="round"
              expand="block"
            >
              Choose
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <span style={{ textDecoration: "line-through", color: "red" }}>
                2400€/year
              </span>{" "}
              2000€/year
            </IonCardTitle>
            <IonCardSubtitle>Premium - Unlimited Access</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>°Access to all audio books.</p>
            <p>°No ads.</p>
            <p>°Offline listening.</p>
            <p>°Exclusive content.</p>
            <p>°Save 400€/year compared to monthly subscription.</p>

            <IonButton
              type="submit"
              className="custom-button-active"
              shape="round"
              expand="block"
            >
              Choose
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Subscription;
