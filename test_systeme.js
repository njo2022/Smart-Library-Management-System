/**
 * Suite de tests pour le Système de Gestion de Bibliothèque.
 * Valide le fonctionnement des Design Patterns et des fonctionnalités principales.
 */

const SystemeBibliotheque = require('./src/SystemeBibliotheque');
const FabriqueUtilisateur = require('./src/utilisateur/Fabrique').FabriqueUtilisateur;
const TypeUtilisateur = require('./src/utilisateur/Fabrique').TypeUtilisateur;
const { Observateur, ObservateurUtilisateur, GestionnaireNotifications } = require('./src/Notifications');

let testsReussis = 0;
let testsEchoues = 0;

/**
 * Fonction utilitaire pour afficher les résultats des tests
 */
function assert(condition, message) {
  if (condition) {
    console.log(`   ✅ ${message}`);
    testsReussis++;
  } else {
    console.log(`   ❌ ${message}`);
    testsEchoues++;
  }
}

console.log('\n' + '='.repeat(70));
console.log('🧪 SUITE DE TESTS - SYSTÈME DE GESTION DE BIBLIOTHÈQUE');
console.log('='.repeat(70) + '\n');

// ==================== TEST 1: PATTERN SINGLETON ====================
console.log('TEST 1: Pattern Singleton');
console.log('-'.repeat(70));
{
  const systeme1 = SystemeBibliotheque.obtenirInstance();
  const systeme2 = SystemeBibliotheque.obtenirInstance();
  
  assert(systeme1 === systeme2, 'Deux appels à obtenirInstance() retournent la même instance');
  assert(systeme1 !== null, 'L\'instance du système n\'est pas null');
  assert(typeof systeme1 === 'object', 'L\'instance est un objet');
}
console.log();

// ==================== TEST 2: PATTERN FACTORY ====================
console.log('TEST 2: Pattern Factory');
console.log('-'.repeat(70));
{
  // Test avec la fabrique
  const etudiant = FabriqueUtilisateur.creerEtudiant(
    'ETU999',
    'Jean Test',
    'jean@test.fr',
    '06 00 00 00 00',
    '12345678',
    'Informatique'
  );
  
  assert(etudiant !== null, 'FabriqueUtilisateur crée un étudiant');
  assert(etudiant.identifiant === 'ETU999', 'L\'étudiant a le bon identifiant');
  assert(etudiant.nom === 'Jean Test', 'L\'étudiant a le bon nom');
  assert(etudiant.obtenirDureeMaxEmprunt() === 14, 'La durée max pour étudiant est 14 jours');
  assert(etudiant.obtenirNombreMaxLivres() === 5, 'Le nombre max pour étudiant est 5 livres');

  const enseignant = FabriqueUtilisateur.creerEnseignant(
    'PROF999',
    'Marie Test',
    'marie@test.fr',
    '06 11 11 11 11',
    'EMP99999',
    'Mathématiques'
  );

  assert(enseignant !== null, 'FabriqueUtilisateur crée un enseignant');
  assert(enseignant.identifiant === 'PROF999', 'L\'enseignant a le bon identifiant');
  assert(enseignant.obtenirDureeMaxEmprunt() === 28, 'La durée max pour enseignant est 28 jours');
  assert(enseignant.obtenirNombreMaxLivres() === 10, 'Le nombre max pour enseignant est 10 livres');
}
console.log();

// ==================== TEST 3: GESTION DES UTILISATEURS ====================
console.log('TEST 3: Gestion des Utilisateurs');
console.log('-'.repeat(70));
{
  const systeme = SystemeBibliotheque.obtenirInstance();

  // Ajoute des utilisateurs
  systeme.ajouterEtudiant('ETU100', 'Alice Test', 'alice@test.fr', '06 10 10 10 10', 'MAT100', 'Informatique');
  systeme.ajouterEnseignant('PROF100', 'Bob Test', 'bob@test.fr', '06 20 20 20 20', 'EMP100', 'Physique');

  const utilisateurs = systeme.listerUtilisateurs();
  assert(utilisateurs.length >= 2, 'Le système contient au moins 2 utilisateurs');

  const utilisateur = systeme.obtenirUtilisateur('ETU100');
  assert(utilisateur !== null, 'obtenirUtilisateur() retourne un utilisateur existant');
  assert(utilisateur.nom === 'Alice Test', 'L\'utilisateur récupéré a le bon nom');

  const utilisateurInexistant = systeme.obtenirUtilisateur('INEXISTANT');
  assert(utilisateurInexistant === null, 'obtenirUtilisateur() retourne null pour un utilisateur inexistant');
}
console.log();

// ==================== TEST 4: GESTION DES LIVRES ====================
console.log('TEST 4: Gestion des Livres');
console.log('-'.repeat(70));
{
  const systeme = SystemeBibliotheque.obtenirInstance();

  // Ajoute des livres
  systeme.ajouterLivre('ISBN100', 'Livre Test 1', 'Auteur Test', 'Éditeur Test', 2023, 3);
  systeme.ajouterLivre('ISBN101', 'Livre Test 2', 'Auteur Test 2', 'Éditeur Test 2', 2023, 2);

  const livres = systeme.listerLivres();
  assert(livres.length >= 2, 'Le système contient au moins 2 livres');

  const livre = systeme.obtenirLivre('ISBN100');
  assert(livre !== null, 'obtenirLivre() retourne un livre existant');
  assert(livre.titre === 'Livre Test 1', 'Le livre récupéré a le bon titre');
  assert(livre.nombreCopiesTotal === 3, 'Le livre a le bon nombre de copies');

  const livreInexistant = systeme.obtenirLivre('INEXISTANT');
  assert(livreInexistant === null, 'obtenirLivre() retourne null pour un livre inexistant');

  // Test augmentation de copies
  systeme.augmenterCopies('ISBN100', 2);
  const livreAugmente = systeme.obtenirLivre('ISBN100');
  assert(livreAugmente.nombreCopiesTotal === 5, 'Le nombre de copies est augmenté correctement');
}
console.log();

// ==================== TEST 5: EMPRUNTS ET RETOURS ====================
console.log('TEST 5: Emprunts et Retours');
console.log('-'.repeat(70));
{
  const systeme = SystemeBibliotheque.obtenirInstance();

  // Ajoute un étudiant et un livre pour le test
  systeme.ajouterEtudiant('ETU101', 'Charlie Test', 'charlie@test.fr', '06 30 30 30 30', 'MAT101', 'Littérature');
  systeme.ajouterLivre('ISBN102', 'Livre Test 3', 'Auteur Test 3', 'Éditeur Test 3', 2023, 2);

  // Effectue un emprunt
  const transactionId = systeme.emprunterLivre('ETU101', 'ISBN102');
  assert(transactionId !== null, 'emprunterLivre() retourne un ID de transaction');

  const transaction = systeme.obtenirTransaction(transactionId);
  assert(transaction !== null, 'obtenirTransaction() retourne la transaction créée');
  assert(transaction.identifiantUtilisateur === 'ETU101', 'La transaction a le bon utilisateur');
  assert(transaction.isbn === 'ISBN102', 'La transaction a le bon ISBN');
  assert(!transaction.estRetournee, 'La transaction n\'est pas retournée initialement');

  // Vérifie que le livre n\'est plus disponible
  const livreEmprute = systeme.obtenirLivre('ISBN102');
  assert(livreEmprute.nombreCopiesDisponibles < livreEmprute.nombreCopiesTotal, 'Le nombre de copies disponibles diminue après emprunt');

  // Effectue le retour
  systeme.retournerLivre(transactionId);
  const transactionRetournee = systeme.obtenirTransaction(transactionId);
  assert(transactionRetournee.estRetournee, 'La transaction est marquée comme retournée');

  // Vérifie que le livre est de nouveau disponible
  const livreRetourne = systeme.obtenirLivre('ISBN102');
  assert(livreRetourne.nombreCopiesDisponibles === livreRetourne.nombreCopiesTotal, 'Le nombre de copies disponibles est restauré après retour');
}
console.log();

// ==================== TEST 6: PATTERN OBSERVER (NOTIFICATIONS) ====================
console.log('TEST 6: Pattern Observer (Notifications)');
console.log('-'.repeat(70));
{
  const Observateur = require('./src/Notifications').Observateur;
  const ObservateurUtilisateur = require('./src/Notifications').ObservateurUtilisateur;

  const gestionnaire = new GestionnaireNotifications();

  // Crée un observateur utilisateur
  const observateur = new ObservateurUtilisateur('UTL001', 'test@test.fr');

  // Abonne l'observateur
  gestionnaire.abonner(observateur);
  const historique1 = gestionnaire.obtenirHistorique();
  assert(historique1 !== null, 'Le gestionnaire maintient un historique');

  // Envoie une notification de retard
  gestionnaire.notifierRetard('UTL001', 'Livre Test', 5);
  const historique2 = gestionnaire.obtenirHistorique();
  assert(historique2.length > historique1.length, 'Le gestionnaire enregistre les notifications');

  // Envoie un rappel
  gestionnaire.notifierRappel('UTL001', 'Livre Test', 3);
  const historique3 = gestionnaire.obtenirHistorique();
  assert(historique3.length > historique2.length, 'Le gestionnaire enregistre les rappels');

  // Vérifie que l'observateur a reçu les notifications
  const notifications = observateur.notifications;
  assert(notifications.length > 0, 'L\'observateur reçoit les notifications');

  // Désabonne l'observateur
  gestionnaire.desabonner(observateur);
}
console.log();

// ==================== TEST 7: PERMISSIONS ET LIMITES ====================
console.log('TEST 7: Permissions et Limites');
console.log('-'.repeat(70));
{
  const systeme = SystemeBibliotheque.obtenirInstance();

  // Ajoute un étudiant
  systeme.ajouterEtudiant('ETU102', 'Diana Test', 'diana@test.fr', '06 40 40 40 40', 'MAT102', 'Sciences');

  // Crée 5 livres pour dépasser la limite d'étudiant
  for (let i = 0; i < 5; i++) {
    systeme.ajouterLivre(`ISBN200${i}`, `Livre ${i}`, 'Auteur', 'Éditeur', 2023, 5);
  }

  // Essaie de faire 5 emprunts (limite maximum pour étudiant)
  let empruntsSucces = 0;
  for (let i = 0; i < 5; i++) {
    const result = systeme.emprunterLivre('ETU102', `ISBN200${i}`);
    if (result !== null) {
      empruntsSucces++;
    }
  }

  assert(empruntsSucces === 5, 'L\'étudiant peut emprunter jusqu\'à 5 livres');

  // Essaie de faire un 6ème emprunt (dépasse la limite)
  const sixiemeEmprunt = systeme.emprunterLivre('ETU102', 'ISBN102');
  assert(sixiemeEmprunt === null, 'L\'étudiant ne peut pas emprunter plus de 5 livres');
}
console.log();

// ==================== TEST 8: CALCULS DE DATES ====================
console.log('TEST 8: Calculs de Dates');
console.log('-'.repeat(70));
{
  const systeme = SystemeBibliotheque.obtenirInstance();

  // Ajoute un utilisateur et un livre
  systeme.ajouterEtudiant('ETU103', 'Eve Test', 'eve@test.fr', '06 50 50 50 50', 'MAT103', 'Histoire');
  systeme.ajouterLivre('ISBN300', 'Livre Test 4', 'Auteur', 'Éditeur', 2023, 2);

  // Effectue un emprunt
  const transactionId = systeme.emprunterLivre('ETU103', 'ISBN300');
  const transaction = systeme.obtenirTransaction(transactionId);

  // Vérifie les dates
  assert(transaction.dateEmprunt !== null, 'La date d\'emprunt est enregistrée');
  assert(transaction.dateRetourPrevue !== null, 'La date de retour prévue est enregistrée');
  assert(!transaction.estEnRetard(), 'L\'emprunt n\'est pas en retard au moment de la création');

  const joursRestants = transaction.obtenirJoursRestants();
  assert(joursRestants > 0, 'Il y a des jours restants avant la date limite');
  assert(joursRestants <= 14, 'Le nombre de jours restants correspond à la durée d\'emprunt étudiant');

  const dureeEmprunt = transaction.obtenirDureeEmprunt();
  assert(dureeEmprunt >= 0, 'La durée écoulée de l\'emprunt est positive');
  assert(dureeEmprunt <= 14, 'La durée écoulée ne dépasse pas la limite d\'emprunt');
}
console.log();

// ==================== RÉSUMÉ ====================
console.log('='.repeat(70));
console.log('📊 RÉSUMÉ DES TESTS');
console.log('='.repeat(70));
console.log(`✅ Tests réussis: ${testsReussis}`);
console.log(`❌ Tests échoués: ${testsEchoues}`);
console.log(`📈 Total: ${testsReussis + testsEchoues}`);
console.log(`🎯 Taux de réussite: ${Math.round((testsReussis / (testsReussis + testsEchoues)) * 100)}%`);
console.log('='.repeat(70) + '\n');

// Affiche un message de succès ou d'erreur
if (testsEchoues === 0) {
  console.log('🎉 TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS!');
} else {
  console.log(`⚠️  ${testsEchoues} test(s) ont échoué.`);
  process.exit(1);
}

console.log();
