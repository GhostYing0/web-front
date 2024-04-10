<template>
  <div>
    <el-avatar size="large"
        src=avatar
    />
  </div>
  <el-descriptions
        class="margin-top"
        title="个人信息"
        :column="3"
        :size="size"
        border
    >
      <template #extra>
        <el-button type="primary">编辑</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
             姓名
          </div>
        </template>
        <el-text v-text=name></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            电话号码
          </div>
        </template>
        <el-text v-text=phone></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Message />
            </el-icon>
            邮箱
          </div>
        </template>
        <el-text v-text=email></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            学校
          </div>
        </template>
        <el-text v-text=school></el-text>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            学院
          </div>
        </template>
        <el-text v-text=college></el-text>
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            性别
          </div>
        </template>
        <el-text v-text=gender></el-text>
      </el-descriptions-item>
      <el-descriptions-item v-if="store.getters.roles.includes('student')">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            班级
          </div>
        </template>
        <el-text v-text=student_class></el-text>
      </el-descriptions-item>
    <el-descriptions-item v-if="store.getters.roles.includes('student')">
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <office-building />
          </el-icon>
          入学年份
        </div>
      </template>
      <el-text v-text=semester></el-text>
    </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
  import store from '../../store'
  import { computed, ref } from 'vue'
  import {
      Iphone,
      Location,
      OfficeBuilding,
      Tickets,
      User,
      Message,


  } from '@element-plus/icons-vue'


  const name = computed(()=>{
    return store.getters.name
  })
  const phone = computed(()=>{
    return store.getters.phone
  })
  const email = computed(()=>{
    return store.getters.email
  })
  const gender = computed(()=>{
    return store.getters.gender
  })
  const school = computed(()=>{
    return store.getters.school
  })
  const semester = computed(()=>{
    return store.getters.semester
  })
  const college = computed(()=>{
    return store.getters.college
  })
  const student_class = computed(()=>{
    return store.getters.student_class
  })
  const avatar = computed(()=>{
    return store.getters.avatar
  })

  const size = ref('default')
  const iconStyle = computed(() => {
    const marginMap = {
      large: '8px',
      default: '6px',
      small: '4px',
    }
    return {
      marginRight: marginMap[size.value] || marginMap.default,
    }
  })
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>