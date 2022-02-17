<template>
  <!--顶部栏-->
  <Header/>
  <!--主体-->
  <div style="display: flex;">
    <!--侧边栏-->
    <Aside></Aside>
    <!--嵌套路由自动显示Home部分，即可以根据路由切换的部分，flex布局表示对父div部分进行等分分割（纵向）-->
    <router-view style="flex: 1;" />
  </div>

</template>

<script>
import Header from "../components/Header";
import Aside from "../components/Aside";
import request from "../utils/request";

export default {
  name: "Layout",
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped>

</style>