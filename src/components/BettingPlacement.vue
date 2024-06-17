<template>
  <form class="card card-body m-1" id="betting-placement" autocomplete="off">
    <div class="card card-body">
      <div class="row">
        <div class="col-1 py-1">Tên:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="name" name="name" v-model="name" aria-label="name"
                 autocomplete="off"/>
        </div>
        <div class="col-1 py-1">Mã:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="code" name="code" v-model="code" aria-label="code"
                 autocomplete="off"/>
        </div>
        <div class="col-1 py-1">SĐT:</div>
        <div class="col-2 py-1">
          <input required class="form-control" type="text" id="phone_number" name="phone_number" v-model="phone_number"
                 aria-label="phone_number"/>
        </div>
        <div class="col-3 py-1 text-right">
          <button class="btn btn-sm btn-success" @click.prevent="placeABet()">CHỐT !</button>
        </div>
      </div>
    </div>
    <div class="row mt-3 d-flex justify-content-center">
      <div class="col-2 mb-2" v-for="index in 17" :key="index">
        <button class="btn" style="position: relative" @click.prevent="bet(index)">
          <img class="shadow-lg" :src="require('@/assets/dice-side-' + index + '.png')" alt="1" width="120">
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
      phone_number: '',
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
      if (this.code === '' || this.phone_number === '') {
        this.error = 'Vui lòng điền mã code và SĐT.';
        return;
      }
      const choicesShow = this.choices.map((choice, index) => {
        if (choice > 0) return `<div class="col-3 text-center" v-for="[number, index] in getUsersChoices()" :key="index">
        <img src="${require('@/assets/dice-side-' + index + '.png')}" alt="1" width="100">
        <div class="h5">${choice}</div>
      </div>`
      }).filter(choice => !!choice)
      console.log(choicesShow)
      this.$emit('placeABet', this.name, this.phone_number, this.code, this.note, this.choices)
      this.$alert(`${this.name} - ${this.code} - ${this.phone_number}`, 'Thành công !', 'success', {
        html:
            `<h4 class="mt-5 mb-4">${this.name} - ${this.code} - ${this.phone_number}</h4>` +
            `<div class="row d-flex justify-content-center">` +
            choicesShow.join('') +
            `</div>`
      });
      this.name = '';
      this.phone_number = '';
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
