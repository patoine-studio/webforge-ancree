// Requete scopee — Blogue (/blog, /blog/page/<n>). blogPage FULL; articles +
// categories en cartes (listing pagine + compteurs de filtre cote client).
// Param: $language.
import { GLOBALS, singletons, collections } from './_shared'

export const BLOG_INDEX_QUERY = /* groq */ `{${GLOBALS},${singletons('blogPage')},${collections()}}`
