<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div v-else class="min-h-screen bg-white text-gray-900 dark:bg-dark-950 dark:text-gray-100">
    <header class="border-b border-gray-200 dark:border-dark-800">
      <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div class="flex min-w-0 items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-900"
          >
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {{ siteName }}
            </p>
            <p class="hidden truncate text-xs text-gray-500 dark:text-dark-400 sm:block">
              {{ siteSubtitle }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />

          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-dark-700 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-white"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>

          <button
            @click="toggleTheme"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-dark-700 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-white"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="btn btn-primary hidden sm:inline-flex"
          >
            {{ t('home.dashboard') }}
          </router-link>
          <router-link
            v-else
            to="/login"
            class="btn btn-primary hidden sm:inline-flex"
          >
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main>
      <section class="border-b border-gray-200 dark:border-dark-800">
        <div
          class="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-20"
        >
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400"
            >
              {{ siteSubtitle }}
            </p>
            <h1 class="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              {{ siteName }}
            </h1>
            <p class="mt-4 text-lg font-medium text-gray-900 dark:text-white md:text-xl">
              {{ t('home.heroSubtitle') }}
            </p>
            <p class="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-dark-300">
              {{ t('home.heroDescription') }}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <router-link
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="btn btn-primary"
              >
                {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
                <Icon name="arrowRight" size="md" :stroke-width="2" />
              </router-link>
              <a
                v-if="docUrl"
                :href="docUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                {{ t('home.docs') }}
              </a>
            </div>

            <div class="mt-8 flex flex-wrap gap-2">
              <span
                v-for="tag in quickTags"
                :key="tag"
                class="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 dark:border-dark-700 dark:text-dark-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 dark:border-dark-700 dark:bg-black">
            <div class="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <span class="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-xs text-emerald-300">
                200 OK
              </span>
            </div>
            <pre class="overflow-x-auto px-4 py-4 text-sm leading-7 text-gray-200"><code>{{ sampleRequest }}</code></pre>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-14">
        <div class="max-w-2xl">
          <h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ t('home.solutions.title') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-dark-300">
            {{ t('home.solutions.subtitle') }}
          </p>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-3">
          <article
            v-for="feature in featureCards"
            :key="feature.id"
            class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-700 dark:bg-dark-900"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              {{ feature.label }}
            </p>
            <h3 class="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-dark-300">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </section>

      <section class="border-t border-gray-200 dark:border-dark-800">
        <div class="mx-auto max-w-6xl px-6 py-14">
          <div class="max-w-2xl">
            <h2 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {{ t('home.providers.title') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-dark-300">
              {{ t('home.providers.description') }}
            </p>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="provider in providers"
              :key="provider.id"
              class="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-dark-700 dark:bg-dark-900"
            >
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ provider.name }}
                </p>
                <p v-if="provider.note" class="mt-1 text-xs text-gray-500 dark:text-dark-400">
                  {{ provider.note }}
                </p>
              </div>
              <span
                class="rounded-full px-2.5 py-1 text-xs font-medium"
                :class="provider.state === 'supported'
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 dark:bg-dark-800 dark:text-dark-400'"
              >
                {{ provider.badge }}
              </span>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-gray-200 dark:border-dark-800">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-gray-500 dark:text-dark-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}</p>
        <div class="flex items-center gap-4">
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            {{ t('home.docs') }}
          </a>
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'AI API Gateway Platform')
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const githubUrl = 'https://github.com/Wei-Shaw/sub2api'

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const currentYear = computed(() => new Date().getFullYear())

const quickTags = computed(() => [
  t('home.tags.subscriptionToApi'),
  t('home.tags.stickySession'),
  t('home.tags.realtimeBilling')
])

const featureCards = computed(() => [
  {
    id: 'gateway',
    label: '01',
    title: t('home.features.unifiedGateway'),
    description: t('home.features.unifiedGatewayDesc')
  },
  {
    id: 'reliable',
    label: '02',
    title: t('home.features.multiAccount'),
    description: t('home.features.multiAccountDesc')
  },
  {
    id: 'billing',
    label: '03',
    title: t('home.features.balanceQuota'),
    description: t('home.features.balanceQuotaDesc')
  }
])

const providers = computed(() => [
  {
    id: 'claude',
    name: t('home.providers.claude'),
    note: 'Anthropic',
    badge: t('home.providers.supported'),
    state: 'supported'
  },
  {
    id: 'gpt',
    name: 'GPT',
    note: 'OpenAI',
    badge: t('home.providers.supported'),
    state: 'supported'
  },
  {
    id: 'gemini',
    name: t('home.providers.gemini'),
    note: 'Google',
    badge: t('home.providers.supported'),
    state: 'supported'
  },
  {
    id: 'antigravity',
    name: t('home.providers.antigravity'),
    note: 'Antigravity',
    badge: t('home.providers.supported'),
    state: 'supported'
  },
  {
    id: 'more',
    name: t('home.providers.more'),
    note: '',
    badge: t('home.providers.soon'),
    state: 'soon'
  }
])

const sampleRequest = [
  'POST /v1/chat/completions',
  'Authorization: Bearer sk-********************************',
  'Model: claude-sonnet-4',
  '',
  'route -> healthy upstream account',
  'response <- 200 OK   612ms   1248 output tokens'
].join('\n')

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>
