/**
 * Spécialisations de la classe Utilisateur.
 * Contient les classes Etudiant et Enseignant.
 */
const Utilisateur = require('./Utilisateur');

/**
 * Classe représentant un étudiant de la bibliothèque.
 * Hérite de Utilisateur et applique les règles spécifiques aux étudiants.
 */
class Etudiant extends Utilisateur {
  static DUREE_MAX_EMPRUNT = 14; // 2 semaines
  static NOMBRE_MAX_LIVRES = 5;

  /**
   * Initialise un étudiant avec ses informations spécifiques.
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   * @param {string} numeroMatricule - Numéro d'étudiant unique
   * @param {string} specialite - Spécialité ou domaine d'études
   */
  constructor(identifiant, nom, email, telephone, numeroMatricule, specialite) {
    super(identifiant, nom, email, telephone);
    this._numeroMatricule = numeroMatricule;
    this._specialite = specialite;
  }

  get numeroMatricule() {
    return this._numeroMatricule;
  }

  get specialite() {
    return this._specialite;
  }

  obtenirDureeMaxEmprunt() {
    return Etudiant.DUREE_MAX_EMPRUNT;
  }

  obtenirNombreMaxLivres() {
    return Etudiant.NOMBRE_MAX_LIVRES;
  }

  toString() {
    return `Etudiant(id=${this._identifiant}, nom=${this._nom}, matricule=${this._numeroMatricule}, specialite=${this._specialite})`;
  }
}

/**
 * Classe représentant un enseignant de la bibliothèque.
 * Hérite de Utilisateur et applique les règles spécifiques aux enseignants.
 */
class Enseignant extends Utilisateur {
  static DUREE_MAX_EMPRUNT = 28; // 4 semaines
  static NOMBRE_MAX_LIVRES = 10;

  /**
   * Initialise un enseignant avec ses informations spécifiques.
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   * @param {string} numeroEmploye - Numéro d'employé unique
   * @param {string} departement - Département d'affiliation
   */
  constructor(identifiant, nom, email, telephone, numeroEmploye, departement) {
    super(identifiant, nom, email, telephone);
    this._numeroEmploye = numeroEmploye;
    this._departement = departement;
  }

  get numeroEmploye() {
    return this._numeroEmploye;
  }

  get departement() {
    return this._departement;
  }

  obtenirDureeMaxEmprunt() {
    return Enseignant.DUREE_MAX_EMPRUNT;
  }

  obtenirNombreMaxLivres() {
    return Enseignant.NOMBRE_MAX_LIVRES;
  }

  toString() {
    return `Enseignant(id=${this._identifiant}, nom=${this._nom}, employe=${this._numeroEmploye}, departement=${this._departement})`;
  }
}

module.exports = { Etudiant, Enseignant };
