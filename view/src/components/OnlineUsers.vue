<template>
  <div v-if="show" class="absolute z-1 top-0 right-0 w-2/6">
    <div
      class="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300"
    >
      Online Users
    </div>

    <div
      class="w-full h-full overflow-auto shadow bg-white"
      style="height: 40vh;"
    >
      <table class="w-full">
        <tbody class="">
          <tr
            v-for="user in users"
            v-bind:key="user.user_id"
            class="relative transform scale-100
                text-xs py-1 border-b-2 border-blue-100 cursor-default
                hover:bg-blue-200 bg-opacity-25"
          >
            <td class="px-4 py-2 whitespace-no-wrap">
              <div class="leading-5 text-gray-500 font-medium">
                {{ user.name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auction: {
      type: Object,
      default() {
        return {
          id: 1,
        };
      },
    },
    show: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  data() {
    return {
      users: [],
    };
  },

  sockets: {
    userJoined(joinedUser) {
      this.users.push(joinedUser);
    },

    userLeft(leftUser) {
      this.users = this.users.filter((user) => user.id !== leftUser.id);
    },
  },

  watch: {
    show() {
      if (this.auction.id) this.fetchOnlineUsers();
    },
  },

  methods: {
    async fetchOnlineUsers() {
      const url = `/auction/${this.auction.id}/users`;
      const res = await this.$http.get(url);
      this.users = res.data.auction_users;
    },
  },
};
</script>

<style></style>
