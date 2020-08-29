<template>
  <div class="container mx-auto">
    <AuctionCarousel :auction="auction" />

    <!-- page body -->
    <div class="flex items-strecth p-2 bg-blue-300">
      <div class="flex-1 text-left">
        <p>{{ auction.title }}</p>
      </div>
      <div class="flex-1 text-right">
        <router-link to="/app/bid/1/web">
          <button class="px-1">
            <Window />
          </button>
        </router-link>
        <template v-if="expandDetail">
          <button @click="setExpandDetail(false)">
            <Up />
          </button>
        </template>
        <template v-else>
          <button @click="setExpandDetail(true)">
            <Down />
          </button>
        </template>
      </div>
    </div>

    <!-- editor -->
    <div
      v-if="expandDetail"
      class="shadow-xl overflow-y-auto overflow-x-auto p-2 bg-blue-300"
      sytle="max-height:  50vh"
    >
      <Editor
        class="bg-white rounded"
        ref="editor"
        v-model="auction.detail"
        v-bind:editable="false"
      />
    </div>

    <!-- messages -->
    <div
      class="shadow-xl overflow-y-auto bg-gray-200"
      style="max-height: 500px;"
    >
      <div class="text-xs">
        <div
          :class="msg.own ? 'text-right' : false"
          class="p-2"
          v-for="msg in messages"
          v-bind:key="msg.id"
        >
          <p class="">
            <label class="bg-gray-100 rounded-full py-1 px-2 text-bold text-xs">
              {{ msg.name }}
            </label>
          </p>
          <p class="p-2">{{ msg.message }}</p>
        </div>
      </div>
    </div>

    <div class="flex bottom-0 left-0 bg-gray-200 w-full h-12 item-center">
      <input
        class="flex-2 m-2 py-2 px-4 text-xs rounded"
        style="width: 310px;"
        type="text"
        placeholder="Type message here ..."
        v-model="inputMessage"
      />
      <div
        class="flex-1 self-strecth rounded ml-2 hover:bg-blue-100text-gray-700 py-3"
        @click="sendMessage()"
      >
        <Send />
      </div>
    </div>
  </div>
</template>

<script>
import Down from './svg/Down.vue';
import Up from './svg/Up.vue';
import Window from './svg/Window.vue';
import Send from './svg/Send.vue';
import Editor from '../ui/Editor.vue';
import AuctionCarousel from './AuctionCarousel.vue';

export default {
  components: {
    Down,
    Up,
    Window,
    Editor,
    Send,
    AuctionCarousel,
  },

  data() {
    return {
      user: null,
      expandDetail: false,
      auction: {
        title: '',
        desc: '',
        detail: '',
        startdate: '',
        enddate: '',
      },
      inputMessage: '',
      messages: [
        {
          id: 1,
          name: 'userA',
          message:
            'nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!nice !!!!',
          own: true,
        },
      ],
    };
  },

  async mounted() {
    this.auctionId = this.$route.params.auctionId;
    this.fetchMessages(this.auctionId);
    if (this.auctionId) {
      await this.fetchAuction(this.auctionId);
      if (this.$refs.editor) this.$refs.editor.setContent(this.auction.detail);
    }
    // TODO: hard coded, refactor when login is implemented
    this.user = JSON.parse(localStorage.getItem('user'));
  },

  methods: {
    setExpandDetail(val) {
      this.expandDetail = val;
    },

    async fetchAuction(auctionId) {
      try {
        const url = `/auction/${auctionId}`;
        const response = await this.$http.get(url);
        if (response.data.auction) {
          this.auction = response.data.auction;
        }
      } catch (e) {
        console.error(e);
      }
    },

    async fetchMessages(auctionId) {
      try {
        const url = `/auction/${auctionId}/messages`;
        const response = await this.$http.get(url);
        this.messages = response.data.messages;
      } catch (e) {
        console.error(e);
      }
    },

    async sendMessage() {
      try {
        if (!this.inputMessage) return;
        const url = `/auction/${this.auctionId}/message`;
        const body = {
          user_id: this.user.id,
          message: this.inputMessage,
        };
        const response = await this.$http.post(url, body);
        if (response.data.body.message) {
          this.messages.push(response.data.body.message);
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
