const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  try {
    // Récupérer le token depuis le cookie d'autorisation
    const token = request.cookies.authorization;

    // Vérifier que le token correspond à l'origine supposée et n'a pas expiré
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    if (decodedToken.exp < Date.now() / 1000) {
      // Supprimer le cookie d'autorisation
      response.clearCookie("authorization");
      throw new Error("Token expired");
    }

    // Stocker le token dans le cookie pour les requêtes ultérieures
    response.cookie("authorization", token, { httpOnly: true });

    // Stocker l'ID de l'utilisateur dans l'objet de requête pour une utilisation ultérieure
    request.userId = decodedToken.userId;

    // Passer la fonctionnalité aux endpoints suivants
    next();
  } catch (error) {
    // Gérer les erreurs liées à l'authentification
    response.status(401).json({
      error: error.message || "Invalid request!",
    });
  }
};
