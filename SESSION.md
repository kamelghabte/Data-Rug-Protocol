# SESSION — Data Rug Protocol
**Reprise rapide pour Claude Code**

## Repo
https://github.com/kamelghabte/Data-Rug-Protocol
Dossier local : `C:/Users/IMC/Desktop/DATA_RUG_GITHUB/`

## État au 2026-07-14
- 12 villes complètes, toutes pushées sur main
- `kiosk.html` créé à la racine du repo (carousel 12 sketches OpenProcessing × 10s)
- Fix export PNG appliqué sur les 12 villes :
  - `pendingExport` flag activé sur dernière cellule (`index === cols * rows - 1`)
  - `draw()` : dessine tout → `noLoop()` → `saveCanvas()` → reset grille + `weaveCursor = 0` → `loop()` après 200ms
  - `autoWeave()` déplacé **après** `drawHUD()` dans `draw()`

## Liens OpenProcessing (embed)
| # | Ville | ID sketch |
|---|-------|-----------|
| 01 | Casablanca | 2979684 |
| 02 | Rabat | 2979710 |
| 03 | Fès | 2979715 |
| 04 | Marrakech | 2979719 |
| 05 | Tanger | 2979726 |
| 06 | Tétouan | 2979731 |
| 07 | Oujda | 2979736 |
| 08 | Essaouira | 2979742 |
| 09 | Agadir | 2979744 |
| 10 | Kénitra | 2979745 |
| 11 | Meknès | 2979746 |
| 12 | El Jadida | 2979747 |

## Ce qui reste à faire
- Valider le fix export PNG sur les 11 autres villes (test identique à Casablanca)
- Produire les 12 PNG HD, 12 MP4 loops, 12 cartels FR/AR
- Page catalogue web

## Token GitHub
À régénérer à chaque session (les anciens sont révoqués après usage).
GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → scope `repo`
