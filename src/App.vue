<template>
  <div class="row gx-2" id="dice-roll-app">
    <div class="col-10 container">
      <div class="text-center">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="container text-center">
        <DiceRoll msg="Welcome to Your Vue.js App" class="mb-5" @updateResults="updateResults"/>
        <div style="position: relative">
          <BettingPlacement @placeABet="placeABet"/>
          <div v-if="startDiceRoll" style="position: absolute; width: 100%; height: 100%; background-color: gray; top: 0; opacity: 0.7"></div>
        </div>
      </div>
    </div>
    <div class="col-2 mt-3">
      <BettingEach
          v-for="(userChoice, userIndex) in userChoices"
          :userChoice="userChoice"
          :userIndex="userIndex"
          :key="userChoice.id"
          :results="results"
          @makeChoice="makeChoice"
          @clearChoice="clearChoice"
      />
    </div>
  </div>
</template>

<script>
import BettingEach from '@/components/BettingEach.vue';
import DiceRoll from './components/DiceRoll.vue';
import BettingPlacement from "@/components/BettingPlacement.vue";


export default {
  name: 'App',
  components: {
    BettingPlacement,
    BettingEach,
    DiceRoll,
  },
  data: () => {
    return {
      userChoices: [],
      results: [],
      startDiceRoll: false
    }
  },
  methods: {
    async updateResults(results) {
      this.startDiceRoll = true;
      setTimeout(() => {
        this.startDiceRoll = false;
        this.results = results;
        this.userChoices = this.userChoices.map((user) => {
          let score = 0;
          this.results.forEach((result) => {
            score += user.choices[result];
          });
          // eslint-disable-next-line no-param-reassign
          user = {...user, score: score};
          return user;
        });
      }, 9000);
    },
    makeChoice(i, userIndex) {
      let count = this.userChoices[userIndex].count;
      if (count < 3) {
        let choices = this.userChoices[userIndex].choices;
        choices[i]++;
        count = count + 1;
        this.userChoices.splice(userIndex, 1, {...this.userChoices[userIndex], choices: choices, count: count});
      }
    },
    placeABet(name, role, code, note, choices) {
      this.userChoices.push({
        id: Math.random(),
        choices: [...choices],
        name: name,
        role: role,
        code: code,
        note: note,
      });
    },
    clearChoice(index) {
      this.userChoices.splice(index, 1)
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#dice-roll-app {
  background: #5f2c82; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #49a09d, #5f2c82); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #49a09d, #5f2c82); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
}
</style>
