# DATA RUG PROTOCOL — 04 MARRAKECH
## OCHRE HEAT PULSE
### Ville Ocre / Chaleur Rituelle

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Marrakech

---

## Concept

Marrakech devient une surface solaire :
le motif bat, chauffe et respire comme une place publique
au coucher du soleil. Les remparts, la Koutoubia,
Jemaa El-Fna et l'Atlas construisent un tapis de chaleur rituelle.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Majorelle (froid) → ocre → rouge feu (chaud) |
| Humidité | Complexité du motif |
| Vent chaud | Vitesse de l'auto-pilot |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Marrakech, MA (31.6295N / 7.9811W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Ocre | `#D35400` | Base, remparts |
| Rouge | `#C0392B` | Chaleur extrême |
| Majorelle | `#1A2463` | Accent froid, nuit |
| Or | `#F39C12` | Soleil, navette |
| Ombre | `#2C1810` | Profondeur |
| Blanc | `#FDFEFE` | Lumière zénithale |
| Terre | `#8B4513` | Minéral, Atlas |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | REMPART | Carré concentrique — murailles ocres |
| 1 | KOUTOUBIA | Arche bezier — minaret |
| 2 | JEMAA | Losange emboîté — place, croisement |
| 3 | SOLEIL | Cercle + bandes — chaleur pulsante |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Export** : `DATA_RUG_IFM_04_MARRAKECH_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
