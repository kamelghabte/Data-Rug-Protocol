# DATA RUG PROTOCOL — 06 TÉTOUAN
## ANDALUSIAN WHITE MATRIX
### Andalousie Blanche / Zellige du Nord

---

**Artiste** : Kamel Ghabte
**Année** : 2026
**Collection** : Data Rug Protocol — Maroc 12 Antennes
**Commission** : Institut Français du Maroc (IFM) — Antenne Tétouan

---

## Concept

Tétouan appelle une écriture précise, blanche, presque silencieuse :
un tissage d'héritage andalou. La médina blanche, les portes vertes,
les broderies du Nord et les maisons immaculées construisent
un tapis-manuscrit d'une élégance contenue.

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."*

---

## Données & Mapping

| Donnée météo | Traduction plastique |
|---|---|
| Température | Andalou foncé (froid) → vert porte → rouge vif (chaud) |
| Humidité | Complexité du motif |
| Vent méditerranéen | Vitesse auto-pilot |
| Description | Affiché dans le HUD |

**Source** : OpenWeather API — Tetouan, MA (35.5785N / 5.3684W)

---

## Palette

| Nom | HEX | Usage |
|---|---|---|
| Blanc | `#FAFAFA` | Base, fond (exception série) |
| Vert porte | `#1E8449` | Accent principal, navette |
| Rouge | `#C0392B` | Chaleur, broderie |
| Gris | `#95A5A6` | Neutre |
| Noir | `#0D0D0D` | Bordure, texte |
| Ivoire | `#F5F0E8` | Fond cadre |
| Andalou | `#2C3E50` | Profondeur, froid |

---

## Motifs

| # | Nom | Référence |
|---|---|---|
| 0 | PORTE | Carré concentrique — portes andalouses |
| 1 | ARCHE | Arc en fer à cheval — héritage andalou |
| 2 | BRODERIE | Losange emboîté — textile du Nord |
| 3 | MÉDINA | Cercle + bandes — rythme blanc |

---

## Technique

- **Moteur** : p5.js v1.11.11
- **Grille** : 12 colonnes × 14 rangées
- **Fond** : ivoire/blanc (seule œuvre à fond clair de la série)
- **Export** : `DATA_RUG_IFM_06_TETOUAN_KAMEL_GHABTE_[date].png`
- **Interaction** : auto-pilot + clic souris

---

*Kamel Ghabte — kamelghabte.me*
