/**
 * Point d'entrée du code source
 * Centralise les exports des sous-modules et utilitaires
 */

// Sous-systèmes
const utilisateur = require('./utilisateur');
const livre = require('./livre');
const emprunt = require('./emprunt');

// Services transverses
const Notifications = require('./Notifications');
const SystemeBibliotheque = require('./SystemeBibliotheque');

module.exports = {
  ...utilisateur,
  ...livre,
  ...emprunt,
  Notifications,
  SystemeBibliotheque
};
