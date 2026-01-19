# 🏫 Système de Gestion de Bibliothèque

### ✨ Caractéristiques principales

- **3 Design Patterns implémentés** : Singleton, Factory, Observer
- **Modularité complète** : 3 sous-systèmes indépendants (utilisateurs, livres, emprunts)
- **100% en français** : Tous les noms de classes, méthodes et variables
- **Gestion d'emprunts avancée** : Calculs de dates, délais, permissions
- **Suite de tests complète** : 43 assertions, 100% de réussite
- **CommonJS modules** : Compatible Node.js

## 🗂️ Structure du projet

```
js/
├── src/
│   ├── utilisateur/          # Gestion des utilisateurs
│   │   ├── Utilisateur.js    # Classe abstraite de base
│   │   ├── Specialisations.js # Etudiant et Enseignant
│   │   ├── Fabrique.js       # Factory Pattern
│   │   └── index.js
│   ├── livre/                # Gestion des livres
│   │   ├── Livre.js
│   │   └── index.js
│   ├── emprunt/              # Gestion des emprunts
│   │   ├── TransactionEmprunt.js
│   │   └── index.js
│   ├── Notifications.js      # Observer Pattern
│   ├── SystemeBibliotheque.js # Singleton - orchestrateur
│   └── index.js
├── main.js                   # Script de démonstration
├── test_systeme.js           # Suite de tests
├── index.js                  # Exporte toutes les classes
├── package.json              # Configuration Node.js
└── README.md                 # Cet fichier
```

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Exécution de la démonstration

```bash
npm start
# ou
node main.js
```

### Exécution de la suite de tests

```bash
npm test
# ou
node test_systeme.js
```

## 🏛️ Architecture

### Hiérarchie des classes

```
Utilisateur (abstract)
├── Etudiant
│   - Durée max: 14 jours
│   - Limite: 5 livres
└── Enseignant
    - Durée max: 28 jours
    - Limite: 10 livres

Livre
├── Gestion des copies
├── Calcul de disponibilité
└── Suivis des emprunts

TransactionEmprunt
├── Suivi des dates
├── Calcul des retards
└── Gestion des statuts

SystemeBibliotheque (Singleton)
├── Orchestration des utilisateurs
├── Orchestration des livres
├── Orchestration des emprunts
└── Rapports et statistiques
```

## 🎯 Design Patterns

### 1. Singleton (SystemeBibliotheque.js)

Le système utilise un pattern **Singleton** pour assurer qu'une seule instance du système existe :

```javascript
const systeme = SystemeBibliotheque.obtenirInstance();
```

**Implémentation** :
- Constructeur privé (simulé)
- Variable statique `_instance`
- Méthode statique `obtenirInstance()`

### 2. Factory (utilisateur/Fabrique.js)

Le **Factory Pattern** facilite la création d'utilisateurs :

```javascript
const etudiant = FabriqueUtilisateur.creerEtudiant(
  'ETU001', 'Alice', 'alice@univ.fr', '06 00 00 00', '12345', 'Informatique'
);

const enseignant = FabriqueUtilisateur.creerEnseignant(
  'PROF001', 'Bob', 'bob@univ.fr', '06 00 00 00', 'EMP001', 'Mathématiques'
);
```

**Avantages** :
- Centralise la logique de création
- Permet l'extensibilité futur
- Validation et configuration automatique

### 3. Observer (Notifications.js)

Le **Observer Pattern** gère les notifications de retard :

```javascript
const gestionnaire = new GestionnaireNotifications();
const observateur = new ObservateurUtilisateur('UTL001', 'user@test.fr');

gestionnaire.abonner(observateur);
gestionnaire.notifierRetard('UTL001', 'Livre X', 5);
```

**Composants** :
- `Observateur` : Classe abstraite
- `ObservateurUtilisateur` : Implémentation concrète
- `GestionnaireNotifications` : Sujet observable

## 📦 Modules principaux

### Utilisateur.js
Classe abstraite définissant l'interface pour tous les utilisateurs.

**Propriétés** :
- `identifiant` : ID unique
- `nom` : Nom complet
- `email` : Adresse email
- `telephone` : Numéro de téléphone
- `dateInscription` : Date d'inscription
- `empruntsActuels` : Liste des emprunts en cours

**Méthodes abstraites** :
- `obtenirDureeMaxEmprunt()` : Durée maximale d'un emprunt (jours)
- `obtenirNombreMaxLivres()` : Nombre maximal de livres empruntables

### Specialisations.js

**Etudiant**
- Durée max d'emprunt : 14 jours
- Nombre max de livres : 5
- Propriétés spécifiques : `numeroMatricule`, `specialite`

**Enseignant**
- Durée max d'emprunt : 28 jours
- Nombre max de livres : 10
- Propriétés spécifiques : `numeroEmploye`, `departement`

### Livre.js
Gère les copies individuelles des livres.

**Propriétés** :
- `isbn` : Identifiant international standard du livre
- `titre` : Titre du livre
- `auteur` : Nom de l'auteur
- `editeur` : Maison d'édition
- `annePublication` : Année de parution
- `nombreCopiesDisponibles` : Copies disponibles
- `nombreCopiesTotal` : Nombre total de copies

**Méthodes** :
- `emprunter()` : Diminue les copies disponibles
- `retourner()` : Augmente les copies disponibles
- `obtenirTauxDisponibilite()` : Retourne le pourcentage disponible

### TransactionEmprunt.js
Suit les détails d'un emprunt individuel.

**Propriétés** :
- `identifiantTransaction` : Identifiant unique (TRX000001 format)
- `identifiantUtilisateur` : ID de l'emprunteur
- `nomLivre` : Titre du livre
- `isbn` : ISBN du livre
- `dateEmprunt` : Date de l'emprunt
- `dateRetourPrevue` : Date de retour prévue
- `dateRetourEffective` : Date du retour effectif
- `estRetournee` : Statut

**Méthodes** :
- `estEnRetard()` : Vérifie si en retard
- `obtenirJoursDeRetard()` : Calcule jours de retard
- `obtenirJoursRestants()` : Calcule jours avant limite
- `obtenirDureeEmprunt()` : Durée totale écoulée

### SystemeBibliotheque.js
Orchestrateur principal - Singleton du système.

**Sections** :
1. **Gestion des utilisateurs** (6 méthodes)
   - `ajouterEtudiant()`
   - `ajouterEnseignant()`
   - `obtenirUtilisateur()`
   - `listerUtilisateurs()`

2. **Gestion des livres** (6 méthodes)
   - `ajouterLivre()`
   - `augmenterCopies()`
   - `obtenirLivre()`
   - `rechercherLivres()`
   - `listerLivres()`

3. **Gestion des emprunts** (6 méthodes)
   - `emprunterLivre()`
   - `retournerLivre()`
   - `obtenirTransaction()`
   - `verifierRetards()`
   - `envoyerRappels()`
   - `listerEmpruntsActifs()`

4. **Rapports et statistiques** (2 méthodes)
   - `obtenirStatistiques()`
   - `afficherRapportComplet()`

## 🔄 Flux de gestion des emprunts

```
1. Utilisateur emprunte un livre
   ↓
2. SystemeBibliotheque.emprunterLivre()
   ├─ Valide les permissions (durée max, nombre max)
   ├─ Crée une TransactionEmprunt
   ├─ Décrémente les copies disponibles
   └─ Retourne l'ID de transaction
   
3. Utilisation du livre
   ↓
   
4. Retour du livre
   ├─ SystemeBibliotheque.retournerLivre()
   ├─ Marque transaction comme retournée
   └─ Restaure les copies disponibles
```

## 🔐 Encapsulation et sécurité

### Attributs privés
Tous les attributs internes utilisent le **préfixe underscore** (`_`) pour indiquer la confidentialité :

```javascript
class Utilisateur {
  constructor(identifiant, nom, email, telephone) {
    this._identifiant = identifiant;
    this._nom = nom;
    this._email = email;
    // ...
  }
}
```

### Accès via getters
L'accès se fait exclusivement via des getters publics :

```javascript
const utilisateur = new Utilisateur(...);
console.log(utilisateur.identifiant);  // ✅ Getter
utilisateur.identifiant = 'NEU001';    // ❌ Impossible
```

## 🧪 Suite de tests

### Exécution
```bash
npm test
```

### Résumé des tests (43 assertions)

| Test | Assertions | Statut |
|------|-----------|--------|
| 1. Pattern Singleton | 3 | ✅ |
| 2. Pattern Factory | 7 | ✅ |
| 3. Gestion des utilisateurs | 6 | ✅ |
| 4. Gestion des livres | 8 | ✅ |
| 5. Emprunts et retours | 9 | ✅ |
| 6. Pattern Observer | 4 | ✅ |
| 7. Permissions et limites | 3 | ✅ |
| 8. Calculs de dates | 8 | ✅ |

**Taux de réussite : 100%** 🎉

## 📊 Démonstration

Le fichier `main.js` présente un scénario complet :

```bash
npm start
```

**Démontre** :
1. Ajout de 5 utilisateurs (3 étudiants, 2 enseignants)
2. Ajout de 5 livres
3. Recherche de livres
4. Emprunts multiples (6 transactions)
5. Affichage des emprunts actifs
6. Disponibilité des livres
7. Retours de livres
8. Vérification des retards
9. Statistiques du système
10. Liste complète des utilisateurs

## 🔀 Différences Python vs JavaScript

| Aspect | Python | JavaScript |
|--------|--------|-----------|
| Classes abstraites | `ABC` + `@abstractmethod` | Throw Error |
| Héritage | `class Etudiant(Utilisateur)` | `class Etudiant extends Utilisateur` |
| Dictionnaires | `dict{}` | `Map()` |
| Dates | `datetime.datetime` | `Date` |
| Modules | `from ... import` | `require(...)` |
| Exécution | Python 3.7+ | Node.js 14+ |

## 📚 Concepts POO appliqués

- **Encapsulation** : Attributs privés (_), accès via getters
- **Héritage** : Chaîne d'héritage (Utilisateur → Etudiant/Enseignant)
- **Polymorphisme** : Méthodes abstraites implémentées différemment
- **Design Patterns** : Singleton, Factory, Observer
- **Modularité** : 3 sous-systèmes indépendants

## 🛠️ Dépendances

**Runtime** : Node.js 14+ (built-in, pas d'imports externes)

**Development** : npm (pour le script `npm test`, `npm start`)

## 📝 Licence

MIT - Libre d'utilisation

## 👨‍💻 Auteur

Équipe Smart Library Management System

---

## 🎓 Pour approfondir

Consultez les sources Python dans `../python/` pour comparer les deux implémentations et comprendre les différences de paradigme entre les deux langages.
