import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonCardContent,
} from "@ionic/react";
import { checkmarkSharp } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Success: React.FC = () => {
  const history = useHistory();
  const [session, setSession] = useState<any>(null);
  const [billingPortalUrl, setBillingPortalUrl] = useState<string | null>(null);
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(
            `http://localhost:3201/stripe/checkout-session?sessionId=${sessionId}`
          );
          setSession(response.data);
          console.log("Checkout Session Response:", response.data);

          const customerId = response.data.customer;
          const portalResponse = await axios.post(
            "http://localhost:3201/stripe/create-billing-portal-session",
            {
              customerId,
            }
          );
          setBillingPortalUrl(portalResponse.data.url);
        } catch (error) {
          console.error("Error fetching checkout session:", error);
        }
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonIcon icon={checkmarkSharp} size="large" />
        <h1>Payment Succeeded!</h1>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              {session
                ? `${
                    session.amount_total / 100
                  } ${session.currency.toUpperCase()}`
                : "Loading..."}
            </IonCardTitle>
            <IonCardSubtitle>
              Date:{" "}
              {session
                ? new Date(session.created * 1000).toLocaleDateString()
                : "Loading..."}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <IonButton
                type="submit"
                className="custom-button-active"
                shape="round"
                href="/home"
              >
                Home
              </IonButton>
              <IonButton
                type="submit"
                className="custom-button-active"
                shape="round"
                href={billingPortalUrl ? billingPortalUrl : "#"}
              >
                More
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Success;
