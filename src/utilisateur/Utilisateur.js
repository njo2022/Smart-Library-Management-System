/**
 * Classe abstraite représentant un utilisateur de la bibliothèque.
 * Encapsule les données communes à tous les utilisateurs.
 */
class Utilisateur {
  /**
   * Initialise un utilisateur avec les informations de base.
   * @param {string} identifiant - Identifiant unique
   * @param {string} nom - Nom complet
   * @param {string} email - Adresse email
   * @param {string} telephone - Numéro de téléphone
   */
  constructor(identifiant, nom, email, telephone) {
    this._identifiant = identifiant;
    this._nom = nom;
    this._email = email;
    this._telephone = telephone;
    this._dateInscription = new Date();
    this._empruntsActuels = [];
  }

  // Propriétés (getters)
  get identifiant() {
    return this._identifiant;
  }

  get nom() {
    return this._nom;
  }

  get email() {
    return this._email;
  }

  get telephone() {
    return this._telephone;
  }

  get dateInscription() {
    return this._dateInscription;
  }

  get empruntsActuels() {
    return [...this._empruntsActuels]; // Copie pour éviter les modifications externes
  }

  /**
   * Ajoute un emprunt à la liste des emprunts actuels.
   * @param {string} identifiantEmprunt - Identifiant de la transaction
   */
  ajouterEmprunt(identifiantEmprunt) {
    if (!this._empruntsActuels.includes(identifiantEmprunt)) {
      this._empruntsActuels.push(identifiantEmprunt);
    }
  }

  /**
   * Supprime un emprunt de la liste des emprunts actuels.
   * @param {string} identifiantEmprunt - Identifiant de la transaction
   */
  supprimerEmprunt(identifiantEmprunt) {
    const index = this._empruntsActuels.indexOf(identifiantEmprunt);
    if (index > -1) {
      this._empruntsActuels.splice(index, 1);
    }
  }

  /**
   * Retourne la durée maximale d'emprunt en jours.
   * À implémenter par les sous-classes.
   * @abstract
   * @returns {number} Nombre de jours
   */
  obtenirDureeMaxEmprunt() {
    throw new Error('obtenirDureeMaxEmprunt() doit être implémenté');
  }

  /**
   * Retourne le nombre maximum de livres empruntables.
   * À implémenter par les sous-classes.
   * @abstract
   * @returns {number} Nombre maximum
   */
  obtenirNombreMaxLivres() {
    throw new Error('obtenirNombreMaxLivres() doit être implémenté');
  }

  toString() {
    return `${this.constructor.name}(id=${this._identifiant}, nom=${this._nom}, email=${this._email})`;
  }
}

module.exports = Utilisateur;
