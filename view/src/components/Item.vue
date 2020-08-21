<template>
  <div class="container mx-auto">
    <div class="">
      <!-- page header -->
      <div class="flex items-stretch">
        <div class="flex-1 text-left left-0 py-2">
          <h2 class="text-2xl font-semibold leading-tight py-2">
            Items list
          </h2>
        </div>
        <div class="self-center flex-1 text-center py-2"></div>
        <div class="flex-1 text-gray-700 text-center py-2">
          <div class="float-right">
            <button
              class="bg-transparent flex hover:bg-blue-500 text-blue-700
                    font-semibold hover:text-white py-2 px-4 border
                    border-blue-500 hover:border-transparent rounded"
              v-on:click="onClickNew"
            >
              <svg class="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
              <span>New Item</span>
            </button>
          </div>
        </div>
      </div>

      <div class="my-2 flex sm:flex-row flex-col">
        <div class="flex flex-row mb-1 sm:mb-0">
          <div class="relative">
            <select
              class="appearance-none h-full rounded-l border block
                    appearance-none w-full bg-white border-gray-400 text-gray-700
                    py-2 px-4 pr-8 leading-tight focus:outline-none
                    focus:bg-white focus:border-gray-500"
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
                    items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              class="appearance-none h-full rounded-r border-t sm:rounded-r-none
                    sm:border-r-0 border-r border-b block appearance-none w-full
                    bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8
                    leading-tight focus:outline-none focus:border-l
                    focus:border-r focus:bg-white focus:border-gray-500"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
                    items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
          <div class="relative">
            <select
              class="appearance-none h-full rounded-l border block
                    appearance-none w-full bg-white border-gray-400
                    text-gray-700 py-2 px-4 pr-8 leading-tight
                    focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option>Delete</option>
              <option>Mark active</option>
              <option>Mark inactive</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex
                    items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828
                        5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="block relative">
          <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
              <path
                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32
                      4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
              ></path>
            </svg>
          </span>
          <input
            placeholder="Search"
            class="appearance-none rounded-r rounded-l sm:rounded-l-none
                  border border-gray-400 border-b block pl-8 pr-6 py-2 w-full
                  bg-white text-sm placeholder-gray-400 text-gray-700
                  focus:bg-white focus:placeholder-gray-600 focus:text-gray-700
                  focus:outline-none"
          />
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr class="text-left">
                <th
                  class="py-2 px-3 sticky top-0 border-b border-gray-200
                        bg-gray-100"
                >
                  <label
                    class="text-teal-500 inline-flex justify-between
                          items-center hover:bg-gray-200 px-2 py-2 rounded-lg "
                  >
                    <input
                      type="checkbox"
                      class="form-checkbox focus:outline-none
                            focus:shadow-outline"
                      @click="selectAllCheckbox($event)"
                    />
                  </label>
                </th>
                <th
                  v-for="head in itemHeader"
                  :key="head.name"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100
                        text-left text-xs font-semibold text-gray-600 uppercase
                        tracking-wider"
                >
                  {{ head.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td
                  class="border-dashed border-t border-gray-200 px-3 bg-white"
                >
                  <label
                    class="text-teal-500 inline-flex justify-between
                          items-center hover:bg-gray-200 px-2 py-2 rounded-lg
                          cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="form-checkbox rowCheckbox focus:outline-none
                            focus:shadow-outline"
                      :name="item.id"
                      @click="getRowDetail($event, item.id)"
                    />
                  </label>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-full h-full rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ item.title }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ item.desc }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ item.detail }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ item.price }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Status :type="item.status" />
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row
                  items-center xs:justify-between          "
          >
            <span class="text-xs xs:text-sm text-gray-900">
              {{ tableFooter }}
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="bg-transparent flex hover:bg-blue-500 text-blue-700
                      font-semibold hover:text-white py-2 px-4 border border-blue-500
                      hover:border-transparent rounded-l"
              >
                Prev
              </button>
              <button
                class="bg-transparent flex hover:bg-blue-500 text-blue-700
                      font-semibold hover:text-white py-2 px-4 border
                      border-blue-500 hover:border-transparent rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pre class="text-left">{{ $data }}</pre>
  </div>
</template>

<script>
import Status from '../ui/Status.vue';

export default {
  components: {
    Status,
  },
  data() {
    return {
      selectedRows: [],
      itemHeader: [
        {
          name: 'Title',
        },
        {
          name: 'Description',
        },
        {
          name: 'Details',
        },
        {
          name: 'Price',
        },
        {
          name: 'Status',
        },
      ],
      items: [],
      pagination: {
        from: 0,
        to: 0,
        total: 0,
      },
    };
  },
  computed: {
    tableFooter() {
      return `Showing ${this.pagination.from} to ${this.pagination.to} of ${this.pagination.total} Entries`;
    },
  },

  async mounted() {
    try {
      const { data } = await this.$http.get('/item');
      this.items = data.items;
      this.pagination = data.pagination;
    } catch (e) {
      console.error(`Error ${JSON.stringify(e.response.data)}`);
      this.error = e.response.data.error;
    }
  },

  methods: {
    onClickNew() {
      this.$router.push('/app/item/create/');
    },

    selectAllCheckbox($event) {
      const columns = document.querySelectorAll('.rowCheckbox');

      this.selectedRows = [];

      if ($event.target.checked === true) {
        columns.forEach((column) => {
          column.checked = true;
          this.selectedRows.push(parseInt(column.name, 10));
        });
      } else {
        columns.forEach((column) => {
          column.checked = false;
        });
        this.selectedRows = [];
      }
    },
    getRowDetail($event, id) {
      const rows = this.selectedRows;

      if (rows.includes(id)) {
        const index = rows.indexOf(id);
        rows.splice(index, 1);
      } else {
        rows.push(id);
      }
    },
  },
};
</script>
