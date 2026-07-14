# DATA RUG PROTOCOL — 08 ESSAOUIRA
## MOGADOR WIND LOOM
### Mogador / Vent, Bois et Gnaoua

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Essaouira

---

## Concept

Essaouira est le tapis du vent : les lignes se nouent comme
des filets et vibrent comme des cordes. Le vent permanent,
le port, le bois de thuya et la musique Gnaoua construisent
une œuvre en mouvement perpétuel.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Mogador profond (froid) → vert/bois → sable clair (chaud) |
| Humidité | Complexité du motif |
| Vent (toujours fort) | Vitesse auto-pilot très rapide + biais motifs directionnels |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Essaouira, MA (31.5085N / 9.7595W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Bleu Mogador | `#1A5276` | Base, profondeur |
| Blanc | `#FDFEFE` | Lumière, écume |
| Bois thuya | `#784212` | Terre, artisanat |
| Gnaoua | `#1D8348` | Vert, musique |
| Sable | `#D5DBDB` | Clarté, plage |
| Noir | `#0A0A0A` | Fond |
| Écume | `#85C1E9` | Signal, navette |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | REMPART | Carré concentrique — fortifications |
| 1 | VOILE | Arche bezier — voile gonflée |
| 2 | FILET | Losange emboîté — mailles de pêche |
| 3 | GNAOUA | Cercle + bandes — rythme circulaire |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Particularité** : vent > 10 m/s biaise vers VOILE et GNAOUA
- **Export** : `DATA_RUG_IFM_08_ESSAOUIRA_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
