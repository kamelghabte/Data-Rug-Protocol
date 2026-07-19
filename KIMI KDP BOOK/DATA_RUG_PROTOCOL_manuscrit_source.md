<div class="titlepage">

DATA RUG PROTOCOL

*Tisser le climat*

Pour une matérialisation de la donnée environnementale — art, donnée et conscience écologique : douze tapis climatiques pour le Maroc

Kamel Ghabte

2026

</div>

<div class="copyright">

DATA RUG PROTOCOL — Tisser le climat

Pour une matérialisation de la donnée environnementale

© 2026 Kamel Ghabte

Tous droits réservés. Aucune partie de cet ouvrage ne peut être reproduite, stockée ou transmise sous quelque forme que ce soit sans l'autorisation écrite de l'auteur, hors courtes citations dans un cadre critique ou académique.

Les œuvres de la série *Data Rug Protocol — Maroc 12 Antennes* sont une commande de l'Institut Français du Maroc, présentée dans le cadre de Novembre Numérique 2026.

Les relevés génératifs reproduits dans cet ouvrage sont des interprétations plastiques réalisées par l'auteur à partir du protocole ; les œuvres elles-mêmes sont vivantes, temps réel, et ne coïncident jamais deux fois avec aucune image imprimée.

Données climatologiques : Banque mondiale (World Bank Open Data), IRES, IMIS, Ministère de l'Équipement et de l'Eau du Royaume du Maroc.

Dépôt légal : 2026 — ISBN : à pourvoir

www.kamelghabte.me

</div>

# Résumé {.front}

Cet ouvrage est la première monographie consacrée au *Data Rug Protocol*, protocole artistique et technique conçu par l'artiste numérique Kamel Ghabte : une série de douze œuvres génératives site-specific, une par ville marocaine, où les données météorologiques locales en temps réel — température, humidité, vent — pilotent un algorithme de tissage inspiré du patrimoine artisanal (zellige, tapis, géométrie sacrée). Il propose une théorie de la **matérialisation de la donnée environnementale** : là où la visualisation classique représente, le tapis de données *incarne* — le flux climatique devient matière première d'un tissage sans fin. L'ouvrage articule trois moments : un état des lieux (crise hydrique du Maroc, histoire du couple tissage-calcul, champ de l'art des données), une description exhaustive du protocole (architecture logicielle, grammaire plastique, douze œuvres, dispositifs d'exposition, passage au tapis physique en laine et teintures végétales) et une discussion de sa portée (conscience écologique, low-tech, géographie de la donnée, économie circulaire de l'art). Il s'adresse aux chercheurs en arts numériques et en humanités environnementales, aux commissaires d'exposition, aux ingénieurs créatifs — et à toute personne convaincue que la donnée climatique mérite mieux qu'un graphique : un corps, une matière, une mémoire.

**Mots-clés** : art génératif ; data art ; matérialisation de la donnée ; conscience écologique ; stress hydrique ; patrimoine marocain ; tissage ; p5.js ; temps réel ; low-tech ; Maroc.

# Abstract {.front}

This book is the first monograph on the *Data Rug Protocol*, an artistic and technical protocol by Moroccan-French digital artist Kamel Ghabte: twelve site-specific generative artworks, one per Moroccan city, in which real-time local weather data — temperature, humidity, wind — drive a weaving algorithm inspired by craft heritage (zellige, carpets, sacred geometry). It develops a theory of **environmental data materialization**: where classical visualization *represents*, the data rug *embodies* — the climate flow becomes the raw matter of an endless weaving. The book moves through three stages: a state of the art (Morocco's water crisis, the woven history of computing, the field of data art), an exhaustive account of the protocol (software architecture, visual grammar, the twelve artworks, exhibition devices, the transition to physical wool rugs with plant-based dyes), and a discussion of its stakes (ecological awareness, low-tech ethics, the geography of data, circular economy in art). It addresses researchers in digital arts and environmental humanities, curators, creative engineers — and anyone convinced that climate data deserves more than a chart: a body, a matter, a memory.

**Keywords**: generative art; data art; data materialization; ecological awareness; water stress; Moroccan heritage; weaving; p5.js; real-time; low-tech; Morocco.

# Avant-propos {.front}

Ce livre naît d'une conviction simple : **la crise écologique est d'abord une crise de la perception.** Nous savons tout — les courbes, les seuils, les projections — et nous ne voyons rien. Le chiffre reste abstrait tant qu'il n'a pas de corps.

Depuis vingt ans, je fabrique des machines à voir : des cubes augmentés où la danse devient lumière, des plantes dont les micro-courants deviennent musique, des villes dont la météo devient tapis. Le *Data Rug Protocol* est l'aboutissement provisoire de ce chemin : douze villes du Maroc reliées par un même geste — prendre la donnée météorologique de l'instant, et la tisser.

Pourquoi le tapis ? Parce que le métier à tisser est le premier ordinateur de l'histoire, et que le Maroc est l'une de ses plus belles mémoires. Parce qu'un tapis ne se consulte pas : il s'habite. Parce que la laine garde la trace du temps qui passe, exactement comme le climat garde la trace de nos actes.

Ce livre est à la fois une monographie, une méthode et un manifeste. Il décrit le protocole dans son entier — le code, les palettes, les douze villes — parce qu'un protocole ne vaut que s'il est transmissible. Il le situe dans une généalogie — Jacquard, Anni Albers, la data physicalization, l'art climatique — parce qu'aucune œuvre ne naît ex nihilo. Et il défend une thèse : face à l'effondrement qui ne se voit pas, l'art ne doit plus *représenter* la donnée environnementale, il doit la *matérialiser*.

Que ce livre se lise comme on regarde un tapis se tisser : patiemment, en suivant le fil.

*Kamel Ghabte, Bordeaux — Casablanca, juillet 2026*

# Introduction générale {.front}

## Une donnée devient un fil

Il y a des phrases qui tiennent en trois lignes et qui contiennent un programme de travail de dix ans :

> Une donnée devient un fil.
> Un climat devient un motif.
> Une ville devient un tapis.

Cette formule, née au fil des résidences et des prototypes, est devenue la devise du *Data Rug Protocol*. Elle condense le geste de l'œuvre : prendre ce qui est le plus abstrait — une température mesurée par une station météorologique, transmise par une API, chiffrée en dixièmes de degré — et le rendre aussi concret qu'un fil de laine passé dans une trame.

## La question de recherche

L'ouvrage part d'un paradoxe documenté par les sciences de l'environnement comme par la psychologie : jamais l'humanité n'a disposé d'autant de données sur l'état du vivant, et jamais cette connaissance n'a si peu transformé les conduites. Timothy Morton a forgé le concept d'« hyperobjet » pour désigner ces entités — le climat, l'océan, la radioactivité — trop vastes dans le temps et l'espace pour être saisies directement [1]. Paul Edwards a montré que notre savoir climatique est intégralement médié par une « vaste machine » de capteurs, de modèles et d'infrastructures de données [2]. Autrement dit : nous ne percevons le dérèglement que sous forme de chiffres, et les chiffres ne font pas événement.

La question qui traverse ce livre peut alors s'énoncer ainsi : **comment faire passer la donnée environnementale du régime de l'information au régime de l'expérience ?** Et, corollaire pratique : quels dispositifs, quelles grammaires plastiques, quelles économies de production permettent à une œuvre d'art numérique d'y répondre sans trahir ni la rigueur de la donnée, ni la force de la matière ?

## La thèse : matérialiser plutôt que représenter

Notre réponse est une proposition de méthode autant qu'une œuvre : la **matérialisation de la donnée**. Le terme est choisi contre « visualisation ». La visualisation suppose un écran entre le monde et nous ; elle illustre la donnée. La matérialisation, elle, donne à la donnée un comportement de matériau : elle se tisse, se densifie, s'accélère, fatigue, meurt et renaît. Dans le *Data Rug Protocol*, la température n'est pas une légende de couleur — elle *est* la couleur. L'humidité n'est pas une échelle — elle *est* la densité du motif. Le vent n'est pas un paramètre — il *est* la vitesse de la navette. La donnée cesse d'être expliquée ; elle est travaillée, comme l'artisan travaille la laine.

Cette position s'inscrit dans le champ émergent de la *data physicalization* identifié par Yvonne Jansen, Pierre Dragicevic et leurs collègues en 2015 [13], mais elle y ajoute trois déplacements qui font l'originalité du protocole : la matérialisation est **temporelle** (l'œuvre se déroule en continu, elle n'est jamais deux fois la même), **territoriale** (chaque œuvre est le portrait d'une ville précise, reliée à ses capteurs) et **transmissible** (la matrice tissée peut quitter l'écran pour être réalisée en laine par des coopératives artisanales — la donnée devient économie).

## Méthode et plan

Ce livre procède en trois parties, du contexte vers l'outil, puis de l'outil vers la portée.

La **première partie** — *La donnée, le fil, la crise* — établit les fondations. Le chapitre 1 décrit l'objet que l'œuvre prend à bras-le-corps : l'invisibilité du dérèglement climatique, et son épicentre hydrique marocain, où la dotation en eau par habitant est passée d'environ 2 560 m³ en 1960 à près de 620 m³ en 2020 [3]. Le chapitre 2 remonte la généalogie du couple tissage-calcul, de Jacquard à Anni Albers. Le chapitre 3 situe le protocole dans le champ de l'art des données : visualisation, physicalization, sonification, et les précédents qui ont fait date, des *Warming Stripes* d'Ed Hawkins aux travaux réunis sous le terme d'art climatique [7][8][9][17].

La **deuxième partie** — *Le protocole* — est la monographie technique. Le chapitre 4 définit ce qu'est une œuvre-protocole, dans la lignée de Sol LeWitt et de l'art génératif. Le chapitre 5 en décrit la grammaire : la grille, les cinq navettes, les correspondances données-matière, les régimes jour/nuit/tempête. Le chapitre 6 est le catalogue raisonné des douze œuvres, une par ville, avec six études de cas illustrées de relevés génératifs. Le chapitre 7 décrit l'archipel : le réseau des douze antennes de l'Institut Français du Maroc comme métier à tisser distribué, les dispositifs d'exposition, et le passage de la matrice numérique au tapis de laine.

La **troisième partie** — *Portée* — discute ce que l'œuvre prétend changer. Le chapitre 8 traite de la conscience écologique comme expérience esthétique. Le chapitre 9 aborde les questions de géographie de la donnée, de sobriété numérique et de patrimoine comme futur. Le chapitre 10 formule le manifeste en dix thèses. Une conclusion et un épilogue ouvrent sur la généralisation du protocole à d'autres territoires.

Les annexes rassemblent le catalogue technique des douze œuvres, l'architecture logicielle commentée, les données climatiques de référence, un glossaire et la bibliographie.

## Une note sur les images

Une œuvre temps réel ne peut pas être *reproduite* : toute image n'en est qu'un relevé — ce que la botanique est à la plante. Les planches de ce livre sont donc présentées comme des **relevés génératifs** : des captures d'état du protocole, conformes à sa grammaire et à ses palettes, et non comme les œuvres elles-mêmes, qui continuent de se tisser, quelque part, au rythme du vent de Casablanca, de Fès ou d'Essaouira.

# PARTIE I — FONDEMENTS {.part}

LA DONNÉE, LE FIL, LA CRISE

*« Nous ne percevons le dérèglement que sous forme de chiffres, et les chiffres ne font pas événement. »*

# Chapitre 1 · La crise qui ne se voit pas

## 1.1 L'hyperobjet et le déficit de perception

Le changement climatique est, à l'échelle d'une vie humaine, quasiment imperceptible. Une hausse de 1,5 °C en un siècle ne se sent pas sur la peau un matin d'été ; une nappe phréatique qui baisse d'un mètre par an ne fait pas de bruit. Timothy Morton a proposé le terme d'« hyperobjet » pour nommer ces réalités massives, distribuées dans le temps et l'espace, qui nous environnent sans jamais se donner à voir en entier [1]. L'hyperobjet climatique a une propriété redoutable : il n'apparaît jamais que par ses symptômes locaux — une sécheresse ici, une inondation là — dont le lien de causalité reste invisible à l'œil nu.

Paul Edwards a complété ce diagnostic du côté de l'infrastructure : tout ce que nous savons du climat nous vient d'une « vaste machine » — réseaux de stations, satellites, modèles numériques, centres de calcul [2]. Nous ne voyons pas le climat ; nous voyons des *données* sur le climat. La connaissance est immense, précise, vérifiable — et phénoménologiquement inerte. Un rapport peut contenir mille tableaux exacts et ne produire aucun frisson.

C'est ce hiatus que les sciences cognitives confirment : l'information statistique mobilise faiblement l'émotion, et l'émotion est le moteur de l'action. La crise écologique est ainsi, d'abord, une **crise de la traduction** : entre le régime de la donnée (exacte, abstraite, froide) et le régime de l'expérience (approximative, incarnée, chaude), le pont manque. C'est précisément là que l'art a un rôle à jouer — non comme illustration pédagogique du savoir, mais comme opérateur de perception.

## 1.2 Le Maroc, épicentre hydrique

Nulle part cette urgence n'est plus concrète qu'au Maroc. Le royaume fait partie des pays du monde les plus exposés au stress hydrique, dans une région MENA qui concentre, selon la Banque mondiale, la majorité des États passés sous le seuil de pénurie [3]. Les faits, d'abord.

En 1960, le Maroc disposait d'environ 2 560 m³ d'eau renouvelable par habitant et par an. En 2020, ce chiffre était tombé à près de 620 m³ [3]. L'indicateur de la Banque mondiale — ressources internes renouvelables en eau douce par habitant (ER.H2O.INTR.PC) — confirme la tendance sur la période récente : 818 m³ en 2017, 776,9 m³ en 2022 [25]. L'échelle de référence est celle de l'indice de Falkenmark : en dessous de 1 700 m³ par habitant et par an, un pays entre en stress hydrique ; sous 1 000 m³, en pénurie ; sous 500 m³, en pénurie absolue [6]. À trajectoire constante, le royaume franchirait le seuil des 500 m³ entre 2035 et 2040 selon le Ministère de l'Équipement et de l'Eau — soit dans la décennie où ce livre paraît [11].

![Figure 1 — Maroc : effondrement de la dotation en eau par habitant, 1960-2040. Sources : Banque mondiale (note technique *Pénurie d'eau et sécheresses*, 2023 ; World Bank Open Data, ER.H2O.INTR.PC), IRES (2021), Ministère de l'Équipement et de l'Eau (2025).](fig/fig_eau_maroc.png){width=100%}

Derrière la courbe, une cascade de ruptures. Les apports annuels, estimés à 22 milliards de m³ jusqu'à la fin des années 1970, sont passés sous les 15 milliards, et n'ont guère dépassé 5 milliards en moyenne sur les années 2018-2025 [5][11]. Le royaume a connu six années consécutives de sécheresse — la plus longue séquence de son histoire contemporaine [11]. L'agriculture mobilise près de 89 % de la demande en eau du pays [4]. Dans le Souss, 40 000 hectares sont devenus inexploitables par salinisation des sols, conséquence de la surexploitation des nappes [11]. En janvier 2024, le taux de remplissage national des barrages ne dépassait plus 24 %, contre près de 50 % cinq ans plus tôt [5]. L'année 2023 a été la plus chaude jamais enregistrée au Maroc, avec une anomalie thermique de +1,8 °C par rapport à la normale 1981-2010 [5]. La Banque mondiale estime que la pénurie d'eau et le dérèglement pourraient coûter jusqu'à 6,5 % du PIB à long terme, et pousser 1,9 million de ruraux vers les villes à l'horizon 2050 [3].

Ces chiffres sont publics, vérifiables, terrifiants — et largement inopérants sur l'imaginaire. C'est contre cette inopérance que le *Data Rug Protocol* est construit : prendre les paramètres mêmes de cette crise — la chaleur, la sécheresse de l'air, le vent — et les rendre présents, continus, habitables.

## 1.3 L'art face à l'indicible

L'art contemporain a mis du temps à saisir l'objet climatique. Joanna Nurmis, dans sa synthèse sur l'art visuel du climat entre 2005 et 2015, distingue les œuvres qui *documentent* (photographie de catastrophe, paysages industriels) de celles qui *traduient* la donnée en expérience sensible [7]. Malcolm Miles pose la question frontalement : représenter la nature à l'ère de sa destruction ne risque-t-il pas de la « normaliser » — de faire du désastre un spectacle de plus ? [8] Gabriella Giannachi, analysant les pratiques qui représentent, *performent* ou *atténuent* le changement climatique, identifie une seconde catégorie d'œuvres : celles qui font *éprouver* le phénomène, souvent par des environnements immersifs, plutôt que de le montrer [9].

Cette généalogie tranche avec une tradition plus ancienne de l'art engagé : l'œuvre climatique efficace n'est pas un slogan, c'est un **dispositif de perception**. T. J. Demos parle, à propos de l'art de l'écologie politique, de pratiques qui « décolonient la nature » — qui refusent la nature comme décor ou comme ressource pour la rétablir comme acteur [20]. Donna Haraway invite à « rester avec le trouble » (*staying with the trouble*) : ni déni ni catastrophisme, mais attention soutenue aux enchevêtrements du vivant [21]. Bruno Latour, enfin, a donné à cette génération d'artistes sa boussole : « atterrir », c'est-à-dire redescendre de l'abstraction globale vers les territoires sensibles [22].

Le *Data Rug Protocol* se réclame de cette lignée, avec une spécificité : il ne montre pas la crise, il **tisse le climat lui-même**. L'œuvre n'illustre pas un rapport sur l'eau ; elle est alimentée, seconde après seconde, par l'état réel de l'atmosphère de sa ville. La crise n'est pas son sujet : elle est sa matière.

# Chapitre 2 · Le fil et le code

## 2.1 Jacquard, 1801 : le premier ordinateur

Il y a une ironie historique que le *Data Rug Protocol* assume pleinement : le premier ordinateur de l'histoire est un métier à tisser. En 1801, Joseph-Marie Jacquard perfectionne à Lyon un métier dont le motif n'est plus fixé par la main du tisserand mais par une chaîne de **cartes perforées** : chaque carte contrôle, rang après rang, la levée ou non des fils de chaîne — une instruction binaire, perforée ou non, exécutée par la machine [10]. Le motif est devenu un programme ; le programme, un objet séparable de la machine, stockable, transmissible, modifiable — ce que nous appellerions un fichier.

La filiation est documentée : les cartes de Jacquard inspirent les machines à calculer de Babbage, et c'est en commentant le travail de ce dernier qu'Ada Lovelace écrit, en 1843, ce qui est tenu pour le premier algorithme publié de l'histoire — en explicitant que la machine analytique « tisserait des motifs algébriques comme le métier de Jacquard tisse des fleurs et des feuilles » [10]. James Essinger a raconté cette chaîne dans *Jacquard's Web* : du métier lyonnais aux cartes perforées de l'informatique IBM du XXe siècle, le fil mène au code [10].

Sadie Plant, dans *Zeros and Ones*, a tiré la conséquence culturelle de cette généalogie : l'informatique a une **matrice textile et féminine** — tisseuses, brodeuses, « computers » humains des années 1940 — que l'histoire officielle, masculine et militaire, a recouverte [18]. Revenir au tissage pour faire de l'art numérique n'est donc pas une métaphore nostalgique : c'est un retour à l'origine. Quand le *Data Rug Protocol* tisse de la donnée, il ne détourne pas la technologie vers l'artisanat ; il reconnecte la technologie à sa propre source.

## 2.2 Anni Albers : le tissage comme pensée

Si Jacquard fournit la généalogie technique, Anni Albers fournit la légitimité esthétique. Dans *On Weaving* (1965), la grande artiste du Bauhaus défend le tissage comme une **forme de pensée** à part entière : une pensée de la structure, où le sens naît de l'entrelacement de deux systèmes orthogonaux — la chaîne (la tension, l'ordre vertical, le donné) et la trame (le passage, l'événement horizontal, le geste) [12]. Le tissage est pour Albers le modèle même d'une création contrainte par une logique — et rendue libre par cette contrainte.

Cette leçon est capitale pour l'art des données. La donnée, dans le *Data Rug Protocol*, joue le rôle de la chaîne : une structure tendue, régulière, venue du monde (les mesures de la station météo). Le motif généré joue le rôle de la trame : l'événement qui passe, varie, orne, dévie. L'œuvre est exactement ce qu'Albers décrivait : la renégociation permanente d'un ordre et d'un geste. Et comme chez Albers, la répétition n'y est pas monotonie mais rythme — chaque rang est le même et différent, comme les jours d'une ville sous le même climat.

## 2.3 Le Maroc, mémoire du tissage

Le choix du tapis n'est pas seulement conceptuel : il est territorial. Le Maroc possède l'une des cultures textiles les plus riches du monde — tapis berbères du Moyen et du Haut Atlas, hanbels, kilims, zelliges des médinas de Fès et de Meknès, broderies du Nord, thuya d'Essaouira. Chaque région y a développé un **vocabulaire de signes** — losanges, chevrons, étoiles, zigzags — qui fonctionne exactement comme un système d'écriture : les motifs y codent l'identité d'une tribu, d'une ville, d'une histoire.

Le zellige, en particulier, offre au générativiste un modèle accompli : une géométrie de pavage où des formes simples — l'étoile à huit branches (*khatam*), l'octogone, le croisillon — engendrent par répétition et variation des champs d'une complexité infinie, produites par des artisans (*maâlems*) travaillant en équipe sur un même chantier. Le protocole retiendra cette image : dans le code, cinq « navettes » posent leurs tuiles simultanément, **comme cinq artisans zellij sur un même mur** (voir chapitre 5).

Cette culture est aussi une économie vivante : des coopératives, majoritairement féminines, perpétuent la production de tapis en laine naturelle et teintures végétales. Le projet prévoit dès l'origine que la matrice générée puisse leur être transmise pour exécution (chapitre 7) : la boucle serait alors complète — la donnée devient fil, le fil devient motif, le motif redevient laine. L'art numérique le plus avancé se mettrait au service du geste le plus ancien, et non l'inverse.

# Chapitre 3 · De la visualisation à la matérialisation

## 3.1 Les limites de la dataviz

La visualisation de données est devenue, en vingt ans, la langue par défaut du réel chiffré : courbes, cartes choroplèthes, dashboards. Son efficacité cognitive est réelle — et sa neutralité est un mythe. Mitchell Whitelaw l'a souligné dès 2008 dans un texte devenu classique, *Art Against Information* : la dataviz standard aspire à une transparence qui évacue le corps, le doute et la matière des données ; elle prétend que la donnée « parle d'elle-même », alors qu'elle est toujours cadrée, réduite, lissée [24]. Lev Manovich avait auparavant identifié la « base de données » comme la forme culturelle dominante de l'ère numérique — une collection sans récit [23].

Face à cela, une génération d'artistes a pratiqué ce que Whitelaw appelle une **pratique critique de la donnée** : non plus optimiser la lisibilité, mais rendre sensible la matérialité du flux — sa densité, son bruit, sa durée. C'est dans ce sillage que se situe notre protocole, avec une ambition supplémentaire : sortir la donnée de l'écran-illustration pour en faire un *matériau de fabrication*.

## 3.2 La data physicalization

Le tournant théorique est venu en 2015, lorsque Yvonne Jansen, Pierre Dragicevic, Petra Isenberg et leurs collègues ont publié *Opportunities and Challenges for Data Physicalization*, identifiant un champ de recherche nouveau : les artefacts **physiques** dont la géométrie ou les propriétés matérielles encodent des données [13]. Là où la visualisation projette la donnée sur l'écran, la physicalization l'incarne dans la matière — avec des propriétés nouvelles : on peut la toucher, s'en entourer, l'habiter.

Les travaux ultérieurs ont affiné le champ : Sheelagh Bae et ses collègues en ont cartographié l'espace de conception interdisciplinaire (2022) [14] ; Eva Hornecker, Trevor Hogan, Uta Hinrichs et leurs collègues en ont proposé un vocabulaire de conception (2023) [15]. Le *Data Rug Protocol* dialogue avec ce champ mais s'en distingue sur trois points, qui constituent sa contribution propre :

1. **La physicalization y est continue et vivante.** La plupart des physicalizations sont statiques — un objet figé à un instant T. Ici, l'artefact est un *processus* : le tapis se tisse en permanence, et chaque cycle archivé est un horodatage du climat.
2. **La matière première y est un patrimoine.** Le langage formel n'est pas inventé ex nihilo : il est emprunté au répertoire textile et ornemental marocain — la donnée s'exprime dans une grammaire culturelle située.
3. **La physicalization y est réversible en production.** La matrice numérique peut retourner à la matière littérale — laine, teintures végétales — par le travail des coopératives. La boucle information-matière-économie est complète.

## 3.3 La sonification : le pendant sonore

La matérialisation n'est pas que visuelle. La **sonification** — traduction de données en son — forme un champ voisin, doté depuis 2011 d'un manuel de référence, *The Sonification Handbook* de Thomas Hermann, Andy Hunt et John Neuhoff [16]. L'oreille perçoit ce que l'œil rate : les régularités dans le temps, les micro-variations, les rythmes.

Ce versant est, dans le parcours de l'auteur, antérieur au tapis : le projet de **Bio Data Sonification** (Casablanca, Smart City, 2022-2023 ; Anfa Park, 2023) captait par électrodes les micro-courants de plantes locales — photosynthèse, respiration, absorption — pour les convertir en notes MIDI et en paysages sonores ; l'album *Vibrations Botaniques : Odyssée Sonore au Maroc* en prolonge la recherche en dix méditations d'une heure. Le principe est le même que celui du tapis : rendre sensible un processus du vivant ordinairement inaudible, sans le dénaturer. Le fil et la note sont deux noms du même geste — et le chapitre 8 reviendra sur ce que ces deux modalités se renforcent mutuellement dans une écologie de l'attention.

## 3.4 Précédents et contemporains

Aucune œuvre n'arrive seule. Quatre références jalonnent le paysage dans lequel le *Data Rug Protocol* prend place.

**Les *Warming Stripes* d'Ed Hawkins (2018).** Le climatologue britannique a réduit la courbe du réchauffement à une série de bandes bleues et rouges, une par année — un code couleur sans axes ni chiffres, devenu un signe de ralliement mondial, reproduit sur des maillots de football, des façades, des cravates [17]. Leçon : une donnée climatique peut devenir **motif** — et le motif, parce qu'il est beau et réplicable, voyage infiniment plus loin que le graphique. Le tapis climatique radicalise ce geste : là où Hawkins fige 170 ans dans une image, le protocole tisse l'instant présent, sans fin.

**L'art climatique immersif.** Les travaux recensés par Giannachi — environnements où le spectateur éprouve physiquement la donnée (chaleur, brume, lumière pilotée) — ont démontré la puissance du régime expérientiel [9]. Le protocole en retient l'exigence : l'œuvre doit se *habiter*, pas se lire.

**L'art conceptuel des instructions.** Sol LeWitt écrivait en 1967 que dans l'art conceptuel, « l'idée ou le concept est l'aspect le plus important de l'œuvre », et que l'exécution peut être confiée à d'autres selon des instructions [19]. Le *Data Rug Protocol* est au sens strict un *wall drawing* climatique : un protocole d'instructions exécuté par une machine — et demain par des mains de tisserandes.

**Les généalogies africaines.** La série s'inscrit dans une lignée que l'auteur a commencée avec *Accra Kente API* (Afric'Artech) — données ghanéennes tissées dans la grammaire du kente — puis *Linz Protocol* (Ars Electronica Garden). Le Maroc 12 Antennes en est le premier déploiement à l'échelle d'un territoire national complet.

# PARTIE II — LE PROTOCOLE {.part}

LA MONOGRAPHIE TECHNIQUE

*« Un protocole ne vaut que s'il est transmissible. »*

# Chapitre 4 · Une œuvre-protocole

## 4.1 Définir le protocole artistique

On appellera ici **protocole artistique** un système de règles explicites — sources, correspondances, contraintes, cycles — dont l'exécution produit l'œuvre, sans que l'artiste choisisse le résultat au coup par coup. La notion a une histoire : les *instructions* de Sol LeWitt [19], les partitions ouvertes de la musique expérimentale, l'art génératif où, selon la définition communément admise, l'artiste cède une part du contrôle à un système autonome. Le protocole ajoute à l'art génératif classique deux obligations : l'**ouverture** (les règles sont publiques, documentées, exécutables par d'autres) et la **prise sur le réel** (le système est alimenté non par du hasard interne, mais par des capteurs du monde).

Le *Data Rug Protocol* est un protocole en ce double sens. Il est ouvert : le code source des douze œuvres est publié, chaque ville est un fichier autonome de quelques centaines de lignes, et la présente monographie en donne la grammaire complète. Et il prend sur le réel : aucune image n'existe avant que la station météorologique de la ville n'ait répondu.

## 4.2 Site-specific et temps réel

Deux qualificatifs structurent le projet. **Site-specific** : chaque œuvre n'existe que pour une ville — sa palette (puisée dans sa lumière et sa matière : l'ocre des remparts de Marrakech, le bleu de Fès, le vert des Oudayas), ses motifs (arcades du Habous, filets d'Essaouira, citerne d'El Jadida), et surtout *ses* capteurs. Un tapis de Casablanca ne peut pas être exposé à Tanger : il ne signifierait rien. **Temps réel** : l'œuvre est synchrone de sa ville. Quand le vent se lève sur la Corniche, la navette accélère dans le hall de l'Institut Français ; quand la nuit tombe, la palette bascule en mode nocturne. L'œuvre n'est pas *à propos* de la ville : elle est *branchée* dessus.

Cette double contrainte tranche avec la logique habituelle de l'œuvre d'art — unique, transportable, autonome. Ici, l'unicité est temporelle (chaque instant du tissage est unique) plutôt qu'objectale ; la mobilité est celle du protocole, pas de l'instance ; l'autonomie est celle du système, pas de l'image. Le collectionneur n'acquiert pas une image mais un **horodatage** : le relevé PNG haute définition d'un cycle complet, généré automatiquement à la fin de chaque trame — la capture du climat de sa ville à un instant T, avec ses métadonnées.

## 4.3 La donnée comme matériau

La chaîne opératoire est volontairement simple, robuste, documentée (figure 2). Une station météorologique mesure en continu la température de l'air, l'humidité relative et la vitesse du vent de la ville. Ces mesures sont servies par l'API OpenWeather, interrogée par l'œuvre toutes les dix minutes [26]. Le moteur de tissage — écrit en p5.js, la bibliothèque JavaScript du Processing qui a démocratisé le creative coding — traduit ces valeurs en décisions plastiques selon la grammaire décrite au chapitre 5, et tisse la trame tuile après tuile, en continu, sous les yeux du public.

![Figure 2 — Chaîne opératoire du protocole : de la donnée météorologique au tapis, physique ou numérique. Réalisation : l'auteur.](fig/fig_protocole.png){width=100%}

Trois propriétés de cette architecture méritent d'être soulignées.

**La simplicité est une éthique.** Pas d'infrastructure propriétaire, pas de moteur 3D gourmand, pas d'intelligence artificielle opaque : une API publique, un navigateur, un fichier texte. L'œuvre peut tourner sur une machine modeste, dans une borne autonome, hors des centres — c'est la condition de son déploiement dans douze antennes et, demain, en itinérance low-tech (chapitres 7 et 9).

**La panne est prévue.** Si le réseau tombe, l'œuvre ne s'arrête pas de respirer : elle conserve les dernières valeurs connues et poursuit son tissage, en signalant discrètement l'âge de la donnée dans son interface. Une œuvre branchée sur le réel doit survivre aux déconnexions du réel — la robustesse fait partie de la forme.

**La donnée n'est jamais décorée.** Chaque paramètre météorologique pilote une décision plastique réelle, et rien d'autre : il n'y a ni animation gratuite, ni effet de style sans source. Cette austérité est la clause de vérité du protocole — ce qui distingue un tapis de données d'une visualisation illustrée.

# Chapitre 5 · La grammaire du tissage génératif

## 5.1 La grille et les cinq navettes

L'œuvre est une grille : 18 colonnes, 22 rangées — 396 cases, soit la trame d'un cycle. Ce format, proche des proportions d'un tapis de prière, est constant pour les douze villes : c'est l'unité formelle de la série, ce qui fait famille.

Sur cette trame travaillent **cinq navettes simultanées**. La métaphore est assumée jusqu'au code : comme cinq artisans zellij sur un même chantier, chacune a sa trajectoire propre et sa cadence. La première serpente de ligne en ligne (*SNAKE*) — le geste classique de la trame. La deuxième avance en diagonales (*DIAGONAL*) — le rythme des vagues. La troisième remonte le tapis depuis la fin (*REVERSE*) — le contrepoint, la main gauche. La quatrième saute une case sur trois (*SKIP*) — la syncope. La cinquième part du centre en spirale (*SPIRAL*) — le rayonnement (*dawwama*) cher à l'ornementation sacrée (figure 3).

![Figure 3 — Les cinq navettes : ordres de parcours de la trame (grille simplifiée 12 × 14). Réalisation : l'auteur, d'après le code source des œuvres.](fig/fig_navettes.png){width=100%}

À chaque instant, cinq tuiles sont donc posées simultanément, à cinq endroits du tapis, selon cinq logiques. Le résultat n'est jamais prévisible dans le détail — les navettes se croisent, se superposent, se recouvrent parfois — et toujours cohérent dans la grammaire. C'est exactement la structure d'un chantier de zellige : personne ne décide de l'ensemble, et l'ensemble advient. La génération complète des 396 cases constitue un **cycle** ; à la fin du cycle, l'œuvre exporte automatiquement le relevé PNG haute définition (6000 px), horodaté, puis réinitialise la trame et repart. Le tapis ne finit jamais : il s'achève et recommence, comme les jours.

## 5.2 Les correspondances : température, humidité, vent

Le cœur du protocole est sa table de correspondances — ce que la sémiotique appellerait son système de signes, et la science des données son *mapping*. Trois paramètres, trois décisions plastiques (figure 4).

![Figure 4 — Grammaire de correspondance du protocole : température → chromie ; humidité → densité ; vent → vitesse de navette. Réalisation : l'auteur.](fig/fig_mapping.png){width=100%}

**Température → chromie.** La température de l'air choisit la couleur dans la palette propre à la ville, sur un axe qui va du froid minéral au feu solaire : bleus profonds et turquoises pour les matins frais, blancs plâtre aux chaleurs douces, ocres et terracotta brûlée aux canicules. C'est une **thermo-colorimétrie** : la couleur devient un thermomètre que l'œil apprend à lire sans échelle — exactement comme, dans les *Warming Stripes*, le rouge finit par signifier sans légende [17].

**Humidité → densité.** Le taux d'humidité règle la complexité du motif : air sec, trame épurée, grands aplats de tuiles simples ; air saturé, motifs foisonnants, doubles ornements, cases surchargées. La brume atlantique de Casablanca (*chbab*) produit des tapis denses ; la sécheresse continentale d'Oujda, des tapis aérés. L'œil du visiteur, sans aucune médiation verbale, *sent* l'humidité de la ville.

**Vent → vitesse.** La force du vent règle la cadence des navettes : plus il souffle, plus le tapis se tisse vite. C'est la correspondance la plus spectaculaire, celle qui donne l'œuvre à voir comme un organisme qui respire — l'alizé d'Essaouira y devient littéralement moteur. Un paramètre invisible, la pression, sert de réserve dramatique : au-delà de 12 m/s, la palette bascule en **mode tempête** — gris, bleus acier, or éteint.

La table complète fait l'objet du tableau 1.

| Paramètre météo | Domaine | Traduction plastique | Effet perceptif |
|---|---|---|---|
| Température de l'air | -5 °C → +45 °C | Choix de couleur dans la palette de la ville (froid minéral → feu solaire) | Thermo-colorimétrie : la couleur se lit comme un thermomètre |
| Humidité relative | 0 → 100 % | Densité et complexité du motif (épuré → foisonnant) | L'œil « sent » la sécheresse ou la saturation de l'air |
| Vitesse du vent | 0 → 15+ m/s | Cadence des navettes (lenteur contemplative → frénésie) | La ville respire ; l'alizé devient moteur |
| Vent > 12 m/s | Seuil | Bascule en palette tempête | Alerte visible : l'œuvre s'assombrit |
| Heure locale | 21 h → 6 h | Bascule en palette nuit | L'œuvre dort avec sa ville |

Tableau 1 — Correspondances données → matière du *Data Rug Protocol*.

## 5.3 Jour, nuit, tempête : les trois régimes

L'œuvre vit au rythme solaire de sa ville. Chaque palette existe en deux déclinaisons : une palette **jour**, puissée dans la lumière locale (pour Casablanca : bleu Majorelle, cobalt, turquoise, blanc plâtre, or ocre, terracotta, vert menthe sombre, brun médina) ; et une palette **nuit**, qui garde la même identité mais l'éteint — indigo profond, bleu roi, bleu orage, l'or comme seule chaleur restante, le blanc plâtre devenu lunaire. La bascule suit l'heure légale marocaine : à 21 h, sans prévenir, l'œuvre passe en mode nocturne ; à 6 h, elle se réveille. À cela s'ajoute le régime d'exception, la palette **tempête**, déclenchée par le vent fort.

Ces trois régimes ont une fonction écologique précise : ils apprennent au spectateur que le climat d'une ville a des *états* — et que ces états changent. Le visiteur qui revient ne retrouve pas « son » œuvre : il apprend, à ses dépens parfois, que l'œuvre ne lui appartient pas — elle appartient au temps qu'il fait.

## 5.4 La boucle : cycle, export, archive

Chaque cycle achevé produit trois choses. Un **relevé** : le PNG 6000 px horodaté, nommé selon la convention `DATA_RUG_IFM_[ville]_KAMEL_GHABTE_[date].png` — c'est l'unité de collection, l'empreinte unique. Une **archive** : la matrice du cycle est conservée, constituant jour après jour une mémoire tissée du climat de la ville — un *sismographe climatique* dont on pourra, dans dix ans, relire les étés. Et une **carte de tissage** : cette même matrice, mise en forme, est transmissible à un atelier pour exécution en laine (chapitre 7).

Le protocole prévoit aussi l'interaction : un contrôleur MIDI peut « jouer » la navette en direct — le musicien devient tisserand — et le simple clic du visiteur accélère le geste. Mais le régime par défaut est l'**autopilote** : l'œuvre n'a pas besoin de nous. C'est peut-être sa leçon la plus radicale — le climat non plus n'a pas besoin de nous pour continuer de dérouler sa trame.

# Chapitre 6 · Douze villes, douze climats

## 6.1 Une famille formelle, douze dialectes

Le protocole est commun ; les œuvres sont singulières. Chaque ville reçoit un titre, une palette, un répertoire de motifs et de signes culturels qui la rattachent à sa géographie, son architecture et son histoire — une même grammaire, douze dialectes. Le tableau 2 donne la vue d'ensemble ; le catalogue technique complet figure en annexe A.

| N° | Ville | Œuvre | Signes culturels |
|---|---|---|---|
| 01 | Casablanca | *WHITE NOISE ATLANTIC* | Art déco, Atlantique, flux urbains |
| 02 | Rabat | *OUDAYAS GREEN CODE* | Kasbah des Oudayas, Tour Hassan, Bouregreg |
| 03 | Fès | *THE BLUE MEDINA ALGORITHM* | Médina, tanneries, zellige |
| 04 | Marrakech | *OCHRE HEAT PULSE* | Remparts, Koutoubia, Jemaa El-Fna |
| 05 | Tanger | *STRAIT SIGNAL* | Détroit de Gibraltar, port, horizon |
| 06 | Tétouan | *ANDALUSIAN WHITE MATRIX* | Médina andalouse, broderies du Nord |
| 07 | Oujda | *GHARNATI WIND PATTERN* | Gharnati, Reggada, frontière |
| 08 | Essaouira | *MOGADOR WIND LOOM* | Vent, thuya, Gnaoua, filets |
| 09 | Agadir | *SOUSS SOLAR WEAVE* | Arganier, Atlantique, reconstruction |
| 10 | Kénitra | *SEBOU CORK MATRIX* | Sebou, forêt de la Maâmora, liège |
| 11 | Meknès | *IMPERIAL OLIVE GRID* | Bab Mansour, Volubilis, oliviers |
| 12 | El Jadida | *MAZAGAN CISTERN PATTERN* | Citerne portugaise, bastions, reflets |

Tableau 2 — Les douze œuvres de la série *Maroc 12 Antennes* (commande Institut Français du Maroc, 2026).

## 6.2 Six études de cas

### Casablanca — *WHITE NOISE ATLANTIC*

La Ville Blanche est traitée comme une fréquence : dense, orthogonale, traversée de bruit blanc. Les motifs empruntent aux façades art déco du centre-ville (l'étoile à double carré tourné de 45°), aux arcades du quartier Habous, au zellige octogonal, et à la vague atlantique de la Corniche. Le fond est sombre, traversé d'un grain — la ville la nuit, vue depuis la mer. La palette joue du blanc minéral au bleu océan, relevée d'un cyan « signal » réservé à la navette : quand le vent d'ouest se lève, des filaments cyan s'enfilent dans la trame comme une écume.

<div class="plate"><img src="fig/rug_casa.png" alt="Relevé génératif — Casablanca"/></div>

Planche 1 — *WHITE NOISE ATLANTIC*, relevé génératif (Casablanca, humidité modérée, régime de nuit).

### Rabat — *OUDAYAS GREEN CODE*

Rabat tisse en vert et en bleu profond : le vert des jardins andalous et des Oudayas, l'ivoire de la lumière du Bouregreg, l'or de la Tour Hassan à midi. La trame y est volontiers ordonnée, presque administrative — capitale oblige — mais traversée d'accents végétaux : la ville où le fleuve rencontre l'océan produit des tapis où le calme du jardin affronte le large.

<div class="plate"><img src="fig/rug_rabat.png" alt="Relevé génératif — Rabat"/></div>

Planche 2 — *OUDAYAS GREEN CODE*, relevé génératif (Rabat).

### Fès — *THE BLUE MEDINA ALGORITHM*

Fès est la ville-mémoire du zellige : c'est ici que la géométrie sacrée a atteint sa plus haute complexité, et l'œuvre le lui rend — la trame y est la plus dense de la série, la plus proche du chantier des maâlems. Le bleu de Fès domine, l'ocre des tanneries marque les temps forts, la turquoise y fige l'eau des fontaines. Un tapis de Fès à forte humidité est presque illisible de richesse : la médina elle-même, vue d'en haut, à l'heure où ses mille ruelles fument.

<div class="plate"><img src="fig/rug_fes.png" alt="Relevé génératif — Fès"/></div>

Planche 3 — *THE BLUE MEDINA ALGORITHM*, relevé génératif (Fès, humidité élevée).

### Marrakech — *OCHRE HEAT PULSE*

Marrakech est l'œuvre de la chaleur. L'ocre des remparts, le rouge des après-midis de juillet, l'or du soleil rasant sur Jemaa El-Fna — et, en contrepoint froid, le bleu Majorelle, trace du jardin le plus célèbre de la ville. Sous la canicule, la palette « feu solaire » envahit la trame : le tapis devient un mur de chaleur. La ville qui accueille près de quatre millions de visiteurs par an dans un bassin versant dont le capital eau n'excède plus 430 m³ par habitant [5] voit son tapis rougeoyer : la beauté y est un signal d'alarme qui a choisi de ne pas hurler.

<div class="plate"><img src="fig/rug_marrakech.png" alt="Relevé génératif — Marrakech"/></div>

Planche 4 — *OCHRE HEAT PULSE*, relevé génératif (Marrakech, régime chaud).

### Essaouira — *MOGADOR WIND LOOM*

À Essaouira, le vent est une identité : l'alizé y souffle si constamment que la ville s'en est fait un nom — la cité des alizés. L'œuvre en fait son moteur premier : les jours de grand vent, les cinq navettes y courent à une cadence que nulle autre ville n'atteint, et le tapis s'achève en une après-midi. Le bleu Mogador, l'écume blanche, le bois de thuya des artisans, le vert gnaoua : un tapis d'Essaouira se reconnaît à son rythme avant même qu'à ses couleurs.

<div class="plate"><img src="fig/rug_essaouira.png" alt="Relevé génératif — Essaouira"/></div>

Planche 5 — *MOGADOR WIND LOOM*, relevé génératif (Essaouira, air sec — trame épurée).

### Agadir — *SOUSS SOLAR WEAVE*

Agadir tisse en jaune solaire et orange, sur le vert profond de l'arganier — l'arbre endémique du Souss, dont la forêt est elle-même un rempart climatique — et le bleu de l'Atlantique. Ville reconstruite après le séisme de 1960, Agadir donne à la série sa tonalité la plus solaire ; et c'est dans le Souss que la crise de l'eau a laissé sa cicatrice la plus visible — 40 000 hectares salinisés par la surexploitation des nappes [11]. Le tapis d'Agadir est lumineux ; son contexte est grave. C'est toute la tension du projet.

<div class="plate"><img src="fig/rug_agadir.png" alt="Relevé génératif — Agadir"/></div>

Planche 6 — *SOUSS SOLAR WEAVE*, relevé génératif (Agadir).

## 6.3 Les six autres œuvres : notices

**Tanger — *STRAIT SIGNAL*.** La ville du Détroit tisse en signaux : trame claire, horizontale, traversée de pulsations — le port, les feux, les brouillards de Gibraltar. L'été, quand le levante s'engouffre dans le détroit, la cadence double.

**Tétouan — *ANDALUSIAN WHITE MATRIX*.** La colombe blanche : ivoire, vert d'eau, broderies du Nord. La trame y est la plus régulière de la série, presque textile au sens propre — un hommage aux brodeuses de la médina andalouse.

**Oujda — *GHARNATI WIND PATTERN*.** La ville frontière, orientale, sèche : trame aérée, ocres et bleus nuit, motifs anguleux du Reggada. L'air continental y produit les tapis les plus épurés — la beauté de la rareté.

**Kénitra — *SEBOU CORK MATRIX*.** Le liège de la forêt de la Maâmora — l'une des plus grandes futaies de chêne-liège du monde, elle-même menacée par la sécheresse — donne sa matière brune et sa texture ; le Sebou, plus long fleuve du pays, sa ligne d'eau.

**Meknès — *IMPERIAL OLIVE GRID*.** La grille impériale : Bab Mansour, Volubilis, et l'olivier — l'arbre-roi du bassin, dont l'alternance se joue des années sèches. Vert olive, noir basaltique, blanc de chaux.

**El Jadida — *MAZAGAN CISTERN PATTERN*.** La citerne portugaise, son eau noire, son unique œil de lumière : le tapis y joue le reflet — bleu citerne, vert-de-gris de la patine, blanc éclatant. Une œuvre-miroir pour la ville-miroir.

# Chapitre 7 · L'archipel : le réseau comme métier à tisser

## 7.1 Douze antennes, une seule trame

Le projet est né d'une commande : celle de l'Institut Français du Maroc, pour **Novembre Numérique 2026** — le rendez-vous annuel mondial de la création numérique porté par l'Institut Français. Douze antennes, de Tanger à Agadir : le réseau culturel lui-même devient le support de l'œuvre. Chaque hall d'antenne accueille le tapis de sa ville, tissé en direct ; les douze œuvres, simultanées, forment un **archipel climatique** — un seul protocole, douze souffles.

Il y a là une inversion remarquable : le réseau culturel, conçu pour diffuser des contenus venus d'ailleurs, devient un **métier à tisser distribué** qui produit du sens à partir du local. Casablanca ne regarde pas Paris ; Casablanca se regarde respirer. Pour un réseau culturel, c'est une petite révolution de modèle : la donnée du territoire, traitée par un protocole commun, exposée dans le lieu commun.

## 7.2 Dispositifs d'exposition

Trois formats sont prévus par le protocole, du plus installé au plus itinérant.

**L'installation.** Dans le hall de chaque antenne : un écran grand format ou une projection, couplé si possible à un métier à tisser réel — la machine ancestrale face à sa descendante. Le visiteur voit la trame se faire ; un cartel discret donne la météo du moment (température, humidité, vent) et l'âge de la donnée.

**La borne low-tech.** Une borne autonome — écran, petite carte de calcul, alimentation sobre — décline l'œuvre pour l'itinérance : médiathèques, écoles, festivals, zones périphériques que les équipements lourds n'atteignent pas. Le protocole a été volontairement écrit pour tourner sur du matériel modeste (voir 4.3) : la décentralisation est une propriété du code avant d'être une politique.

**Le tirage.** Chaque cycle archivé peut être tiré en haute définition (6000 px) : tirages d'exposition, éditions numérotées, supports de médiation. Le tirage est présenté pour ce qu'il est — un horodatage, pas l'œuvre : il porte en cartouche la date, l'heure et les valeurs météorologiques du cycle qu'il capture.

## 7.3 Du pixel à la laine : la boucle économique

Le protocole ne s'arrête pas à l'écran. Chaque matrice de cycle est, par construction, une **carte de tissage** : une grille de 396 cases, chacune désignant un motif et une couleur — exactement le document de travail d'un atelier de tapisserie. La dernière étape du projet consiste à transmettre ces cartes à des **coopératives artisanales**, pour exécution en laine naturelle et teintures végétales.

La boucle alors se referme, et avec elle une économie : la donnée devient fil, le fil motif, le motif tapis — et le tapis, objet vendable, redevient ressource pour les coopératives. L'œuvre numérique cesse d'être un pur objet de contemplation pour devenir un **outil de production partagé** : la technologie la plus récente au service du geste le plus ancien, dans les deux sens — le code s'inspire du patrimoine, et le patrimoine vit du code.

Cette ambition rejoint les débats actuels sur l'art et l'économie circulaire : une œuvre peut-elle créer de la valeur sans extraire de la ressource ? Ici, l'extraction est immatérielle (des mesures d'air), la fabrication est locale (laine, plantes tinctoriales, mains), la valeur retourne au territoire. Le tapis climatique serait alors ce qu'aucun dashboard ne sera jamais : un objet de la crise qui participe à sa réponse.

# PARTIE III — PORTÉE {.part}

CE QUE L'ŒUVRE PRÉTEND CHANGER

*« Le motif voyage infiniment plus loin que le graphique. »*

# Chapitre 8 · Pour une conscience écologique esthétique

## 8.1 De la représentation à l'expérience

La littérature réunie au chapitre 3 converge sur un point : l'art qui *représente* la crise climatique produit des images parmi d'autres ; l'art qui la *fait éprouver* produit des événements [8][9]. Le *Data Rug Protocol* pousse cette logique à un degré supplémentaire : il ne représente même pas l'expérience — il *exécute* le phénomène. Le vent d'Essaouira n'y est pas évoqué : il agit. Ce régime pourrait être dit **performatif de la donnée** : la mesure météorologique fait ce qu'elle dit, au moment où elle le dit.

Cette bascule a des conséquences sur le spectateur. Face à une visualisation, il est un lecteur ; face au tapis, il est un témoin. Le temps d'exposition change de nature : on ne « comprend » pas le tapis, on l'attend — on regarde la navette passer comme on regarde la pluie. Joanna Nurmis notait que les œuvres climatiques les plus efficaces sont celles qui réinstallent le doute et l'attention plutôt que celles qui délivrent un message [7] : le tapis, qui ne dit littéralement rien, est tout entier dans ce régime.

## 8.2 L'émotion comme interface

Dire que l'émotion est le moteur de l'action est un lieu commun de la psychologie environnementale ; le mettre en œuvre est une tout autre affaire. La méthode du protocole est de confier cette traduction non au discours, mais à trois opérateurs esthétiques éprouvés par l'histoire de l'art.

**La beauté d'abord.** Le tapis est beau — il doit l'être. La beauté n'est pas ici un édulcorant de la crise mais un dispositif d'accueil : elle fait entrer le visiteur dans la durée, et la durée est la condition de toute prise de conscience climatique (le climat est précisément ce qui n'arrive pas dans l'instant).

**Le motif ensuite.** La leçon des *Warming Stripes* est que le motif se mémorise, se reproduit, se réapproprie [17]. Un visiteur ne repart pas avec une courbe ; il peut repartir avec une étoile à huit branches dont il sait, désormais, qu'elle est bleue parce qu'il faisait 14 °C ce matin-là.

**Le rythme enfin.** La cadence des navettes donne à l'invisible une pulsation. Ce que la sonification fait pour l'oreille [16], la navette le fait pour l'œil : le vivant se reconnaît au rythme. Une œuvre qui accélère sous le vent est une œuvre qui respire ; et l'on ne reste pas indifférent à ce qui respire.

## 8.3 Ce que l'œuvre ne prétend pas

L'honnêteté impose de borner la portée. Un tapis climatique ne réduit pas les émissions, ne recharge pas les nappes, ne refroidit pas les villes. L'art n'atténue pas la crise ; il en aménage la perception — et l'on sait par ailleurs que la perception est une condition nécessaire, jamais suffisante, de l'action. Giannachi distingue utilement les œuvres qui *atténuent* (celles qui modifient matériellement leur environnement, par exemple en captant des données citoyennes ou en réduisant leur propre empreinte) de celles qui *représentent* ou *performent* [9]. Le protocole tente modestement de rejoindre la première catégorie par ses marges : sobriété de l'infrastructure (chapitre 9), boucle économique avec les coopératives (chapitre 7), archivage d'une mémoire climatique locale qui pourra servir la médiation scientifique. Mais son cœur reste de l'ordre de la seconde : il performe le climat, et c'est déjà — si l'on en croit vingt ans de recherche sur l'échec des discours — beaucoup.

# Chapitre 9 · Décoloniser la donnée, verdir le code

## 9.1 La donnée a une géographie

Les infrastructures de données climatiques sont historiquement concentrées au Nord : stations, satellites, modèles, publications. Paul Edwards l'a montré pour la science du climat [2] ; T. J. Demos l'a traduit en termes politiques pour l'art : qui produit les données du monde, et pour qui ? [20] Le *Data Rug Protocol* prend parti dans cette géographie. Ses capteurs sont marocains, ses villes sont marocaines, son langage formel est marocain, son public premier est marocain — et son réseau d'exposition, celui des Instituts Français, est mis au service de cette territorialité et non l'inverse. La donnée environnementale du Sud n'est pas traitée comme matière brute à exporter vers des centres de calcul lointains : elle est *tissée sur place*, exposée sur place, et — avec la boucle laine — valorisée sur place.

C'est aussi pour cela que le protocole est publié : un protocole ouvert est appropriable. Que d'autres villes, d'autres pays, d'autres tissus culturels s'en saisissent — la lignée *Accra Kente API* l'a montré, et l'épilogue y reviendra — est la meilleure preuve que la méthode n'appartient à personne.

## 9.2 L'empreinte de l'art numérique

L'art numérique a longtemps vécu dans le déni de sa propre matérialité : écrans, serveurs, calcul, refroidissement — le « cloud » a un poids, et il est carboné. Un protocole qui parle du climat se doit d'être sobre : c'est une question de cohérence, et donc de crédibilité.

Les choix techniques du projet découlent de cette exigence. Un moteur en p5.js, langage interprété par le navigateur, sans rendu 3D ni bibliothèque lourde : l'œuvre tourne sur une machine d'entrée de gamme. Pas de calcul sur serveur distant : tout est local, seule la requête météo voyage — quelques octets toutes les dix minutes. Les bornes itinérantes sont conçues sur cartes à faible consommation. L'export haute définition n'est généré qu'en fin de cycle, jamais en continu. À l'échelle d'une œuvre, ces économies sont symboliques ; à l'échelle d'une méthode, elles sont exemplaires : **la forme suit l'empreinte** comme elle suit la fonction.

## 9.3 Le patrimoine comme futur

La dernière hypothèse du projet est culturelle : les sociétés du Sud méditerranéen ne sont pas en retard sur la transition écologique — elles en détiennent certaines clés. Le tissage marocain est une technologie de la durée : un tapis se répare, se transmet, se lègue ; il est l'exact opposé de l'obsolescence. Les teintures végétales sont une chimie sobre, éprouvée par dix siècles. La coopérative est une forme d'organisation économique que le Nord redécouvre sous le nom d'économie sociale.

Faire dialoguer creative coding et maâlems n'est donc pas un folklore : c'est une **stratégie de réparation** au sens où Donna Haraway invite à « rester avec le trouble » — travailler depuis ce qu'on a, où l'on est, avec qui est là [21]. Le patrimoine, dans ce projet, n'est pas un passé à préserver sous vitrine : il est un futur disponible. Le tapis climatique est peut-être cela, au fond : la preuve formelle que la mémoire d'un territoire peut être le support de sa vigilance.

# Chapitre 10 · Manifeste : le climat au centre

Dix thèses, pour conclure le protocole en le donnant à qui voudra le reprendre.

1. **La donnée est une matière première.** Elle se travaille comme la laine : on la file, on la tend, on la tisse. Qui la laisse dans les tableaux la laisse dans les entrepôts.
2. **Le climat mérite un corps.** Ni graphique, ni alerte : une présence continue, habitable, quotidienne. On ne change pas ce qu'on ne fréquente pas.
3. **Le temps réel est un engagement.** Une œuvre branchée sur sa ville accepte tout de sa ville : la canicule comme la brume, la nuit comme la tempête. Pas de répétition générale, pas de montage.
4. **La beauté est un protocole d'accueil.** Elle n'est pas le contraire de la rigueur ; elle est la condition de la durée d'attention, donc de la conscience.
5. **Le motif est un vecteur.** Il voyage, se reproduit, se lègue. Une donnée devenue motif circule là où aucun rapport ne va.
6. **Le patrimoine est une technologie d'avenir.** Le métier Jacquard était déjà un ordinateur ; la coopérative est déjà une économie circulaire. L'innovation consiste parfois à reconnecter.
7. **La sobriété est une forme.** Le code le plus juste est celui qui tourne sur la machine la plus modeste, au plus près du territoire qu'il sert.
8. **L'œuvre peut rendre ce qu'elle emprunte.** Si la donnée vient du territoire, la valeur doit y retourner : cartes de tissage, ateliers, coopératives.
9. **Le protocole appartient à tous.** Une méthode publique, un code ouvert, des correspondances documentées : l'œuvre se défend en se transmettant.
10. **Une ville qui se voit respirer ne peut plus tout à fait suffoquer en silence.**

# Conclusion

Ce livre aura tenté de démontrer une proposition simple : entre la donnée environnementale — exacte, massive, inerte — et la conscience écologique — nécessaire, urgente, défaillante —, il manque un opérateur, et cet opérateur peut être un tissage.

Le *Data Rug Protocol* n'est pas une réponse à la crise ; il est une réponse à notre incapacité à la *voir*. Douze villes du Maroc, dont la dotation en eau par habitant a chuté de 2 560 m³ à moins de 620 m³ en soixante ans [3], tissent désormais leur propre météo, jour et nuit, dans le hall de leurs institutions culturelles. La crise y a cessé d'être une information parmi d'autres pour devenir ce qu'elle est : le temps qu'il fait, le temps qu'il nous reste, le temps qui passe, trame après trame.

Que le lecteur retienne trois choses. D'abord, la méthode : matérialiser plutôt que représenter — donner à la donnée un comportement de matériau, temporalité, territorialité et transmissibilité comprises. Ensuite, l'économie : une œuvre peut être conçue, dès le code, pour rendre au territoire ce qu'elle lui emprunte. Enfin, l'espérance, qui est aussi une technique : une ville qui se regarde respirer dans la laine et la lumière est déjà moins seule face à l'hyperobjet.

Le reste appartient au vent.

# Épilogue · Vers d'autres territoires

Le protocole est conçu pour voyager. Sa généalogie est déjà internationale — *Accra Kente API*, tissé sur les données ghanéennes dans la grammaire du kente, présenté à Afric'Artech (Casablanca) ; *Linz Protocol*, déclinaison autrichienne présentée dans le jardin Ars Electronica. Le Maroc 12 Antennes est la première preuve d'échelle : un pays entier, un réseau culturel entier, une saison entière.

La suite s'écrit en trois directions. **Les territoires insulaires et côtiers**, où la montée des eaux donne à la donnée météo une acuité tragique — un *Sea Level Loom* est à l'étude. **Les terroirs**, où ce ne sont plus les stations météo mais les capteurs de sol qui alimentent la trame — le tapis comme portrait d'une parcelle, d'une oliveraie, d'une vigne. **Les archives**, enfin : dix ans de cycles archivés constituent déjà une œuvre seconde, le *Climat rétrospectif tissé* — relire les années passées dans la laine, et mesurer, motif après motif, ce qui a changé.

Le métier est ouvert. La trame attend. À chacun de saisir la navette de sa ville.

# Annexe A · Catalogue technique des douze œuvres {.front}

Commande : Institut Français du Maroc — Novembre Numérique 2026. Moteur : p5.js v1.11.11. Données : OpenWeather API, rafraîchissement 10 minutes. Grille : 18 × 22 tuiles, 5 navettes simultanées. Export : PNG 6000 px à chaque cycle. Interaction : autopilote continu, clic, contrôleur MIDI.

| N° | Ville (coordonnées) | Titre | Palette principale (HEX) | Motifs caractéristiques |
|---|---|---|---|---|
| 01 | Casablanca (33,57 N / 7,59 O) | *WHITE NOISE ATLANTIC* | #F5F5F0 · #1B4F72 · #7F8C8D · #0A0A0A · #00BFFF | Étoile art déco, arcade Habous, vague atlantique, zellige octogonal |
| 02 | Rabat (34,02 N / 6,84 O) | *OUDAYAS GREEN CODE* | #1A5276 · #1E8449 · #FAF0E6 · #D4AC0D · #0D1117 | Grille jardin, chevron Bouregreg, étoile Oudayas |
| 03 | Fès (34,03 N / 5,00 O) | *THE BLUE MEDINA ALGORITHM* | #1F618D · #CA6F1E · #FDFEFE · #148F77 · #0A0A0A | Khatam dense, croisillon de médina, octogone tannerie |
| 04 | Marrakech (31,63 N / 8,00 O) | *OCHRE HEAT PULSE* | #D35400 · #C0392B · #1A2463 · #F39C12 · #2C1810 | Rempart (créneau), pulsation Koutoubia, losange Jemaa El-Fna |
| 05 | Tanger (35,76 N / 5,83 O) | *STRAIT SIGNAL* | Bleus détroit, blanc brume, or port | Signal horizontal, pulsation, horizon |
| 06 | Tétouan (35,57 N / 5,37 O) | *ANDALUSIAN WHITE MATRIX* | Ivoire, vert d'eau, or discret | Broderie du Nord, trame serrée, chevron andalou |
| 07 | Oujda (34,68 N / 1,91 O) | *GHARNATI WIND PATTERN* | Ocre sec, bleu nuit, terre frontière | Reggada anguleux, trame aérée, zigzag |
| 08 | Essaouira (31,51 N / 9,77 O) | *MOGADOR WIND LOOM* | #1A5276 · #FDFEFE · #784212 · #1D8348 · #D5DBDB | Filet, lame de thuya, syncope gnaoua |
| 09 | Agadir (30,42 N / 9,60 O) | *SOUSS SOLAR WEAVE* | #F4D03F · #E67E22 · #1E8449 · #2E86C1 · #FAD7A0 | Feuille d'arganier, lame atlantique, grille reconstruction |
| 10 | Kénitra (34,26 N / 6,58 O) | *SEBOU CORK MATRIX* | Bruns liège, vert Maâmora, bleu Sebou | Écorce (texture), ligne de fleuve, hexagone |
| 11 | Meknès (33,89 N / 5,55 O) | *IMPERIAL OLIVE GRID* | Vert olive, noir basalte, blanc chaux | Bab Mansour (arche), mosaïque Volubilis, olivier |
| 12 | El Jadida (33,23 N / 8,50 O) | *MAZAGAN CISTERN PATTERN* | #1F4E79 · #5D7B6F · #BDC3C7 · #FDFEFE · #0A0A0A | Reflet (symétrie), bastion, œil de lumière |

Convention de nommage des exports : `DATA_RUG_IFM_[NN]_[VILLE]_KAMEL_GHABTE_[AAAAMMJJ-HHMM].png`. Chaque export est accompagné de ses métadonnées de cycle : température, humidité, vent, régime (jour/nuit/tempête), durée du cycle.

# Annexe B · Architecture logicielle {.front}

## B.1 Structure du dépôt

Le code source est public : `github.com/kamelghabte/Data-Rug-Protocol`. Chaque œuvre est autonome :

```
01_CASABLANCA/ ... 12_ELJADIDA/
    index.html      — page de l'œuvre (plein écran)
    mySketch.js     — moteur de tissage + palette + motifs de la ville
    CARTEL.md       — notice de l'œuvre (FR)
_template/          — modèle pour une nouvelle ville
kiosk.html          — carousel des 12 œuvres (bornes)
```

## B.2 Cycle d'exécution

Le sketch suit la boucle p5.js classique. En pseudo-code :

```
setup() :
    créer la trame 18 × 22 ; initialiser les 5 navettes
    interroger OpenWeather (température, humidité, vent, description)
draw() :
    toutes les N frames : faire avancer chaque navette d'une case
        poser la tuile : motif × couleur(température) × densité(humidité)
    si vent > 12 m/s : basculer en palette tempête
    si heure locale ∈ [21h, 6h] : basculer en palette nuit
    quand la 396e case est posée :
        dessiner le HUD → noLoop()
        export PNG 6000 px horodaté → archive
        réinitialiser la trame → loop()
    toutes les 10 min : rafraîchir la donnée météo
```

## B.3 Contrat de données

Requête : `https://api.openweathermap.org/data/2.5/weather?q={VILLE},MA&appid={CLE}&units=metric`. Champs utilisés : `main.temp` (°C), `main.humidity` (%), `wind.speed` (m/s), `weather[0].description` (affichage HUD). En cas d'échec réseau, les dernières valeurs valides sont conservées et l'interface signale l'âge de la donnée — la clause de robustesse décrite au chapitre 4.

## B.4 Reproductibilité

Le protocole est exécutable par quiconque : cloner le dépôt, ouvrir `index.html` dans un navigateur, fournir une clé OpenWeather. Pour créer une nouvelle ville : copier `_template/`, définir la palette (5-8 couleurs), le répertoire de motifs (4-6), les coordonnées — et laisser la ville respirer.

# Annexe C · Données climatiques de référence {.front}

Ressources internes renouvelables en eau douce par habitant, Maroc (m³/hab/an) :

| Année | Valeur | Source |
|---|---|---|
| 1960 | ≈ 2 560 | Banque mondiale, note technique 2023 [3] |
| 2000 | ≈ 1 000 | IRES 2021 [4] |
| 2017 | 818,1 | World Bank Open Data, ER.H2O.INTR.PC [25] |
| 2018 | 809,2 | idem |
| 2019 | 800,9 | idem |
| 2020 | 792,7 (potentiel global ≈ 620) | idem / Banque mondiale 2023 [3] |
| 2021 | 784,8 | World Bank Open Data [25] |
| 2022 | 776,9 | idem |
| 2025 | ≈ 600 | Ministère de l'Équipement et de l'Eau [11] |
| 2035-2040 | < 500 (projection) | idem |

Seuils de référence (indice de Falkenmark) : stress hydrique < 1 700 m³/hab/an ; pénurie < 1 000 m³/hab/an ; pénurie absolue < 500 m³/hab/an [6]. Faits saillants 2023-2025 : année 2023 la plus chaude enregistrée au Maroc (+1,8 °C / normale 1981-2010) [5] ; six années consécutives de sécheresse [11] ; remplissage des barrages ≤ 24 % en janvier 2024 [5] ; agriculture ≈ 89 % de la demande en eau [4] ; 40 000 ha salinisés dans le Souss [11].

# Annexe D · Glossaire {.front}

**API (Application Programming Interface)** — Interface par laquelle un programme interroge un service de données (ici : la météo d'une ville).

**Chaîne / Trame** — Les deux systèmes de fils du tissage : la chaîne, tendue verticalement ; la trame, passée horizontalement par la navette. Dans le protocole : la donnée fait office de chaîne, le motif de trame.

**Cycle** — La génération complète des 396 tuiles d'un tapis ; chaque cycle se termine par l'export d'un relevé horodaté.

**Data physicalization** — Artefact physique dont la géométrie ou les propriétés matérielles encodent des données [13].

**Khatam** — Étoile à huit branches, figure centrale du zellige et de la géométrie ornementale marocaine.

**Low-tech** — Dispositif technique de faible complexité, faible consommation et forte réparabilité.

**Matérialisation de la donnée** — Proposition de cet ouvrage : donner à la donnée un comportement de matériau (elle se tisse, s'accélère, se densifie), par opposition à sa visualisation (elle se dessine).

**Navette** — Outil qui passe le fil de trame ; dans le code, chacun des cinq curseurs qui posent les tuiles selon leur trajectoire propre.

**p5.js** — Bibliothèque JavaScript de creative coding, héritière de Processing.

**Relevé génératif** — Capture d'état d'une œuvre temps réel ; un relevé n'est pas l'œuvre, qui continue sans fin.

**Site-specific** — Œuvre conçue pour un lieu déterminé, hors duquel elle perd son sens.

**Sonification** — Traduction de données en son [16].

**Stress hydrique** — Situation d'un pays dont la disponibilité en eau passe sous 1 700 m³/hab/an (indice de Falkenmark) [6].

**Zellige** — Mosaïque de terre cuite émaillée, taillée et assemblée en pavages géométriques ; un des sommets de l'artisanat marocain.

# Bibliographie {.front}

[1] Morton, T. (2013). *Hyperobjects: Philosophy and Ecology after the End of the World*. Minneapolis : University of Minnesota Press.

[2] Edwards, P. N. (2010). *A Vast Machine: Computer Models, Climate Data, and the Politics of Global Warming*. Cambridge (Mass.) : MIT Press.

[3] Banque mondiale (2023). *Note technique : Pénurie d'eau et sécheresses — Maroc*. Washington, DC : The World Bank. thedocs.worldbank.org.

[4] IRES (2021). *Quel avenir pour l'eau au Maroc ? Rapport de synthèse*. Rabat : Institut Royal des Études Stratégiques. ires.ma.

[5] IMIS (2025). *Eau et climat : le Maroc à la croisée des chemins*. Rapport stratégique. Institut Marocain de l'Intelligence Stratégique. imis.ma.

[6] Falkenmark, M. & Lindh, G. (1976). *Water for a Starving World*. Boulder : Westview Press.

[7] Nurmis, J. (2016). « Visual climate change art 2005-2015 : discourse and practice ». *WIREs Climate Change*, 7(4), p. 501-516.

[8] Miles, M. (2010). « Representing nature : art and climate change ». *Cultural Geographies*, 17(1), p. 19-35.

[9] Giannachi, G. (2012). « Representing, performing and mitigating climate change in contemporary art practice ». *Leonardo*, 45(2), p. 124-131.

[10] Essinger, J. (2004). *Jacquard's Web : How a Hand-Loom Led to the Birth of the Information Age*. Oxford : Oxford University Press.

[11] Baraka, N. (2025). Déclarations du Ministre de l'Équipement et de l'Eau du Royaume du Maroc, rapportées dans *Medias24*, 13 mars 2025. medias24.com.

[12] Albers, A. (1965). *On Weaving*. Middletown : Wesleyan University Press.

[13] Jansen, Y., Dragicevic, P., Isenberg, P., Alexander, J., Karnik, A., Kildal, J., Subramanian, S. & Hornbæk, K. (2015). « Opportunities and Challenges for Data Physicalization ». *Proceedings of CHI 2015*, p. 3227-3236. New York : ACM.

[14] Bae, S. S., Zheng, C., West, M. E., Do, E. Y.-L., Huron, S. & Szafir, D. A. (2022). « Making Data Tangible : A Cross-disciplinary Design Space for Data Physicalization ». *Proceedings of CHI 2022*. New York : ACM.

[15] Hornecker, E., Hogan, T., Hinrichs, U. et al. (2023). « A Design Vocabulary for Data Physicalization ». *Proceedings of CHI 2023*. New York : ACM.

[16] Hermann, T., Hunt, A. & Neuhoff, J. G. (dir.) (2011). *The Sonification Handbook*. Berlin : Logos Verlag.

[17] Hawkins, E. (2018). *Warming Stripes*. showyourstripes.info (consulté en juillet 2026).

[18] Plant, S. (1997). *Zeros and Ones : Digital Women and the New Technoculture*. New York : Doubleday.

[19] LeWitt, S. (1967). « Paragraphs on Conceptual Art ». *Artforum*, 5(10), p. 79-83.

[20] Demos, T. J. (2016). *Decolonizing Nature : Contemporary Art and the Politics of Ecology*. Berlin : Sternberg Press.

[21] Haraway, D. (2016). *Staying with the Trouble : Making Kin in the Chthulucene*. Durham : Duke University Press.

[22] Latour, B. (2017). *Où atterrir ? Comment s'orienter en politique*. Paris : La Découverte.

[23] Vesna, V. (dir.) (2007). *Database Aesthetics : Art in the Age of Information Overflow*. Minneapolis : University of Minnesota Press. — Voir aussi Manovich, L. (2001). *The Language of New Media*. Cambridge (Mass.) : MIT Press.

[24] Whitelaw, M. (2008). « Art Against Information : Case Studies in Data Practice ». *The Fibreculture Journal*, 11.

[25] World Bank Open Data. *Renewable internal freshwater resources per capita (cubic meters)*, indicateur ER.H2O.INTR.PC, Maroc, 2017-2022. data.worldbank.org (consulté en juillet 2026).

[26] OpenWeather. *Current Weather Data API*. openweathermap.org (consulté en juillet 2026).

# Colophon {.front}

*DATA RUG PROTOCOL — Tisser le climat* a été écrit entre Bordeaux et Casablanca, et achevé en juillet 2026.

Corps du texte composé en famille serif à chasse proportionnelle ; planches et figures réalisées par l'auteur ; relevés génératifs produits selon la grammaire du protocole décrite au chapitre 5.

Les œuvres vivantes de la série sont consultables en exposition dans les douze antennes de l'Institut Français du Maroc, et leur code source est public : github.com/kamelghabte/Data-Rug-Protocol.

www.kamelghabte.me
