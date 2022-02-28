<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h4>Таблица</h4>
        <hr>
        <alert :message="msg" v-if="showAlert"></alert>
        <br><br>
        <button type="button" class="btn btn-success btn-sm" @click="onAdd">Добавить</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Отчество</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="onInputs">
              <td><input type="text" name="firstname" class="form-control" placeholder="Имя" v-model="FORM.firstName" required></td>
              <td><input type="text" name="seconName" class="form-control" placeholder="Отчество" v-model="FORM.secondName" required></td>
              <td>
                <button type="submit" class="btn btn-warning btn-sm" @click="saveData">Сохранить</button>
              </td>
            </tr>           
            <tr v-for="(name, ind) in NAMES" :key="ind">
              <td v-if="flag[ind]"><input name="textfield" type="text" class="form-control" placeholder="Имя" v-model="name.firstName" required></td>
              <td v-else>{{name.firstName}}</td>
              <td v-if="flag[ind]"><input name="textfield" type="text" class="form-control" placeholder="Отчество" v-model="name.secondName" required></td>
              <td v-else>{{name.secondName}}</td>
              <td>
                <button type="button" class="btn btn-warning btn-sm" v-if="flag[ind]" @click="put(ind)">Сохранить</button>
                <button type="button" class="btn btn-warning btn-sm" v-else  @click="editData(ind)">Редактировать</button>
                <button type="button" class="btn btn-danger btn-sm" @click="$store.state.uuid=name.uuid; DELETE_NAME()">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Alert from './alert.vue';
import axios from "axios";
export default {
  components: {
    alert: Alert
  },
  data() {
    return {
      onInputs: false,
      flag: [],
      msg: "",
      showAlert: false,
    }
  },
  methods: {
    ...mapActions([
      "GET_NAMES_FROM_API",
      "POST_NAME_FROM_API",
      "PUT_NAME",
      "DELETE_NAME",
    ]),
    onAdd() {
      this.onInputs = true;
    },
    editData(ind) {
      this.flag[ind] = true;
      this.FORM = this.NAMES[ind];
    },
    saveData() {
      if (this.FORM.firstName == "" || this.FORM.secondName == "") {
        this.showAlert = true;
        this.msg = "Заполните все поля!";
      } else {
        this.POST_NAME_FROM_API();
        this.firstName = "";
        this.secondName = "";
        this.onInputs = false;
        this.showAlert = true;
        this.msg = "Элемент успешно добавлен!"
      }
    },
    put(ind) {
      const path = "http://localhost:3123/" + this.NAMES[ind].uuid;
      const putData = {
        firstName: this.NAMES[ind].firstName,
        secondName: this.NAMES[ind].secondName,
      }
      axios.put(path, putData)
        .then(() => {
          this.flag[ind] = false;
          this.showAlert = true;
          this.msg = "Элемент успешно изменен!"
        })
        .catch((error) => {
          this.flag[ind] = false;
          this.showAlert = true;
          this.msg = error.response.data
        })
    },
  },
  mounted() {
    this.GET_NAMES_FROM_API();
  },
  computed: {
    ...mapGetters([
      "NAMES",
      "FORM"
    ])
  },
}
</script>
