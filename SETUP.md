# Configuration de la Base de Données

## Étape 1 : Créer le fichier .env

Créez un fichier nommé `.env` à la racine du projet (`library-app/.env`) avec le contenu suivant :

```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/librairie"
```

**Important** : Remplacez les valeurs si nécessaire :
- `postgres` = votre nom d'utilisateur PostgreSQL
- `1234` = votre mot de passe PostgreSQL  
- `5432` = le port PostgreSQL (5432 par défaut)
- `librairie` = le nom de votre base de données

## Étape 2 : Créer la base de données dans pgAdmin 4

1. Ouvrez pgAdmin 4
2. Connectez-vous à votre serveur PostgreSQL local
3. Clic droit sur "Databases" → "Create" → "Database..."
4. Dans le champ "Database", entrez : `librairie`
5. Cliquez sur "Save"

## Étape 3 : Vérifier que PostgreSQL est démarré

PostgreSQL doit être en cours d'exécution. Vous pouvez vérifier dans :
- Services Windows (cherchez "postgresql")
- Ou dans pgAdmin 4, si vous pouvez vous connecter au serveur

## Étape 4 : Exécuter la migration

Une fois le fichier `.env` créé et la base de données créée, exécutez :

```bash
npx prisma migrate dev --name init
```

Cette commande va créer toutes les tables nécessaires dans votre base de données.

## Étape 5 : Lancer l'application

```bash
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur.

## En cas de problème

### Erreur "Can't reach database server"
- Vérifiez que PostgreSQL est démarré
- Vérifiez le port dans le fichier `.env` (doit être 5432 par défaut)
- Vérifiez le mot de passe dans le fichier `.env`

### Erreur "database does not exist"
- Créez la base de données "librairie" dans pgAdmin 4

### Port 3000 déjà utilisé
- Utilisez un autre port : `npm run dev -- -p 3001`
