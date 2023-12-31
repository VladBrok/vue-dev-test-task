<template>
  <div class="mt-8">
    <div
      v-if="(pending && isInitial) || isDeleting"
      class="flex items-center justify-center"
    >
      <Spinner />
    </div>

    <div v-else-if="error" class="mx-auto max-w-sm">
      <AlertError>Failed to load patients. Please refresh the page.</AlertError>
    </div>

    <section
      v-else
      :class="`overflow-x-auto break-words bg-gray-50 p-3 dark:bg-gray-900 sm:p-5`"
    >
      <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div
          class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
        >
          <div
            class="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0"
          >
            <div class="w-full max-w-sm md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-100 p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search"
                    v-model="searchQuery"
                  />
                </div>
              </form>
            </div>
            <div
              class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0"
            >
              <div v-if="pending" class="mr-6">
                <UpdateIndicator />
              </div>

              <button
                type="button"
                class="hover:bg-primary-800 focus:ring-primary-300 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 dark:bg-blue-600"
                @click="navigateTo('/add-patient')"
              >
                <svg
                  class="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add patient
              </button>
            </div>
          </div>
          <div
            :class="`overflow-x-auto
          ${pending ? 'pointer-events-none opacity-70' : ''}
          `"
          >
            <table
              class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
            >
              <thead
                class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">Avatar</th>
                  <th scope="col" class="px-4 py-3">Name</th>
                  <th scope="col" class="px-4 py-3">Email</th>
                  <th scope="col" class="px-4 py-3">Registration Date</th>
                  <th scope="col" class="px-4 py-3">Diagnosis</th>
                  <th scope="col" class="px-4 py-3">Doctors</th>
                  <th scope="col" class="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="patient in patients"
                  :key="patient.id"
                  class="border-b dark:border-gray-700"
                >
                  <td class="px-4 py-3">
                    <img
                      v-if="patient.image"
                      :src="patient.image"
                      class="h-8 w-8 rounded-full"
                    />
                    <span v-else>—</span>
                  </td>
                  <td class="px-4 py-3">{{ patient.name }}</td>
                  <td class="px-4 py-3">{{ patient.email }}</td>
                  <td class="px-4 py-3">
                    {{ formatDate(patient.registrationDate) }}
                  </td>
                  <td class="max-w-[200px] px-4 py-3">
                    {{ patient.diagnosis }}
                  </td>
                  <td class="max-w-[200px] px-4 py-3">
                    {{
                      patient.doctors.length
                        ? patient.doctors.map((x) => x.name).join(", ")
                        : "—"
                    }}
                  </td>
                  <td class="px-4 py-3">
                    <NuxtLink
                      :to="`/update-patient/${patient.id}`"
                      class="mr-3 font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >Edit</NuxtLink
                    >
                    <button
                      type="button"
                      data-modal-target="popup-modal"
                      data-modal-toggle="popup-modal"
                      class="font-medium text-red-600 hover:underline dark:text-red-500"
                      @click="handleDelete(patient.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click="goToPrevPage"
                  :disabled="!canGoToPrevPage"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              <li>
                <div
                  class="flex items-center justify-center border border-gray-300 bg-blue-50 px-3 py-2 text-sm leading-tight text-blue-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400"
                >
                  {{ currentPage }}
                </div>
              </li>
              <li>
                <button
                  class="ml-0 flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:pointer-events-none disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click="goToNextPage"
                  :disabled="!canGoToNextPage"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <ConfirmationModal @confirmed="handleDeleteConfirm" />

    <Notification v-if="isDeleteError" text="Error while deleting a patient." />
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { nanoid } from "nanoid";
import { debounce } from "~/utils/debounce";

const PAGE_SIZE = 8;

const searchQuery = ref("");
const searchQueryDebounced = ref("");
const isInitial = ref(true);
const toDeleteId = ref("");
const isDeleting = ref(false);
const isDeleteError = ref(false);
const currentPage = ref(1);

const skip = computed(() => (currentPage.value - 1) * PAGE_SIZE);
const { data, pending, error, refresh } = useFetch("/api/patient", {
  query: { substr: searchQueryDebounced, skip, take: PAGE_SIZE },
  key: nanoid(),
});
const patients = computed(() => data.value?.patients);
const total = computed(() => data.value?.total);
const totalPages = computed(() => Math.ceil((total.value || 1) / PAGE_SIZE));
const canGoToPrevPage = computed(() => currentPage.value > 1);
const canGoToNextPage = computed(() => currentPage.value < totalPages.value);

const goToPrevPage = () => {
  if (!canGoToPrevPage.value) {
    return;
  }

  currentPage.value--;
};

const goToNextPage = () => {
  if (!canGoToNextPage.value) {
    return;
  }

  currentPage.value++;
};

const updateSearchQueryDebounced = debounce(() => {
  searchQueryDebounced.value = searchQuery.value;
});

const handleDelete = (patientId: string) => {
  toDeleteId.value = patientId;
};

const handleDeleteConfirm = async () => {
  isDeleting.value = true;
  try {
    await $fetch("/api/patient", {
      method: "DELETE",
      query: { id: toDeleteId.value },
    });
    isDeleteError.value = false;
    refresh();
  } catch (err) {
    console.error(err);
    isDeleteError.value = true;
  } finally {
    toDeleteId.value = "";
    isDeleting.value = false;
  }
};

watch(
  searchQuery,
  () => {
    updateSearchQueryDebounced();
  },
  { immediate: true },
);

watch(
  pending,
  () => {
    if (pending.value) {
      return;
    }

    isInitial.value = false;

    setTimeout(() => {
      initFlowbite();
    });
  },
  { immediate: true },
);
</script>
