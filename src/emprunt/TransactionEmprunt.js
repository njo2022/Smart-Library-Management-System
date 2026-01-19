/**
 * Module pour la gestion des transactions d'emprunt.
 * Gère la liaison entre utilisateurs, livres et dates d'emprunt.
 */

/**
 * Représente une transaction d'emprunt.
 * Encapsule la relation entre un utilisateur, un livre et les dates.
 */
class TransactionEmprunt {
  // Compteur statique pour générer des IDs uniques
  static _compteur = 0;

  /**
   * Initialise une transaction d'emprunt.
   * @param {string} identifiantUtilisateur - Identifiant de l'utilisateur
   * @param {string} nomLivre - Titre du livre emprunté
   * @param {string} isbn - ISBN du livre
   * @param {number} dureeEmpruntJours - Durée maximale d'emprunt en jours
   */
  constructor(identifiantUtilisateur, nomLivre, isbn, dureeEmpruntJours) {
    TransactionEmprunt._compteur++;
    this._identifiantTransaction = `TRX${String(TransactionEmprunt._compteur).padStart(6, '0')}`;
    this._identifiantUtilisateur = identifiantUtilisateur;
    this._nomLivre = nomLivre;
    this._isbn = isbn;
    this._dateEmprunt = new Date();
    this._dateRetourPrevue = new Date(this._dateEmprunt.getTime() + dureeEmpruntJours * 24 * 60 * 60 * 1000);
    this._dateRetourEffective = null;
    this._estRetournee = false;
  }

  // Propriétés (getters)
  get identifiantTransaction() {
    return this._identifiantTransaction;
  }

  get identifiantUtilisateur() {
    return this._identifiantUtilisateur;
  }

  get nomLivre() {
    return this._nomLivre;
  }

  get isbn() {
    return this._isbn;
  }

  get dateEmprunt() {
    return this._dateEmprunt;
  }

  get dateRetourPrevue() {
    return this._dateRetourPrevue;
  }

  get dateRetourEffective() {
    return this._dateRetourEffective;
  }

  get estRetournee() {
    return this._estRetournee;
  }

  /**
   * Enregistre le retour du livre.
   * @returns {boolean} True si succès
   */
  retournerLivre() {
    if (!this._estRetournee) {
      this._dateRetourEffective = new Date();
      this._estRetournee = true;
      return true;
    }
    return false;
  }

  /**
   * Vérifie si l'emprunt est en retard.
   * @returns {boolean} True si en retard
   */
  estEnRetard() {
    if (this._estRetournee) {
      return false;
    }
    return new Date() > this._dateRetourPrevue;
  }

  /**
   * Calcule le nombre de jours de retard.
   * @returns {number} Nombre de jours (0 si pas en retard)
   */
  obtenirJoursDeRetard() {
    if (!this.estEnRetard()) {
      return 0;
    }
    const diff = new Date() - this._dateRetourPrevue;
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  /**
   * Calcule le nombre de jours avant le retour prévu.
   * @returns {number} Nombre de jours (négatif si en retard)
   */
  obtenirJoursRestants() {
    if (this._estRetournee) {
      return 0;
    }
    const diff = this._dateRetourPrevue - new Date();
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }

  /**
   * Retourne la durée totale de l'emprunt en jours.
   * @returns {number} Nombre de jours
   */
  obtenirDureeEmprunt() {
    const dateRef = this._estRetournee ? this._dateRetourEffective : new Date();
    const diff = dateRef - this._dateEmprunt;
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }

  toString() {
    const statut = this._estRetournee ? 'Retourné' : (this.estEnRetard() ? 'En retard' : 'En cours');
    return `TransactionEmprunt(id=${this._identifiantTransaction}, utilisateur=${this._identifiantUtilisateur}, livre='${this._nomLivre}', statut=${statut})`;
  }
}

module.exports = TransactionEmprunt;
