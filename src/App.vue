<template>
  <div id="nono-app">
    <options @sizeChanged="eventSizeChange" @claimResolve="eventClaimResolve"
             :resolved="Nonogram.resolver !== null"></options>
    <game :cssVariables="Nonogram.css_variables"
          :inputs="Nonogram.inputs"
          :map="Nonogram.map"
          @inputsChanged="eventInputsChanged"></game>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

import Options from "./components/Options.vue";
import Game from "./components/Game.vue";

import {InputsMap, Size} from "./Nonogram/Types";
import {Nonogram} from "./Nonogram/Nonogram";
import {shuffle} from "./Nonogram/Tools";

import {MapCupcake} from "../nono_tests/test_cupcake_5_5";
import {MapKey} from "../nono_tests/test_key_5_5";
import {MapHat} from "../nono_tests/test_hat_5_5";
import {MapPhare} from "../nono_tests/test_phare_10_10";
import component from "*.vue";

const Maps = {
  "w5": [
    MapKey,
    MapCupcake,
    MapHat
  ],
  "w10": [
    MapPhare
  ]
};

function getRandomMap(maps: InputsMap[]): InputsMap {
  return shuffle(maps)[0];
}

export default {
  name: "app",
  components: {
    Options,
    Game
  },
  data() {
    return {
      Nonogram: new Nonogram() as Nonogram | null
    };
  },
  methods: {
    eventSizeChange: (newSize: Size) => {
      this.updateNonogram();
      this.Nonogram.size = newSize;
      this.Nonogram.updateMap();
    },
    updateNonogram: () => {
      this.Nonogram = new Nonogram();
    },

    eventClaimResolve: () => {
      this.Nonogram.resolve();
    },
    eventInputsChanged: (newInputs) => {
      this.updateNonogram();
      this.Nonogram.loadMap(newInputs);
    }
  },
  mounted() {
    this.updateNonogram();
    this.Nonogram.loadMap(getRandomMap(Maps.w5));
    this.Nonogram.updateMap();
  }
};
</script>

<style lang="sass">
html, body, #nono-app
  padding: 0
  margin: 0
  box-sizing: border-box
  height: 100vh
  width: 100vw
  background-color: #212121
  display: flex
  flex-direction: column
  font-family: Nunito, sans-serif
</style>
