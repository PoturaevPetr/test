import { createStore } from 'vuex';
import axios from "axios";

export default createStore({
  state: {
    names: [],
    form: {
      firstName: "",
      secondName: "",
    },
    uuid: "",
  }, 
  mutations: {
    SET_NAMES_TO_STATE: (state, names) => {
      state.names = names;
    },
    PUSH_NAME_TO_STATE: (state, name) => {
      state.names.push(name);
    }
  },
  actions: {
    GET_NAMES_FROM_API({commit}) {
      return axios.get("http://localhost:3123/")
        .then((res) => {
          commit("SET_NAMES_TO_STATE", res.data);
          console.log(res.data);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    POST_NAME_FROM_API({commit}) {
      return axios.post("http://localhost:3123/", this.state.form)
        .then((res) => {
          commit("PUSH_NAME_TO_STATE", this.state.form);
          this.state.form.firstName = "";
          this.state.form.secondName = "";
          return res.data
        })
    },
    EDIT_NAME() {
      console.log(this.state.form);
      return axios.put("http://localhost:3123/" + this.state.uuid, this.state.form);
    },
    DELETE_NAME() {
      return axios.delete("http://localhost:3123/" + this.state.uuid)
    }
  },
  getters: {
    NAMES(state) {
      return state.names;
    },
    FORM(state) {
      return state.form;
    }
  } 
})
