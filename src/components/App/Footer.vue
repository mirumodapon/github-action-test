<!--
  Copyright (c) 2020 DevilTea

  This software is released under the MIT License.
  https://opensource.org/licenses/MIT
-->

<template>
  <div class="footer-container">
    <footer id="footer">
      <section class="footer__section">
        <p class="title">COSCUP</p>
        <p class="content">
          Conference for Open Source Coders, Users, and Promoters
        </p>
      </section>
      <section>
        <img src='https://img.shields.io/badge/D%26I-Gold-yellow?style=flat-square&labelColor=583586&&link=https://github.com/badging/event-diversity-and-inclusion/issues/346/&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1MCAyNTAiPgo8cGF0aCBmaWxsPSIjMUM5QkQ2IiBkPSJNOTcuMSw0OS4zYzE4LTYuNywzNy44LTYuOCw1NS45LTAuMmwxNy41LTMwLjJjLTI5LTEyLjMtNjEuOC0xMi4yLTkwLjgsMC4zTDk3LjEsNDkuM3oiLz4KPHBhdGggZmlsbD0iIzZBQzdCOSIgZD0iTTE5NC42LDMyLjhMMTc3LjIsNjNjMTQuOCwxMi4zLDI0LjcsMjkuNSwyNy45LDQ4LjVoMzQuOUMyMzYuMiw4MC4yLDIxOS45LDUxLjcsMTk0LjYsMzIuOHoiLz4KPHBhdGggZmlsbD0iI0JGOUNDOSIgZD0iTTIwNC45LDEzOS40Yy03LjksNDMuOS00OS45LDczLTkzLjgsNjUuMWMtMTMuOC0yLjUtMjYuOC04LjYtMzcuNS0xNy42bC0yNi44LDIyLjQKCWM0Ni42LDQzLjQsMTE5LjUsNDAuOSwxNjIuOS01LjdjMTYuNS0xNy43LDI3LTQwLjIsMzAuMS02NC4ySDIwNC45eiIvPgo8cGF0aCBmaWxsPSIjRDYxRDVGIiBkPSJNNTUuNiwxNjUuNkMzNS45LDEzMS44LDQzLjMsODguOCw3My4xLDYzLjVMNTUuNywzMy4yQzcuNSw2OS44LTQuMiwxMzcuNCwyOC44LDE4OEw1NS42LDE2NS42eiIvPgo8L3N2Zz4K' alt='d&i-badging-badge-state: Gold'/>
      </section>
      <section class="footer__section">
        <div class="content contacts">
            <div class="contact">
                <p class="subtitle">{{ t('app.footer.contact_attendee') }}</p>
                <p><a href="mailto:attendee@coscup.org">attendee@coscup.org</a></p>
            </div>
            <div class="contact">
                <p class="subtitle">{{ t('app.footer.contact_sponsorship') }}</p>
                <p><a href="mailto:sponsorship@coscup.org">sponsorship@coscup.org</a></p>
            </div>
            <div class="contact">
                <p class="subtitle">{{ t('app.footer.contact_program') }}</p>
                <p><a href="mailto:program@coscup.org">program@coscup.org</a></p>
            </div>
            <div class="contact">
                <p class="subtitle">{{ t('app.footer.contact_marketing') }}</p>
                <p><a href="mailto:marketing@coscup.org">marketing@coscup.org</a></p>
            </div>
        </div>
      </section>
      <section class="footer__section">
        <p class="title">
          {{ t('app.footer.subscribe') }}
        </p>
        <div class="content subscribe">
          <a
            href="https://secretary.coscup.org/subscribe/coscup"
            class="subscribe-link"
            >{{ t('app.footer.subscribe_newslatter') }}</a
          >
        </div>
      </section>
      <section class="footer__section">
        <p class="title">
          {{ t('app.footer.websites') }}
        </p>
        <div class="content past">
          <a
            v-for="i in numOfPast"
            :href="`https://coscup.org/${2006 + i - 1}/`"
            :key="`website-${2006 + i - 1}`"
            class="past-link"
            target="_blank"
            rel="noopener"
            >{{ 2006 + i - 1 }}</a
          >
        </div>
      </section>
      <section class="footer__section">
        <p class="title">
          {{ t('app.footer.social') }}
        </p>
        <div class="content">
          <a
            v-for="media in communityMedia"
            :href="media.link"
            :key="`media-${media.name}`"
            class="media-link"
            target="_blank"
            :rel="media.name === 'mastodom'? 'me': 'noopener'"
          >
            <component :is="media.icon"></component>
          </a>
        </div>
      </section>
    </footer>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent } from 'vue'
import IconBlogger from '~icons/fa-brands/blogger'
import IconFacebook from '~icons/fa-brands/facebook'
import IconFlickr from '~icons/fa-brands/flickr'
import IconPlurk from '~icons/el/plurk-alt'
import IconTwitter from '~icons/fa-brands/twitter'
import IconYoutube from '~icons/fa-brands/youtube'
import IconTelegram from '~icons/fa-brands/telegram-plane'
import IconBullhorn from '~icons/fa-solid/bullhorn'
import IconMedium from '~icons/fa-brands/medium'
import IconMastodon from '~icons/fa-brands/mastodon'

export default defineComponent({
  name: 'Footer',
  setup () {
    const { t } = useI18n()
    const numOfPast = import.meta.env.VITE_YEAR - 2006

    return {
      t,
      numOfPast,
      communityMedia: [
        {
          name: 'blogger',
          icon: IconBlogger,
          link: 'https://blog.coscup.org/'
        },
        {
          name: 'facebook',
          icon: IconFacebook,
          link: 'https://www.facebook.com/coscup/'
        },
        {
          name: 'flickr',
          icon: IconFlickr,
          link: 'https://www.flickr.com/photos/coscup/'
        },
        {
          name: 'plurk',
          icon: IconPlurk,
          link: 'https://www.plurk.com/coscup'
        },
        {
          name: 'twitter',
          icon: IconTwitter,
          link: 'https://twitter.com/coscup'
        },
        {
          name: 'youtube',
          icon: IconYoutube,
          link: 'https://www.youtube.com/user/thecoscup'
        },
        {
          name: 'telegram',
          icon: IconTelegram,
          link: 'https://t.me/coscupchat'
        },
        {
          name: 'channel',
          icon: IconBullhorn,
          link: 'https://t.me/coscup'
        },
        {
          name: 'medium',
          icon: IconMedium,
          link: 'https://coscup.medium.com'
        },
        {
          name: 'mastodom',
          icon: IconMastodon,
          link: 'https://floss.social/@COSCUP'
        }
      ]
    }
  }
})
</script>
