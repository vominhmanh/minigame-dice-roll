<template>
  <div class="card card-body m-1">
    <div class="row">
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(1)">
          <img src="../assets/dice-side-1.png" alt="1" width="100">
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(2)">
          <img src="../assets/dice-side-2.png" alt="2" width="100">
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(3)">
          <img src="../assets/dice-side-3.png" alt="3" width="100">
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(4)">
          <img src="../assets/dice-side-4.png" alt="4" width="100">
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(5)">
          <img src="../assets/dice-side-5.png" alt="5" width="100">
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" @click="bet(6)">
          <img src="../assets/dice-side-6.png" alt="6" width="100">
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BettingSummary',
  props: {
    userChoice: {
      type: Object,
    },
    results: {
      type: Array,
      default: () => ([0, 0, 0, 0, 0, 0, 0]),
    },
    userIndex: {
      type: Number,
    },
  },
  data() {
  },
  methods: {
    bet(i) {
      this.$emit('makeChoice', i, this.userIndex)
    },
    clearBet() {
      this.$emit('clearChoice', this.userIndex)
    },
    calculateScore() {
      this.score = 0;
      this.results.forEach((die) => {
        console.log(this.user.choices[die]);
        this.score += this.user.choices[die];
      });
    },
  },
};

</script>

<style scoped>
</style>
