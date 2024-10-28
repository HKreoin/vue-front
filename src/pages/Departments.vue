<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { baseUrl } from '@/config'

const departments = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/departments`)
    departments.value = data
    console.log(data)

    console.log(departments)
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/departments/${id}`)
}
</script>

<template>
  <div class="text-center py-2 text-slate-600">
    <h1>Список отделов</h1>
  </div>
  <div>
    <table class="table-auto">
      <thead>
        <tr>
          <th>id</th>
          <th>Наименование</th>
          <th>Примечание</th>
          <th>Родительский отдел</th>
          <th>Редактировать</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in departments" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="`/departments/${item.id}`">
              {{ item.name }}
            </router-link>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.parent_department?.name }}</td>
          <td><a class="round-btn">Редактировать</a></td>
          <td>
            <button @click="deleteItem(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
