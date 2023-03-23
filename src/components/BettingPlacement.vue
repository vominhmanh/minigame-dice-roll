<template>
  <form class="card card-body m-1" id="betting-placement">
    <div class="card card-body">
      <div class="row">
        <div class="col-1 py-1">Tên:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="name" name="name" v-model="name" aria-label="name"/>
        </div>
        <div class="col-1 py-1">Mã:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="code" name="code" v-model="code" aria-label="code"/>
        </div>
        <div class="col-1 py-1">SĐT:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="role" name="role" v-model="role" aria-label="role"/>
        </div>
        <div style="display: none" class="col-1 py-1">Note:</div>
        <div style="display: none" class="col-2 py-1">
          <input required class="form-control" type="text" id="note" name="note" v-model="note" aria-label="note"/>
        </div>
      </div>
    </div>
    <div class="row mt-3 d-flex justify-content-center">
      <div class="col-2 mb-2" v-for="index in 16" :key="index">
        <button class="btn" style="position: relative" @click.prevent="bet(index)">
          <img :src="require('@/assets/dice-side-' + index + '.png')" alt="1" width="120">
          <div v-if="choices[index] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[index] }}</span>
          </div>
        </button>
      </div>

    </div>
    <div class="d-flex justify-content-between mt-2">
      <button class="btn btn-sm btn-outline text-danger" @click.prevent="clearBet()">Chọn lại</button>
      <b class="text-danger" v-if="error">{{ error }}</b>
      <button class="btn btn-sm btn-success" @click.prevent="placeABet()">CHỐT !</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BettingPlacement',
  props: {
    userChoice: {
      type: Object,
    },
    results: {
      type: Array,
      default: () => ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    },
    userIndex: {
      type: Number,
    },
  },
  data: () => {
    return {
      name: '',
      choices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      role: '',
      code: '',
      count: 0,
      note: '',
      error: '',
    }
  },
  methods: {
    getImgUrl(number) {
      return require('../assets/dice-side-' + number + '.png')
    },
    bet(i) {
      if (this.count < 3) {
        let choiceI = this.choices[i];
        choiceI++;
        this.count++;
        this.choices.splice(i, 1, choiceI);
      }
    },
    clearBet() {
      this.count = 0;
      this.choices.splice(0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    },
    placeABet() {
      this.error = '';
      if (this.code === '') {
        this.error = 'Vui lòng điền mã code.';
        return;
      }
      this.$emit('placeABet', this.name, this.role, this.code, this.note, this.choices)
      this.name = '';
      this.role = '';
      this.code = '';
      this.note = '';
      this.choices.splice(0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
      this.count = 0;
    },
  },
};

</script>

<style scoped>
#betting-placement {
  background: url("../assets/background-place-a-bet.png");
  background-size: 100% auto;
  height: 100%;
}
</style>
