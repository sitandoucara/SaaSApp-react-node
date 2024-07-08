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

  const truncateContent = (content: string, length: number): string => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsOpen(true);
  };

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
        <IonHeader>
          <IonToolbar>
            <IonTitle>News</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>
                <IonIcon icon={closeCircleSharp} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>{selectedArticle?.title}</h2>
          <h4>
            {new Date(selectedArticle?.createdAt ?? "").toLocaleDateString()}
          </h4>
          <p>{selectedArticle?.content}</p>
        </IonContent>
      </IonModal>
      <IonFooter>
        <Footer />
      </IonFooter>
    </IonPage>
  );
};

export default News;
