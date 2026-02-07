# 🏥 Pharmacie de Garde - Guide de Personnalisation

Ce site est configuré par défaut pour **Fès**. Voici comment le changer pour une autre ville (ex: Rabat, Casablanca...) très simplement.

## 🌍 Comment changer la ville ?

### Étape 1 : Changer la source des données
Le site récupère la liste des pharmacies depuis un fichier.

1.  Allez dans le dossier **`scraper`** et ouvrez le fichier **`main.py`** (avec le Bloc-notes ou un éditeur de texte).
2.  Cherchez la ligne qui commence par `URL = "..."`.
3.  Remplacez le lien par celui de votre ville que vous trouverez sur le site [annuaire-gratuit.ma](https://www.annuaire-gratuit.ma).
    *   *Exemple : Remplacez `...-fes.html` par `...-rabat.html`.*
4.  Lancez ce fichier (`python main.py`) pour récupérer la nouvelle liste de pharmacies.

### Étape 2 : Changer les textes affichés
Pour que le nom de la nouvelle ville apparaisse sur le site, modifiez les textes blancs dans ces 3 fichiers :

1.  **`app/layout.tsx`** : Pour changer le titre de l'onglet du navigateur (le texte "Fès" à l'intérieur).
2.  **`components/Header.tsx`** : Pour changer le titre en haut de la page.
3.  **`components/PharmacyCard.tsx`** : Pour changer la ville par défaut sur les cartes des pharmacies.
