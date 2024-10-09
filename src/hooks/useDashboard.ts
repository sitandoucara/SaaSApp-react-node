import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../app/store";
import { useHistory } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";

// Définition des types pour les users et les articles
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

const useDashboard = () => {
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
  const [showAlert, setShowAlert] = useState<{
    isOpen: boolean;
    articleId: string | null;
  }>({ isOpen: false, articleId: null });
  const token = useAppSelector((state: RootState) => state.auth.token);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const titleRef = useRef<HTMLIonInputElement>(null);
  const contentRef = useRef<HTMLIonTextareaElement>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      history.push("/home");
      return;
    }

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
  }, [token, user, history]);

  //Gère la modification du rôle d'un user
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

        // Si le rôle du user connecté est modifié, mettre à jour le store Redux
        if (user?.id === userId && token) {
          dispatch(setUser({ user: { ...user, role }, token }));
        }
      })
      .catch((error) => {
        console.error("There was an error updating the role!", error);
        setShowToast({ isOpen: true, message: "Failed to update role" });
      });
  };

  const handleArticleSave = () => {
    const title = titleRef.current?.value as string;
    const content = contentRef.current?.value as string;

    if (title.trim() === "" || content.trim() === "") {
      setShowToast({
        isOpen: true,
        message: "Title and content are required.",
      });
      return;
    }

    const articleData = { title, content };

    if (isEditMode && selectedArticle) {
      axios
        .put(`http://localhost:3201/news/${selectedArticle.id}`, articleData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setArticles(
            articles.map((article) =>
              article.id === selectedArticle.id
                ? { ...article, ...articleData }
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
        .post("http://localhost:3201/news", articleData, {
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

  const openNewArticleModal = () => {
    setIsEditMode(false);
    setNewArticle({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const openEditArticleModal = (article: Article) => {
    setIsEditMode(true);
    setSelectedArticle(article);
    setNewArticle({
      title: article.title,
      content: article.content,
    });
    setIsModalOpen(true);
  };

  return {
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
    setIsEditMode,
    setSelectedArticle,
    setNewArticle,
    setShowAlert,
    handleRoleChange,
    handleArticleSave,
    handleArticleDelete,
    openNewArticleModal,
    openEditArticleModal,
  };
};

export default useDashboard;
