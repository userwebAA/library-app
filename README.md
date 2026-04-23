# 📚 Ma Librairie - Application de Gestion de Librairie en Ligne

Application web complète de librairie en ligne construite avec Next.js, PostgreSQL et Prisma.

## 🚀 Fonctionnalités

- **Page d'accueil** : Liste de tous les livres avec images et informations
- **Recherche et filtres** : Recherche par titre, auteur, description et filtrage par catégorie
- **Page de détail** : Affichage complet des informations d'un livre (description, prix, stock, etc.)
- **Interface d'administration** : Ajout, modification et suppression de livres
- **Base de données PostgreSQL** : Stockage persistant avec Prisma ORM

## 🛠️ Technologies Utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **Prisma** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle

## 📋 Prérequis

- Node.js 18+ installé
- PostgreSQL installé et en cours d'exécution
- pgAdmin 4 (optionnel, pour gérer la base de données)

## ⚙️ Installation

### 1. Cloner le projet

```bash
cd library-app
npm install
```

### 2. Configurer la base de données

Créez une base de données PostgreSQL nommée `librairie` dans pgAdmin 4 ou via la ligne de commande :

```sql
CREATE DATABASE librairie;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/librairie"
```

Remplacez les valeurs si nécessaire :
- `postgres` : votre nom d'utilisateur PostgreSQL
- `1234` : votre mot de passe PostgreSQL
- `localhost:5432` : hôte et port de PostgreSQL
- `librairie` : nom de votre base de données

### 4. Exécuter les migrations Prisma

```bash
npx prisma migrate dev --name init
```

Cette commande va :
- Créer les tables dans votre base de données
- Générer le client Prisma

### 5. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📖 Utilisation

### Page d'accueil (/)
- Affiche tous les livres disponibles
- Utilisez la barre de recherche pour trouver un livre par titre, auteur ou description
- Filtrez par catégorie avec le menu déroulant
- Cliquez sur un livre pour voir ses détails

### Interface d'administration (/admin)
- Cliquez sur "Administration" dans l'en-tête
- Ajoutez un nouveau livre avec le bouton "+ Ajouter un livre"
- Remplissez le formulaire avec les informations du livre :
  - **Obligatoire** : Titre, Auteur, Catégorie, Prix, Stock, Description
  - **Optionnel** : URL de l'image, ISBN, Éditeur, Année, Langue, Pages
- Modifiez ou supprimez des livres existants depuis le tableau

### Page de détail d'un livre (/books/[id])
- Affiche toutes les informations du livre
- Photo du livre (si disponible)
- Description complète
- Détails techniques (ISBN, éditeur, année, pages, langue)
- Disponibilité en stock

## 🗄️ Structure de la Base de Données

### Table `Book`

| Champ | Type | Description |
|-------|------|-------------|
| id | String | Identifiant unique (CUID) |
| title | String | Titre du livre |
| author | String | Auteur du livre |
| description | Text | Description complète |
| price | Float | Prix en euros |
| imageUrl | String? | URL de l'image de couverture |
| category | String | Catégorie du livre |
| isbn | String? | Numéro ISBN (unique) |
| publisher | String? | Nom de l'éditeur |
| publishedYear | Int? | Année de publication |
| language | String | Langue (défaut: Français) |
| pages | Int? | Nombre de pages |
| stock | Int | Quantité en stock |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Date de mise à jour |

## 🔧 Commandes Utiles

```bash
# Lancer le serveur de développement
npm run dev

# Générer le client Prisma après modification du schéma
npx prisma generate

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Ouvrir Prisma Studio (interface graphique pour la BDD)
npx prisma studio

# Build pour la production
npm run build

# Lancer en production
npm start
```

## 📁 Structure du Projet

```
library-app/
├── app/
│   ├── api/
│   │   └── books/
│   │       ├── route.ts          # API GET/POST pour les livres
│   │       └── [id]/route.ts     # API GET/PUT/DELETE par ID
│   ├── admin/
│   │   └── page.tsx              # Interface d'administration
│   ├── books/
│   │   └── [id]/page.tsx         # Page de détail d'un livre
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Page d'accueil
├── lib/
│   └── prisma.ts                 # Client Prisma singleton
├── prisma/
│   ├── schema.prisma             # Schéma de la base de données
│   └── migrations/               # Migrations SQL
├── .env                          # Variables d'environnement
└── package.json
```

## 🎨 Personnalisation

### Modifier les catégories
Les catégories sont dynamiques et basées sur les livres existants. Ajoutez simplement des livres avec de nouvelles catégories.

### Changer les couleurs
Modifiez les classes Tailwind dans les fichiers `.tsx` pour personnaliser l'apparence.

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est démarré
- Vérifiez les credentials dans le fichier `.env`
- Assurez-vous que la base de données `librairie` existe

### Erreur Prisma
- Exécutez `npx prisma generate` pour régénérer le client
- Vérifiez que les migrations sont à jour avec `npx prisma migrate dev`

### Port 3000 déjà utilisé
- Changez le port avec : `npm run dev -- -p 3001`

## 📝 Licence

Ce projet est libre d'utilisation pour vos besoins personnels ou commerciaux.
