// Constante de compilation injectee par Vite (voir nuxt.config, vite.define).
// Vraie uniquement en mode preview Sanity (recable plus tard avec l'architecture
// de contenu). En prod: false, donc le code de preview et le bypass de mouvement
// sont elimines au build. Declaree ici pour le typage des composables de motion.
declare const __WF_PREVIEW__: boolean

export {}
