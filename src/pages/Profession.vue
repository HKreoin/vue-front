<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'
import { useRoute } from 'vue-router'

const route = useRoute()

const item = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/professions/${route.params.id}`,
    )
    item.value = data
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
    <h1>Карточка профессии</h1>
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
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
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
