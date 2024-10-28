<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'

const professions = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/professions`)
    professions.value = data
    console.log(data)
    console.log(professions)
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/professions/${id}`)
}
</script>

<template>
  <div class="text-center py-2 text-slate-600">
    <h1>Список профессий</h1>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Наименование</th>
          <th>Примечание</th>
          <th>Редактировать</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in professions" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="`/profession/${item.id}`">
              {{ item.name }}
            </router-link>
          </td>
          <td>{{ item.description }}</td>
          <td><a class="round-btn">Редактировать</a></td>
          <td>
            <button @click="deleteItem(item.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
