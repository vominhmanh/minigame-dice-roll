<template>
  <div class="card card-body">
    <div class="d-flex justify-content-between mb-2">
      <span>
        <span class="badge badge-success"> {{ userChoice.code }}</span>
        &nbsp;
        <span>{{ userChoice.name }} </span>
      </span>
      <div class="badge badge-success" v-if="userChoice.score > 0" style="width: 30px">{{ userChoice.score }}đ</div>
      <div class="badge badge-warning" v-if="userChoice.score === 0" style="width: 30px">{{ userChoice.score }}đ</div>
    </div>
    <div class="row no-gutters">
      <div class="col-3 text-center" v-for="[number, index] in getUsersChoices()" :key="index">
        <img :src="require('@/assets/dice-side-' + index + '.png')" alt="1" width="30">
        <div>{{ number }}</div>
      </div>
      <div class="col-3 fw-bold">
        <button class="btn btn-sm btn-outline text-danger" @click="clearBet()">X</button>
      </div>

    </div>

    <div>
      <div>
        <small v-if="userChoice.gift">Chúc mừng bạn nhận được {{ userChoice.gift }}</small>
      </div>
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
    return {}
  },
  methods: {
    getUsersChoices() {
      return this?.userChoice.choices.map((number, index) => ([number, index])).filter(([number]) => number > 0)
    },
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
