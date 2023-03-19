<template>
  <div ref="selectRef" class="app-select">
    <label v-if="label" class="app-select__label" :for="name">{{ label }}</label>

    <button
      :id="name"
      class="app-select__trigger"
      aria-haspopup="listbox"
      aria-controls="app-select__options"
      :aria-expanded="isActive ? 'true' : 'false'"
      :class="{
        'app-select__trigger--placeholder': !selectedValue,
        'app-select__trigger--is-active': isActive,
      }"
      @click="setSelectActiveStatus()"
    >
      {{ selectText }}

      <font-awesome-icon
        icon="sort-down"
        class="app-select__trigger-icon"
        :class="{ 'app-select__trigger-icon--is-active': isActive }"
      />
    </button>

    <transition name="fade">
      <ul v-if="isActive" class="app-select__options">
        <li
          v-for="(option, index) in options"
          :key="`${option}-${index}`"
          class="app-select__option"
          :value="option"
        >
          <button
            :title="`Select ${option} option`"
            :aria-label="`Select ${option} option`"
            :class="{ 'app-select__option-button--is-selected': isOptionSelected(option) }"
            class="app-select__option-button"
            @click="handleSelect(option)"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { generateUuid } from '@/helpers/';

export default defineComponent({
  name: 'AppSeleect',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      required: false,
      default: () => '',
    },
    options: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    label: {
      type: String as PropType<string>,
      required: false,
      default: () => '',
    },
    placeholder: {
      type: String as PropType<string>,
      required: false,
      default: () => '',
    },
    title: {
      type: String as PropType<string>,
      required: false,
      default: () => '',
    },
    name: {
      type: String as PropType<string>,
      required: false,
      default: () => `input-${generateUuid()}`,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectRef = ref();
    const isActive = ref(false);
    const selectedValue = computed(() =>
      props.options.find((option) => option === props.modelValue)
    );
    const selectText = computed(() =>
      selectedValue.value ? selectedValue.value : props.placeholder
    );

    const setSelectActiveStatus = (status?: boolean) => {
      isActive.value = status || !isActive.value;
    };

    const isOptionSelected = (option: string) => option === selectedValue.value;

    const handleSelect = (value: string) => {
      if (value === selectedValue.value) emit('update:modelValue', '');
      else emit('update:modelValue', value);

      setSelectActiveStatus(false);
    };

    const handleOutsideClick = (event: Event) => {
      if (!selectRef.value?.contains(event.target)) isActive.value = false;
    };

    onMounted(() => {
      window.addEventListener('click', handleOutsideClick);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('click', handleOutsideClick);
    });

    return {
      handleSelect,
      isActive,
      isOptionSelected,
      selectedValue,
      selectRef,
      selectText,
      setSelectActiveStatus,
    };
  },
});
</script>

<style lang="scss" scoped src="./AppSelect.scss" />
