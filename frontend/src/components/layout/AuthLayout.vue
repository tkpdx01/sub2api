<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 dark:bg-dark-950 dark:text-gray-100">
    <div class="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-8 sm:py-12">
      <div class="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-dark-800 dark:bg-dark-900 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside class="flex flex-col justify-between border-b border-gray-200 bg-gray-50 px-6 py-8 dark:border-dark-800 dark:bg-dark-950 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
          <div>
            <div class="flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900">
                <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
              </div>
              <div class="min-w-0">
                <h1 class="truncate text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {{ siteName }}
                </h1>
                <p class="mt-1 text-sm text-gray-500 dark:text-dark-400">
                  {{ siteSubtitle }}
                </p>
              </div>
            </div>

            <div class="mt-8 text-sm leading-6 text-gray-600 dark:text-dark-300">
              <p>{{ siteSubtitle }}</p>
            </div>
          </div>

          <div class="mt-8 text-xs text-gray-400 dark:text-dark-500">
            &copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}
          </div>
        </aside>

        <section class="px-6 py-8 sm:px-8 sm:py-10">
          <div class="mx-auto w-full max-w-md">
            <slot />
            <div class="mt-6 text-center text-sm">
              <slot name="footer" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const { t } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() =>
  sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true })
)
const siteSubtitle = computed(
  () => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform'
)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>
