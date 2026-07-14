# DATA RUG PROTOCOL — 01 CASABLANCA
## WHITE NOISE ATLANTIC
### La Ville Blanche / Fréquence Atlantique

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Casablanca

---

## Concept

Casablanca devient une trame de flux — blanche, minérale, maritime.
L'océan Atlantique déforme la grille comme un signal basse fréquence.
La météo côtière en temps réel pilote chaque décision de tissage :
la ville n'est jamais deux fois le même tapis.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Direction artistique

La Ville Blanche est traitée comme une fréquence : dense, orthogonale, traversée de bruit blanc.
Les motifs s'inspirent de l'architecture art déco des façades du centre-ville,
du quadrillage des quartiers Habous et Maarif,
et du rythme des vagues atlantiques sur la Corniche.

Fond sombre, grain de bruit blanc en surimpression — la ville la nuit, vue depuis la mer.

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Choix de couleur dans la palette (bleu froid → blanc solaire) |
| Humidité | Complexité du motif (simple → dense) |
| Vent côtier | Vitesse de l'auto-pilot (fort vent = tissage rapide) |
| Description | Affiché en temps réel dans le HUD |

**Source** : OpenWeather API — Casablanca, MA (33.5731N / 7.5898W)
**Rafraîchissement** : toutes les 10 minutes

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Blanc minéral | `#F5F5F0` | Béton, façades, lumière |
| Bleu océan | `#1B4F72` | Atlantique froid |
| Gris minéral | `#7F8C8D` | Pierre, béton, brume |
| Noir | `#0A0A0A` | Fond, nuit |
| Cyan atlantique | `#00BFFF` | Signal, navette, accent |

---

## Motifs

| # | Nom | Référence culturelle |
|---|---|---|
| 0 | ÉTOILE ART DÉCO | Deux carrés tournés 45° — rosaces des façades art déco |
| 1 | ARCADE HABOUS | Arche en plein cintre — portails du quartier Habous |
| 2 | VAGUE ATLANTIQUE | Courbe bezier — fréquence de l'océan, Corniche |
| 3 | ZELLIGE OCTOGONAL | Octogone imbriqué — géométrie islamique, zellige |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Format** : HTML interactif (navigateur) — plein écran
- **Grille** : 20 colonnes × 24 rangées
- **Export** : PNG HD automatique à chaque cycle complet
  `DATA_RUG_IFM_01_CASABLANCA_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot continu + clic souris

---

## Livrables

- `index.html` + `mySketch.js` — œuvre interactive
- `CARTEL.md` — ce document (FR)
- PNG HD 6000px — export généré
- MP4 loop — capture vidéo

---

*Kamel Ghabte — kamelghabte.me*
*Artiste numérique — AR / VR / XR — Data Art — Creative Coding — Maroc & France*
