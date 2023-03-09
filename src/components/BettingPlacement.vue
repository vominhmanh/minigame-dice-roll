<template>
  <form class="card card-body m-1">
    <div class="row">
      <div class="col-1 py-1">Tên:</div>
      <div class="col-2 py-1">
        <input required class="form-control" type="text" id="name" name="name" v-model="name" aria-label="name"/>
      </div>
      <div class="col-1 py-1">Role:</div>
      <div class="col-2 py-1">
        <input required class="form-control" type="text" id="role" name="role" v-model="role" aria-label="role"/>
      </div>
      <div class="col-1 py-1">Mã:</div>
      <div class="col-2 py-1">
        <input required class="form-control" type="text" id="code" name="code" v-model="code" aria-label="code"/>
      </div>
      <div class="col-1 py-1">Note:</div>
      <div class="col-2 py-1">
        <input required class="form-control" type="text" id="note" name="note" v-model="note" aria-label="note"/>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(1)">
          <img src="../assets/dice-side-1.png" alt="1" width="100">
          <div v-if="choices[1] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[1] }}</span>
          </div>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(2)">
          <img src="../assets/dice-side-2.png" alt="2" width="100">
          <div v-if="choices[2] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[2] }}</span>
          </div>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(3)">
          <img src="../assets/dice-side-3.png" alt="3" width="100">
          <div v-if="choices[3] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[3] }}</span>
          </div>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(4)">
          <img src="../assets/dice-side-4.png" alt="4" width="100">
          <div v-if="choices[4] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[4] }}</span>
          </div>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(5)">
          <img src="../assets/dice-side-5.png" alt="5" width="100">
          <div v-if="choices[5] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[5] }}</span>
          </div>
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-outline-success" style="position: relative" @click.prevent="bet(6)">
          <img src="../assets/dice-side-6.png" alt="6" width="100">
          <div v-if="choices[6] > 0" class="border border-success rounded-circle"
               style="background-color: green; position: absolute; bottom: 10px; right: 10px; width: 40px; height: 40px">
            <span class="text-light" style="font-size: 20px; font-weight: bold">{{ choices[6] }}</span>
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
      default: () => ([0, 0, 0, 0, 0, 0, 0]),
    },
    userIndex: {
      type: Number,
    },
  },
  data: () => {
    return {
      name: '',
      choices: [0, 0, 0, 0, 0, 0, 0],
      role: '',
      code: '',
      count: 0,
      note: '',
      error: '',
    }
  },
  methods: {
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
      this.choices.splice(0, 7, 0, 0, 0, 0, 0, 0, 0)
    },
    placeABet() {
      this.error = '';
      if (this.role === '' || this.code === '') {
        this.error = 'Vui lòng điền role và mã.';
        return;
      }
      this.$emit('placeABet', this.name, this.role, this.code, this.note, this.choices)
      this.name = '';
      this.role = '';
      this.code = '';
      this.note = '';
      this.choices.splice(0, 7, 0, 0, 0, 0, 0, 0, 0);
      this.count = 0;
    },
  },
};

</script>

<style scoped>
</style>
