<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { baseUrl } from '@/config'
import { useRoute } from 'vue-router'

const route = useRoute()

const item = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/employees/${route.params.id}`)
    item.value = data
    console.log(item.value)
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  axios.delete(`${baseUrl}/employees/${id}`)
}
</script>

<template>
  <div class="text-center py-2 text-slate-600">
    <h1>Список сотрудников</h1>
  </div>
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
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.full_name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.profession?.name }}</td>
          <td>{{ item.department?.name }}</td>
          <td><a class="round-btn">Редактировать</a></td>
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
