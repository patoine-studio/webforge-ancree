/* Collecte partagee des cibles d'animation, en ordre DOM. Contrat d'auteur en
 * deux attributs (stable, independant de la disposition):
 *   [data-reveal]          -> l'element lui-meme est une cible
 *   [data-reveal-stagger]  -> chacun de ses enfants directs est une cible (cascade)
 * Les noeuds aria-hidden="true" sont ignores (decoratifs). A l'epreuve du CMS: un
 * contenu absent n'est pas dans le DOM, donc pas dans la cascade. Partage par la
 * directive v-reveal et useEntrance (memes marqueurs). */
function isHidden(el: Element): boolean {
  return el.getAttribute('aria-hidden') === 'true'
}

export function collectRevealTargets(root: HTMLElement): HTMLElement[] {
  const targets: HTMLElement[] = []
  const marked = root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]')
  marked.forEach((el) => {
    if (isHidden(el)) return
    if (el.hasAttribute('data-reveal-stagger')) {
      Array.from(el.children).forEach((child) => {
        if (child instanceof HTMLElement && !isHidden(child)) targets.push(child)
      })
    } else {
      targets.push(el)
    }
  })
  return targets
}
