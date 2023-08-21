<template>
  <nav class="border-gray-200 bg-white shadow-md dark:bg-gray-900">
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <NuxtLink to="/" class="flex items-center">
        <img src="/logo.png" class="mb-1 mr-3 h-8 w-8" alt="Flowbite Logo" />
        <span
          class="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:inline"
          >Medical History</span
        >
      </NuxtLink>
      <div class="flex items-center md:order-2">
        <button
          type="button"
          class="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span class="sr-only">Open menu</span>
          <img
            class="h-8 w-8 rounded-full"
            :src="auth.user?.picture"
            :alt="`${auth.user?.name}'s avatar'`"
          />
        </button>

        <div
          class="z-50 my-4 hidden max-w-[200px] list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
          id="user-dropdown"
        >
          <div class="px-4 py-3">
            <span class="mb-1 block text-sm text-gray-900 dark:text-white"
              >Dr. {{ auth.user?.name }}</span
            >
            <span
              class="block truncate text-sm text-gray-500 dark:text-gray-400"
              >{{ auth.user?.email }}</span
            >
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a
                href="#"
                @click="() => auth.logout()"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        id="navbar-user"
      >
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium shadow-lg dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:shadow-none md:dark:bg-gray-900"
        >
          <li>
            <NuxtLink
              to="/"
              :class="
                route.path === '/' ? activeMenuItemClasses : menuItemClasses
              "
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/dashboard"
              :class="
                route.path === '/dashboard'
                  ? activeMenuItemClasses
                  : menuItemClasses
              "
              >Dashboard</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const auth = useAuth();
const route = useRoute();
console.log(route.path);

const activeMenuItemClasses =
  "block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500";
const menuItemClasses =
  "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500";
</script>
