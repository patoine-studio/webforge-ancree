<script setup lang="ts">
/* Temoignages: un MUR asymetrique en mosaique legere (DESIGN.md), CALE sur la
 * grille de page (16 pistes): des rangees de trois cartes en largeurs INEGALES
 * (5/6/5, la carte du centre plus large), cartes de MEME hauteur par rangee
 * (align-items: stretch) avec la signature ancree en bas, jamais une grille
 * parfaitement reguliere. La carte
 * d'ancrage en bleu nuit (au centre de la premiere rangee, donc la plus large)
 * casse le champ blanc: le moment fort du mur. Chaque carte: le grand guillemet
 * ambre, la citation, puis le nom et la VILLE du client (renforce le local).
 * Aucune numerotation. La section peint son fond tout de suite; seul le mur est anime. */
import type { BlockBase } from '~/types/blocks'
import type { TestimonialsContent } from '~/content/testimonials'

type TestimonialsBlock = BlockBase<'testimonials'> & TestimonialsContent

const props = defineProps<TestimonialsBlock>()

/* La carte d'ancrage (bleu nuit) est posee en deuxieme position: au centre de la
 * premiere rangee (la piste la plus large, 6 colonnes), le moment fort du mur. */
const anchorIndex = computed(() => (props.items.length > 2 ? 1 : 0))
</script>

<template>
  <section class="tm">
    <div class="wf-container">
      <SectionHead :eyebrow="eyebrow" :heading="heading" />

      <ul class="tm__wall section-grid" data-reveal-stagger>
        <li
          v-for="(item, i) in items"
          :key="item.name + item.city"
          class="tm__card"
          :class="{ 'tm__card--anchor': i === anchorIndex }"
        >
          <figure class="tm__figure">
            <Icon name="lucide:quote" class="tm__mark" aria-hidden="true" />
            <blockquote class="tm__quote wf-body-2">{{ item.quote }}</blockquote>
            <figcaption class="tm__cite">
              <span class="tm__name wf-caption">{{ item.name }}</span>
              <span class="tm__city">
                <Icon name="lucide:map-pin" class="tm__pin" aria-hidden="true" />
                {{ item.city }}
              </span>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.tm {
  padding-block: var(--space-block-default);
  background: var(--bg-alt);
}

/* Mur en mosaique calee sur la grille de page: une carte par rangee au mobile,
 * deux en tablette, trois au desktop (5/6/5). Cartes de meme hauteur par rangee,
 * jamais une grille reguliere. */
.tm__wall {
  margin: var(--space-head-content) 0 0;
  padding: 0;
  list-style: none;
  /* section-grid pose 1.6rem au mobile; le mur veut 2rem a tous les paliers. */
  gap: 2rem;
}
.tm__card {
  /* Mobile (4 pistes de la page): pleine largeur. */
  grid-column: 1 / -1;
}

.tm__figure {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem;
  background: var(--bg-lift);
  border-radius: var(--radius-lg);
  box-shadow: var(--elev-low);
  color: var(--text-base);
}

/* Le grand guillemet, marqueur ambre pose en tete de la citation (la citation
 * porte le temoignage; pas de rang d'etoiles uniforme qui sonne faux). */
.tm__mark {
  width: 3.6rem;
  height: 3.6rem;
  color: color-mix(in oklch, var(--accent-call) 75%, transparent);
}
.tm__quote {
  margin-top: 1rem;
  /* Pousse la signature en bas: la citation occupe l'espace libre quand la carte
   * est etiree a la hauteur de sa rangee, l'ecart cite reste constant. */
  flex: 1;
  text-wrap: pretty;
}
.tm__cite {
  margin-top: 2rem;
  padding-top: 1.8rem;
  border-top: var(--line-hair);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-style: normal;
}
.tm__name {
  color: var(--text-base);
}
.tm__city {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-body);
  font-size: 1.4rem;
  color: var(--text-muted);
}
.tm__pin {
  width: 1.6rem;
  height: 1.6rem;
  flex: none;
  color: var(--accent-trust);
}

/* Carte d'ancrage: bleu nuit, le moment fort du mur. Etoiles et nom passent au
 * clair, le pin a l'ambre. */
.tm__card--anchor .tm__figure {
  background: var(--bg-deep);
  border-color: transparent;
  color: var(--text-ondeep);
  box-shadow: var(--elev-mid);
}
.tm__card--anchor .tm__mark {
  color: color-mix(in oklch, var(--accent-call) 85%, transparent);
}
.tm__card--anchor .tm__quote {
  color: var(--text-ondeep);
}
.tm__card--anchor .tm__cite {
  border-top: var(--line-ondeep);
}
.tm__card--anchor .tm__name {
  color: var(--text-ondeep);
}
.tm__card--anchor .tm__city {
  color: color-mix(in oklch, var(--text-ondeep) 78%, transparent);
}
.tm__card--anchor .tm__pin {
  color: var(--accent-call);
}

@container site (min-width: 640px) {
  /* Deux par rangee, calees sur 2 des 4 pistes de la page. */
  .tm__card {
    grid-column: span 2;
  }
}
@container site (min-width: 1024px) {
  /* Trois par rangee sur les 16 pistes, en largeurs INEGALES (5/6/5): la carte du
   * centre de chaque rangee est plus large (mosaique legere, DESIGN.md). Les bords
   * tombent sur les lignes 5/6, 11/12 et 16. */
  .tm__wall {
    row-gap: 2.4rem;
  }
  .tm__card {
    grid-column: span 5;
  }
  .tm__card:nth-child(3n + 2) {
    grid-column: span 6;
  }
}
</style>
