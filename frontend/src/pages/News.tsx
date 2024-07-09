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
  IonButton,
  IonModal,
  IonButtons,
} from "@ionic/react";
import { arrowForwardSharp, closeCircleSharp } from "ionicons/icons";
import { truncateContent } from "../utils/textUtils";
import "../theme/variables.css";
import Footer from "../components/Footer";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3201/news")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
      });
  }, []);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsOpen(true);
  };

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonTitle
            className="font"
            style={{ color: "#32221e", fontWeight: "bold" }}
          >
            News
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {articles.map((article) => (
          <IonCard
            key={article.id}
            className="font shadow_none"
            style={{ background: "#FBF8F5" }}
          >
            <IonCardHeader>
              <IonCardTitle style={{ color: "#32221e" }}>
                {article.title}
              </IonCardTitle>
              <IonCardSubtitle>
                {new Date(article.createdAt).toLocaleDateString()}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {truncateContent(article.content, 100)}
            </IonCardContent>
            <IonCardContent className="ion-text-end">
              <IonIcon
                size="large"
                icon={arrowForwardSharp}
                onClick={() => handleOpenArticle(article)}
              />
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>

      <IonModal isOpen={isOpen}>
        <IonHeader collapse="fade">
          <IonToolbar>
            <IonTitle
              className="font"
              style={{
                color: "#32221e",
              }}
            >
              News
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>
                <IonIcon style={{ color: "#32221e" }} icon={closeCircleSharp} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2 style={{ color: "#32221e" }}>{selectedArticle?.title}</h2>
          <p>
            {new Date(selectedArticle?.createdAt ?? "").toLocaleDateString()}
          </p>
          <h4>{selectedArticle?.content}</h4>
        </IonContent>
      </IonModal>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default News;
