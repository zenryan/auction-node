<template>
      <div class="container mx-auto">
        <div class="py-8">
          <!-- page header -->
          <div class="flex items-stretch">
            <div class="flex-1 text-left left-0 py-2">
              <h2 class="text-2xl font-semibold leading-tight py-2">
                Create item
              </h2>
            </div>
            <div class="self-center flex-1 text-center py-2"></div>
            <div class="flex-1 text-gray-700 text-center py-2">
              <div class="float-right">
                <button
                  class="bg-transparent flex hover:bg-blue-500 text-blue-700 font-semibold
                    hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent
                    rounded"
                  @click="onClickSave"
                >
                  <svg class="h-5 w-5 fill-current mr-2" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                  </svg>
                  <span>Save item</span>
                </button>
              </div>
            </div>
          </div>

          <!-- error notification -->
          <div
            v-if="this.error"
            class="bg-red-200 border-t-4 border-red-600 rounded-b text-red-600 px-4 py-3
              shadow-md my-2"
            role="alert"
          >
            <div class="flex">
              <svg
                class="h-6 w-6 my-2 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8
                    8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                />
              </svg>
              <div>
                <p class="font-bold">Sorry we are unable to save item</p>
                <p class="text-sm">Make sure all the fields are correct.</p>
              </div>
            </div>
          </div>

          <div class="flex">
            <div
              class="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-orange
                        dark:bg-gray-600 rounded-lg"
            >
              <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Title
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border
                        border-red-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                        focus:bg-white focus:border-gray-500"
                      id="nick"
                      type="text"
                      v-model="form.title"
                    />
                    <p class="text-gray-600 text-xs italic">
                      Title of the item
                    </p>
                    <p class="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Description
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border
                        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                        focus:bg-white focus:border-gray-500"
                      id="email"
                      type="email"
                      v-model="form.desc"
                    />
                    <p class="text-gray-600 text-xs italic">
                      Brief Description
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Price
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border
                        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                        focus:bg-white focus:border-gray-500"
                      v-model="form.price"
                    />
                    <p class="text-gray-600 text-xs italic">
                      Re-size can be disabled by set by resize-none / resize-y /
                      resize-x / resize
                    </p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    >
                      Detail description
                    </label>
                    <textarea
                      class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700
                        border border-gray-200 rounded py-3 px-4 mb-3 leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                      v-model="form.detail"
                    >
                    </textarea>
                    <p class="text-gray-600 text-xs italic">
                      Detail description
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <pre class="text-left">{{ $data }}</pre>
      </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      item: null,
      error: null,
      form: {
        title: 'default',
        desc: 'default',
        detail: 'default',
        price: '100',
      },
    };
  },
  methods: {
    async onClickSave() {
      try {
        await this.$http.post('/item/create', {
          item: this.form,
        });
        this.$router.push('/app/item');
      } catch (e) {
        console.error(`Error ${JSON.stringify(e.response.data)}`);
        this.error = e.response.data.error;
      }
    },
  },
};
</script>
