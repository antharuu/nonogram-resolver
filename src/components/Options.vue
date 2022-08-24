<template>
  <div class="options">
    <div class="option">
      <label for="size_w">Width</label>
      <input id="size_w" max="20" min="5" type="number" v-model="size.width" @change="sizeChanged" readonly
             title="No editable for now"/></div>
    <div class="option">
      <label for="size_h">Height</label>
      <input id="size_h" max="20" min="5" type="number" v-model="size.height" @change="heightChanged" readonly
             title="No editable for now"/></div>
    <div class="option">
      <button class="nonohack_resolve" @click="$emit('claimResolve')" :disabled="this.resolved">Resolve !</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: [
    "resolved"
  ],
  data: () => {
    return {
      size: {width: 10, height: 10},
      heightHasChanged: false
    };
  },
  methods: {
    sizeChanged() {
      if (!this.heightHasChanged) {
        this.size.height = this.size.width;
      }
      this.size.width = Math.min(Math.max(this.size.width, 5), 20);
      this.size.height = Math.min(Math.max(this.size.height, 5), 20);
      this.$emit("sizeChanged", this.size);
    },
    heightChanged() {
      this.heightHasChanged = true;
      this.sizeChanged();
    }
  }
};
</script>

<style scoped lang="sass">
.options
  justify-content: center
  gap: 2rem
  padding: 1rem
  display: flex
  color: white
  font-weight: bold
  border-bottom: 2px solid rgba(white, .2)

  .option
    display: flex
    gap: .5rem
    align-items: center

  input, button
    padding: 10px
    border-radius: 5px
    border: none

  button
    cursor: pointer
</style>
