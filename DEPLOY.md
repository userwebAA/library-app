# 🚀 Guide de déploiement sur Vercel avec Neon PostgreSQL

## Étape 1 : Créer une base de données Neon

1. Allez sur [https://neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Cliquez sur "Create a project"
4. Choisissez un nom pour votre projet (ex: books-bazar)
5. Sélectionnez la région la plus proche (ex: Frankfurt)
6. Cliquez sur "Create project"
7. Copiez l'URL de connexion PostgreSQL (format: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`)

## Étape 2 : Configurer Prisma avec Neon

1. Ouvrez votre fichier `.env` et ajoutez :
```env
DATABASE_URL="votre_url_neon_ici"
```

2. Générez le client Prisma :
```bash
npx prisma generate
```

3. Si vous avez un schéma Prisma, poussez-le vers Neon :
```bash
npx prisma db push
```

## Étape 3 : Pusher le code sur GitHub

1. Assurez-vous que votre code est commité :
```bash
git add .
git commit -m "Ready for deployment"
```

2. Push vers GitHub :
```bash
git push
```

## Étape 4 : Déployer sur Vercel

### Option A : Via l'interface Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "Add New Project"
4. Sélectionnez votre dépôt GitHub `library-app`
5. Configurez les variables d'environnement :
   - Cliquez sur "Environment Variables"
   - Ajoutez `DATABASE_URL` avec votre URL Neon
6. Cliquez sur "Deploy"

### Option B : Via Vercel CLI

1. Installez Vercel CLI :
```bash
npm i -g vercel
```

2. Connectez-vous :
```bash
vercel login
```

3. Déployez :
```bash
vercel
```

4. Ajoutez la variable d'environnement quand demandé :
```
DATABASE_URL = votre_url_neon
```

## Étape 5 : Vérifier le déploiement

1. Attendez que le build soit terminé
2. Visitez l'URL fournie par Vercel
3. Testez toutes les fonctionnalités :
   - Page d'accueil
   - Page admin (mot de passe: shaimaalex2003)
   - Ajout/suppression de livres

## Variables d'environnement nécessaires

- `DATABASE_URL` : URL de connexion PostgreSQL Neon

## Déploiement automatique

Une fois configuré, Vercel déploiera automatiquement à chaque push sur la branche principale.

## Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Neon : https://neon.tech/docs
