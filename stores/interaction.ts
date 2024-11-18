import type { GameData } from '~/types';

export const useInteractionStore = defineStore('interaction', () => {
  // --------------------------------
  // State
  // --------------------------------

  const isModalOpen = ref(false);
  const selectedGame = ref<GameData | null>(null);

  // --------------------------------
  // Computed
  // --------------------------------

  // --------------------------------
  // Methods
  // --------------------------------

  const setSelectedGame = (game: GameData | null) => {
    requestAnimationFrame(() => {
      isModalOpen.value = !!game;
      selectedGame.value = game;
    });
  };

  return {
    isModalOpen,
    selectedGame,
    setSelectedGame,
  };
});
