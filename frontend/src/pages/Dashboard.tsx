import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonToast,
  IonList,
  IonButton,
  IonModal,
  IonInput,
  IonTextarea,
  IonButtons,
  IonAlert,
  IonTitle,
} from "@ionic/react";
import {
  chevronBackSharp,
  addCircleSharp,
  createSharp,
  trashSharp,
} from "ionicons/icons";
import axios from "axios";
import { useAppSelector } from "../hooks";
import { RootState } from "../app/store";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showToast, setShowToast] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });
  const [showAlert, setShowAlert] = useState(false);
  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    axios
      .get("http://localhost:3201/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });

    axios
      .get("http://localhost:3201/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the articles!", error);
      });
  }, [token]);

  const handleRoleChange = (userId: string, role: string) => {
    axios
      .put(
        `http://localhost:3201/admin/users/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers(
          users.map((user) => (user.id === userId ? { ...user, role } : user))
        );
        setShowToast({ isOpen: true, message: "Role updated successfully" });
      })
      .catch((error) => {
        console.error("There was an error updating the role!", error);
        setShowToast({ isOpen: true, message: "Failed to update role" });
      });
  };

  const handleArticleSave = () => {
    if (isEditMode && selectedArticle) {
      axios
        .put(`http://localhost:3201/news/${selectedArticle.id}`, newArticle, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setArticles(
            articles.map((article) =>
              article.id === selectedArticle.id
                ? { ...article, ...newArticle }
                : article
            )
          );
          setShowToast({
            isOpen: true,
            message: "Article updated successfully",
          });
          setIsModalOpen(false);
          setSelectedArticle(null);
        })
        .catch((error) => {
          console.error("There was an error updating the article!", error);
          setShowToast({ isOpen: true, message: "Failed to update article" });
        });
    } else {
      axios
        .post("http://localhost:3201/news", newArticle, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setArticles([...articles, response.data]);
          setShowToast({
            isOpen: true,
            message: "Article created successfully",
          });
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("There was an error creating the article!", error);
          setShowToast({ isOpen: true, message: "Failed to create article" });
        });
    }
  };

  const handleArticleDelete = (articleId: string) => {
    axios
      .delete(`http://localhost:3201/news/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArticles(articles.filter((article) => article.id !== articleId));
        setShowToast({ isOpen: true, message: "Article deleted successfully" });
      })
      .catch((error) => {
        console.error("There was an error deleting the article!", error);
        setShowToast({ isOpen: true, message: "Failed to delete article" });
      });
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
                  Dashboard
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>All Users</h2>
        <IonList>
          {users.map((user) => (
            <IonItem key={user.id}>
              <IonLabel>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol size="6" className="ion-text-center role-column">
                    <div className="role-container">
                      <IonLabel>User</IonLabel>
                      <IonCheckbox
                        checked={user.role === "user"}
                        onIonChange={() => handleRoleChange(user.id, "user")}
                      />
                    </div>
                  </IonCol>
                  <IonCol size="6" className="ion-text-center role-column">
                    <div className="role-container">
                      <IonLabel>Admin</IonLabel>
                      <IonCheckbox
                        checked={user.role === "admin"}
                        onIonChange={() => handleRoleChange(user.id, "admin")}
                      />
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          ))}
        </IonList>
        <IonToast
          isOpen={showToast.isOpen}
          message={showToast.message}
          duration={2000}
          onDidDismiss={() => setShowToast({ isOpen: false, message: "" })}
        />
        <h2 style={{ color: "#7b635a", fontWeight: "bold" }}>
          All News{" "}
          <IonIcon
            icon={addCircleSharp}
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
          />
        </h2>
        <IonList>
          {articles.map((article) => (
            <IonItem key={article.id}>
              <IonIcon
                icon={createSharp}
                onClick={() => {
                  setIsEditMode(true);
                  setSelectedArticle(article);
                  setNewArticle({
                    title: article.title,
                    content: article.content,
                  });
                  setIsModalOpen(true);
                }}
              />
              <IonLabel>
                <h2>{article.title}</h2>
                <p>{article.content.substring(0, 50)}...</p>
              </IonLabel>
              <IonIcon icon={trashSharp} onClick={() => setShowAlert(true)} />
              <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={"Confirm Delete"}
                message={"Are you sure you want to delete this article?"}
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
                    text: "Delete",
                    handler: () => {
                      handleArticleDelete(article.id);
                      setShowAlert(false);
                    },
                  },
                ]}
              />
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={isModalOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{isEditMode ? "Edit Article" : "New Article"}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              value={newArticle.title}
              placeholder="Title"
              onIonChange={(e) =>
                setNewArticle({ ...newArticle, title: e.detail.value! })
              }
            />
            <IonTextarea
              value={newArticle.content}
              placeholder="Content"
              onIonChange={(e) =>
                setNewArticle({ ...newArticle, content: e.detail.value! })
              }
            />
            <IonButton expand="block" onClick={handleArticleSave}>
              Save
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
