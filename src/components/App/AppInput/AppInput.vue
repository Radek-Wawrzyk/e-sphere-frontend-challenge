<template>
  <div class="app-input">
    <label v-if="label" class="app-input__label" :for="name">{{ label }}</label>
    <input
      :id="name"
      class="app-input__inner"
      :title="title"
      :aria-label="title"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput($event)"
      @blur="handleBlur($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { generateUuid } from '@/helpers/';

export default defineComponent({
  name: 'AppInput',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      required: false,
      default: () => '',
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
  emits: ['onBlur', 'update:modelValue'],
  setup(_, { emit }) {
    const handleInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    const handleBlur = (event: FocusEvent) => {
      emit('onBlur', event);
    };

    return {
      handleInput,
      handleBlur,
    };
  },
});
</script>

<style lang="scss" scoped src="./AppInput.scss" />
