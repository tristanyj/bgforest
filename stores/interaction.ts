import type { Game } from '~/types';

export const useInteractionStore = defineStore('interaction', () => {
  // --------------------------------
  // State
  // --------------------------------

  const isModalOpen = ref(false);
  const selectedGame = ref<Game | null>(null);

  // --------------------------------
  // Methods
  // --------------------------------

  const setSelectedGame = (game: Game | null) => {
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
