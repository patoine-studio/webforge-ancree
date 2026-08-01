import { DEMO_NOTICE_EVENT } from '~/config/demo-notice'

/* Garde globale des coordonnees fictives. L'interception en capture couvre les
 * liens issus de Sanity, le header, le menu mobile, le footer et les CTA. */
export default defineNuxtPlugin(() => {
  if (useRuntimeConfig().public.siteMode !== 'demo') return

  const root = document.documentElement
  root.dataset.wfSiteMode = 'demo'
  root.dataset.wfDemoNotice = 'pending'

  function onClick(event: MouseEvent) {
    const origin = event.target
    if (!(origin instanceof Element)) return
    const link = origin.closest<HTMLAnchorElement>('a[href]')
    const href = link?.getAttribute('href')?.trim().toLowerCase()
    if (!href?.startsWith('tel:') && !href?.startsWith('mailto:')) return

    event.preventDefault()
    window.dispatchEvent(new CustomEvent(DEMO_NOTICE_EVENT))
  }

  document.addEventListener('click', onClick, true)
  if (import.meta.hot) {
    import.meta.hot.dispose(() => document.removeEventListener('click', onClick, true))
  }
})
