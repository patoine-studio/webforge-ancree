// Constante de compilation injectee par Vite (voir nuxt.config, vite.define).
// Vraie uniquement en mode preview Sanity. En prod: false, donc le code de
// preview et le bypass de mouvement sont elimines au build (branches mortes
// elaguees par Rollup). Declaree dans `declare global` pour qu'elle reste
// VRAIMENT globale: l'`export {}` ci-dessous fait de ce fichier un module, ce qui
// scoperait localement un `declare const` nu et casserait son typage partout
// (composables de motion, plugins et middleware de preview).
declare global {
  const __WF_PREVIEW__: boolean
}

export {}
