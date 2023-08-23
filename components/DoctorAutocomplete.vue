<template>
  <div>
    <form>
      <label
        for="default-search"
        class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          v-if="!selectedDoctor"
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          @focus="handleFocus"
          @blur="handleBlur"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search by name or email..."
          v-model="searchQuery"
          :disabled="!!selectedDoctor"
          ref="inputRef"
        />
        <div
          v-if="selectedDoctor"
          class="absolute left-10 top-2 w-40 bg-gray-50"
        >
          <span class="block text-sm text-gray-900 dark:text-white">{{
            selectedDoctor.name
          }}</span>
          <span
            class="block truncate text-sm text-gray-500 dark:text-gray-400"
            >{{ selectedDoctor.email }}</span
          >
        </div>
        <button
          v-if="selectedDoctor"
          class="absolute right-4 top-5"
          @click="handleRemoveSelected"
        >
          <svg
            class="h-3 w-3 text-gray-600 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </form>

    <div
      v-if="isShowDropdown"
      id="dropdown"
      class="z-10 h-40 w-full divide-y divide-gray-100 rounded-b-lg border border-gray-200 bg-white shadow-lg dark:bg-gray-700"
    >
      <div v-if="pending" class="flex h-full items-center justify-center">
        <Spinner class="mx-auto" />
      </div>
      <div
        v-else-if="error"
        class="flex h-full items-center justify-center text-center text-sm text-red-600 dark:text-red-500"
      >
        An error occured
      </div>
      <div
        v-else-if="!doctors?.length"
        class="flex h-full items-center justify-center text-center text-sm text-gray-500 dark:text-gray-400"
      >
        Not found
      </div>
      <ul
        v-else
        class="text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li
          v-for="doctor in doctors"
          class="p-4 hover:cursor-pointer hover:bg-gray-200"
          @click="$emit('update:modelValue', doctor.id)"
        >
          <span class="mb-1 block text-sm text-gray-900 dark:text-white">{{
            doctor.name
          }}</span>
          <span
            class="block truncate text-sm text-gray-500 dark:text-gray-400"
            >{{ doctor.email }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debounce } from "~/utils/debounce";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref("");
const searchQueryDebounced = ref("");
const canShowDropdown = ref(false);
const inputRef = ref<HTMLInputElement>();
const selectedDoctor = ref();

const modelValue = computed(() => props.modelValue);
const { data, pending, error } = useFetch("/api/doctor", {
  query: { substr: searchQueryDebounced, id: modelValue },
});

const doctors = computed(() => data.value);
const isShowDropdown = computed(
  () => canShowDropdown.value && searchQuery.value,
);

const updateSearchQueryDebounced = debounce(() => {
  searchQueryDebounced.value = searchQuery.value;
});

const handleFocus = () => {
  canShowDropdown.value = true;
};

const handleBlur = () => {
  setTimeout(() => {
    canShowDropdown.value = false;
  }, 200);
};

const handleRemoveSelected = () => {
  emit("update:modelValue", "");
  nextTick(() => {
    inputRef?.value?.focus();
  });
};

watchEffect(() => {
  if (
    modelValue.value &&
    data.value?.length === 1 &&
    data.value[0].id === modelValue.value
  ) {
    selectedDoctor.value = data.value[0];
    searchQuery.value = "";
  } else if (!modelValue.value) {
    selectedDoctor.value = undefined;
  }
});

watch(
  searchQuery,
  () => {
    updateSearchQueryDebounced();
  },
  { immediate: true },
);
</script>
