# MYSAASAPP - Node/IONIC REACT

Projet de fin d'année sur le thème d'un SaaSApp. Une application web pour la gestion d'abonnements de livres audio, permettant aux utilisateurs de s'inscrire, de se connecter, de gérer leur profil, de s'abonner et de suivre les actualités.

## Node/Express

### Fonctionnalités

- **Authentification** : Inscription, connexion et déconnexion.
- **Gestion des Utilisateurs** : Mise à jour des informations de profil, suppression de compte.
- **Abonnements** : Gestion des abonnements via Stripe, création de sessions de paiement, et accès au portail de facturation.
- **Page de Contact** : Formulaire de contact envoyant des emails via Mailtrap.
- **News** : CRUD des articles de news.
- **Dashboard Administratif** : Gestion du roles des utilisateurs et des articles pour les administrateurs.

### Structure du Projet

1. **Prisma** : Utilisation de Prisma pour l'ORM et MongoDB comme base de données.
2. **Express** : Serveur Express pour gérer les routes et les middlewares.
3. **JWT** : Utilisation de JSON Web Tokens pour l'authentification.
4. **Stripe** : Intégration de Stripe pour la gestion des paiements et des abonnements.
5. **Mailtrap** : Utilisation de Mailtrap pour l'envoi d'emails de test.

### Routes Principales

- **/auth** :

  - `POST /signup` : Inscription d'un utilisateur.
  - `POST /signin` : Connexion d'un utilisateur.
  - `PUT /update-name` : Mise à jour du nom de l'utilisateur.
  - `DELETE /delete-account` : Suppression du compte utilisateur.

- **/stripe** :

  - `POST /create-checkout-session` : Création d'une session de paiement.
  - `GET /checkout-session` : Récupération des informations de la session de paiement.
  - `POST /create-billing-portal-session` : Création d'une session de portail de facturation.

- **/contact** :

  - `POST /contact` : Envoi d'un email via le formulaire de contact.

- **/news** :

  - `GET /` : Récupération de tous les articles.
  - `GET /:id` : Récupération d'un article par son ID.
  - `POST /` : Création d'un nouvel article.
  - `PUT /:id` : Mise à jour d'un article existant.
  - `DELETE /:id` : Suppression d'un article.

- **/admin** :
  - `GET /users` : Récupération de tous les utilisateurs (admin uniquement).
  - `PUT /users/:id/role` : Mise à jour du rôle d'un utilisateur (admin uniquement).

## IONIC/REACT

### Fonctionnalités

- **Accueil** : Page d'accueil affichant les livres populaires et les catégories.
- **Authentification** : Pages de connexion et d'inscription.
- **Profil** : Gestion du profil utilisateur, accès aux abonnements et aux informations légales.
- **Abonnements** : Pages présentant différentes offres d'abonnement et intégration avec Stripe pour les paiements.
- **Actualités** : Affichage des articles de news.
- **Contact** : Page de contact ayant un formulaire de contact avec intégration de Leaflet pour afficher la carte.

### Structure du Projet

1. **Redux** : Gestion de l'état global de l'application avec Redux.
2. **Hooks Personnalisés** : Utilisation de hooks personnalisés pour la logique.
3. **Ionic** : Framework pour la création d'applications mobiles et web modernes.
4. **Axios** : Utilisation d'Axios pour les appels API.

### Installation

Pour démarrer avec ce projet, suivez ces étapes :

1. Clonez le repository :

2. Installez les dépendances backend :

   ```bash
   cd backend
   composer install
   ```

3. Configurez votre fichier `.env` (voir fichier `.env.example` dans backend):

4. Exécutez les migrations Prisma :

   ```bash
   npx prisma migrate dev

   ```

5. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

6. Installez les dépendances frontend :

   ```bash
   cd ../frontend
   npm install
   ```

7. Démarrez le serveur de développement Ionic :

   ```bash
   ionic serve
   ```

### Conclusion

Ce projet combine les technologies Node.js, Express, Prisma, MongoDB pour le backend, et Ionic/React pour le frontend, offrant une solution complète pour la gestion d'abonnements de livres audio. Il utilise des pratiques modernes de développement pour assurer une application maintenable et évolutive.

### Sitan
