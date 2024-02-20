<template>
  <div class="common-layout">
    <el-container>
      <el-header id="header">Header</el-header>
      <el-container>
        <el-aside id="aside">Aside</el-aside>
        <el-container id="middle">
          <el-main class="main">Main</el-main>
          <el-footer class="footer">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
// import TestAddUser from './components/my-test-adduser.vue'
// import TestGetUser from './components/my-test-getcontest.vue'

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.common-layout {
  display: flex;
}

#header {
  flex: 1;
  height: 10vh;
  width: 100vw;
  background-color: blueviolet;
}

#middle {
  flex: 9;
  display: flex;
  height: 90vh;
  flex-direction: column;
}

#aside {
  float:left;
  flex: 1;
  height: 90vh;
  width: 10vw;
  background-color: darkgrey;
}

.footer {
  flex:1;
  float:left;
  background-color: red;
}

.main {
  flex:8;
  float:left;
  background-color: yellow;
}

</style>
