<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { baseUrl } from '@/config'

const employees = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/employees`)
    employees.value = data
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/employees/${id}`)
}
</script>

<template>
  <h1 class="title">Список сотрудников</h1>
  <div>
    <table class="table-auto">
      <thead>
        <tr>
          <th>id</th>
          <th>ФИО</th>
          <th>Примечание</th>
          <th>Профессия</th>
          <th>Отдел</th>
          <th>Редактировать</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in employees" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="`/employees/${item.id}`">
              {{ item.full_name }}
            </router-link>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.profession.name }}</td>
          <td>{{ item.department.name }}</td>
          <td>
            <router-link class="round-btn" :to="`/employees/${item.id}/edit`">
              Редактировать
            </router-link>
          </td>
          <td>
            <button class="round-btn" @click="deleteItem(item.id)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-end">
    <router-link class="round-btn" to="/employees/create"
      >Добавить сотрудника</router-link
    >
  </div>
</template>
