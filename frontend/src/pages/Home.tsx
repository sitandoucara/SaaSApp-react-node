import React from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonSearchbar,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/react";
import {
  homeSharp,
  newspaperSharp,
  bookmarkSharp,
  personSharp,
} from "ionicons/icons";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <i
                  className="bi bi-person-circle"
                  style={{ color: "#7b635a", fontSize: "var(--ion-icon-size)" }}
                ></i>
                <h1
                  style={{
                    color: "#7b635a",
                    fontWeight: "bold",
                    margin: "0 10px",
                  }}
                >
                  Hi!
                </h1>
              </IonCol>

              <IonCol size="6">
                <i
                  className="bi bi-bell-fill"
                  style={{ color: "#7b635a", fontSize: "var(--ion-icon-size)" }}
                ></i>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          showCancelButton="focus"
          placeholder="Search a book"
          class="custom-searchbar"
        ></IonSearchbar>
        <div className="tags-container">
          <IonButton className="custom-button-active" shape="round">
            All
          </IonButton>
          <IonButton className="custom-button-inactive" shape="round">
            Detective
          </IonButton>
          <IonButton className="custom-button-inactive" shape="round">
            Drama
          </IonButton>
          <IonButton className="custom-button-inactive" shape="round">
            Historical
          </IonButton>
        </div>

        <div className="book-category">
          <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Popular</h2>
          <IonLabel style={{ color: "red", cursor: "pointer" }}>
            See all
          </IonLabel>
        </div>
        <div className="book-grid">
          <div className="book-item">
            <IonImg src="book1.png" alt="Harry Potter"></IonImg>
            <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
              Harry Potter
            </h2>
            <p style={{ color: "#7b635a" }}>J.K. Rowling</p>
          </div>
          <div className="book-item">
            <IonImg src="book2.png" alt="Harry Potter"></IonImg>
            <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Moby Dick</h2>
            <p style={{ color: "#7b635a" }}>Herman Melville</p>
          </div>

          {/* .... plus de livre */}
        </div>
        <div className="book-category">
          <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Detective</h2>
          <IonLabel style={{ color: "red", cursor: "pointer" }}>
            See all
          </IonLabel>
        </div>
        <div className="book-grid">
          <div className="book-item">
            <IonImg src="book2.png" alt="Harry Potter"></IonImg>
            <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
              Harry Potter
            </h2>
            <p style={{ color: "#7b635a" }}>J.K. Rowling</p>
          </div>
          <div className="book-item">
            <IonImg src="book1.png" alt="Harry Potter"></IonImg>
            <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Moby Dick</h2>
            <p style={{ color: "#7b635a" }}>Herman Melville</p>
          </div>
          {/* .... plus de livre */}
        </div>
      </IonContent>

      <IonFooter>
        <IonTabBar slot="bottom" className="footer-tab-bar">
          <IonTabButton
            tab="home"
            href="/home"
            className="footer-tab-button activated"
          >
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
            className="footer-tab-button"
          >
            <IonIcon icon={personSharp} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
