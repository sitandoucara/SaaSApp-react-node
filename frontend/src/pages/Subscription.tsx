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
import { arrowBackCircleSharp, chevronBackSharp } from "ionicons/icons";
import { useAppSelector } from "../hooks";
import { RootState } from "../app/store";
import axios from "axios";

const Subscription: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleChooseClick = async (priceId: string) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3201/stripe/create-checkout-session",
        { priceId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
                  Subscription
                </h3>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard className="font shadow_none" style={{ background: "#FBF8F5" }}>
          <IonCardHeader>
            <IonCardTitle>50€/week</IonCardTitle>
            <IonCardSubtitle style={{ color: "#32221e", fontWeight: "bold" }}>
              Solo - One Person
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent style={{ color: "#32221e", fontWeight: "bold" }}>
            <h3>°Access to all audio books.</h3>
            <h3>°No ads.</h3>
            <IonButton
              type="button"
              className="custom-button-active2"
              expand="block"
              shape="round"
              onClick={() =>
                handleChooseClick("price_1PVr2LLqME1LbpvO960nUIGE")
              }
            >
              Choose
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="font shadow_none" style={{ background: "#FBF8F5" }}>
          <IonCardHeader>
            <IonCardTitle>
              <span
                style={{ textDecoration: "line-through", color: "#EC3E43" }}
              >
                200€/month
              </span>
              <br />
              180€/month
            </IonCardTitle>
            <IonCardSubtitle style={{ color: "#32221e", fontWeight: "bold" }}>
              Family - Up to 4 People
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent style={{ color: "#32221e", fontWeight: "bold" }}>
            <p>°Access to all audio books.</p>
            <p>°No ads.</p>
            <p>°Offline listening.</p>
            <p>°Save 20€/month compared to weekly subscription.</p>

            <IonButton
              type="submit"
              className="custom-button-active2"
              shape="round"
              expand="block"
              onClick={() =>
                handleChooseClick("price_1PYmauLqME1LbpvOcL8RuJjJ")
              }
            >
              Choose
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="font shadow_none" style={{ background: "#FBF8F5" }}>
          <IonCardHeader>
            <IonCardTitle>
              <span
                style={{ textDecoration: "line-through", color: "#EC3E43" }}
              >
                2400€/year
              </span>
              <br />
              2000€/year
            </IonCardTitle>
            <IonCardSubtitle style={{ color: "#32221e", fontWeight: "bold" }}>
              Premium - Unlimited Access
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent style={{ color: "#32221e", fontWeight: "bold" }}>
            <p>°Access to all audio books.</p>
            <p>°No ads.</p>
            <p>°Offline listening.</p>
            <p>°Exclusive content.</p>
            <p>°Save 400€/year compared to monthly subscription.</p>

            <IonButton
              type="submit"
              className="custom-button-active2"
              shape="round"
              expand="block"
              onClick={() =>
                handleChooseClick("price_1PYmdaLqME1LbpvOrfWVhmTI")
              }
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
