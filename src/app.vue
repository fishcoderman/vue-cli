<template>
  <div id="app">
    <h2>app</h2>
    <div class="man"></div>
    <div class="flex">
      <img src="./images/element.jpg" alt="#">
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// import("@/js/utils.js").then(res =>{
//   console.log('res', res)
// })
// import {lib} from "./js/utils"
const library = require("../lib/library")
import {lib} from "../lib/library"

// import * as _ from 'lodash'
console.log('lib', lib)
console.log('library', library)

export default {
  name: "App",
  mounted() {
    // _.times(10, (i)=>console.log(i))
  }
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
h2{
  text-align: center;
}
#app {
  width: 100%;
  height: 100%;
  background: #7d8188;
  color: aqua;
  .man {
    width: 100px;
    height: 150px;
    background: url("./images/man.png") no-repeat;
    background-size: 100% 100%;
  }
  .flex {
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    img{
      width: 500px;
      height: 300px;
    }
  }
}
</style>
