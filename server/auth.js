const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    // Récupérer le token depuis le header d'autorisation
    const token = await request.headers.authorization.split(" ")[1];

    // Vérifier que le token correspond à l'origine supposée
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

    // Récupérer les informations de l'utilisateur connecté à partir du token décodé
    const user = await decodedToken;

    // Passer les informations de l'utilisateur aux endpoints suivants
    request.user = user;

    // Passer la fonctionnalité aux endpoints suivants
    next();
  } catch (error) {
    // Gérer les erreurs liées à l'authentification
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
