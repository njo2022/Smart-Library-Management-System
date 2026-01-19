/**
 * Module pour la gestion des livres de la bibliothèque.
 */

/**
 * Classe représentant un livre dans la bibliothèque.
 * Encapsule les informations et l'état d'un livre.
 */
class Livre {
  /**
   * Initialise un livre avec ses informations bibliographiques.
   * @param {string} isbn - Identifiant unique ISBN
   * @param {string} titre - Titre du livre
   * @param {string} auteur - Nom de l'auteur principal
   * @param {string} editeur - Maison d'édition
   * @param {number} annePublication - Année de publication
   * @param {number} nombreCopies - Nombre de copies (défaut: 1)
   */
  constructor(isbn, titre, auteur, editeur, annePublication, nombreCopies = 1) {
    this._isbn = isbn;
    this._titre = titre;
    this._auteur = auteur;
    this._editeur = editeur;
    this._annePublication = annePublication;
    this._nombreCopiesDisponibles = nombreCopies;
    this._nombreCopiesTotal = nombreCopies;
    this._dateAjout = new Date();
  }

  // Propriétés (getters)
  get isbn() {
    return this._isbn;
  }

  get titre() {
    return this._titre;
  }

  get auteur() {
    return this._auteur;
  }

  get editeur() {
    return this._editeur;
  }

  get annePublication() {
    return this._annePublication;
  }

  get nombreCopiesDisponibles() {
    return this._nombreCopiesDisponibles;
  }

  get nombreCopiesTotal() {
    return this._nombreCopiesTotal;
  }

  get estDisponible() {
    return this._nombreCopiesDisponibles > 0;
  }

  get dateAjout() {
    return this._dateAjout;
  }

  /**
   * Marque une copie du livre comme empruntée.
   * @returns {boolean} True si succès
   */
  emprunter() {
    if (this._nombreCopiesDisponibles > 0) {
      this._nombreCopiesDisponibles--;
      return true;
    }
    return false;
  }

  /**
   * Marque une copie du livre comme retournée.
   * @returns {boolean} True si succès
   */
  retourner() {
    if (this._nombreCopiesDisponibles < this._nombreCopiesTotal) {
      this._nombreCopiesDisponibles++;
      return true;
    }
    return false;
  }

  /**
   * Retourne le taux de disponibilité du livre (0.0 à 1.0).
   * @returns {number} Pourcentage de copies disponibles
   */
  obtenirTauxDisponibilite() {
    if (this._nombreCopiesTotal === 0) {
      return 0.0;
    }
    return this._nombreCopiesDisponibles / this._nombreCopiesTotal;
  }

  toString() {
    return `Livre(isbn=${this._isbn}, titre='${this._titre}', auteur='${this._auteur}', disponible=${this.estDisponible})`;
  }
}

module.exports = Livre;
