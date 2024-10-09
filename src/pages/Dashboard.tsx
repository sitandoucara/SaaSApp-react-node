import React from "react";
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
  addCircleSharp,
  createSharp,
  trashSharp,
  closeCircleSharp,
  arrowBackCircleSharp,
} from "ionicons/icons";
import useDashboard from "../hooks/useDashboard";

const Dashboard: React.FC = () => {
  const {
    users,
    articles,
    showToast,
    isModalOpen,
    isEditMode,
    selectedArticle,
    newArticle,
    showAlert,
    titleRef,
    contentRef,
    setShowToast,
    setIsModalOpen,
    //setIsEditMode,
    //setSelectedArticle,
    setNewArticle,
    setShowAlert,
    handleRoleChange,
    handleArticleSave,
    handleArticleDelete,
    openNewArticleModal,
    openEditArticleModal,
  } = useDashboard();

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonGrid fixed={true} style={{ color: "#32221e" }}>
            <IonRow class="ion-justify-content-between">
              <IonCol size="6" className="flex">
                <h2 style={{ fontWeight: "bold", margin: "0 10px" }}>
                  <a href="/profile" style={{ color: "#32221e" }}>
                    <IonIcon size="large" icon={arrowBackCircleSharp} />
                  </a>
                </h2>
              </IonCol>

              <IonCol size="6">
                <h3 style={{ fontWeight: "bold", margin: "0 10px" }}>
                  Dashboard
                </h3>
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
                <h2 style={{ color: "#32221e" }}>{user.name}</h2>
                <p style={{ color: "#7b635a" }}>{user.email}</p>
              </IonLabel>
              <IonGrid>
                <IonRow>
                  <IonCol size="6" className="ion-text-center role-column">
                    <div className="role-container">
                      <IonLabel className="font">User</IonLabel>
                      <IonCheckbox
                        checked={user.role === "user"}
                        onIonChange={() => handleRoleChange(user.id, "user")}
                      />
                    </div>
                  </IonCol>
                  <IonCol size="6" className="ion-text-center role-column">
                    <div className="role-container">
                      <IonLabel className="font">Admin</IonLabel>
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
          position="top"
          onDidDismiss={() => setShowToast({ isOpen: false, message: "" })}
        />
        <h2
          style={{
            color: "#7b635a",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          All News
          <IonIcon
            icon={addCircleSharp}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={openNewArticleModal}
          />
        </h2>
        <IonList>
          {articles.map((article) => (
            <IonItem key={article.id} className="news-item">
              <IonLabel>
                <h2>{article.title}</h2>
                <p>{article.content.substring(0, 50)}...</p>
              </IonLabel>

              <IonIcon
                icon={createSharp}
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "#32221e",
                }}
                onClick={() => openEditArticleModal(article)}
              />
              <IonIcon
                icon={trashSharp}
                style={{ cursor: "pointer", color: "#EC3E43" }}
                onClick={() =>
                  setShowAlert({ isOpen: true, articleId: article.id })
                }
              />
            </IonItem>
          ))}
        </IonList>
        <IonAlert
          isOpen={showAlert.isOpen}
          onDidDismiss={() => setShowAlert({ isOpen: false, articleId: null })}
          header={"Confirm Delete"}
          message={"Are you sure you want to delete this article?"}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                setShowAlert({ isOpen: false, articleId: null });
              },
            },
            {
              text: "Delete",
              handler: () => {
                if (showAlert.articleId) {
                  handleArticleDelete(showAlert.articleId);
                }
                setShowAlert({ isOpen: false, articleId: null });
              },
            },
          ]}
        />
        <IonModal isOpen={isModalOpen}>
          <IonHeader collapse="fade">
            <IonToolbar>
              <IonTitle className="font">
                {isEditMode ? "Edit Article" : "New Article"}
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen(false)}>
                  <IonIcon
                    style={{ color: "#32221e" }}
                    icon={closeCircleSharp}
                  />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              ref={titleRef}
              value={newArticle.title}
              placeholder="Title"
              onIonChange={(e) =>
                setNewArticle({ ...newArticle, title: e.detail.value! })
              }
              style={{
                width: "100%",
                whiteSpace: "pre-wrap",
                color: "#32221e",
              }}
              className="font"
            />
            <IonTextarea
              ref={contentRef}
              value={newArticle.content}
              placeholder="Content"
              onIonChange={(e) =>
                setNewArticle({ ...newArticle, content: e.detail.value! })
              }
              autoGrow={true}
              rows={10}
              style={{ width: "100%", minHeight: "200px" }}
              className="font"
            />
            <IonButton
              expand="block"
              onClick={handleArticleSave}
              className="custom-button-active"
            >
              Save
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
