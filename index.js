/**
 * Fichier d'index principal du Système de Gestion de Bibliothèque
 * Exporte les classes principales pour faciliter l'importation
 */

module.exports = {
  // Classe principale
  SystemeBibliotheque: require('./src/SystemeBibliotheque'),

  // Classes d'utilisateurs
  Utilisateur: require('./src/utilisateur/Utilisateur'),
  Specialisations: require('./src/utilisateur/Specialisations'),
  Fabrique: require('./src/utilisateur/Fabrique'),

  // Classe Livre
  Livre: require('./src/livre/Livre'),

  // Classes d'emprunt et transactions
  TransactionEmprunt: require('./src/emprunt/TransactionEmprunt'),

  // Classes de notifications (Pattern Observer)
  Notifications: require('./src/Notifications'),

  // Version du package
  version: '1.0.0'
};
