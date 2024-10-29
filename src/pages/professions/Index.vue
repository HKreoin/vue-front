<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'

const professions = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/professions`)
    professions.value = data
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/professions/${id}`)
}
</script>

<template>
  <h1 class="title">Список профессий</h1>
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
            <router-link :to="`/professions/${item.id}`">
              {{ item.name }}
            </router-link>
          </td>
          <td>{{ item.description }}</td>
          <td>
            <router-link class="round-btn" :to="`/professions/${item.id}/edit`">
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
    <router-link class="round-btn" to="/professions/create"
      >Добавить профессию</router-link
    >
  </div>
</template>
