/**
 * Module de notifications pour le système d'emprunt.
 * Implémente le Design Pattern Observer pour notifier des retards.
 */

/**
 * Classe abstraite pour les observateurs.
 * Les observateurs reçoivent les notifications du sujet.
 */
class Observateur {
  /**
   * Reçoit une notification du sujet.
   * @abstract
   * @param {string} message - Message de notification
   */
  notifier(message) {
    throw new Error('notifier() doit être implémenté');
  }
}

/**
 * Implémentation d'un observateur pour les utilisateurs.
 * Notifie l'utilisateur des événements de retard.
 */
class ObservateurUtilisateur extends Observateur {
  /**
   * Initialise l'observateur utilisateur.
   * @param {string} identifiantUtilisateur - Identifiant de l'utilisateur
   * @param {string} email - Adresse email
   */
  constructor(identifiantUtilisateur, email) {
    super();
    this._identifiantUtilisateur = identifiantUtilisateur;
    this._email = email;
    this._notifications = [];
  }

  get identifiantUtilisateur() {
    return this._identifiantUtilisateur;
  }

  get email() {
    return this._email;
  }

  get notifications() {
    return [...this._notifications];
  }

  /**
   * Reçoit et enregistre une notification.
   * @param {string} message - Message de notification
   */
  notifier(message) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const notificationComplete = `[${now}] Email envoyé à ${this._email}: ${message}`;
    this._notifications.push(notificationComplete);
    console.log(`📧 NOTIFICATION: ${notificationComplete}`);
  }

  toString() {
    return `ObservateurUtilisateur(id=${this._identifiantUtilisateur}, email=${this._email})`;
  }
}

/**
 * Sujet dans le pattern Observer.
 * Gère la liste des observateurs et notifie les changements.
 */
class GestionnaireNotifications {
  constructor() {
    this._observateurs = [];
    this._historique = [];
  }

  /**
   * Enregistre un observateur auprès du gestionnaire.
   * @param {Observateur} observateur - Observateur à enregistrer
   */
  abonner(observateur) {
    if (!this._observateurs.includes(observateur)) {
      this._observateurs.push(observateur);
    }
  }

  /**
   * Retire un observateur du gestionnaire.
   * @param {Observateur} observateur - Observateur à retirer
   */
  desabonner(observateur) {
    const index = this._observateurs.indexOf(observateur);
    if (index > -1) {
      this._observateurs.splice(index, 1);
    }
  }

  /**
   * Notifie tous les observateurs d'un retard.
   * @param {string} identifiantUtilisateur - Identifiant de l'utilisateur
   * @param {string} nomLivre - Titre du livre
   * @param {number} joursDeRetard - Nombre de jours de retard
   */
  notifierRetard(identifiantUtilisateur, nomLivre, joursDeRetard) {
    const message = `RETARD DÉTECTÉ: L'utilisateur ${identifiantUtilisateur} a ${joursDeRetard} jour(s) de retard pour le livre '${nomLivre}'`;
    this._historique.push(message);

    for (const observateur of this._observateurs) {
      if (observateur instanceof ObservateurUtilisateur) {
        if (observateur.identifiantUtilisateur === identifiantUtilisateur) {
          observateur.notifier(
            `Vous avez ${joursDeRetard} jour(s) de retard pour le livre '${nomLivre}'. Veuillez le retourner dès que possible.`
          );
        }
      }
    }
  }

  /**
   * Envoie un rappel avant la date de retour.
   * @param {string} identifiantUtilisateur - Identifiant de l'utilisateur
   * @param {string} nomLivre - Titre du livre
   * @param {number} joursRestants - Jours avant la date de retour
   */
  notifierRappel(identifiantUtilisateur, nomLivre, joursRestants) {
    const message = `RAPPEL: L'utilisateur ${identifiantUtilisateur} doit retourner '${nomLivre}' dans ${joursRestants} jour(s)`;
    this._historique.push(message);

    for (const observateur of this._observateurs) {
      if (observateur instanceof ObservateurUtilisateur) {
        if (observateur.identifiantUtilisateur === identifiantUtilisateur) {
          observateur.notifier(
            `Rappel: Vous devez retourner le livre '${nomLivre}' dans ${joursRestants} jour(s).`
          );
        }
      }
    }
  }

  /**
   * Retourne l'historique de toutes les notifications.
   * @returns {Array} Liste des notifications envoyées
   */
  obtenirHistorique() {
    return [...this._historique];
  }

  toString() {
    return `GestionnaireNotifications(observateurs=${this._observateurs.length}, notifications=${this._historique.length})`;
  }
}

module.exports = { Observateur, ObservateurUtilisateur, GestionnaireNotifications };
