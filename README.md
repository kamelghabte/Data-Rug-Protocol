# DATA RUG PROTOCOL — MAROC 12 ANTENNES

**Kamel Ghabte** — Artiste numérique — AR/VR/XR — Data Art — Maroc & France

---

> *"Une donnée devient un fil. Un climat devient un motif. Une ville devient un tapis. Un réseau devient une œuvre."*

---

## Concept

**DATA RUG PROTOCOL — MAROC 12 ANTENNES** transforme le réseau des Instituts Français du Maroc en un métier à tisser climatique. 12 œuvres génératives site-specific, une par ville, où les données météo locales en temps réel pilotent un algorithme de tissage inspiré du patrimoine artisanal marocain.

Chaque ville possède son identité visuelle propre — palette, motifs, signes culturels — mais toutes appartiennent à la même famille formelle : une série cohérente, un protocole commun.

---

## 12 Villes / 12 Œuvres

| # | Ville | Titre | Signes |
|---|-------|-------|--------|
| 01 | Casablanca | WHITE NOISE ATLANTIC | Art déco, Atlantique, flux urbains |
| 02 | Rabat | OUDAYAS GREEN CODE | Oudayas, Tour Hassan, Bouregreg |
| 03 | Fès | THE BLUE MEDINA ALGORITHM | Médina, tanneries, zellige |
| 04 | Marrakech | OCHRE HEAT PULSE | Remparts, Koutoubia, Jemaa El-Fna |
| 05 | Tanger | STRAIT SIGNAL | Détroit de Gibraltar, port, horizon |
| 06 | Tétouan | ANDALUSIAN WHITE MATRIX | Médina andalouse, broderies du Nord |
| 07 | Oujda | GHARNATI WIND PATTERN | Gharnati, Reggada, frontière |
| 08 | Essaouira | MOGADOR WIND LOOM | Vent, thuya, Gnaoua, filets |
| 09 | Agadir | SOUSS SOLAR WEAVE | Arganier, Atlantique, reconstruction |
| 10 | Kénitra | SEBOU CORK MATRIX | Sebou, forêt de Maamora, liège |
| 11 | Meknès | IMPERIAL OLIVE GRID | Bab Mansour, Volubilis, oliviers |
| 12 | El Jadida | MAZAGAN CISTERN PATTERN | Citerne portugaise, bastions, reflets |

---

## Architecture technique

- **Moteur** : [p5.js](https://p5js.org/) v1.11.11
- **Data** : [OpenWeather API](https://openweathermap.org/api) — température, humidité, vent, pression
- **Mapping** : `temp` → couleur · `humidity` → densité motif · `wind` → vitesse auto-pilot
- **Interaction** : MIDI input · mouse · auto-pilot continu
- **Export** : PNG HD automatique à chaque cycle complet

Chaque œuvre est un fichier `index.html` + `mySketch.js` — ouvrable directement dans un navigateur.

---

## Structure

```
01_CASABLANCA/   02_RABAT/   03_FES/   04_MARRAKECH/
05_TANGER/       06_TETOUAN/ 07_OUJDA/ 08_ESSAOUIRA/
09_AGADIR/       10_KENITRA/ 11_MEKNES/ 12_ELJADIDA/
_references/     _template/  docs/
```

---

## Commission

Institut Français du Maroc (IFM) — 12 antennes  
Casablanca · Rabat · Fès · Marrakech · Tanger · Tétouan · Oujda · Essaouira · Agadir · Kénitra · Meknès · El Jadida

---

**Kamel Ghabte**  
[kamelghabte.me](https://kamelghabte.me) — artiste numérique / AR · VR · XR · Data Art · Creative Coding · Maroc & France
