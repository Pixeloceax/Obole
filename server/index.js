// Importation des modules nécessaires
const http = require("http");
const app = require("./app");

// Fonction qui permet de normaliser le port en un nombre ou une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10); // Conversion en un entier de base 10

  if (isNaN(port)) {
    return val; // Si le port n'est pas un nombre, on retourne la chaîne
  }
  if (port >= 0) {
    return port; // Si le port est un nombre positif, on retourne le nombre
  }
  return false; // Sinon, on retourne false
};

// Définition du port
const port = normalizePort(process.env.PORT || "3001"); // On utilise le port du système ou le port 3001 si aucun n'est disponible
app.set("port", port); // On définit le port utilisé dans l'application

// Gestion des erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    // Si l'erreur ne concerne pas le serveur en écoute
    throw error; // On lance une erreur
  }
  const address = server.address(); // On récupère l'adresse du serveur
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port; // On définit le type de connexion utilisée
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges."); // On affiche une erreur si le serveur nécessite des privilèges élevés
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use."); // On affiche une erreur si le port est déjà utilisé
      process.exit(1);
      break;
    default:
      throw error; // On lance une erreur par défaut
  }
};

// Création du serveur
const server = http.createServer(app); // On crée un serveur HTTP en utilisant l'application

// Gestion des événements
server.on("error", errorHandler); // On gère les erreurs en utilisant la fonction errorHandler définie précédemment
server.on("listening", () => {
  const address = server.address(); // On récupère l'adresse du serveur
  const bind = typeof address === "string" ? "pipe " + address : "port " + port; // On définit le type de connexion utilisée
  console.log("Listening on " + bind); // On affiche un message de confirmation
});

// Mise en écoute du serveur sur le port défini
server.listen(port);
