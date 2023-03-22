<template>
  <div class="card card-body">
    <div class="row">
      <div class="col-9">
        <div>
          {{ userIndex + 1 }}.
          <span>{{userChoice.name || 'Người chơi'}} </span>
          <span> - {{userChoice.role}}&nbsp;</span>
          <span class="badge badge-success"> {{userChoice.code}}</span>
          <span> - {{userChoice.note}}</span>
        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-sm btn-outline text-danger" @click="clearBet()">Xóa</button>
      </div>
    </div>

    <div class="row">
      <div v-for="index in 16" :key="index">
        <div v-if="userChoice.choices[index] > 0">
          <button class="btn btn-outline">
            <img :src="require('@/assets/dice-side-' + index + '.png')" alt="1" width="30">
            <div v-show="userChoice.choices[index] > 0">{{userChoice.choices[index]}}</div>
          </button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="userChoice.score > 0">Điểm số: {{userChoice.score}}</div>
      <div v-if="userChoice.has_joined" class="badge badge-danger"> Người chơi đã từng tham gia</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BettingEach',
  props: {
    userChoice: {
      type: Object,
      required: true,
    },
    results: {
      type: Array,
      default: () => ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    },
    userIndex: {
      type: Number,
      required: true,
    },
  },
  data: () => {
    return {
    }
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
        this.score += this.user.choices[die];
      });
    },
  },
};

</script>

<style scoped>
</style>
