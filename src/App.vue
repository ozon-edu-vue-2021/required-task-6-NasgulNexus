<template>
  <div id="app">
    <Table :tables_data="TABLES" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Table from "./components/Table/Table"
export default {
  name: "App",
  components: {
    Table
  },
  computed:{
     ...mapGetters(['TABLES'])
  },
  methods:{
    ...mapActions(['GET_DATA_TABLES_FROM_API'])
   
  },
  mounted(){
    this.GET_DATA_TABLES_FROM_API()
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 24px;
  box-sizing: border-box;
}
</style>
