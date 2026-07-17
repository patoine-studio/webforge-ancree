<script setup lang="ts">
/* Processus (comment on intervient): trois temps poses sur une meme ligne
 * d'horizon, signature « s'ancre au sol » de la famille. L'ordre se LIT de gauche
 * a droite (et de haut en bas au plus etroit), il n'est JAMAIS numerote (regle dure
 * site-wide): ce sont des CONNECTEURS DIRECTIONNELS entre les stations (un filet qui
 * se renforce vers un chevron pointe vers le temps suivant) qui portent la sequence
 * et la progression, pas des chiffres. Les stations entrent en cascade depuis le bas
 * (data-reveal-stagger): le chemin se trace station par station. Fond en alternance
 * tres subtile (jamais beige) pour le rythme. Asymetrie posee via SectionHead. */
import type { BlockBase } from '~/types/blocks'
import type { ProcessContent } from '~/content/process'

type ProcessBlock = BlockBase<'process'> & ProcessContent

defineProps<ProcessBlock>()
</script>

<template>
  <section class="process">
    <div class="wf-container">
      <SectionHead :eyebrow="eyebrow" :heading="heading" :lead="lead" />

      <ul class="process__steps" data-reveal-stagger>
        <li v-for="(step, index) in steps" :key="step.title" class="process__step">
          <span class="process__pastille" aria-hidden="true" />
          <!-- Connecteur directionnel vers la station suivante: un filet qui se
               renforce vers un chevron. Decoratif (aria-hidden), monte avec sa
               station. Absent apres la derniere station. Desktop seulement (au
               plus etroit, l'empilement porte l'ordre de lui-meme). -->
          <span v-if="index < steps.length - 1" class="process__link" aria-hidden="true">
            <Icon name="lucide:chevron-right" class="process__link-arrow" />
          </span>
          <h3 class="process__title wf-h4">{{ step.title }}</h3>
          <p class="process__body wf-body-2">{{ step.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.process {
  padding-block: var(--space-block-default);
  background: var(--bg-alt);
}

/* Liste des temps. Mobile: empiles, l'ordre se lit de haut en bas. Les connecteurs
 * n'apparaissent qu'au desktop, la ou les stations s'alignent sur une meme rangee. */
.process__steps {
  margin: var(--space-head-content) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.2rem;
}
.process__step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Station: marqueur plein pose sur la ligne d'horizon. Le disque bleu nuit et
 * son coeur ambre forment un repere autonome, pas un emplacement d'icone vide. */
.process__pastille {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: var(--process-node-size);
  height: var(--process-node-size);
  border-radius: var(--radius-pill);
  background: var(--bg-deep);
  border: var(--line-ondeep);
  box-shadow: var(--elev-low);
  margin-bottom: 2rem;
}
.process__pastille::before {
  content: '';
  width: var(--process-node-core-size);
  height: var(--process-node-core-size);
  border-radius: var(--radius-pill);
  background: var(--accent-call);
  box-shadow: 0 0 0 var(--process-node-core-halo) var(--accent-call-soft);
}
.process__title {
  margin: 0;
}
.process__body {
  margin-top: var(--space-card-title-body);
  max-width: 42ch;
  color: var(--text-muted);
}

/* Connecteur directionnel (desktop). Pose sur l'horizon (centre des pastilles,
 * centre du marqueur), il enjambe la gouttiere de la station courante a la
 * suivante. Le filet se RENFORCE de gauche a droite et finit sur un chevron bleu
 * confiance pointe vers la station suivante: la direction se lit, sans chiffre. */
.process__link {
  position: absolute;
  top: var(--process-link-center);
  left: var(--process-link-start);
  right: var(--process-link-end);
  transform: translateY(-50%);
  display: none;
  align-items: center;
  pointer-events: none;
}
.process__link::before {
  content: '';
  flex: 1 1 auto;
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(
    to right,
    color-mix(in oklch, var(--text-base) 10%, transparent),
    color-mix(in oklch, var(--accent-trust) 50%, transparent)
  );
}
.process__link-arrow {
  flex: none;
  width: 1.7rem;
  height: 1.7rem;
  margin-left: -0.3rem;
  color: var(--accent-trust);
}

@container site (min-width: 1024px) {
  .process__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4rem;
    align-items: start;
  }
  .process__link {
    display: flex;
  }
}
</style>
