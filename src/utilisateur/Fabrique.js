/**
 * Factory Pattern pour la création des utilisateurs.
 * Fabrique centralisée pour créer les instances d'Etudiant et d'Enseignant.
 */
const { Etudiant, Enseignant } = require('./Specialisations');

/**
 * Énumération des types d'utilisateurs disponibles.
 */
const TypeUtilisateur = {
  ETUDIANT: 'etudiant',
  ENSEIGNANT: 'enseignant'
};

/**
 * Fabrique pour la création centralisée d'objets Utilisateur.
 * Implémente le Design Pattern Factory.
 */
class FabriqueUtilisateur {
  /**
   * Crée un utilisateur du type spécifié avec les paramètres fournis.
   * @param {string} typeUtilisateur - Type d'utilisateur à créer
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   * @param {object} options - Options supplémentaires
   * @returns {Utilisateur} Instance créée
   */
  static creerUtilisateur(typeUtilisateur, identifiant, nom, email, telephone, options = {}) {
    if (typeUtilisateur === TypeUtilisateur.ETUDIANT) {
      return new Etudiant(
        identifiant,
        nom,
        email,
        telephone,
        options.numeroMatricule,
        options.specialite
      );
    } else if (typeUtilisateur === TypeUtilisateur.ENSEIGNANT) {
      return new Enseignant(
        identifiant,
        nom,
        email,
        telephone,
        options.numeroEmploye,
        options.departement
      );
    } else {
      throw new Error(`Type d'utilisateur inconnu: ${typeUtilisateur}`);
    }
  }

  /**
   * Crée un étudiant avec les paramètres spécifiés.
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   * @param {string} numeroMatricule - Numéro de matricule
   * @param {string} specialite - Spécialité d'études
   * @returns {Etudiant} Instance d'étudiant
   */
  static creerEtudiant(identifiant, nom, email, telephone, numeroMatricule, specialite) {
    return this.creerUtilisateur(TypeUtilisateur.ETUDIANT, identifiant, nom, email, telephone, {
      numeroMatricule,
      specialite
    });
  }

  /**
   * Crée un enseignant avec les paramètres spécifiés.
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   * @param {string} numeroEmploye - Numéro d'employé
   * @param {string} departement - Département d'affiliation
   * @returns {Enseignant} Instance d'enseignant
   */
  static creerEnseignant(identifiant, nom, email, telephone, numeroEmploye, departement) {
    return this.creerUtilisateur(TypeUtilisateur.ENSEIGNANT, identifiant, nom, email, telephone, {
      numeroEmploye,
      departement
    });
  }
}

module.exports = { FabriqueUtilisateur, TypeUtilisateur };
