module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // Chemin vers les fichiers de test
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Configurer des alias pour les chemins
  },
};
