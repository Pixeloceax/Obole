const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d accueil !');
});

// Route pour la liste des utilisateurs
app.get('/users', (req, res) => {
  res.send('Voici la liste des utilisateurs !');
});

// Route pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const user = req.body;
  console.log(user);
  res.send('L utilisateur a été créé avec succès !');
});

// Route pour mettre à jour un utilisateur existant
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(`Mise à jour de l'utilisateur avec l'ID ${id} :`, user);
  res.send(`L'utilisateur avec l'ID ${id} a été mis à jour avec succès !`);
});

// Route pour supprimer un utilisateur existant
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  console.log(`Suppression de l'utilisateur avec l'ID ${id}`);
  res.send(`L'utilisateur avec l'ID ${id} a été supprimé avec succès !`);
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
