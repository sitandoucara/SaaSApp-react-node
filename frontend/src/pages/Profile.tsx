import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFooter,
  IonButton,
  IonAlert,
} from "@ionic/react";
import {
  personCircleSharp,
  pricetagSharp,
  informationCircleSharp,
  mailSharp,
  settingsSharp,
} from "ionicons/icons";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import { clearUser } from "../features/auth/authSlice";
import Footer from "../components/Footer";

const Profile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = "/home";
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle
            className="font"
            style={{
              color: "#32221e",
            }}
          >
            Profile
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList className="list" inset={true}>
          {user ? (
            <>
              <IonItem button className="custom-ion-item" href="/account">
                <IonIcon slot="start" size="large" icon={personCircleSharp} />
                <IonLabel className="font">My Account</IonLabel>
              </IonItem>
              {user.role === "admin" && (
                <IonItem button className="custom-ion-item" href="/dashboard">
                  <IonIcon slot="start" size="large" icon={settingsSharp} />
                  <IonLabel className="font">Dashboard</IonLabel>
                </IonItem>
              )}
            </>
          ) : (
            <IonItem button className="custom-ion-item" href="/login">
              <IonIcon slot="start" size="large" icon={personCircleSharp} />
              <IonLabel className="font">Login/Sign Up</IonLabel>
            </IonItem>
          )}

          <IonItem button className="custom-ion-item" href="/subscription">
            <IonIcon slot="start" size="large" icon={pricetagSharp} />
            <IonLabel className="font">Subscription</IonLabel>
          </IonItem>

          <IonItem button className="custom-ion-item" href="/legal">
            <IonIcon slot="start" size="large" icon={informationCircleSharp} />
            <IonLabel className="font">Legal Mentions</IonLabel>
          </IonItem>

          <IonItem button className="custom-ion-item" href="/contact">
            <IonIcon slot="start" size="large" icon={mailSharp} />
            <IonLabel className="font">Contact</IonLabel>
          </IonItem>
        </IonList>
        {user && (
          <IonButton
            type="button"
            className="custom-button-delete"
            shape="round"
            expand="block"
            onClick={() => setShowAlert(true)}
          >
            Logout
          </IonButton>
        )}
        <IonAlert
          className="font"
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Confirm Logout"}
          message={"Are you sure you want to log out?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setShowAlert(false);
              },
            },
            {
              text: "Logout",
              cssClass: "danger",
              handler: () => {
                handleLogout();
                setShowAlert(false);
              },
            },
          ]}
        />
      </IonContent>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
