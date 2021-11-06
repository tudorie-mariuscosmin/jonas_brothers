<template>
  <q-page class="constrain q-pa-md ">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        
        <template v-if="!loadingPosts && posts.length">
          <post 
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :selectedPostInfo="selectedPostInfo"
            :posts="posts"></post> 	 
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">
            No posts yet
          </h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar
              size="48px"
              color="primary"
              text-color="black"
              icon="eva-person-outline"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{
              loggedInUser.name
            }}</q-item-label>
            <q-item-label caption>{{ loggedInUser.email }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-dialog v-model="dialogRecipe">
      <q-card class="dialogBox">
        <q-card-section class="row">
          <div class="q-pr-lg text-h6">
            {{ selectedPostInfo.caption }}
          </div>
          <q-space />
          <q-btn v-close-popup dense flat rounded icon="close" />
        </q-card-section>
        <q-card-section>
          <div v-html="selectedPostInfo.recipe"></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="q-ma-sm"
            round
            unelevated
            size="16px"
            text-color="black"
            color="primary"
            label="OK"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-page-sticky  position="bottom-right"  :offset="[18, 18]">
        <q-btn round class="glass transparent" fab icon="eva-flash-outline" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      dialogRecipe: false,
      posts: [],
      loadingPosts: false,
      selectedPostInfo: {},
      loggedInUser: {}
    };
  },
  computed: {
    // ...mapGetters(["getUsers", "getUserById"])
  },
  methods: {
    puladecal() {
      // return this.getUserById("LKt86Icm0FfGs8SqqjGcFonf0Om1");
    },
    onRecipeClick(p) {
      this.dialogRecipe = true;
      this.selectedPostInfo = this.posts.find(post => post.id === p.id);
      console.log(this.selectedPostInfo);
    },
    getPostsByLocation() {
      // this.loadingPosts = true;
      // this.$axios
      //   .get(`${process.env.API}/api/posts/loc/az`)
      //   .then(response => {
      //     this.posts = response.data;
      //     this.loadingPosts = false;
      //   })
      //   .catch(err => {
      //     this.$q.dialog({
      //       title: "Error",
      //       message: "Could not download posts."
      //     });
      //     this.loadingPosts = false;
      //   });
    },
    getPosts() {
      return this.posts = [
        {
          id: 1,
          userId: 1,
          location: "london",
          imageUrl: "https://i.imgur.com/rekgIHP.jpeg",
          caption: "lala",
          recipe: "lala"
        },
        {
          id: 2,
          userId: 1,
          location: "london",
          imageUrl: "https://i.imgur.com/rekgIHP.jpeg",
          caption: "lala",
          recipe: "lala"
        },
        {
          id: 3,
          userId: 1,
          location: "london",
          imageUrl: "https://i.imgur.com/rekgIHP.jpeg",
          caption: "lala",
          recipe: "ppp"
        }
      ];
      // console.log("logged in user id: " + LocalStorage.getItem("userId"));
      // this.loadingPosts = true;
      // this.$axios
      //   .get(`${process.env.API}/api/posts`)
      //   .then(response => {
      //     this.posts = response.data;
      //     this.loadingPosts = false;
      //   })
      //   .catch(err => {
      //     this.$q.dialog({
      //       title: "Error",
      //       message: "Could not download posts."
      //     });
      //     this.loadingPosts = false;
      //   });
    },
    getLoggedInUser() {
    //   this.$axios
    //     .get(`${process.env.API}/api/users/${LocalStorage.getItem("userId")}`)
    //     .then(response => {
    //       this.loggedInUser = response.data;
    //     })
    //     .catch(err => {
    //       this.$q.dialog({
    //         title: "Error",
    //         message: "Could not download posts."
    //       });
    //       this.loadingPosts = false;
    //     });
    //   console.log(this.loggedInUser);
    },
    // ...mapActions(["fetchUsers"])
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    }
  },
  components: {
			'post' : require('components/PostComponent.vue').default
		},
  created() {
    this.getPosts();
  },
  beforeMount() {
    // this.getLoggedInUser();
    // this.fetchUsers();
    // if (!LocalStorage.getItem("loggedIn")) {
    //   this.$router.push("/login");
    // }
  }
};
</script>

<style lang="sass" scoped>


.glass
  backdrop-filter: blur(16px) saturate(180%)
  -webkit-backdrop-filter: blur(16px) saturate(180%) !important
  background-color: rgba(17, 25, 40, 0.75)
  border: 1px solid rgba(255, 255, 255, 0.125)


.sortButton
  border: 2px solid $grey-10
  border-radius: 5px

.dialogBox
  min-width: 40%

.card-post
  .q-img
    min-height: 200px
</style>
