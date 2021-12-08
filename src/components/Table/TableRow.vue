<template>
  <div class="TableRow">
    <div class="row Row__name">{{row_data.name}}</div>
    <div class="row Row__body">{{row_data.body}}</div>
    <div class="row Row__email">{{row_data.email}}</div>
  </div>
</template>

<script>
export default {
    name: "TableRow",
    props:{
        row_data:{
            type: Object,
            default: ()=>{
                return {}
            }
        }
    }

}
</script>

<style>
.TableRow {
  display: flex;
  justify-content: space-around;
}
.row {
  flex-basis: 33%;
  padding: 8px 16px;
  text-align: left;
}
</style>