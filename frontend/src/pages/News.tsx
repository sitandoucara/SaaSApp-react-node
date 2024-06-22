import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IonIcon,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import {
  homeSharp,
  newspaperSharp,
  bookmarkSharp,
  personSharp,
  arrowForwardSharp,
} from "ionicons/icons";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(" http://localhost:3201/news")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {articles.map((article) => (
          <IonCard key={article.id}>
            <IonCardHeader>
              <IonCardTitle>{article.title}</IonCardTitle>
              <IonCardSubtitle>
                {new Date(article.createdAt).toLocaleDateString()}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{article.content}</IonCardContent>
            <IonCardContent className="ion-text-end">
              <IonIcon size="large" icon={arrowForwardSharp} />
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>

      <IonFooter>
        <IonTabBar slot="bottom" className="footer-tab-bar">
          <IonTabButton tab="home" href="/home" className="footer-tab-button">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="news"
            href="/news"
            className="footer-tab-button activated"
          >
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

export default News;
