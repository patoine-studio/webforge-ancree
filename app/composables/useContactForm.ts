/* Formulaire de contact, version FACTICE et CLIENT-SEULEMENT (pas de backend, pas
 * de Turnstile pour l'instant). Tient l'etat de soumission, valide cote client et
 * simule un envoi: apres une courte attente, le statut passe a success. La
 * validation retourne la liste ordonnee des champs invalides pour que la vue
 * deplace le focus vers le premier en faute. Le garde status === 'loading' bloque
 * la double soumission sans jamais desactiver le bouton (regle d'accessibilite du
 * geste d'appel). Quand un vrai endpoint arrivera, seul submit() changera; le
 * contrat (status, errors, submit) reste. */
import { reactive, ref, type Ref } from 'vue'

export type ContactStatus = 'idle' | 'loading' | 'success'

/* Cles de champ stables, decouplees des libelles (qui viennent du contenu i18n). */
export type ContactField = 'name' | 'contact' | 'message'

export interface ContactValues {
  name: string
  contact: string
  message: string
}

export interface UseContactForm {
  status: Ref<ContactStatus>
  values: ContactValues
  errors: Record<ContactField, string>
  /* Renvoie la cle du premier champ invalide, ou null si tout est valide. */
  validate: () => ContactField | null
  /* Garde la double soumission, valide, puis simule l'envoi. Le rappel optionnel
   * recoit la cle du premier champ en faute pour replacer le focus. */
  submit: (onInvalid?: (firstInvalid: ContactField) => void) => void
  reset: () => void
}

/* Delai simule de l'envoi factice. Tokenise ici (pas une valeur design): assez
 * long pour montrer l'etat de chargement, assez court pour ne pas agacer. */
const FAKE_LATENCY_MS = 900

/* Validateurs minimaux: presence pour les champs requis, et une heuristique
 * souple courriel ou telephone pour le champ de coordonnee (ni l'un ni l'autre
 * format n'est impose, on accepte les deux). Messages remis par la vue (i18n);
 * ici on ne renvoie qu'un drapeau de cle d'erreur generique non vide. */
function looksLikeContact(raw: string): boolean {
  const v = raw.trim()
  if (v.length < 5) return false
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const digits = v.replace(/\D/g, '')
  const isPhone = digits.length >= 10
  return isEmail || isPhone
}

export function useContactForm(messages: Record<ContactField, string>): UseContactForm {
  const status = ref<ContactStatus>('idle')

  const values = reactive<ContactValues>({
    name: '',
    contact: '',
    message: ''
  })

  const errors = reactive<Record<ContactField, string>>({
    name: '',
    contact: '',
    message: ''
  })

  function clearError(field: ContactField): void {
    errors[field] = ''
  }

  function validate(): ContactField | null {
    let firstInvalid: ContactField | null = null

    // Nom: requis.
    if (!values.name.trim()) {
      errors.name = messages.name
      firstInvalid = firstInvalid ?? 'name'
    } else {
      clearError('name')
    }

    // Coordonnee: requise, et doit ressembler a un courriel ou un telephone.
    if (!looksLikeContact(values.contact)) {
      errors.contact = messages.contact
      firstInvalid = firstInvalid ?? 'contact'
    } else {
      clearError('contact')
    }

    // Message: optionnel, jamais en faute.
    clearError('message')

    return firstInvalid
  }

  let timer: ReturnType<typeof setTimeout> | null = null

  function submit(onInvalid?: (firstInvalid: ContactField) => void): void {
    // Garde la double soumission sans desactiver le bouton.
    if (status.value === 'loading') return

    const firstInvalid = validate()
    if (firstInvalid) {
      onInvalid?.(firstInvalid)
      return
    }

    status.value = 'loading'
    // Envoi factice: aucune requete reseau, juste un delai puis le succes.
    timer = setTimeout(() => {
      status.value = 'success'
    }, FAKE_LATENCY_MS)
  }

  function reset(): void {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    status.value = 'idle'
    values.name = ''
    values.contact = ''
    values.message = ''
    clearError('name')
    clearError('contact')
    clearError('message')
  }

  return { status, values, errors, validate, submit, reset }
}
