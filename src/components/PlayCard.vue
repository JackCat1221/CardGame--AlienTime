<script setup lang="ts">
import { computed } from 'vue';
import { PlayCardType } from '../types';
const props: PlayCardType = defineProps<PlayCardType>()

const formatPlayCardSymbol = () => {
  const types = ['@', '#', '^', '*']
  let symbol = `${props.number}`
  if (props.number > 10) {
    symbol = ['', 'J', 'Q', 'K', 'A'][props.number - 10]
  }
  return `${symbol} ${types[props.type]}`
}

const playCardSymbol = computed(formatPlayCardSymbol)

</script>
<template>
  <div class="w-20 h-28 rounded-lg ring-slate-200 ring-2 text-left pl-2 pt-2 text-white font-semibold"
    :class="{ 'bg-orange-600': props.type == 0, 'bg-cyan-600': props.type == 1, 'bg-green-600': props.type == 2, 'bg-purple-600': props.type == 3 }">
    {{ playCardSymbol }}
  </div>
</template>

<style lang="scss" scoped></style>