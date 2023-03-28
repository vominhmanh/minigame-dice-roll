<template>
  <div class="gx-2" id="dice-roll-app">
    <div class="container" style="overflow: visible">
      <div class="text-center">
        <img alt="Vue logo" src="./assets/logo.png" height="250px" class="mt-5">
      </div>
      <ConfettiExplosion v-if="visible" />
      <DiceRoll msg="Welcome to Your Vue.js App" class="mb-5" @updateResults="updateResults"/>
    </div>
    <div class="row my-3" style="min-height: 400px; margin: 100px 50px">
      <div class="col-2" v-for="(userChoice, userIndex) in userChoices" :key="userChoice.id">
        <BettingEach
            class="mr-2 mb-3"
            :userChoice="userChoice"
            :userIndex="userIndex"
            :results="results"
            @makeChoice="makeChoice"
            @clearChoice="clearChoice"
        />
      </div>
    </div>
    <div class="container">
      <div class="text-center">
        <img alt="Vue logo" src="./assets/logo.png" height="250px" class="my-5">
      </div>
      <div style="position: relative" class="shadow shadow-lg mb-5">
        <BettingPlacement @placeABet="placeABet"/>
        <div v-if="startDiceRoll"
             style="position: absolute; width: 100%; height: 100%; background-color: gray; top: 0; opacity: 0.7"></div>
      </div>
      <div>.</div>
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
      startDiceRoll: false,
      readyForNewTurn: false,
      usersHaveJoined: {},
      gifts: [
        'Quà 1',
        'Quà 2',
        'Quà 3',
      ],
      visible: false,
    }
  },
  methods: {
    async updateResults(results) {
      this.startDiceRoll = true;
      const spinningSound = new Audio(require('./assets/spinning_sound_effect.mp3'))
      const cheeringSound = new Audio(require('./assets/kidcheering.mp3'))
      await spinningSound.play()
      this.readyForNewTurn = true;
      let userChoices = this.userChoices.map((user) => {
        let score = 0;
        results.forEach((result) => {
          score += user.choices[result];
        });
        let gift = null;
        if (score === 1) {
          gift = this.gifts[0]
        }
        if (score === 2) {
          gift = this.gifts[1]
        }
        if (score >= 3) {
          gift = this.gifts[2]
        }
        // eslint-disable-next-line no-param-reassign
        user = {...user, score: score, gift: gift};
        return user;
      });

      const formattedUserChoices = userChoices.map((user) => {
        return {
          name: user.name,
          code: user.code,
          score: user.score,
          phone_number: user.phone_number,
          gift: user.gift,
        }
      })

      if (formattedUserChoices.length > 0) {
        try {
          const response = await this.axios.post('https://chiakhoathongminh.vn/api/campaigns/set-score-for-participants', {scores: formattedUserChoices})
          const usersHaveJoined = response.data.data.participant_have_joined
          if (Object.keys(usersHaveJoined).length > 0) {
            userChoices = userChoices.map((userChoice) => ({
              ...userChoice,
              has_joined: !!usersHaveJoined[userChoice.code],
            }))
          }
        } catch (e) {
          console.log(e)
        }
      }

      setTimeout(async () => {
        this.startDiceRoll = false;
        this.results = results;
        this.userChoices = userChoices
      }, 9000);
      setTimeout(async () => {
        this.$confetti.start();
        await cheeringSound.play();
        setTimeout(() => {this.$confetti.stop();}, 5000)
      }, 8000);

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
    placeABet(name, phone_number, code, note, choices) {
      if (this.readyForNewTurn) {
        this.userChoices = [];
        this.readyForNewTurn = false
      }
      this.userChoices.push({
        id: Math.random(),
        choices: [...choices],
        name: name,
        phone_number: phone_number,
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
  background: url("./assets/Ao_Lang_FO4.png");
  background-size: 100% auto;
  width: 100vw;
  height: 100%;
}
</style>
