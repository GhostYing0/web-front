<template>
  <div>
    <el-avatar size="large"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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
        {{form.name}}
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
        {{form.phone}}
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
        {{form.email}}
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
        {{form.school}}
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
        {{form.college}}
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
        {{form.gender}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            班级
          </div>
        </template>
        {{form.student_class}}
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

const form = {
  name:"sdasa",
  phone:"",
  email:"",
  gender:"",
  school:"",
  semester:"",
  college:"",
  student_class:"",
  avatar:""
}

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