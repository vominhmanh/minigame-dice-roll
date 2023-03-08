<template>
  <div class="card card-body m-1">
    <div class="row">
      <div class="col-9">
        <div>Tên người chơi:</div>
        <div>
          <input type="text" id="user-name" name="user_name" aria-label="name"/>
        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-sm btn-outline text-danger" @click="clearBet()">Chọn lại</button>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(1)">
          <img src="../assets/dice-side-1.png" alt="1" width="30">
          <span v-show="userChoice.choices[1] > 0">{{userChoice.choices[1]}}</span>

        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(2)">
          <img src="../assets/dice-side-2.png" alt="2" width="30">
          <span v-show="userChoice.choices[2] > 0">{{userChoice.choices[2]}}</span>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(3)">
          <img src="../assets/dice-side-3.png" alt="3" width="30">
          <span v-show="userChoice.choices[3] > 0">{{userChoice.choices[3]}}</span>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(4)">
          <img src="../assets/dice-side-4.png" alt="4" width="30">
          <span v-show="userChoice.choices[4] > 0">{{userChoice.choices[4]}}</span>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(5)">
          <img src="../assets/dice-side-5.png" alt="5" width="30">
          <span v-show="userChoice.choices[5] > 0">{{userChoice.choices[5]}}</span>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline" @click="bet(6)">
          <img src="../assets/dice-side-6.png" alt="6" width="30">
          <span v-show="userChoice.choices[6] > 0">{{userChoice.choices[6]}}</span>
        </button>
      </div>
    </div>
    <div>
      <span v-if="userChoice.score > 0">Điểm số: {{userChoice.score}}</span>
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
      default: () => ([0, 0, 0, 0, 0, 0, 0]),
    },
    userIndex: {
      type: Number,
      required: true,
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
