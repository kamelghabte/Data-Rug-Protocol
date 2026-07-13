# DATA RUG PROTOCOL — 03 FÈS
## THE BLUE MEDINA ALGORITHM
### Médina Fractale / Savoir et Artisanat

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Fès

---

## Concept

Fès est la matrice savante de la série :
chaque cellule contient une autre cellule,
comme une médina infinie. Le bleu de Fès,
les tanneries, le zellige et les savoirs ancestraux
donnent à cette œuvre sa densité fractale.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Bleu profond (froid) → turquoise → ocre chaud |
| Humidité | Complexité du motif (densité artisanale) |
| Vent | Vitesse de l'auto-pilot |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Fez, MA (34.0331N / 5.0003W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Bleu de Fès | `#1F618D` | Base, identité première |
| Ocre | `#CA6F1E` | Tanneries, accent chaud |
| Blanc | `#FDFEFE` | Lumière, relief |
| Turquoise | `#148F77` | Zellige, eau |
| Noir | `#0A0A0A` | Fond |
| Cobalt | `#2874A6` | Variation bleu vif |
| Sable | `#F0E1C8` | Terre, médina |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | ZELLIGE | Étoile 8 branches — zellige classique |
| 1 | MÉDINA | Arche labyrinthique — ruelles |
| 2 | TANNERIE | Losange emboîté — bassins |
| 3 | SAVOIR | Cercle + bandes — manuscrits |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Export** : `DATA_RUG_IFM_03_FES_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
