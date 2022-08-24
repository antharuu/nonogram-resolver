<template>
  <div class="game__container">
    <div class="game" :style="getCssVariables">
      <div v-for="(nbInputs, lineType) in inputsData" :key="lineType.id" :class="`inputs__${lineType}s`">
        <div v-for="(line, i) in inputs[`${lineType}s`]" :key="line.id" :class="lineType">
          <div v-for="(cell, j) in line" :key="cell.id" class="input__case">
            <input type="number" v-model="inputs[`${lineType}s`][i][j]" min="0"
                   :max="cssVariables[`board_${nbInputs.axis_1}`]" @change="inputsChanged"
                   :class="(inputs[`${lineType}s`][i][j] === '' ? 'empty' : '')">
          </div>
        </div>
      </div>
      <board :map="map"></board>
    </div>
  </div>
</template>

<script lang="ts">

import Board from "./Board.vue";

export default {
  name: "Game",
  components: {
    Board
  },
  props: ["cssVariables", "inputs", "map"],
  data() {
    return {
      inputsData: {
        "col": {axis_1: "height", axis_2: "width"},
        "row": {axis_1: "width", axis_2: "height"}
      }
    };
  },
  computed: {
    getCssVariables(): string {
      let returnVariables = [];
      for (const [key, value] of Object.entries(this.cssVariables)) {
        returnVariables.push(`--${key.replaceAll("_", "-")}: ${value};`);
      }
      return returnVariables.join("\n");
    }
  },
  methods: {
    inputsChanged() {
      this.$emit("inputsChanged", this.inputs);
    }
  }
};
</script>

<style scoped lang="sass">
.game
  display: grid
  height: 500px
  width: 500px
  grid-template-columns: repeat(var(--game-width), 1fr)
  grid-template-rows: repeat(var(--game-height), 1fr)

  &__container
    height: 100%
    display: flex
    justify-content: center
    align-items: center

.inputs
  &__cols
    grid-column: var(--game-inputs-width-start) / span var(--game-width)
    grid-row: span var(--game-inputs-height)
    display: grid
    gap: 5px
    grid-template-columns: repeat(var(--board-width), 1fr)
    margin-bottom: 5px

    .col
      width: 100%
      display: grid
      gap: 5px
      grid-template-rows: repeat(var(--game-inputs-height), 1fr)


  &__rows
    grid-row: var(--game-inputs-height-start) / span var(--game-height)
    grid-column: span var(--game-inputs-width)
    display: grid
    gap: 5px
    grid-template-rows: repeat(var(--board-height), 1fr)
    margin-right: 5px

    .row
      height: 100%
      display: grid
      gap: 5px
      grid-template-columns: repeat(var(--game-inputs-width), 1fr)

.input__case
  background-color: rgba(white, .1)
  border-radius: .2em
  position: relative

  input
    position: absolute
    inset: 0
    border: 2px solid transparent
    text-align: center
    display: flex
    align-items: center
    font-size: 2em
    color: white
    border-radius: .2em
    background-color: transparent

    &:not(:placeholder-shown)
      background-color: rgba(white, .2)

    &.empty
      background-color: rgba(gray, .01)

    &:invalid
      background-color: red

    &:hover
      border-color: white

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
      -webkit-appearance: none
      margin: 0

    &[type=number]
      -moz-appearance: textfield

.col, .row
  &--completed
    input:not(:placeholder-shown)
      background-color: rgba(green, .5) !important

</style>
