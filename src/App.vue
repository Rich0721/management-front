<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0; /* 移除默認外邊距 */
  padding: 0; /* 移除默認內邊距 */
  box-sizing: border-box; /* 確保內外邊距不影響寬度 */
}

body {
  margin: 0; /* 移除 body 的默認外邊距 */
  padding: 0; /* 移除 body 的默認內邊距 */
  box-sizing: border-box; /* 確保內外邊距不影響寬度 */
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
