<template>
  <div class="app-input">
    <label class="app-input__label" :for="name" v-if="label">{{ label }}</label>
    <input
      class="app-input__inner"
      :id="name"
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
  emits: ['onBlur', 'update:modelValue'],
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
      defalt: () => `input-${generateUuid()}`
    },
  },
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
})
</script>

<style lang="scss" scoped src="./AppInput.scss" />