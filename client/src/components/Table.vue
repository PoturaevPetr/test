<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h4>Таблица</h4>
        <hr>
        <div class="alert">
          <alert class="text-center" :message="MSG" v-if="showAlert"></alert>
        </div>
        <button type="button" class="btn btn-success btn-sm" @click="onAdd">Добавить</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col-4">Имя</th>
              <th scope="col-4">Отчество</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="activeInp">
              <td><input type="text" name="firstname" class="form-control" placeholder="Имя" v-model="FORM.firstName" required></td>
              <td><input type="text" name="seconName" class="form-control" placeholder="Отчество" v-model="FORM.secondName" required></td>
              <td>
                <button type="submit" class="btn btn-warning btn-sm" @click="saveData">Сохранить</button>
              </td>
            </tr>           
            <tr v-for="(name, ind) in NAMES" :key="ind">
              <td><input name="textfield" type="text" class="form-control" placeholder="Имя" v-model="name.firstName" v-bind:readonly="activeEdit[ind] != true"></td>
              <td><input name="textfield" type="text" class="form-control" placeholder="Отчество" v-model="name.secondName" v-bind:readonly="activeEdit[ind] != true"></td>
              <td class="col-4">
                <button type="button" class="btn btn-warning btn-sm" v-if="activeEdit[ind]" @click="put(ind)">Сохранить</button>
                <button type="button" class="btn btn-warning btn-sm" v-else  @click="editData(ind)">Редактировать</button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteName(name.uuid)">Удалить</button>
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

export default {
  components: {
    alert: Alert
  },
  data() {
    return {
      activeInp: false,
      activeEdit: [],
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
      this.activeInp = true;
    },
    editData(ind) {
      this.activeEdit[ind] = true;

    },
    saveData() {
      if (this.FORM.firstName == "" || this.FORM.secondName == "") {
        this.showAlert = true;
        this.$store.state.msg = "Заполните все поля!";
      } else {
        this.POST_NAME_FROM_API();
        this.activeInp = false;
        this.showAlert = true;
      }
    },
    put(ind) {
      this.$store.state.uuid = this.NAMES[ind].uuid;
      this.FORM.firstName = this.NAMES[ind].firstName;
      this.FORM.secondName = this.NAMES[ind].secondName;
      if (this.FORM.firstName == "" || this.FORM.secondName == "") {
        this.$store.state.msg = "Заполните все поля!";
        this.showAlert = true;
      } else {
        this.PUT_NAME();
        this.showAlert = true;  
        this.msg = this.$store.state.msg;
        this.activeEdit[ind] = false;
      }
      
    },
    deleteName(uuid) {
      this.$store.state.uuid = uuid; 
      this.DELETE_NAME();
      this.showAlert = true;
    }
  },
  mounted() {
    this.GET_NAMES_FROM_API();
  },
  computed: {
    ...mapGetters([
      "NAMES",
      "FORM",
      "MSG"
    ])
  },
}
</script>

<style scoped>

.alert {
  height: 6vh;
}
</style>