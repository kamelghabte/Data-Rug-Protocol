# DATA RUG PROTOCOL — MAROC 12 ANTENNES
**Artiste : Kamel Ghabte**
Commission : Institut Français du Maroc (IFM) — 12 antennes

---

## Concept
Série de 12 œuvres génératives site-specific en p5.js.
Chaque ville marocaine devient un "tapis climatique" : les données météo locales (OpenWeather API) pilotent un algorithme de tissage.
**Phrase clé :** "Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis."

---

## Architecture technique commune (à respecter sur TOUS les sketches)

### Stack
- p5.js `https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.js`
- OpenWeather API `https://api.openweathermap.org/data/2.5/weather?q=VILLE,MA&appid=KEY&units=metric`
- Pas de dépendances externes supplémentaires

### Variables météo
```js
let temp, humidity, wind, description  // depuis OpenWeather
```

### Mapping data → motif (règle commune)
| Donnée | Effet visuel |
|--------|-------------|
| `temp` | Choix de couleur dans la palette ville |
| `humidity` | Complexité / densité du motif |
| `wind` | Vitesse de l'auto-pilot (fort vent = tissage rapide) |
| `description` | Affiché dans le HUD |

### Structure loom (identique partout)
```js
let loomGrid = []   // [{type, col, active}]
let cols, rows      // propre à chaque ville
let weaveCursor = 0
// auto-pilot : wind → vitesse
// weavePattern(velocity) : place un motif sur loomGrid[weaveCursor % total]
// autoWeave() : appelle weavePattern avec velocity medium
```

### Gabarit visuel OBLIGATOIRE (même structure sur les 12)
1. **Zone d'art** : grille de cellules avec motifs, cadre musée (marges `margin` + `bottomMargin`)
2. **Frame musée** : `drawMuseumFrame()` — bandes opaques sur les 4 côtés + bordure fine couleur palette
3. **HUD bas** : `drawHUD()` — contient obligatoirement :
   - Titre de l'œuvre + slogan ville
   - `ARTISTE : KAMEL GHABTE`
   - Date/heure temps réel
   - Stats météo (temp, humidity, wind, description)
   - Légende chromatique (couleur → seuil de température)
   - Légende morphologique (motif type → nom)
   - Status API (LIVE / OFFLINE)
4. **Navette** : ligne horizontale colorée qui suit `weaveCursor` dans la grille
5. **Mode offline** : valeurs par défaut si API fail (jamais de crash)
6. **MIDI** : `navigator.requestMIDIAccess()` — note ON déclenche `weavePattern(velocity)`
7. **Export PNG** : `saveCanvas()` automatique à chaque cycle complet (quand `weaveCursor % total === 0`)
8. **`windowResized()`** : recalcul `cellW`, `cellH`

---

## 12 villes — fiches de production

### 01 — CASABLANCA `33.5731N / 7.5898W`
- **Titre** : WHITE NOISE ATLANTIC
- **Slogan** : La Ville Blanche / Fréquence Atlantique
- **Palette** : Blanc `#F5F5F0`, Bleu océan `#1B4F72`, Gris minéral `#7F8C8D`, Noir `#0A0A0A`, Accent cyan `#00BFFF`
- **Signes** : Art déco, Atlantique, Habous, flux urbains
- **Données fortes** : vent côtier, humidité, nuages, pression
- **Motifs** : rectangles art déco, ondes horizontales, grille dense blanche
- **Fond** : sombre `#0A0A0A`

### 02 — RABAT `34.0209N / 6.8416W`
- **Titre** : OUDAYAS GREEN CODE
- **Slogan** : Capitale Verte / Oudayas Signal
- **Palette** : Vert Oudayas `#1A5276`, Vert jardin `#1E8449`, Ivoire `#FAF0E6`, Or `#D4AC0D`, Noir `#0D1117`
- **Signes** : Oudayas, Tour Hassan, Bouregreg, jardins, remparts
- **Données fortes** : température, vent océanique, humidité, UV
- **Motifs** : arcs génératifs, respirations verticales, trames jardins
- **Fond** : sombre

### 03 — FÈS `34.0331N / 5.0003W`
- **Titre** : THE BLUE MEDINA ALGORITHM
- **Slogan** : Médina Fractale / Savoir et Artisanat
- **Palette** : Bleu de Fès `#1F618D`, Ocre `#CA6F1E`, Blanc `#FDFEFE`, Turquoise `#148F77`, Noir `#0A0A0A`
- **Signes** : médina labyrinthique, tanneries, zellige, savoirs
- **Données fortes** : chaleur intérieure, humidité, pression, variation jour/nuit
- **Motifs** : labyrinthe fractal, micro-motifs imbriqués, couches zellige
- **Fond** : sombre

### 04 — MARRAKECH `31.6295N / 7.9811W`
- **Titre** : OCHRE HEAT PULSE
- **Slogan** : Ville Ocre / Chaleur Rituelle
- **Palette** : Ocre `#C0392B` → `#D35400`, Majorelle `#1A2463`, Or `#F39C12`, Ombre `#2C1810`, Blanc `#FDFEFE`
- **Signes** : remparts, Koutoubia, Jemaa El-Fna, Atlas
- **Données fortes** : température, UV, vent chaud, amplitude jour/nuit
- **Motifs** : pulsations ocres, cercles de chaleur, ombres sèches, accents Majorelle
- **Fond** : sombre

### 05 — TANGER `35.7595N / 5.8340W`
- **Titre** : STRAIT SIGNAL
- **Slogan** : Détroit / Entre Deux Mers
- **Palette** : Bleu Atlantique `#1F3A5F`, Bleu Méditerranée `#2E86C1`, Brume `#AED6F1`, Horizon `#FDFEFE`, Nuit `#0A0A14`
- **Signes** : Détroit de Gibraltar, port, ville de seuil, horizon
- **Données fortes** : direction vent, force vent, brume, humidité marine
- **Motifs** : diagonales croisées, deux flux maritimes opposés, effet brume, lignes d'horizon
- **Fond** : sombre bleu nuit

### 06 — TÉTOUAN `35.5785N / 5.3684W`
- **Titre** : ANDALUSIAN WHITE MATRIX
- **Slogan** : Andalousie Blanche / Zellige du Nord
- **Palette** : Blanc `#FAFAFA`, Vert porte `#1E8449`, Rouge `#C0392B`, Gris `#95A5A6`, Noir `#0D0D0D`
- **Signes** : médina andalouse, portes vertes, broderies du Nord, maisons blanches
- **Données fortes** : vent méditerranéen, humidité, température douce, luminosité
- **Motifs** : grille blanche fine, accents verts/rouges, micro-ornements, rythme textile
- **Fond** : blanc ou très clair

### 07 — OUJDA `34.6814N / 1.9086W`
- **Titre** : GHARNATI WIND PATTERN
- **Slogan** : Orientale / Gharnati Frequency
- **Palette** : Ambre `#E59866`, Terre `#784212`, Bleu nuit `#1B2631`, Or `#F0B27A`, Blanc `#FDFEFE`
- **Signes** : ville frontière, Gharnati, Reggada, Bab Sidi Abdelwahab
- **Données fortes** : chaleur continentale, vent sec, pression, amplitude thermique
- **Motifs** : bandes sonores, ondes rythmiques, compression par chaleur, pulsations sèches
- **Fond** : sombre chaud

### 08 — ESSAOUIRA `31.5085N / 9.7595W`
- **Titre** : MOGADOR WIND LOOM
- **Slogan** : Mogador / Vent, Bois et Gnaoua
- **Palette** : Bleu Mogador `#1A5276`, Blanc `#FDFEFE`, Bois thuya `#784212`, Gnaoua `#1D8348`, Sable `#D5DBDB`
- **Signes** : vent permanent, port, remparts, thuya, Gnaoua, filets
- **Données fortes** : force vent, direction vent, humidité, nuages
- **Motifs** : filets génératifs (courbes sinusoïdales), nœuds de vent, vagues suspendues, cordes
- **Fond** : sombre bleu

### 09 — AGADIR `30.4278N / 9.5981W`
- **Titre** : SOUSS SOLAR WEAVE
- **Slogan** : Souss / Soleil, Arganier et Reconstruction
- **Palette** : Jaune solaire `#F4D03F`, Orange `#E67E22`, Vert arganier `#1E8449`, Bleu Atlantique `#2E86C1`, Sable `#FAD7A0`
- **Signes** : Souss, arganier, Atlantique, surf, reconstruction moderne
- **Données fortes** : ensoleillement, température, vent côtier, UV
- **Motifs** : branches organiques, vagues lumineuses, noyau d'argan, grille reconstruite ouverte
- **Fond** : clair ou sable

### 10 — KÉNITRA `34.2610N / 6.5802W`
- **Titre** : SEBOU CORK MATRIX
- **Slogan** : Sebou / Maamora Code
- **Palette** : Vert forêt `#1D6A39`, Brun liège `#7D6608`, Eau `#2E86C1`, Terre `#6E2F1A`, Ivoire `#FDFEFE`
- **Signes** : fleuve Sebou, forêt de Maamora, Mehdia, estuaire, liège
- **Données fortes** : humidité, vent océanique, précipitations, pression
- **Motifs** : veines de bois, lignes fluviales, anneaux de croissance, ondulations humides
- **Fond** : sombre vert

### 11 — MEKNÈS `33.8935N / 5.5473W`
- **Titre** : IMPERIAL OLIVE GRID
- **Slogan** : Bab Mansour / Empire et Oliviers
- **Palette** : Vert olive `#4A5D23`, Pierre `#8D8166`, Or impérial `#C9A84C`, Terre cuite `#8B4513`, Noir `#0A0A0A`
- **Signes** : Bab Mansour, ville impériale, Volubilis, oliviers, pierre
- **Données fortes** : chaleur sèche, pression, vent intérieur, saisonnalité
- **Motifs** : grande porte centrale (symétrie axiale), fragments antiques, trames olive
- **Fond** : sombre terre

### 12 — EL JADIDA `33.2316N / 8.5007W`
- **Titre** : MAZAGAN CISTERN PATTERN
- **Slogan** : Mazagan / Citerne Atlantique
- **Palette** : Bleu citerne `#1F4E79`, Vert-de-gris `#5D7B6F`, Gris pierre `#BDC3C7`, Blanc reflet `#FDFEFE`, Nuit `#0A0A0A`
- **Signes** : cité portugaise, citerne gothique, remparts, bastions, reflets
- **Données fortes** : humidité, vent océanique, nuages, température marine
- **Motifs** : voûtes en grille (arcs croisés), reflets circulaires, miroirs d'eau, géométrie bastions
- **Fond** : sombre bleu-gris

---

## Structure du repo

```
Data-Rug-Protocol/
├── CLAUDE.md                  ← ce fichier (contexte Claude Code)
├── README.md                  ← présentation publique du projet
├── .gitignore
├── _template/
│   └── index.html             ← gabarit HTML commun
├── _references/               ← 5 sketches existants (inspiration)
│   ├── 01_linz_kente/
│   ├── 02_mamounia/
│   ├── 03_linz_eco/
│   ├── 04_marrakech_pulse/
│   └── 05_154_contemporary/
├── docs/                      ← dossier de production PDF/DOCX
├── 01_CASABLANCA/
│   ├── index.html
│   └── mySketch.js
├── 02_RABAT/ ...
...
└── 12_ELJADIDA/
    ├── index.html
    └── mySketch.js
```

---

## Workflow de production (une ville à la fois)
1. Copier `_template/index.html` dans le dossier ville
2. Créer `mySketch.js` en respectant le gabarit technique
3. Tester localement (ouvrir `index.html` dans un navigateur)
4. Vérifier : HUD complet, nom artiste, météo live, légende, MIDI, export
5. Commit + push ville par ville

## Clé API (à placer dans chaque sketch)
```js
let apiKey = "YOUR_OPENWEATHER_KEY"; // à remplacer avant livraison
```

## Livraison finale par ville
- `index.html` + `mySketch.js` (interactif web)
- PNG HD 6000px (export `saveCanvas`)
- MP4 loop (capture)
- Cartel FR/AR

---
*Kamel Ghabte — artiste numérique — AR/VR/XR — Data Art — Maroc & France*
*kamelghabte.me*
