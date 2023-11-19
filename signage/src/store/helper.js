import { computed } from 'vue';
import { useStore } from 'vuex';

const useState = () => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store.state).map((key) => [key, computed(() => store.state[key])]),
  );
};

const useGetters = () => {
  const store = useStore();
  return Object.fromEntries(
    Object.keys(store.getters).map((getter) => [getter, computed(() => store.getters[getter])]),
  );
};

const useMutations = () => {
  const store = useStore();
  return Object.fromEntries(
    // eslint-disable-next-line no-underscore-dangle
    Object.keys(store._mutations).map((mutation) => [
      mutation,
      (value) => store.commit(mutation, value),
    ]),
  );
};

export { useState, useGetters, useMutations };
