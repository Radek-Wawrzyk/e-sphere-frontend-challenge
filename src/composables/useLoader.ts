import { computed, reactive } from 'vue';

const state = reactive({
  loading: false,
});

const useLoader = () => {
  const isLoading = computed(() => state.loading);

  const setLoader = (status: boolean) => {
    state.loading = status;
  };

  return {
    isLoading,
    setLoader,
  };
};

export { useLoader };
