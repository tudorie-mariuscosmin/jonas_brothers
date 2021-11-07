<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default defineComponent({
  name: "App",
});
</script>
