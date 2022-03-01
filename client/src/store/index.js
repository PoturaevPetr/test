import { createStore } from 'vuex';
import axios from "axios";

export default createStore({
  state: {
    msg: "",
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
    },
    DELETE_NAME_TO_STATE: (state, uuid) => {
      state.names = state.names.filter((el) => el.uuid != uuid);
    },
    INIT_FORM: (state) => {
      state.form.firstName = "";
      state.form.secondName = "";
    },
    CREATE_MSG: (state, msg) => {
      state.msg = msg;
    }
  },
  actions: {
    GET_NAMES_FROM_API({commit}) {
      return axios.get("http://localhost:3123/")
        .then((res) => {
          commit("SET_NAMES_TO_STATE", res.data);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    POST_NAME_FROM_API({commit}) {
      return axios.post("http://localhost:3123/", this.state.form)
        .then((res) => {
          commit("PUSH_NAME_TO_STATE", res.data);
          commit("CREATE_MSG", "Элемент успешно добавлен!");
          commit("INIT_FORM");
          return res.data
        })
    },
    PUT_NAME({commit}) {
      return axios.put("http://localhost:3123/" + this.state.uuid, this.state.form)
        .then(() => {
          commit("CREATE_MSG", "Элемент успешно изменен!");
          commit("INIT_FORM");
        })
        .catch((error) => {
          commit("CREATE_MSG", error.res.data);
          
        })
    },
    DELETE_NAME({commit}) {
      return axios.delete("http://localhost:3123/" + this.state.uuid)
        .then(() => {
          commit("DELETE_NAME_TO_STATE", this.state.uuid);
          commit("CREATE_MSG", "Элемент успешно удален!");
        })
    }
  },
  getters: {
    NAMES(state) {
      return state.names;
    },
    FORM(state) {
      return state.form;
    },
    MSG(state) {
      return state.msg;
    }
  } 
})
