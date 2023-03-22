<template>
  <div class="m-5">
    <div class="dice">
      <ol class="die-list even-roll" data-roll="1" id="die-1">
        <li class="die-item" data-side="1" dice-id="1">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2" dice-id="1">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3" dice-id="1">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4" dice-id="1">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5" dice-id="1">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6" dice-id="1">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
      <ol class="die-list odd-roll" data-roll="1" id="die-2">
        <li class="die-item" data-side="1" dice-id="2">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2" dice-id="2">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3" dice-id="2">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4" dice-id="2">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5" dice-id="2">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6" dice-id="2">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
      <ol class="die-list odd-roll mid-roll" data-roll="1" id="die-3">
        <li class="die-item" data-side="1" dice-id="3">
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="2" dice-id="3">
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="3" dice-id="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="4" dice-id="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="5" dice-id="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
        <li class="die-item" data-side="6" dice-id="3">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </li>
      </ol>
    </div>
    <button class="mt-5" type="button" id="roll-button" @click="rollDice">Bắt đầu</button>
  </div>
</template>

<script>
export default {
  name: 'DiceRoll',
  props: {
    msg: String,
    results: Array,
  },
  mounted() {
    const dice = [...document.querySelectorAll('.die-list')];
    dice.forEach((die) => {
      die.childNodes.forEach((diceItem) => {
        const randomNumber = this.getRandomNumber(1, 16);
        diceItem.classList.add(`dice-image-${randomNumber}`)
      })
    })
  },
  methods: {
    toggleClasses(die) {
      die.classList.toggle('odd-roll');
      die.classList.toggle('even-roll');
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    rollDice() {
      const dice = [...document.querySelectorAll('.die-list')];
      // eslint-disable-next-line vue/no-mutating-props
      const results = [];
      dice.forEach((die) => {
        const diceItems = die.childNodes
        this.toggleClasses(die);
        const side = this.getRandomNumber(1, 6);
        const randomNumber = this.getRandomNumber(1, 16);
        console.log(randomNumber)
        // eslint-disable-next-line no-param-reassign
        die.dataset.roll = side;
        diceItems[side-1].className = diceItems[side-1].className.replace(/dice-image-\d+/g, '')
        diceItems[side-1].classList.add(`dice-image-${randomNumber}`)
        // eslint-disable-next-line vue/no-mutating-props
        results.push(randomNumber);
      });
      this.$emit('updateResults', results);
    },
  },
};

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
html {
  font-family: system-ui, sans-serif;
}
body {
  background: linear-gradient(#545454, #454545, #676767) !important;
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  overflow: hidden;
  width: 100%;
}
.dice {
  width: 1000px;
  align-items: center;
  display: grid;
  grid-gap: 2rem !important;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  grid-template-rows: auto;
  justify-items: center;
  padding: 2rem !important;
  perspective: 600px;
}
.die-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: 10rem !important;
  list-style-type: none;
  transform-style: preserve-3d;
  width: 10rem !important;
}

.even-roll {
  transition: transform 8s ease-out;
}
.odd-roll {
  transition: transform 6s ease-out;
}
.mid-roll {
  transition: transform 7s ease-out;
}
.die-item {
  border: 2px gray solid;
  background-color: white;
  background-size: 100%;
  box-shadow: inset -0.35rem 0.35rem 0.75rem rgba(0, 0, 0, 0.3),
  inset 0.5rem -0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  display: grid;
  grid-column: 1;
  grid-row: 1;
  grid-template-areas:
    "one two three"
    "four five six"
    "seven eight nine";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100% !important;
  padding: 1rem !important;
  width: 100% !important;
}
.dice-image-1 {
  background-image: url('../assets/dice-side-1.png');
}
.dice-image-2 {
  background-image: url('../assets/dice-side-2.png');
}
.dice-image-3 {
  background-image: url('../assets/dice-side-3.png');
}
.dice-image-4 {
  background-image: url('../assets/dice-side-4.png');
}
.dice-image-5 {
  background-image: url('../assets/dice-side-5.png');
}
.dice-image-6 {
  background-image: url('../assets/dice-side-6.png');
}
.dice-image-7 {
  background-image: url('../assets/dice-side-7.png');
}
.dice-image-8 {
  background-image: url('../assets/dice-side-8.png');
}
.dice-image-9 {
  background-image: url('../assets/dice-side-9.png');
}
.dice-image-10 {
  background-image: url('../assets/dice-side-10.png');
}
.dice-image-11 {
  background-image: url('../assets/dice-side-11.png');
}
.dice-image-12 {
  background-image: url('../assets/dice-side-12.png');
}
.dice-image-13 {
  background-image: url('../assets/dice-side-13.png');
}
.dice-image-14 {
  background-image: url('../assets/dice-side-14.png');
}
.dice-image-15 {
  background-image: url('../assets/dice-side-15.png');
}
.dice-image-16 {
  background-image: url('../assets/dice-side-16.png');
}
.dot {
  align-self: center;
  background-color: transparent;
  border-radius: 50%;
  /*box-shadow: inset -0.15rem 0.15rem 0.25rem rgba(0, 0, 0, 0.5);*/
  display: block;
  height: 1.25rem;
  justify-self: center;
  width: 1.25rem;
}
.even-roll[data-roll="1"] {
  transform: rotateX(1800deg) rotateY(3600deg) rotateZ(1800deg);
}
.even-roll[data-roll="2"] {
  transform: rotateX(2250deg) rotateY(3600deg) rotateZ(1800deg);
}
.even-roll[data-roll="3"] {
  transform: rotateX(1800deg) rotateY(3150deg) rotateZ(1800deg);
}
.even-roll[data-roll="4"] {
  transform: rotateX(1800deg) rotateY(4050deg) rotateZ(1800deg);
}
.even-roll[data-roll="5"] {
  transform: rotateX(1350deg) rotateY(3600deg) rotateZ(1800deg);
}
.even-roll[data-roll="6"] {
  transform: rotateX(1800deg) rotateY(4500deg) rotateZ(1980deg);
}
.odd-roll[data-roll="1"] {
  transform: rotateX(-1800deg) rotateY(-3600deg) rotateZ(-1800deg);
}
.odd-roll[data-roll="2"] {
  transform: rotateX(-1350deg) rotateY(-3600deg) rotateZ(-1800deg);
}
.odd-roll[data-roll="3"] {
  transform: rotateX(-1800deg) rotateY(-4050deg) rotateZ(-1800deg);
}
.odd-roll[data-roll="4"] {
  transform: rotateX(-1800deg) rotateY(-3150deg) rotateZ(-1800deg);
}
.odd-roll[data-roll="5"] {
  transform: rotateX(-2250deg) rotateY(-3600deg) rotateZ(-1800deg);
}
.odd-roll[data-roll="6"] {
  transform: rotateX(-1800deg) rotateY(-4500deg) rotateZ(-1980deg);
}
[data-side="1"] {
  transform: rotate3d(0, 0, 0, 90deg) translateZ(5rem);
}
[data-side="2"] {
  transform: rotate3d(-1, 0, 0, 90deg) translateZ(5rem);
}
[data-side="3"] {
  transform: rotate3d(0, 1, 0, 90deg) translateZ(5rem);
}
[data-side="4"] {
  transform: rotate3d(0, -1, 0, 90deg) translateZ(5rem);
}
[data-side="5"] {
  transform: rotate3d(1, 0, 0, 90deg) translateZ(5rem);
}
[data-side="6"] {
  transform: rotate3d(1, 0, 0, 180deg) translateZ(5rem);
}
[data-side="1"] .dot:nth-of-type(1) {
  grid-area: five;
}
[data-side="2"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="2"] .dot:nth-of-type(2) {
  grid-area: nine;
}
[data-side="3"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="3"] .dot:nth-of-type(2) {
  grid-area: five;
}
[data-side="3"] .dot:nth-of-type(3) {
  grid-area: nine;
}
[data-side="4"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="4"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="4"] .dot:nth-of-type(3) {
  grid-area: seven;
}
[data-side="4"] .dot:nth-of-type(4) {
  grid-area: nine;
}
[data-side="5"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="5"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="5"] .dot:nth-of-type(3) {
  grid-area: five;
}
[data-side="5"] .dot:nth-of-type(4) {
  grid-area: seven;
}
[data-side="5"] .dot:nth-of-type(5) {
  grid-area: nine;
}
[data-side="6"] .dot:nth-of-type(1) {
  grid-area: one;
}
[data-side="6"] .dot:nth-of-type(2) {
  grid-area: three;
}
[data-side="6"] .dot:nth-of-type(3) {
  grid-area: four;
}
[data-side="6"] .dot:nth-of-type(4) {
  grid-area: six;
}
[data-side="6"] .dot:nth-of-type(5) {
  grid-area: seven;
}
[data-side="6"] .dot:nth-of-type(6) {
  grid-area: nine;
}

button {
  align-self: center;
  background-color: #efefef;
  border: none;
  color: #333;
  font-size: 1.25rem;
  font-weight: 700;
  justify-self: center;
  padding: 0.5rem 1rem;
}
button:hover {
  cursor: pointer;
}

@media (min-width: 900px) {
  .dice {
    perspective: 1300px;
  }
}
</style>
