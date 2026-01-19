/**
 * Système principal de gestion de bibliothèque.
 * Implémente le Design Pattern Singleton pour assurer une instance unique.
 */
const { FabriqueUtilisateur } = require('./utilisateur/Fabrique');
const { Etudiant, Enseignant } = require('./utilisateur/Specialisations');
const Livre = require('./livre/Livre');
const TransactionEmprunt = require('./emprunt/TransactionEmprunt');
const { GestionnaireNotifications, ObservateurUtilisateur } = require('./Notifications');

/**
 * Classe Singleton représentant le système principal de la bibliothèque.
 * Assure qu'il n'existe qu'une seule instance du système.
 */
class SystemeBibliotheque {
  /**
   * Obtient ou crée l'instance unique du système.
   * @returns {SystemeBibliotheque} Instance unique
   */
  static obtenirInstance() {
    if (!SystemeBibliotheque._instance) {
      SystemeBibliotheque._instance = new SystemeBibliotheque();
    }
    return SystemeBibliotheque._instance;
  }

  constructor() {
    if (SystemeBibliotheque._initialise) {
      return;
    }

    this._utilisateurs = new Map();
    this._livres = new Map();
    this._emprunts = new Map();
    this._gestionnaireNotifications = new GestionnaireNotifications();
    this._fabriqueUtilisateur = FabriqueUtilisateur;

    SystemeBibliotheque._initialise = true;
  }

  // ==================== GESTION DES UTILISATEURS ====================

  /**
   * Ajoute un nouvel étudiant au système.
   */
  ajouterEtudiant(identifiant, nom, email, telephone, numeroMatricule, specialite) {
    if (this._utilisateurs.has(identifiant)) {
      console.log(`❌ Un utilisateur avec l'ID ${identifiant} existe déjà.`);
      return false;
    }

    const etudiant = FabriqueUtilisateur.creerEtudiant(
      identifiant,
      nom,
      email,
      telephone,
      numeroMatricule,
      specialite
    );
    this._utilisateurs.set(identifiant, etudiant);

    const observateur = new ObservateurUtilisateur(identifiant, email);
    this._gestionnaireNotifications.abonner(observateur);

    console.log(`✅ Étudiant ${nom} (ID: ${identifiant}) ajouté avec succès.`);
    return true;
  }

  /**
   * Ajoute un nouvel enseignant au système.
   */
  ajouterEnseignant(identifiant, nom, email, telephone, numeroEmploye, departement) {
    if (this._utilisateurs.has(identifiant)) {
      console.log(`❌ Un utilisateur avec l'ID ${identifiant} existe déjà.`);
      return false;
    }

    const enseignant = FabriqueUtilisateur.creerEnseignant(
      identifiant,
      nom,
      email,
      telephone,
      numeroEmploye,
      departement
    );
    this._utilisateurs.set(identifiant, enseignant);

    const observateur = new ObservateurUtilisateur(identifiant, email);
    this._gestionnaireNotifications.abonner(observateur);

    console.log(`✅ Enseignant ${nom} (ID: ${identifiant}) ajouté avec succès.`);
    return true;
  }

  /**
   * Récupère un utilisateur par son identifiant.
   */
  obtenirUtilisateur(identifiant) {
    return this._utilisateurs.get(identifiant) || null;
  }

  /**
   * Retourne la liste de tous les utilisateurs.
   */
  listerUtilisateurs() {
    return Array.from(this._utilisateurs.values());
  }

  // ==================== GESTION DES LIVRES ====================

  /**
   * Ajoute un nouveau livre au système.
   */
  ajouterLivre(isbn, titre, auteur, editeur, annePublication, nombreCopies = 1) {
    if (this._livres.has(isbn)) {
      console.log(`⚠️  Le livre avec l'ISBN ${isbn} existe déjà.`);
      return false;
    }

    const livre = new Livre(isbn, titre, auteur, editeur, annePublication, nombreCopies);
    this._livres.set(isbn, livre);
    console.log(`✅ Livre '${titre}' (${nombreCopies} copie(s)) ajouté avec succès.`);
    return true;
  }

  /**
   * Augmente le nombre de copies d'un livre existant.
   */
  augmenterCopies(isbn, nombreCopies) {
    const livre = this._livres.get(isbn);
    if (!livre) {
      console.log(`❌ Livre avec ISBN ${isbn} non trouvé.`);
      return false;
    }

    for (let i = 0; i < nombreCopies; i++) {
      livre._nombreCopiesDisponibles++;
      livre._nombreCopiesTotal++;
    }

    console.log(`✅ ${nombreCopies} copie(s) ajoutée(s) pour '${livre.titre}'.`);
    return true;
  }

  /**
   * Récupère un livre par son ISBN.
   */
  obtenirLivre(isbn) {
    return this._livres.get(isbn) || null;
  }

  /**
   * Recherche des livres selon un critère.
   */
  rechercherLivres(critere, valeur) {
    const resultats = [];
    const valeurLower = valeur.toLowerCase();

    for (const livre of this._livres.values()) {
      if (
        (critere.toLowerCase() === 'titre' && livre.titre.toLowerCase().includes(valeurLower)) ||
        (critere.toLowerCase() === 'auteur' && livre.auteur.toLowerCase().includes(valeurLower)) ||
        (critere.toLowerCase() === 'isbn' && livre.isbn.toLowerCase().includes(valeurLower))
      ) {
        resultats.push(livre);
      }
    }

    return resultats;
  }

  /**
   * Retourne la liste de tous les livres.
   */
  listerLivres(afficherDisponibles = false) {
    const livres = Array.from(this._livres.values());
    if (afficherDisponibles) {
      return livres.filter((l) => l.estDisponible);
    }
    return livres;
  }

  // ==================== GESTION DES EMPRUNTS ====================

  /**
   * Effectue un emprunt de livre par un utilisateur.
   */
  emprunterLivre(identifiantUtilisateur, isbn) {
    const utilisateur = this._utilisateurs.get(identifiantUtilisateur);
    if (!utilisateur) {
      console.log(`❌ Utilisateur ${identifiantUtilisateur} non trouvé.`);
      return null;
    }

    const livre = this._livres.get(isbn);
    if (!livre) {
      console.log(`❌ Livre avec ISBN ${isbn} non trouvé.`);
      return null;
    }

    if (!livre.estDisponible) {
      console.log(`❌ Le livre '${livre.titre}' n'est pas disponible.`);
      return null;
    }

    if (utilisateur.empruntsActuels.length >= utilisateur.obtenirNombreMaxLivres()) {
      console.log(
        `❌ ${utilisateur.nom} a atteint le nombre maximum d'emprunts (${utilisateur.obtenirNombreMaxLivres()}).`
      );
      return null;
    }

    const dureeMaxEmprunt = utilisateur.obtenirDureeMaxEmprunt();
    const transaction = new TransactionEmprunt(
      identifiantUtilisateur,
      livre.titre,
      isbn,
      dureeMaxEmprunt
    );

    livre.emprunter();
    this._emprunts.set(transaction.identifiantTransaction, transaction);
    utilisateur.ajouterEmprunt(transaction.identifiantTransaction);

    const dateRetourFormatee = transaction.dateRetourPrevue.toLocaleDateString('fr-FR');
    console.log(
      `✅ Emprunt réussi: ${utilisateur.nom} emprunte '${livre.titre}' jusqu'au ${dateRetourFormatee}`
    );
    return transaction.identifiantTransaction;
  }

  /**
   * Effectue le retour d'un livre emprunté.
   */
  retournerLivre(identifiantTransaction) {
    const transaction = this._emprunts.get(identifiantTransaction);
    if (!transaction) {
      console.log(`❌ Transaction ${identifiantTransaction} non trouvée.`);
      return false;
    }

    if (transaction.estRetournee) {
      console.log(`❌ Le livre a déjà été retourné.`);
      return false;
    }

    const livre = this._livres.get(transaction.isbn);
    if (!livre) {
      console.log(`❌ Livre avec ISBN ${transaction.isbn} non trouvé.`);
      return false;
    }

    transaction.retournerLivre();
    livre.retourner();

    const utilisateur = this._utilisateurs.get(transaction.identifiantUtilisateur);
    if (utilisateur) {
      utilisateur.supprimerEmprunt(identifiantTransaction);
    }

    if (transaction.obtenirJoursDeRetard() > 0) {
      console.log(`⚠️  Le livre a été retourné avec ${transaction.obtenirJoursDeRetard()} jour(s) de retard.`);
    } else {
      console.log(`✅ Livre '${transaction.nomLivre}' retourné avec succès.`);
    }

    return true;
  }

  /**
   * Récupère une transaction d'emprunt.
   */
  obtenirTransaction(identifiantTransaction) {
    return this._emprunts.get(identifiantTransaction) || null;
  }

  /**
   * Vérifie tous les emprunts en retard et envoie les notifications.
   */
  verifierRetards() {
    const empruntsEnRetard = [];

    for (const transaction of this._emprunts.values()) {
      if (transaction.estEnRetard() && !transaction.estRetournee) {
        const joursDeRetard = transaction.obtenirJoursDeRetard();
        empruntsEnRetard.push(transaction);

        this._gestionnaireNotifications.notifierRetard(
          transaction.identifiantUtilisateur,
          transaction.nomLivre,
          joursDeRetard
        );
      }
    }

    return empruntsEnRetard;
  }

  /**
   * Envoie des rappels pour les livres à rendre bientôt.
   */
  envoyerRappels() {
    for (const transaction of this._emprunts.values()) {
      if (!transaction.estRetournee) {
        const joursRestants = transaction.obtenirJoursRestants();
        if (joursRestants >= 1 && joursRestants <= 3) {
          this._gestionnaireNotifications.notifierRappel(
            transaction.identifiantUtilisateur,
            transaction.nomLivre,
            joursRestants
          );
        }
      }
    }
  }

  /**
   * Retourne la liste des emprunts actifs.
   */
  listerEmpruntsActifs(identifiantUtilisateur = null) {
    let emprunts = Array.from(this._emprunts.values()).filter((t) => !t.estRetournee);

    if (identifiantUtilisateur) {
      emprunts = emprunts.filter((t) => t.identifiantUtilisateur === identifiantUtilisateur);
    }

    return emprunts;
  }

  // ==================== RAPPORTS ET STATISTIQUES ====================

  /**
   * Retourne les statistiques du système.
   */
  obtenirStatistiques() {
    const totalEtudiants = Array.from(this._utilisateurs.values()).filter((u) => u instanceof Etudiant).length;
    const totalEnseignants = Array.from(this._utilisateurs.values()).filter((u) => u instanceof Enseignant).length;
    const totalLivres = Array.from(this._livres.values()).reduce((sum, l) => sum + l.nombreCopiesTotal, 0);
    const livresDisponibles = Array.from(this._livres.values()).reduce((sum, l) => sum + l.nombreCopiesDisponibles, 0);
    const empruntsActifs = this.listerEmpruntsActifs().length;
    const empruntsEnRetard = this.verifierRetards().length;

    return {
      total_utilisateurs: this._utilisateurs.size,
      etudiants: totalEtudiants,
      enseignants: totalEnseignants,
      total_livres: totalLivres,
      livres_disponibles: livresDisponibles,
      livres_emprunt: totalLivres - livresDisponibles,
      emprunts_actifs: empruntsActifs,
      emprunts_en_retard: empruntsEnRetard
    };
  }

  /**
   * Affiche un rapport complet du système.
   */
  afficherRapportComplet() {
    const stats = this.obtenirStatistiques();
    console.log('\n' + '='.repeat(60));
    console.log('📊 RAPPORT COMPLET DU SYSTÈME DE GESTION DE BIBLIOTHÈQUE');
    console.log('='.repeat(60));
    console.log(`Total d'utilisateurs: ${stats.total_utilisateurs}`);
    console.log(`  - Étudiants: ${stats.etudiants}`);
    console.log(`  - Enseignants: ${stats.enseignants}`);
    console.log(`\nGestion des livres:`);
    console.log(`  - Total de livres: ${stats.total_livres} copies`);
    console.log(`  - Disponibles: ${stats.livres_disponibles}`);
    console.log(`  - En emprunt: ${stats.livres_emprunt}`);
    console.log(`\nGestion des emprunts:`);
    console.log(`  - Emprunts actifs: ${stats.emprunts_actifs}`);
    console.log(`  - En retard: ${stats.emprunts_en_retard}`);
    console.log('='.repeat(60) + '\n');
  }

  toString() {
    return `SystemeBibliotheque(utilisateurs=${this._utilisateurs.size}, livres=${this._livres.size}, emprunts=${this._emprunts.size})`;
  }
}

// Initialisation du Singleton
SystemeBibliotheque._instance = null;
SystemeBibliotheque._initialise = false;

module.exports = SystemeBibliotheque;
