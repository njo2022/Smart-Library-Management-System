/**
 * Script de démonstration du Système de Gestion de Bibliothèque en JavaScript.
 * Présente les fonctionnalités principales avec des exemples pratiques.
 */

const SystemeBibliotheque = require('./src/SystemeBibliotheque');

function main() {
  console.log('\n' + '='.repeat(70));
  console.log('🏫 BIENVENUE DANS LE SYSTÈME DE GESTION DE BIBLIOTHÈQUE UNIVERSITAIRE');
  console.log('='.repeat(70) + '\n');

  // Obtient l'instance unique du système (Singleton)
  const systeme = SystemeBibliotheque.obtenirInstance();
  console.log(`✅ Système initialisé: ${systeme}\n`);

  // ==================== AJOUT D'UTILISATEURS ====================
  console.log('='.repeat(70));
  console.log('1️⃣  AJOUT D\'UTILISATEURS');
  console.log('='.repeat(70));

  systeme.ajouterEtudiant('ETU001', 'Alice Dupont', 'alice.dupont@univ.fr', '06 12 34 56 78', '21345678', 'Informatique');
  systeme.ajouterEtudiant('ETU002', 'Bob Martin', 'bob.martin@univ.fr', '06 23 45 67 89', '21445679', 'Mathématiques');
  systeme.ajouterEtudiant('ETU003', 'Clara Chen', 'clara.chen@univ.fr', '06 34 56 78 90', '21545680', 'Physique');

  systeme.ajouterEnseignant('PROF001', 'Dr. Jean Moreau', 'jean.moreau@univ.fr', '06 45 67 89 01', 'EMP20001', 'Informatique');
  systeme.ajouterEnseignant('PROF002', 'Pr. Sophie Bernard', 'sophie.bernard@univ.fr', '06 56 78 90 12', 'EMP20002', 'Littérature');

  console.log();

  // ==================== AJOUT DE LIVRES ====================
  console.log('='.repeat(70));
  console.log('2️⃣  AJOUT DE LIVRES');
  console.log('='.repeat(70));

  systeme.ajouterLivre('978-2-253-08949-9', 'Le Seigneur des Anneaux', 'J.R.R. Tolkien', 'Pocket', 2012, 3);
  systeme.ajouterLivre('978-2-253-04933-9', '1984', 'George Orwell', 'Gallimard', 2020, 2);
  systeme.ajouterLivre('978-2-8234-0356-3', 'Python pour les Scientifiques', 'Étienne Tignon', 'Éditions Techniques', 2018, 4);
  systeme.ajouterLivre('978-2-216-15089-6', 'Le Monde de Narnia', 'C.S. Lewis', 'Hatier Jeunesse', 2015, 2);
  systeme.ajouterLivre('978-2-070-68868-5', 'Les Misérables', 'Victor Hugo', 'Gallimard', 2008, 3);

  console.log();

  // ==================== RECHERCHE DE LIVRES ====================
  console.log('='.repeat(70));
  console.log('3️⃣  RECHERCHE DE LIVRES');
  console.log('='.repeat(70));

  console.log("🔍 Recherche par auteur 'Tolkien':");
  let livres = systeme.rechercherLivres('auteur', 'Tolkien');
  for (const livre of livres) {
    console.log(`   • ${livre}`);
  }

  console.log("\n🔍 Recherche par titre contenant 'Python':");
  livres = systeme.rechercherLivres('titre', 'Python');
  for (const livre of livres) {
    console.log(`   • ${livre}`);
  }

  console.log();

  // ==================== EMPRUNTS DE LIVRES ====================
  console.log('='.repeat(70));
  console.log('4️⃣  EMPRUNTS DE LIVRES');
  console.log('='.repeat(70));

  const txn1 = systeme.emprunterLivre('ETU001', '978-2-253-08949-9');
  const txn2 = systeme.emprunterLivre('ETU001', '978-2-8234-0356-3');
  const txn3 = systeme.emprunterLivre('ETU001', '978-2-070-68868-5');
  const txn4 = systeme.emprunterLivre('ETU002', '978-2-253-04933-9');
  const txn5 = systeme.emprunterLivre('ETU003', '978-2-216-15089-6');
  const txn6 = systeme.emprunterLivre('PROF001', '978-2-253-08949-9');

  console.log();

  // ==================== AFFICHAGE DES EMPRUNTS ACTIFS ====================
  console.log('='.repeat(70));
  console.log('5️⃣  EMPRUNTS ACTIFS PAR UTILISATEUR');
  console.log('='.repeat(70));

  const utilisateurs = systeme.listerUtilisateurs();
  for (const utilisateur of utilisateurs) {
    const emprunts = systeme.listerEmpruntsActifs(utilisateur.identifiant);
    if (emprunts.length > 0) {
      console.log(`\n👤 ${utilisateur.nom} (ID: ${utilisateur.identifiant}):`);
      for (const emprunt of emprunts) {
        console.log(`   • ${emprunt.nomLivre}`);
        console.log(`     Retour prévu: ${emprunt.dateRetourPrevue.toLocaleDateString('fr-FR')}`);
        console.log(`     Jours restants: ${emprunt.obtenirJoursRestants()}`);
      }
    }
  }

  console.log();

  // ==================== DISPONIBILITÉ DES LIVRES ====================
  console.log('='.repeat(70));
  console.log('6️⃣  DISPONIBILITÉ DES LIVRES');
  console.log('='.repeat(70));

  livres = systeme.listerLivres();
  for (const livre of livres) {
    const statut = livre.estDisponible ? '✅ Disponible' : '❌ Indisponible';
    console.log(`\n${statut}: ${livre.titre}`);
    console.log(`   Copies: ${livre.nombreCopiesDisponibles}/${livre.nombreCopiesTotal}`);
    console.log(`   Taux: ${Math.round(livre.obtenirTauxDisponibilite() * 100)}%`);
  }

  console.log();

  // ==================== RETOURS DE LIVRES ====================
  console.log('='.repeat(70));
  console.log('7️⃣  RETOURS DE LIVRES');
  console.log('='.repeat(70));

  if (txn1) {
    console.log(`\n➡️  Retour de la transaction ${txn1}:`);
    systeme.retournerLivre(txn1);
  }

  if (txn3) {
    console.log(`\n➡️  Retour de la transaction ${txn3}:`);
    systeme.retournerLivre(txn3);
  }

  console.log();

  // ==================== NOTIFICATIONS DE RETARDS ====================
  console.log('='.repeat(70));
  console.log('8️⃣  VÉRIFICATION DES RETARDS');
  console.log('='.repeat(70));

  console.log('\n⏰ Vérification des emprunts en retard:');
  const empruntsEnRetard = systeme.verifierRetards();
  if (empruntsEnRetard.length === 0) {
    console.log('   ✅ Aucun emprunt en retard détecté');
  } else {
    for (const emprunt of empruntsEnRetard) {
      console.log(`   ⚠️  ${emprunt.nomLivre}: ${emprunt.obtenirJoursDeRetard()} jour(s) de retard`);
    }
  }

  console.log();

  // ==================== RAPPORTS ET STATISTIQUES ====================
  console.log('='.repeat(70));
  console.log('9️⃣  STATISTIQUES DU SYSTÈME');
  console.log('='.repeat(70));
  console.log();

  systeme.afficherRapportComplet();

  // ==================== AFFICHAGE DES UTILISATEURS ====================
  console.log('='.repeat(70));
  console.log('🔟 LISTE COMPLÈTE DES UTILISATEURS');
  console.log('='.repeat(70));
  console.log();

  for (const utilisateur of utilisateurs) {
    const empruntsActifs = systeme.listerEmpruntsActifs(utilisateur.identifiant).length;
    const limiteEmprunts = utilisateur.obtenirNombreMaxLivres();
    const dureeMax = utilisateur.obtenirDureeMaxEmprunt();

    console.log(`👤 ${utilisateur}`);
    console.log(`   Email: ${utilisateur.email}`);
    console.log(`   Téléphone: ${utilisateur.telephone}`);
    console.log(`   Emprunts actifs: ${empruntsActifs}/${limiteEmprunts}`);
    console.log(`   Durée max d'emprunt: ${dureeMax} jours`);
    console.log();
  }

  console.log('='.repeat(70));
  console.log('✨ FIN DE LA DÉMONSTRATION');
  console.log('='.repeat(70));
}

// Exécute la démonstration
main();
