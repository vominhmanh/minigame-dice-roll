<template>
  <div class="row" id="dice-roll-app">
    <div class="col-9 container">
      <div class="text-center">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="container text-center">
        <DiceRoll msg="Welcome to Your Vue.js App" @updateResults="updateResults"/>
        <BettingSummary/>
      </div>
    </div>
    <div class="col-3">
      <BettingEach
          v-for="(userChoice, userIndex) in userChoices"
          :userChoice="userChoice"
          :userIndex="userIndex"
          :key="userChoice.id"
          ref="bettingEach"
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
import BettingSummary from "@/components/BettingSummary.vue";


export default {
  name: 'App',
  components: {
    BettingSummary,
    BettingEach,
    DiceRoll,
  },
  data: () => ({
    userChoices: [
      {
        id: Math.random(),
        choices: [0, 0, 0, 0, 0, 0, 0],
        count: 0,
        score: 0,
      },
      {
        id: Math.random(),
        choices: [0, 0, 0, 0, 0, 0, 0],
        count: 0,
        score: 0,
      },
      {
        id: Math.random(),
        choices: [0, 0, 0, 0, 0, 0, 0],
        count: 0,
      },
      {
        id: Math.random(),
        choices: [0, 0, 0, 0, 0, 0, 0],
        count: 0,
      },
      {
        id: Math.random(),
        choices: [0, 0, 0, 0, 0, 0, 0],
        count: 0,
      },
    ],
    results: [],
  }),
  methods: {
    async updateResults(results) {
      setTimeout(() => {
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
    clearChoice(userIndex) {
      this.userChoices.splice(userIndex, 1, {...this.userChoices[userIndex], choices: [0, 0, 0, 0, 0, 0, 0], count: 0, score: 0});
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
