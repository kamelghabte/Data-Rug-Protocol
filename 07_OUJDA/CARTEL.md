# DATA RUG PROTOCOL — 07 OUJDA
## GHARNATI WIND PATTERN
### Orientale / Gharnati Frequency

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Oujda

---

## Concept

Oujda est une partition visuelle : le climat écrit des fréquences
dans la trame. Ville frontière de l'Oriental marocain,
sa musique Gharnati et ses rythmes Reggada traduisent
la chaleur continentale et le vent sec en pulsations sèches.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Nuit orientale (froid) → terre sèche → ambre feu (chaud) |
| Humidité | Complexité du motif (climat sec = motifs épurés) |
| Vent sec | Vitesse auto-pilot |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Oujda, MA (34.6814N / 1.9086W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Ambre | `#E59866` | Chaleur, accent |
| Terre | `#784212` | Minéral, bordure |
| Bleu nuit | `#1B2631` | Profondeur, froid |
| Or | `#F0B27A` | Signal, navette |
| Blanc | `#FDFEFE` | Lumière |
| Noir | `#0A0A0A` | Fond |
| Cuivre | `#B7950B` | Accent chaud |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | BAB | Carré concentrique — Bab Sidi Abdelwahab |
| 1 | GHARNATI | Arche bezier — musique andalouse |
| 2 | REGGADA | Losange emboîté — rythme percussif |
| 3 | FRONTIÈRE | Cercle + bandes — passage oriental |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Export** : `DATA_RUG_IFM_07_OUJDA_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
