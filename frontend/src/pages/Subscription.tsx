import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
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
import { useAppSelector } from "../hooks";
import { RootState } from "../app/store";
import axios from "axios";

const Subscription: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleChooseClick = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3201/stripe/create-checkout-session",
        { priceId: "price_1PVr2LLqME1LbpvO960nUIGE" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Checkout session response:", response.data);

      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL found in the response");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

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
              type="button"
              className="custom-button-active"
              expand="block"
              shape="round"
              onClick={handleChooseClick}
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
