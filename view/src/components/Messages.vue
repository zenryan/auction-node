<template>
  <div class="shadow-xl bg-gray-200 relative">
    <div
      ref="messageContainer"
      class="text-xs overflow-y-auto"
      style="height: 50vh;"
    >
      <div
        :class="msg.own ? 'text-right' : false"
        v-for="msg in messages"
        v-bind:key="msg.id"
      >
        <template v-if="!msg.user_id">
          <SystemMessage :message="msg.message" />
        </template>
        <template v-else>
          <UserMessage :name="msg.name" :message="msg.message" />
        </template>
      </div>
      <!-- <pre>{{ $data.messages }}</pre> -->
    </div>
    <div
      class="flex flex-wrap bottom-0 left-0 bg-gray-200 w-full h-12 item-center"
    >
      <input
        class="flex-1 typing-input m-2 py-2 px-4 text-xs rounded"
        type="text"
        placeholder="Type message here ..."
        v-model="inputMessage"
        @keyup.enter="sendMessage"
      />
      <div
        class="flex self-strecth rounded mx-3 hover:bg-blue-100text-gray-700 py-3"
        @click="sendMessage"
      >
        <Send />
      </div>
    </div>
    <OnlineUsers :auction="auction" :show="showOnlineUsers" />
  </div>
</template>

<script>
import UserMessage from './UserMessage.vue';
import SystemMessage from './SystemMessage.vue';
import Send from './svg/Send.vue';
import OnlineUsers from './OnlineUsers.vue';

export default {
  props: {
    auction: {
      type: Object,
      default() {
        return {};
      },
    },
    user: {
      required: true,
      default() {
        return {};
      },
    },
    showOnlineUsers: {
      default() {
        return false;
      },
    },
  },
  components: {
    UserMessage,
    SystemMessage,
    Send,
    OnlineUsers,
  },
  data() {
    return {
      inputMessage: '',
      messages: [],
    };
  },
  watch: {
    auction(auction) {
      this.fetchMessages(auction.id);
    },
    user(user) {
      if (user.id) {
        this.joinChat();
      }
    },
  },

  sockets: {
    connect() {
      console.log('message connectd');
      if (this.user) this.joinChat();
    },
  },

  created() {
    window.addEventListener('beforeunload', async () => {
      await this.$socket.emit('roomLeave', {
        type: 'auction',
        uuid: this.auction.uuid,
        user: this.user,
      });
    });
  },

  mounted() {
    if (this.auction) this.fetchMessages(this.auction.id);
  },

  methods: {
    async fetchMessages(auctionId) {
      try {
        const url = `/auction/${auctionId}/messages`;
        const response = await this.$http.get(url);
        this.messages = response.data.messages;
        this.scrollToLast();
      } catch (e) {
        console.error(e);
      }
    },

    scrollToLast() {
      this.$nextTick(() => {
        const content = this.$refs.messageContainer;
        content.scrollTop = content.scrollHeight;
      });
    },

    joinChat() {
      // join to auction room
      this.$socket.emit('roomJoin', {
        type: 'auction',
        uuid: this.auction.uuid,
        user: this.user,
      });

      this.sockets.subscribe('roomMsg', (message) => {
        this.messages.push(message);
        this.scrollToLast();
      });

      this.sockets.subscribe('userLeft', (user) => {
        this.messages.push({
          id: new Date().getTime(),
          message: `${user.name} has left`,
          name: 'system',
        });
        this.scrollToLast();
      });

      this.sockets.subscribe('userJoined', (user) => {
        this.messages.push({
          id: new Date().getTime(),
          message: `${user.name} has joined`,
          name: 'system',
        });
        this.scrollToLast();
      });
    },

    async sendMessage() {
      try {
        if (!this.inputMessage) return;

        const body = {
          type: 'auction',
          uuid: this.auction.uuid,
          user: this.user,
          message: this.inputMessage,
        };
        this.$socket.emit('roomMsg', body);
        this.inputMessage = '';
      } catch (e) {
        console.error(e);
      }
    },
  },

  async beforeDestroy() {
    await this.$socket.emit('roomLeave', {
      type: 'auction',
      uuid: this.auction.uuid,
      user: this.user,
    });
  },
};
</script>
