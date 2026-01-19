/**
 * Index du module utilisateur
 * Exporte toutes les classes relatives aux utilisateurs
 */

module.exports = {
  Utilisateur: require('./Utilisateur'),
  Etudiant: require('./Specialisations').Etudiant,
  Enseignant: require('./Specialisations').Enseignant,
  FabriqueUtilisateur: require('./Fabrique').FabriqueUtilisateur,
  TypeUtilisateur: require('./Fabrique').TypeUtilisateur
};
