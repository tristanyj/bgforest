<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
const interactionStore = useInteractionStore();
const { isModalOpen, selectedGame } = storeToRefs(interactionStore);
const { setSelectedGame } = interactionStore;

// Handle escape key
function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen.value) {
    setSelectedGame(null);
  }
}

// Image loading state
const imageLoading = ref(true);

// Add/remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});

// Prevent scroll when modal is open
watch(isModalOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="setSelectedGame(null)"
      />

      <!-- Modal panel -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all max-w-2xl w-full">
          <!-- Close button -->
          <button
            type="button"
            class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            @click="setSelectedGame(null)"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Content -->
          <div class="p-6">
            <div class="flex gap-6">
              <!-- Image -->
              <div class="w-1/3 flex-shrink-0">
                <div
                  v-if="imageLoading"
                  class="w-full h-64 bg-gray-200 animate-pulse rounded-lg"
                />
                <img
                  v-show="!imageLoading"
                  :src="selectedGame?.image"
                  :alt="selectedGame?.name"
                  class="w-full h-auto rounded-lg shadow-lg"
                  @load="imageLoading = false"
                />
              </div>

              <!-- Info -->
              <div class="w-2/3">
                <h2 class="text-2xl font-bold mb-4">
                  {{ selectedGame?.name }}
                </h2>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="text-sm">
                    <span class="font-semibold">Year:</span>
                    {{ selectedGame?.year_published }}
                  </div>
                  <div class="text-sm">
                    <span class="font-semibold">Rating:</span>
                    {{ selectedGame?.rating_average.toFixed(1) }}
                  </div>
                  <div class="text-sm">
                    <span class="font-semibold">Weight:</span>
                    {{ selectedGame?.weight_average.toFixed(1) }}
                  </div>
                  <div class="text-sm">
                    <span class="font-semibold">Owned by:</span>
                    {{ selectedGame?.owned_count.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease-out;
}

.modal-enter-from .bg-white {
  transform: scale(0.95);
}

.modal-leave-to .bg-white {
  transform: scale(0.95);
}

/* Custom scrollbar for description */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
