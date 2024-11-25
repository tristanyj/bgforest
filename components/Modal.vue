<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
const interactionStore = useInteractionStore();
const { isModalOpen, selectedGame } = storeToRefs(interactionStore);
const { setSelectedGame } = interactionStore;

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen.value) {
    setSelectedGame(null);
  }
}

const imageLoading = ref(true);

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isModalOpen"
      class="modal-container"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="modal-backdrop"
        @click="setSelectedGame(null)"
      />

      <div class="modal-wrapper">
        <div class="modal-content">
          <button
            type="button"
            class="modal-close"
            @click="setSelectedGame(null)"
          >
            <svg
              class="close-icon"
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

          <div class="modal-body">
            <div class="modal-layout">
              <!-- Image -->
              <div class="image-container">
                <div
                  v-if="imageLoading"
                  class="image-loading"
                />
                <img
                  v-show="!imageLoading"
                  :src="selectedGame?.image"
                  :alt="selectedGame?.name"
                  class="game-image"
                  @load="imageLoading = false"
                />
              </div>

              <div class="info-container">
                <h3 class="game-rank">#{{ selectedGame?.ranks.boardgame }}</h3>

                <h2 class="game-title">
                  {{ selectedGame?.name }}
                </h2>

                <div class="link-container">
                  <NuxtLink
                    :href="`https://boardgamegeek.com/boardgame/${selectedGame?.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bgg-link"
                  >
                    <span>View on BoardGameGeek</span>
                  </NuxtLink>
                </div>

                <!-- Stats -->
                <div class="stats-grid">
                  <div class="stat-item">
                    <span class="stat-label">Year :</span>
                    {{ selectedGame?.year_published }}
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Rating :</span>
                    {{ selectedGame?.rating_average.toFixed(1) }}<span class="opacity-50"> /10</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Complexity :</span>
                    {{ selectedGame?.weight_average.toFixed(1) }}<span class="opacity-50"> /5</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Owned by :</span>
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

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  inset: 0;
  z-index: 50;
  overflow-y: auto;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.modal-wrapper {
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  position: relative;
  transform: translateY(0);
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
  will-change: transform;
  max-width: 32rem;
  width: 100%;
}

.modal-close {
  position: absolute;
  z-index: 10;
  right: 1rem;
  top: 1rem;
  color: #9ca3af;

  &:hover {
    color: #6b7280;
  }
}

.close-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-layout {
  display: flex;
  gap: 1.5rem;
}

.image-container {
  width: 40%;
  flex-shrink: 0;
}

.image-loading {
  width: 100%;
  height: 5rem;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
}

.game-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.info-container {
  width: 60%;
}

.game-rank {
  opacity: 0.75;
}

.game-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.link-container {
  margin-bottom: 0.5rem;
}

.bgg-link {
  span {
    font-size: 0.875rem;
    color: #6b7280;
    text-decoration: underline;

    &:hover {
      color: #4b5563;
    }
  }
}

.stats-grid {
  display: grid;
  gap: 0.25rem;
}

.stat-item {
  font-size: 0.875rem;
}

.stat-label {
  font-weight: 600;
}

// Transitions
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease-out;
}

.modal-enter-from .modal-content {
  transform: scale(0.95);
}

.modal-leave-to .modal-content {
  transform: scale(0.95);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
