<template>
  <div class="Table">
    <b-icon
      v-show="infinity_scroll===true"
      class="back_to_top"
      icon="chevron-up"
      font-scale="2"
      @click="scrollToTop"
    />
    <div class="Table__header_filter">
      <div class="group">
        <input v-model="search" type="text" required />
        <span class="bar"></span>
        <label>Поиск</label>
      </div>
      <button
        v-show="infinity_scroll===false"
        class="Table__button"
        @click="Table__infinity_scroll_true"
      >Бесконечный скролл</button>
      <button
        v-show="infinity_scroll===true"
        class="Table__button"
        @click="Table__infinity_scroll_false"
      >Пагинация</button>
    </div>
    <div class="Table__header">
      <p @click="sortByName">
        name
        <b-icon icon="arrow-down-up" />
      </p>
      <p @click="sortByBody">
        body
        <b-icon icon="arrow-down-up" />
      </p>
      <p @click="sortByEmail">
        email
        <b-icon icon="arrow-down-up" />
      </p>
    </div>
    <div v-show="search!==''" class="Table__body">
      <TableRow v-for="row in filtred" :key="row.id" :row_data="row" />
    </div>
    <div v-show="infinity_scroll===true && search===''" class="Table__body">
      <TableRow v-for="row in tables_data" :key="row.id" :row_data="row" />
    </div>
    <div v-show="search==='' && infinity_scroll===false">
      <div class="Table__body">
        <TableRow v-for="row in paginationTabels" :key="row.id" :row_data="row" />
      </div>
      <div class="Table__pagination">
        <div
          class="Table__page"
          v-for="page in pages"
          :key="page"
          :class="{'page__selected':page===pageNumber}"
          @click="pageClick(page)"
        >{{page}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TableRow from "./TableRow"
export default {
    name: "Table",
    components: {
        TableRow
    },
    props:{
        tables_data:{
            type: Array,
            default: ()=>{
                return []
            }
        }
    }, 
    data(){
        return{
            tablesPerPage:10,
            pageNumber:1,
            infinity_scroll: false,
            search: '',
        }
    },
    computed:{
        pages(){
            return Math.ceil(this.tables_data.length /this.tablesPerPage)
        },
        paginationTabels(){
            let from = (this.pageNumber-1)*this.tablesPerPage;
            let to= from+this.tablesPerPage;
            return this.tables_data.slice(from, to);
        },
        filtred(){
            return this.tables_data.filter((table)=>{
                return table.name.indexOf(this.search) > -1 || table.body.indexOf(this.search) > -1 || table.email.indexOf(this.search) > -1
            })
        }
    },
    methods: {
        pageClick(page){
            this.pageNumber = page;
        },
        sortByName(){
            this.tables_data.sort((a,b)=>a.name.localeCompare(b.name))
        },
        sortByBody(){
             this.tables_data.sort((a,b)=>a.body.localeCompare(b.body))
        },
        sortByEmail(){
            this.tables_data.sort((a,b)=>a.email.localeCompare(b.email))
        },
        Table__infinity_scroll_true(){
            this.infinity_scroll=true;
        },
        Table__infinity_scroll_false(){
            this.infinity_scroll=false;
        },
         scrollToTop() {
                window.scrollTo(0,0);
           }   
    }
}
</script>

<style>
.Table {
  max-width: 900px;
  margin: 0 auto;
}
.Table__header {
  display: flex;
  flex-basis: 33%;
  text-align: left;
  justify-content: space-around;
  border-bottom: solid 1px #e7e7e7;
}
.Table__header p {
  cursor: pointer;
}
.Table__header_filter {
  display: flex;
  flex-basis: 50%;
}
.Table__pagination {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  max-width: 900px;
}
.Table__page {
  padding: 8px;
  border: solid 1px #e7e7e7;
  margin-top: 10px;
  margin-right: 5px;
}
.Table__page:hover {
  background: #aeaeae;
  cursor: pointer;
  color: #ffffff;
}
.page__selected {
  background: rgb(19, 121, 180);
  color: #ffffff;
}
.group {
  position: relative;
  margin-bottom: 30px;
  margin-right: 20px;
}
input {
  font-size: 16px;
  padding: 10px;
  display: block;
  width: 200px;
  border: none;
  border-bottom: 1px solid #ccc;
}
input:focus {
  outline: none;
}
label {
  color: #999;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 15px;
  transition: 0.2s ease all;
}

input:focus ~ label,
input:valid ~ label {
  top: -15px;
  font-size: 14px;
  color: #5264ae;
}

.bar {
  position: relative;
  display: block;
  width: 320px;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
.Table__button {
  padding: 5px;
  font-size: 18px;
  border: solid 0px #e7e7e7;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
}
.back_to_top {
  position: fixed;
  bottom: 80px;
  right: 40px;
  cursor: pointer;
}
</style>