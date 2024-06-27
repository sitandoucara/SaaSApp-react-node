import React from "react";
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
  IonTabBar,
  IonTabButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import {
  homeSharp,
  newspaperSharp,
  bookmarkSharp,
  personSharp,
  personCircleSharp,
  pricetagSharp,
  informationCircleSharp,
  mailSharp,
  logOutSharp,
} from "ionicons/icons";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import { clearUser } from "../features/auth/authSlice";

const Profile: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = "/home";
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol>
              <IonList className="list" inset={true}>
                {user ? (
                  <>
                    <IonItem button className="custom-ion-item" href="/account">
                      <IonIcon
                        slot="start"
                        size="large"
                        icon={personCircleSharp}
                      />
                      <IonLabel>My Account</IonLabel>
                    </IonItem>
                    <IonItem
                      button
                      className="custom-ion-item"
                      onClick={handleLogout}
                    >
                      <IonIcon slot="start" size="large" icon={logOutSharp} />
                      <IonLabel>Logout</IonLabel>
                    </IonItem>
                  </>
                ) : (
                  <IonItem button className="custom-ion-item" href="/login">
                    <IonIcon
                      slot="start"
                      size="large"
                      icon={personCircleSharp}
                    />
                    <IonLabel>Login/Sign Up</IonLabel>
                  </IonItem>
                )}

                <IonItem
                  button
                  className="custom-ion-item"
                  href="/subscription"
                >
                  <IonIcon slot="start" size="large" icon={pricetagSharp} />
                  <IonLabel>Subscription</IonLabel>
                </IonItem>

                <IonItem button className="custom-ion-item" href="/legal">
                  <IonIcon
                    slot="start"
                    size="large"
                    icon={informationCircleSharp}
                  />
                  <IonLabel>Legal Mentions</IonLabel>
                </IonItem>

                <IonItem button className="custom-ion-item" href="/contact">
                  <IonIcon slot="start" size="large" icon={mailSharp} />
                  <IonLabel>Contact</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonTabBar slot="bottom" className="footer-tab-bar">
          <IonTabButton tab="home" href="/home" className="footer-tab-button">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="news" href="/news" className="footer-tab-button">
            <IonIcon icon={newspaperSharp} />
            <IonLabel>News</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="favorites"
            href="/favorites"
            className="footer-tab-button"
          >
            <IonIcon icon={bookmarkSharp} />
            <IonLabel>Favorites</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="profile"
            href="/profile"
            className="footer-tab-button activated"
          >
            <IonIcon icon={personSharp} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Profile;
