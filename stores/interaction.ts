import type { GameData } from '~/types';

export type InteractionStore = {
  isModalOpen: Ref<boolean>;
  selectedGame: Ref<GameData | null>;
  setSelectedGame: (game: GameData | null) => void;
};

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

  const setSelectedGame = (category: GameData | null) => {
    console.log('setSelectedGame', category);
    selectedGame.value = category;
  };

  return {
    isModalOpen,
    selectedGame,
    setSelectedGame,
  };
});
