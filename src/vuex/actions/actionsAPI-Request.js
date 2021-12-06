import axios from "axios";
export const GET_DATA_TABLES_FROM_API = "getDataTablesFromAPI";

export default {
  GET_DATA_TABLES_FROM_API({ commit }) {
    return axios("https://jsonplaceholder.typicode.com/comments", {
      method: "GET"
    })
      .then(response => {
        commit("SET_DATA_TABLES_FROM_API", response.data);
        return response;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }
};
