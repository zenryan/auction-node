<template>
  <div>
    <div
      class="shadow-xl overflow-y-auto bg-gray-200"
      style="max-height: 500px;"
      ref="messageContainer"
    >
      <div class="text-xs">
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
      </div>
    </div>

    <div class="flex bottom-0 left-0 bg-gray-200 w-full h-12 item-center">
      <input
        class="typing-input flex-2 m-2 py-2 px-4 text-xs rounded"
        type="text"
        placeholder="Type message here ..."
        v-model="inputMessage"
        @keyup.enter="sendMessage"
      />
      <div
        class="flex-1 self-strecth rounded ml-2 hover:bg-blue-100text-gray-700 py-3"
        @click="sendMessage"
      >
        <Send />
      </div>
    </div>
  </div>
</template>

<script>
import UserMessage from './UserMessage.vue';
import SystemMessage from './SystemMessage.vue';
import Send from './svg/Send.vue';

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
  },
  components: {
    UserMessage,
    SystemMessage,
    Send,
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

  mounted() {
    if (this.user) this.joinChat();
    if (this.auction) this.fetchMessages(this.auction.id);
  },

  methods: {
    async fetchMessages(auctionId) {
      try {
        const url = `/auction/${auctionId}/messages`;
        const response = await this.$http.get(url);
        this.messages = response.data.messages;
        this.$nextTick(() => {
          const content = this.$refs.messageContainer;
          content.scrollTop = content.scrollHeight;
        });
      } catch (e) {
        console.error(e);
      }
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
        this.$nextTick(() => {
          const content = this.$refs.messageContainer;
          content.scrollTop = content.scrollHeight;
        });
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
  beforeDestroy() {
    this.$socket.emit('roomLeave', {
      type: 'auction',
      uuid: this.auction.uuid,
      user: this.user,
    });
  },
};
</script>

<style>
.typing-input {
  width: 310px;
}

@media (min-width: 768px) {
  .typing-input {
    width: 698px;
  }
}

@media (min-width: 1024px) {
  .typing-input {
    width: 1210px;
  }
}
</style>
