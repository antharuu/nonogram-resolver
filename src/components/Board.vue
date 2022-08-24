<template>
  <div class="board">
    <div v-for="line in map" :key="line.id" class="board__row">
      <div v-for="cell in line" :key="cell.id" class="board__case"
           :class="cell.state ? `board__case--${cell.state}`: ''"
           :id="`pos_${cell.position.x}-${cell.position.y}`"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: ["map"]
};
</script>

<style scoped lang="sass">
.board
  display: grid
  grid-template-rows: repeat(var(--board-height), 1fr)
  gap: 5px
  grid-column: span var(--game-board-width)
  grid-row: span var(--game-board-height)

  &__row
    display: grid
    gap: 5px
    grid-template-columns: repeat(var(--board-width), 1fr)

  &__case
    background-color: rgba(#fff, .5)
    border-radius: .2em
    width: 100%
    height: 100%

    &--null
      background-color: rgba(white, .1)

    &--empty
      background-color: rgba(white, .9)

    &--filled
      background-color: rgba(black, .8)

    &--impossibles
      background-color: rgba(red, .5)
</style>
