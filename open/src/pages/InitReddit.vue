<template>
  <div class="constrain q-pa-md">
    <q-table
      grid
      :card-container-class="cardContainerClass"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section class="text-center" :style="{ fontSize: Math.floor(Math.random() * (40 - 25 + 1) + 25) + 'px'}">
              
              <strong>{{ props.row.name }}</strong>
			  <q-avatar :style="{ width: Math.floor(Math.random() * (40 - 25 + 1) + 25) + 'px', height:Math.floor(Math.random() * (40 - 25 + 1) + 25) + 'px'}">
                      <img style="{width: 100%; height: 100%;}" src="https://cdn.quasar.dev/img/avatar.png" />
                    </q-avatar>
            </q-card-section>
              
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'

const deserts = [
  'Frozen Yogurt',
  'Ice cream sandwich',
  'Eclair',
  'Cupcake',
  'Gingerbread',
  'Jelly bean',
  'Lollipop',
  'Honeycomb',
  'Donut',
  'KitKat'
]

const rows = [
  {
    name: "Frozen Yogurt",
	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Ice cream sandwich",
	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Eclair",
   	imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Cupcake",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Gingerbread",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Jelly bean",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Lollipop",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Honeycomb",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "Donut",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
  {
    name: "KitKat",
    imageUrl:"https://i.imgur.com/PRodY0P.jpeg",
  },
];

deserts.forEach(name => {
  for (let i = 0; i < 24; i++) {
    rows.push({ name: name + ' (' + i + ')', calories: 20 + Math.ceil(50 * Math.random()) })
  }
})

rows.sort(() => (-1 + Math.floor(3 * Math.random())))

export default {
  setup () {
    const $q = useQuasar()

    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 3
      }
      if ($q.screen.lt.md) {
        return 6
      }
      return 9
    }

    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })

    return {
      rows,

      filter,
      pagination,

      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'calories', label: 'Calories (g)', field: 'calories' }
      ],

      cardContainerClass: computed(() => {
        return $q.screen.gt.xs
          ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2')
          : null
      }),

      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs
          ? $q.screen.gt.sm ? [ 3, 6, 9 ] : [ 3, 6 ]
          : [3]
      })
    }
  },
  computed: {
    img() {}
	}
}
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>