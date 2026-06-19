# DESIGN.md, famille WebForge Ancrée (v2, dispositions et mouvement)

> Version 2, 18 juin 2026. Cette version ajoute ce qui manquait à la v1: la LANGUE de mise en page, l'usage de la grille et la signature de mouvement. C'est cette couche, pas les tokens, qui distingue Ancrée de Minimaliste. À déposer comme `DESIGN.md` à la racine de `webforge-ancree`.

## Pour qui, et le nom

Ancrée est la famille des métiers de service local à domicile, ceux qui se déplacent chez le client: extermination, lavage de vitres, plomberie, déneigement, ramonage. Le nom dit tout, ces entreprises sont ancrées dans leur localité, et le client cherche quelqu'un de proche, fiable, qu'il peut appeler tout de suite. Le premier cas est une démo fictive d'extermination, mais la peau doit servir tous ces métiers.

## L'idée maîtresse, ce qui distingue Ancrée de Minimaliste

Minimaliste est suisse: rigueur, froideur premium, grille stricte, angles tranchants, tout aligné, beaucoup de blanc. C'est taillé pour un ébéniste ou un comptable qui veut paraître haut de gamme.

Ancrée est son opposé chaleureux: solide, accueillant, terre-à-terre, vivant. Le visiteur doit sentir une entreprise de quartier fiable, pas une galerie d'art. Trois partis pris de mise en page portent cette différence:

1. **Asymétrie posée.** Là où Minimaliste aligne tout proprement, Ancrée alterne. Les sections media-texte se font en zigzag (image à gauche, puis à droite), les héros sont asymétriques (60/40), la grille respire en largeurs inégales. Ça crée du mouvement et de la chaleur sans désordre.
2. **De la matière et de la profondeur.** Minimaliste est plat et tranchant. Ancrée a des cartes aux coins arrondis avec une ombre douce et chaude, de légères superpositions, des bandes pleine largeur qui marquent les moments forts (la confiance, l'appel). Les blocs semblent posés, stables, ancrés au sol.
3. **Le local comme motif.** Un fil visuel récurrent rappelle l'ancrage: la zone de service mise en avant, des puces de villes, un ton qui nomme les quartiers. La section services par ville devient un bloc signature, pas une arrière-pensée.

## La grille à colonnes variables

Base de 12 colonnes, exploitée en largeurs inégales pour créer le rythme:
- Héros et media-texte: répartitions asymétriques (7/5, 8/4), jamais le 6/6 sage.
- Sections fortes (barre de confiance, bandeau CTA, zone de service): pleine largeur, fond coloré, pour casser le rythme et ancrer.
- Grilles de cartes (services, villes, témoignages): colonnes qui varient, une carte vedette plus large à l'occasion, façon mosaïque légère plutôt que grille parfaitement régulière.

L'alternance des largeurs d'une section à l'autre est ce qui rend Ancrée vivante. À doser: asymétrie contrôlée, jamais chaotique.

## La signature de mouvement, ça s'ancre en montant

Une seule idée d'animation, tenue partout, cohérente avec le nom: les éléments s'ancrent en montant doucement depuis le bas (translation vers le haut plus fondu) au moment où ils entrent dans la vue, comme s'ils se posaient au sol. Les groupes entrent en cascade échelonnée (titre, puis texte, puis bouton). Les images portent un léger parallaxe au défilement. Le bouton d'appel reste présent et pulse très subtilement, pour attirer sans agresser. Respecte `prefers-reduced-motion`: tout se fige proprement si l'utilisateur le demande.

## Palette, typo, formes (inchangé de la v1)

- Fond crème chaud `#F5F0E8`, texte bleu nuit `#16243F`, ardoise `#5C6678`, accent bleu confiance `#1E6FB0`, accent ambre `#FBBF24` pour les appels.
- Plus Jakarta Sans (display) plus Source Sans 3 (corps).
- Rayons doux autour de 10 px, ombres chaudes et douces.
- Variante éco-sauge disponible pour un client qui veut l'angle « sûr pour la famille et les animaux ».

## Les blocs, direction de disposition (pas de pixels, de la latitude créative)

Garde les contrats de contenu de Minimaliste (mêmes champs Sanity), change la disposition.

- **Héros**: trois variantes au catalogue. Un héros split asymétrique (grande photo d'équipe ou de camion qui déborde d'un côté, bloc de texte posé de l'autre avec bouton d'appel et trois preuves de confiance intégrées). Un héros pleine image avec un bandeau de confiance ancré en bas. Un héros centré chaleureux pour les pages simples. C'est LE bloc à reconcevoir en premier et à faire valider.
- **Barre de confiance**: pleine largeur, sous le héros, fond contrasté, licencié et assuré, avis Google, garantie, années.
- **Services**: grille à colonnes variables, cartes arrondies à ombre douce, icône line-art, possibilité d'une carte vedette plus large.
- **Services par ville (remplace projets)**: bloc signature. Une mosaïque ou liste de villes desservies menant à des pages service-ville (extermination de fourmis à Laval, etc.), avec une carte de zone de service stylisée. C'est le moteur SEO local de la famille.
- **À propos**: media-texte en zigzag, vraie photo de l'équipe, gros chiffres de confiance (années, clients, avis) comme éléments graphiques.
- **Témoignages**: disposition différente de Minimaliste, un mur asymétrique ou un rail, avec nom et ville du client pour renforcer le local.
- **FAQ**: accordéon, désamorce les objections (prix, délai, sécurité pour la famille et les animaux).
- **Bandeau CTA**: pleine largeur, fond coloré, gros bouton d'appel, une phrase de réassurance.
- **Contact**: formulaire à trois champs, à côté des coordonnées et de la zone de service.
- **Composants de conversion gravés**: header collant avec numéro, barre d'appel collante mobile, chips de réassurance (même jour, 24/7, estimation gratuite), galerie avant et après.

## Contenu adapté au métier

Pas de portfolio de projets. À la place: services par ville (SEO local), une mise en avant urgence, les types de nuisibles ou de services en icônes line-art. Ton direct, humain, rassurant, local, on parle au client.

## Liberté créative (important)

Ce document donne la LANGUE et les principes, pas une maquette figée. À l'intérieur de ce cadre (asymétrie posée, matière et profondeur, local comme motif, grille à colonnes variables, mouvement qui s'ancre en montant), sois créatif: les compositions exactes, les détails, les micro-interactions, les variantes de cartes, c'est à toi de les inventer pour qu'Ancrée soit vivante et distincte. Le seul interdit: reproduire la mise en page de Minimaliste. Le test de réussite: un visiteur qui voit Minimaliste et Ancrée côte à côte doit les ressentir comme deux familles différentes, même en noir et blanc.

## Ce qui reste commun, ce qui est propre

Commun (hérité du scaffold, ne pas réinventer): la technique Nuxt, Sanity, i18n, le déploiement, et les contrats de quelques blocs partagés (media-texte, bandeau CTA, témoignages) qui gardent leurs champs. Propre à Ancrée: toutes les dispositions, les héros, la grille, le mouvement, et les types de contenu adaptés au métier (villes au lieu de projets).