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
              <td><input type="text" name="firstname" class="form-control" placeholder="Имя" v-model="firstName" required></td>
              <td><input type="text" name="seconName" class="form-control" placeholder="Отчество" v-model="secondName" required></td>
              <td>
                <button type="submit" class="btn btn-warning btn-sm" @click="saveData">Сохранить</button>
              </td>
            </tr>           
            <tr v-for="(name, ind) in names" :key="ind">
              <td v-if="flag[ind]"><input name="textfield" type="text" class="form-control" placeholder="Имя" v-model="name.firstName" required></td>
              <td v-else>{{name.firstName}}</td>
              <td v-if="flag[ind]"><input name="textfield" type="text" class="form-control" placeholder="Отчество" v-model="name.secondName" required></td>
              <td v-else>{{name.secondName}}</td>
              
              <td>
                <button type="button" class="btn btn-warning btn-sm" v-if="flag[ind]" @click="put(ind)">Сохранить</button>
                <button type="button" class="btn btn-warning btn-sm" v-else  @click="editData(ind)">Редактировать</button>
                
                <button type="button" class="btn btn-danger btn-sm" @click="deleteData(name.uuid)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Alert from './alert.vue';
export default {
  components: {
    alert: Alert
  },
  data() {
    return {
      names: [],
      firstName: "",
      secondName: "",
      onInputs: false,
      flag: [],
      msg: "",
      showAlert: false,
    }
  },
  methods: {
    getData() {
      const path = "http://localhost:3123/";
      axios.get(path)
        .then((res) => {
          this.names = res.data;          
        })
    },
    onAdd() {
      this.onInputs = true;
    },
    editData(ind) {
      this.flag[ind] = true;

    },
    saveData() {
      const postData = {
        firstName: this.firstName,
        secondName: this.secondName,
      };
      this.post(postData);
      this.firstName = "";
      this.secondName = "";
    },
    post(postData) {
      const path = "http://localhost:3123/";
      axios.post(path, postData)
        .then(() => {
          this.getData();
          this.onInputs = false;
          this.showAlert = true,
          this.msg = "Элемент успешно добавлен!"
          })
    },
    put(ind) {
      const path = "http://localhost:3123/" + this.names[ind].uuid;
      const putData = {
        firstName: this.names[ind].firstName,
        secondName: this.names[ind].secondName,
      }
      axios.put(path, putData)
        .then(() => {
          this.getData();
          this.flag[ind] = false;
          this.showAlert = true,
          this.msg = "Элемент успешно изменен!"
        })
        .catch((error) => {
          this.flag[ind] = false;
          this.showAlert = true,
          this.msg = error.response.data
        })
    },
    deleteData(uuid) {
      const path = "http://localhost:3123/" + uuid;
      console.log(path);
      axios.delete(path)
        .then((res) => {
          this.getData();
          this.showAlert = true,
          this.msg = res.data;
        })
    }
  },
  created() {
    this.getData();
  }
  

}
</script>
