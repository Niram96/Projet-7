# Projet-7
Projet 7, réalisation du Back-end d'un site - Mon Vieux Grimoire

Pour exécuter correctement le back-end du site Mon Vieux Grimoire :

- Le back-end utilise des variables d'environnement via la bibliothèque "dotenv". 
    Cela permet de ne pas mettre de données sensibles directement dans le code.
    Pour se faire, les données sont rentrées dans un fichier ".env" à la racine du répertoire de travail. Pour des raisons de sécurité, ce fichier n'est pas poussé dans le dépôt distant GitHub.
    Le fichier "env-example" contient les clés auxquelles il faut configurer les valeurs correspondantes :
     - Celles pour accéder à la base de données MongoDB
     - Celle qui permet de générer un jeton à partir d'une chaîne de caractères choisie au hasard.

- Les images
    Pour une raison d'économie de place, le dossier "images" contenant les images des livres n'est pas poussé sur le dépôt distant GitHub.
    Il faut donc créer ce dossier à la racine du répertoire de travail et lors de la création de livres, les images optimisées seront enregistrées dans ce dossier.

Pour lancer le serveur, on peut utiliser la bibliothèque "nodemon" qui permet de relancer le serveur automatiquement lors de modification de code.
Dans le dossier backend, lancer la commande "nodemon server"
Le port utilisé par le front-end pour communiquer avec le back-end est le port 4000.
