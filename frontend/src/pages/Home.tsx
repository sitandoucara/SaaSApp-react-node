import React from "react";
import {
  IonContent,
  IonPage,
  IonSearchbar,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { useAppSelector } from "../hooks";
import { RootState } from "../app/store";
import Footer from "../components/Footer";
import { notificationsCircleSharp, personCircleSharp } from "ionicons/icons";
import "../theme/variables.css";
const Home: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="8" className="flex">
                <IonIcon className="icon_large" icon={personCircleSharp} />
                <h1
                  style={{
                    color: "#32221e",
                    margin: "0 10px",
                  }}
                >
                  Hi, {user ? user.name : "You"}!
                </h1>
              </IonCol>

              <IonCol size="4">
                <IonIcon
                  size="large"
                  icon={notificationsCircleSharp}
                  style={{ color: "#32221e" }}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          showCancelButton="focus"
          placeholder="Search a book"
          class="custom-searchbar font"
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
          <h2 style={{ color: "#32221e", fontWeight: "bold" }}>Popular</h2>
          <IonLabel
            style={{ color: "#EC3E43", cursor: "pointer" }}
            className="font"
          >
            See all
          </IonLabel>
        </div>
        <div className="book-grid">
          <div className="book-item">
            <IonImg src="book1.png" alt="Harry Potter" className="img"></IonImg>
            <h2 style={{ color: "#7B635A", fontWeight: "bold" }}>
              Harry Potter
            </h2>
            <p style={{ color: "#7B635A" }}>J.K. Rowling</p>
          </div>

          <div className="book-item">
            <IonImg src="book4.png" alt="Harry Potter" className="img"></IonImg>
            <h2 style={{ color: "#7B635A", fontWeight: "bold" }}>Moby Dick</h2>
            <p style={{ color: "#7B635A" }}>Herman Melville</p>
          </div>
        </div>

        <div className="book-category">
          <h2 style={{ color: "#32221e", fontWeight: "bold" }}>Detective</h2>
          <IonLabel
            style={{ color: "#EC3E43", cursor: "pointer" }}
            className="font"
          >
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
            <IonImg src="book3.png" alt="Harry Potter"></IonImg>
            <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>Moby Dick</h2>
            <p style={{ color: "#7b635a" }}>Herman Melville</p>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default Home;
