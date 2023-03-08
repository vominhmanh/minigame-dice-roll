<template>
  <div class="">
    <BettingEach />
  </div>
</template>

<script>
import BettingEach from '@/components/BettingEach.vue';

export default {
  name: 'BettingComponent',
  components: { BettingEach },
  props: {
    msg: String,
  },
  methods: {

  },
};

</script>

<style scoped>

</style>
