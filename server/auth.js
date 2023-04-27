const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    // Récupérer le token depuis le header d'autorisation
    const token = request.headers.authorization.split(" ")[1];

    // Vérifier que le token correspond à l'origine supposée
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    // Récupérer le numéro de compte à partir du token décodé
    const numeroCompte = decodedToken.compteNumber;

    // Stocker le numéro de compte dans l'objet request pour une utilisation ultérieure
    request.numeroCompte = numeroCompte;

    // Passer la fonctionnalité aux endpoints suivants
    next();
  } catch (error) {
    // Gérer les erreurs liées à l'authentification
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
