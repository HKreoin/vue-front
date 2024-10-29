<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { baseUrl } from '@/config'
import { useRoute } from 'vue-router'

const route = useRoute()

const item = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/departments/${route.params.id}`,
    )
    item.value = data
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/departments/${id}`)
}
</script>

<template>
  <h1 class="title">Список отделов</h1>
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
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.parent_department?.name }}</td>
          <td>
            <router-link class="round-btn" :to="`/departments/${item.id}/edit`">
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
</template>
