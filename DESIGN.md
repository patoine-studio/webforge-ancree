# DESIGN.md, famille WebForge Ancrée

Ce document décrit la langue visuelle active de la famille. Les valeurs exactes vivent dans `app/family/tokens.css` et `app/brand/tokens.css`; la démo Rempart Extermination ne doit pas figer la famille à un seul métier.

## Pour qui, et le nom

Ancrée sert les entreprises locales qui se déplacent chez le client, notamment l’extermination, le lavage de vitres, la plomberie, le déneigement et le ramonage. Le nom traduit une présence fiable dans la localité et une capacité d’intervention concrète.

## Idée maîtresse

Ancrée est solide, accueillante, terre-à-terre et vivante. Le visiteur doit sentir une entreprise de quartier fiable. Trois partis pris structurent cette impression.

- **Asymétrie posée.** Les sections média et texte alternent, les héros utilisent des rapports inégaux et la grille respire en largeurs variables. Le mouvement reste contrôlé.
- **Matière et profondeur.** Les cartes ont des coins doux, des ombres chaudes et de légères superpositions. Les bandes pleine largeur marquent les moments de confiance et d’appel.
- **Le local comme motif.** Les zones desservies, les villes et les quartiers forment un fil visuel récurrent. Les pages service-ville soutiennent le maillage local.

## Grille à colonnes variables

La base active compte 16 colonnes. Elle permet des compositions asymétriques tout en gardant des alignements stables.

- Les héros et les blocs média-texte utilisent des répartitions inégales.
- Les barres de confiance, bandeaux d’appel et zones de service peuvent occuper toute la largeur.
- Les grilles de services, villes et témoignages peuvent mettre un élément en vedette sans devenir chaotiques.
- `DevGrid` demeure l’outil de contrôle de cette trame en développement.

## Signature de mouvement

Les éléments s’ancrent en montant doucement depuis le bas au moment où ils entrent dans la vue. Les groupes entrent en cascade, les images peuvent porter une parallaxe légère et les appels restent présents sans mouvement agressif. `prefers-reduced-motion` et le mode preview coupent ces animations proprement.

## Palette, typographie et formes

- Base blanche et surfaces légèrement teintées.
- Bleu nuit pour la structure, bleu de confiance pour les actions sur fond clair et ambre pour l’appel.
- Bitter pour les titres, Source Sans 3 pour le corps.
- Rayons doux, ombres chaudes et bandes fortes qui donnent une assise aux sections.
- Variante de marque possible par `app/brand/tokens.css`, sans modifier les tokens de famille.

## Blocs

- **Héros**: `HeroHome`, `HeroPage`, `HeroDetail` et `HeroArticle` couvrent l’accueil, les pages fixes, les détails et les articles.
- **Barre de confiance**: bande contrastée pour les preuves importantes.
- **Services**: mosaïque de cartes cliquables avec une mise en avant facultative.
- **Services par ville**: bloc signature et moteur du maillage local.
- **À propos**: composition média-texte, équipe et chiffres de confiance.
- **Témoignages**: mur asymétrique ou rail qui renforce le contexte local.
- **FAQ**: accordéon destiné aux objections concrètes.
- **Bandeau d’appel**: bande forte avec geste de conversion principal et réassurance.
- **Contact**: formulaire complet à côté des coordonnées et de la zone desservie.
- **Éditorial, processus, points forts et équipe**: variantes régulières disponibles dans le catalogue Ancrée.
- **Corps d’article**: texte riche, image, galerie, citation, encadré et appel intégré.

## Contenu adapté au métier

La famille met en avant les services, les urgences, les territoires et les signaux de confiance. La démo utilise les nuisibles et l’extermination, mais les contrats restent génériques pour d’autres entreprises de service local.

## Liberté créative

Ce cadre fixe une langue, pas une maquette. Les compositions, détails et micro-interactions peuvent évoluer tant que l’asymétrie reste posée, que le contenu demeure lisible et que le mouvement conserve une sensation d’assise.

## Frontières

La technique commune à WebForge reste générique. Les dispositions, les héros, la grille, le mouvement et les variantes de blocs appartiennent à Ancrée. La marque Rempart vit dans Sanity, les assets sociaux et `app/brand/`, jamais dans les abstractions de famille.
