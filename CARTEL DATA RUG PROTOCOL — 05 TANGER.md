# DATA RUG PROTOCOL — 05 TANGER
## STRAIT SIGNAL
### Détroit / Entre Deux Mers

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Tanger

---

## Concept

Tanger est un tapis-frontière : deux mers, deux continents,
des lignes tendues par le vent. Le Détroit de Gibraltar,
le port et la ville de seuil construisent un signal permanent
entre Atlantique et Méditerranée.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Atlantique profond (froid) → Méditerranée → brume solaire |
| Humidité | Complexité du motif |
| Vent (fort à Tanger) | Vitesse auto-pilot + biais vers motifs directionnels |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Tangier, MA (35.7595N / 5.8340W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Bleu Atlantique | `#1F3A5F` | Profondeur, ouest |
| Bleu Méditerranée | `#2E86C1` | Clarté, est |
| Brume | `#AED6F1` | Signal, navette |
| Horizon | `#FDFEFE` | Lumière |
| Nuit | `#0A0A14` | Fond |
| Acier | `#5D6D7E` | Port, métal |
| Écume | `#D6EAF8` | Crêtes |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | DÉTROIT | Carré concentrique — seuil |
| 1 | HORIZON | Arche bezier — ligne marine |
| 2 | PORT | Losange emboîté — croisement de flux |
| 3 | BRUME | Cercle + bandes — brouillard |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Export** : `DATA_RUG_IFM_05_TANGER_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
