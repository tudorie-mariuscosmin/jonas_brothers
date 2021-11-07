<template>
  <q-layout class="bg-image" view="lHh Lpr lFf">
    <q-header class="text-grey-10 glass transparent" bordered>
      <q-toolbar class="constrain">
        <q-btn
          class="q-pr-sm"
          :icon="
            $route.path === '/initial'
              ? 'eva-home-outline'
              : 'eva-person-outline'
          "
          size="18px"
          :to="$route.path === '/initial' ? '/' : '/initial'"
          dense
          flat
          round
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title class="text-merienda-one"> strive </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          icon="eva-home-outline"
          size="18px"
          to="/"
          dense
          flat
          round
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-btn
          @click="logout()"
          icon="eva-log-out-outline"
          size="18px"
          dense
          flat
          round
        />
      </q-toolbar>
    </q-header>
    <!-- <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="black"
        indicator-color="primary"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/recipe" icon="eva-flash-outline" />
      </q-tabs>
    </q-footer> -->

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/login");
      // this.$axios
      //   .get(`${process.env.API}/api/auth/logout`)
      //   .then(response => {
      //     this.$q.notify({
      //       color: "green",
      //       message: response.data.message,
      //       icon: "arrow_forward"
      //     });

      //     LocalStorage.set("loggedIn", false);
      //     this.$router.push("/login");
      //   })
      //   .catch(error => {
      //     this.$q.notify({
      //       color: "negative",

      //       message: error.response.data.message,
      //       icon: "report_problem"
      //     });
      //   });
    },
  },
};
</script>

<style lang="sass" scoped>
.glass
  backdrop-filter: blur(16px) saturate(180%)
  -webkit-backdrop-filter: blur(16px) saturate(180%)
  background-color: rgba(17, 25, 40, 0.75)
  border-radius: 12px
  border: 1px solid rgba(255, 255, 255, 0.125)

.bg-image
  background-image: url(../assets/topography.svg)
  background-size: contain
  background-color: #f0f4ef

.titleN
  margin: 0
  padding: 0 0.3em
  display: inline-block
  color: black
  background-color: $primary
  border-radius: 100%

.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px
</style>
