// Requete scopee — Article (/blog/<categorie>/<slug> ou /blog/<slug>) ET archive
// de categorie (/blog/<slug>). L'article courant ($slug = dernier segment) sort
// en FULL (body + translations). Si $slug est en fait une categorie, aucun
// article ne matche -> tous en cartes (correct pour l'archive de categorie).
// blogPage (CTA/related) et categories restent disponibles. Params: $language, $slug.
import { GLOBALS, singletons, collections } from './_shared'

export const ARTICLE_DETAIL_QUERY = /* groq */ `{${GLOBALS},${singletons()},${collections('article')}}`
