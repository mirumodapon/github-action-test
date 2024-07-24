<!--
  Copyright (c) 2023 yoyo930021, Mirumodapon

  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
-->

<template>
  <main id="fringe" class="page-container">
    <div v-if="fringes" class="outer-container">
      <div v-for="fringe in fringes" :key="fringe.id" class="card fringe-container">
        <div class="img-container">
          <a :href="fringe.link || undefined" target="_blank" rel="noopener">
            <img :src="fringe.logo" :alt="fringe.title[languageType]" />
          </a>
        </div>
        <div class="content-container">
          <a :href="fringe.link || undefined" target="_blank" rel="noopener">
            <h2>
              {{ fringe.title[languageType] }}
            </h2>
          </a>

          <p class="contact">{{ fringe.contact }} &lt;{{ fringe.email }}&gt;</p>

          <article v-html="fringe.description[languageType]" class="markdown"></article>
          <div class="readmore" @click="onReadmoreClick">
            <span>Read More</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch, reactive } from 'vue'
import markdown from '@/utils/markdown'
import fringeData from '@/assets/json/fringe.json'
import '@/assets/scss/pages/fringe.scss'
import { useBreakpoints } from '@/modules/breakpoints'
import { Locale } from '@/modules/i18n'
import { useI18n } from 'vue-i18n'
import { isClient } from '@vueuse/core'

export default defineComponent({
  name: 'Sponsor',
  setup () {
    const { locale, t } = useI18n()
    const { breakpoint } = useBreakpoints()
    const languageType = computed(() => locale.value as Locale)

    const fringes = reactive(fringeData.fringes.map(fringe => ({
      ...fringe,
      description: Object.fromEntries(Object.keys(fringe.description).map(
        lang => [lang, markdown(fringe.description[lang])]
      ))
    })))
    const onReadmoreClick = (event: MouseEvent) => {
      if (!isClient) return
      const contentContainer = (event.target as HTMLElement).parentElement as HTMLElement
      contentContainer.classList.remove('folded')
    }

    const detectOverflowContentElements = () => {
      const elements = Array.from(document.querySelectorAll('#fringe .content-container'))
      elements.forEach((element) => {
        element.classList.remove('folded')
      })
      elements.forEach((element) => {
        if (element.getBoundingClientRect().height > 300) {
          element.classList.add('folded')
        }
      })
    }

    onMounted(async () => {
      isClient && detectOverflowContentElements()
    })

    isClient && watch(() => breakpoint.value, async () => {
      detectOverflowContentElements()
    })

    return {
      t,
      languageType,
      fringes,
      onReadmoreClick
    }
  }
})
</script>
