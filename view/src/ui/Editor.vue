<template>
  <div>
    <EditorMenuBar v-show="editable" :editor="editor" v-slot="{ commands, isActive }">
      <div class="rounded p-2 bg-gray-200">
        <button
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          class="border border-gray-900 rounded align-middle text-xs w-auto p-1 m-1"
        >
          H1
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          class="border border-gray-900 rounded align-middle text-xs w-auto p-1 m-1"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          class="border border-gray-900 rounded align-middle text-xs w-auto p-1 m-1"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          class="border border-gray-900 rounded align-middle text-xs w-auto p-1 m-1"
          @click="commands.heading({ level: 4 })"
        >
          H4
        </button>

        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M17.194 10.962A6.271 6.271 0 0 0 12.844.248H4.3a1.25 1.25 0 0 0 0 2.5h1.013a.25.25 0 0 1 .25.25V21a.25.25 0 0 1-.25.25H4.3a1.25 1.25 0 1 0 0 2.5h9.963a6.742 6.742 0 0 0 2.93-12.786zm-4.35-8.214a3.762 3.762 0 0 1 0 7.523H8.313a.25.25 0 0 1-.25-.25V3a.25.25 0 0 1 .25-.25zm1.42 18.5H8.313a.25.25 0 0 1-.25-.25v-7.977a.25.25 0 0 1 .25-.25H14.264a4.239 4.239 0 0 1 0 8.477z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M22.5.248h-7.637a1.25 1.25 0 0 0 0 2.5h1.086a.25.25 0 0 1 .211.384L4.78 21.017a.5.5 0 0 1-.422.231H1.5a1.25 1.25 0 0 0 0 2.5h7.637a1.25 1.25 0 0 0 0-2.5H8.051a.25.25 0 0 1-.211-.384L19.22 2.98a.5.5 0 0 1 .422-.232H22.5a1.25 1.25 0 0 0 0-2.5z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M23.75 12.952A1.25 1.25 0 0 0 22.5 11.7h-8.936a.492.492 0 0 1-.282-.09c-.722-.513-1.482-.981-2.218-1.432-2.8-1.715-4.5-2.9-4.5-4.863 0-2.235 2.207-2.569 3.523-2.569a4.54 4.54 0 0 1 3.081.764 2.662 2.662 0 0 1 .447 1.99v.3a1.25 1.25 0 1 0 2.5 0v-.268a4.887 4.887 0 0 0-1.165-3.777C13.949.741 12.359.248 10.091.248c-3.658 0-6.023 1.989-6.023 5.069 0 2.773 1.892 4.512 4 5.927a.25.25 0 0 1-.139.458H1.5a1.25 1.25 0 0 0 0 2.5h10.977a.251.251 0 0 1 .159.058 4.339 4.339 0 0 1 1.932 3.466c0 3.268-3.426 3.522-4.477 3.522-1.814 0-3.139-.405-3.834-1.173a3.394 3.394 0 0 1-.65-2.7 1.25 1.25 0 0 0-2.488-.246A5.76 5.76 0 0 0 4.4 21.753c1.2 1.324 3.114 2 5.688 2 4.174 0 6.977-2.42 6.977-6.022a6.059 6.059 0 0 0-.849-3.147.25.25 0 0 1 .216-.377H22.5a1.25 1.25 0 0 0 1.25-1.255z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M22.5 21.248h-21a1.25 1.25 0 0 0 0 2.5h21a1.25 1.25 0 0 0 0-2.5zM1.978 2.748h1.363a.25.25 0 0 1 .25.25v8.523a8.409 8.409 0 0 0 16.818 0V3a.25.25 0 0 1 .25-.25h1.363a1.25 1.25 0 0 0 0-2.5H16.3a1.25 1.25 0 0 0 0 2.5h1.363a.25.25 0 0 1 .25.25v8.523a5.909 5.909 0 0 1-11.818 0V3a.25.25 0 0 1 .25-.25H7.7a1.25 1.25 0 1 0 0-2.5H1.978a1.25 1.25 0 0 0 0 2.5z"
            ></path>
          </svg>
        </button>

        <button
          @click="commands.horizontal_rule"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path pid="0" d="M5 13a1 1 0 010-2h14a1 1 0 010 2H5z"></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M9.147 21.552a1.244 1.244 0 0 1-.895-.378L.84 13.561a2.257 2.257 0 0 1 0-3.125l7.412-7.613a1.25 1.25 0 0 1 1.791 1.744l-6.9 7.083a.5.5 0 0 0 0 .7l6.9 7.082a1.25 1.25 0 0 1-.9 2.122zM14.854 21.552a1.25 1.25 0 0 1-.9-2.122l6.9-7.083a.5.5 0 0 0 0-.7l-6.9-7.082a1.25 1.25 0 0 1 1.791-1.744l7.411 7.612a2.257 2.257 0 0 1 0 3.125l-7.412 7.614a1.244 1.244 0 0 1-.89.38zm6.514-9.373z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M22.5.248H7.228a6.977 6.977 0 1 0 0 13.954h2.318a.25.25 0 0 1 .25.25V22.5a1.25 1.25 0 0 0 2.5 0V3a.25.25 0 0 1 .25-.25h3.682a.25.25 0 0 1 .25.25v19.5a1.25 1.25 0 0 0 2.5 0V3a.249.249 0 0 1 .25-.25H22.5a1.25 1.25 0 0 0 0-2.5zM9.8 11.452a.25.25 0 0 1-.25.25H7.228a4.477 4.477 0 1 1 0-8.954h2.318A.25.25 0 0 1 9.8 3z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <circle pid="0" cx="2.5" cy="3.998" r="2.5"></circle>
            <path pid="1" d="M8.5 5H23a1 1 0 0 0 0-2H8.5a1 1 0 0 0 0 2z"></path>
            <circle pid="2" cx="2.5" cy="11.998" r="2.5"></circle>
            <path pid="3" d="M23 11H8.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2z"></path>
            <circle pid="4" cx="2.5" cy="19.998" r="2.5"></circle>
            <path pid="5" d="M23 19H8.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2z"></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M7.75 4.5h15a1 1 0 0 0 0-2h-15a1 1 0 0 0 0 2zM22.75 11h-15a1 1 0 1 0 0 2h15a1 1 0 0 0 0-2zM22.75 19.5h-15a1 1 0 0 0 0 2h15a1 1 0 0 0 0-2zM2.212 17.248a2 2 0 0 0-1.933 1.484.75.75 0 1 0 1.45.386.5.5 0 1 1 .483.63.75.75 0 1 0 0 1.5.5.5 0 1 1-.482.635.75.75 0 1 0-1.445.4 2 2 0 1 0 3.589-1.648.251.251 0 0 1 0-.278 2 2 0 0 0-1.662-3.111zM4.25 10.748a2 2 0 0 0-4 0 .75.75 0 0 0 1.5 0 .5.5 0 0 1 1 0 1.031 1.031 0 0 1-.227.645L.414 14.029A.75.75 0 0 0 1 15.248h2.5a.75.75 0 0 0 0-1.5h-.419a.249.249 0 0 1-.195-.406L3.7 12.33a2.544 2.544 0 0 0 .55-1.582zM4 5.248h-.25A.25.25 0 0 1 3.5 5V1.623A1.377 1.377 0 0 0 2.125.248H1.5a.75.75 0 0 0 0 1.5h.25A.25.25 0 0 1 2 2v3a.25.25 0 0 1-.25.25H1.5a.75.75 0 0 0 0 1.5H4a.75.75 0 0 0 0-1.5z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M18.559 3.932a4.942 4.942 0 1 0 0 9.883 4.609 4.609 0 0 0 1.115-.141.25.25 0 0 1 .276.368 6.83 6.83 0 0 1-5.878 3.523 1.25 1.25 0 0 0 0 2.5 9.71 9.71 0 0 0 9.428-9.95V8.873a4.947 4.947 0 0 0-4.941-4.941zM6.236 3.932a4.942 4.942 0 0 0 0 9.883 4.6 4.6 0 0 0 1.115-.141.25.25 0 0 1 .277.368 6.83 6.83 0 0 1-5.878 3.523 1.25 1.25 0 0 0 0 2.5 9.711 9.711 0 0 0 9.428-9.95V8.873a4.947 4.947 0 0 0-4.942-4.941z"
            ></path>
          </svg>
        </button>

        <button
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M9.147 21.552a1.244 1.244 0 0 1-.895-.378L.84 13.561a2.257 2.257 0 0 1 0-3.125l7.412-7.613a1.25 1.25 0 0 1 1.791 1.744l-6.9 7.083a.5.5 0 0 0 0 .7l6.9 7.082a1.25 1.25 0 0 1-.9 2.122zM14.854 21.552a1.25 1.25 0 0 1-.9-2.122l6.9-7.083a.5.5 0 0 0 0-.7l-6.9-7.082a1.25 1.25 0 0 1 1.791-1.744l7.411 7.612a2.257 2.257 0 0 1 0 3.125l-7.412 7.614a1.244 1.244 0 0 1-.89.38zm6.514-9.373z"
            ></path>
          </svg>
        </button>

        <button
          @click="commands.undo"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M17.786 3.77a12.542 12.542 0 0 0-12.965-.865.249.249 0 0 1-.292-.045L1.937.269A.507.507 0 0 0 1.392.16a.5.5 0 0 0-.308.462v6.7a.5.5 0 0 0 .5.5h6.7a.5.5 0 0 0 .354-.854L6.783 5.115a.253.253 0 0 1-.068-.228.249.249 0 0 1 .152-.181 10 10 0 0 1 9.466 1.1 9.759 9.759 0 0 1 .094 15.809 1.25 1.25 0 0 0 1.473 2.016 12.122 12.122 0 0 0 5.013-9.961 12.125 12.125 0 0 0-5.127-9.9z"
            ></path>
          </svg>
        </button>

        <button
          @click="commands.redo"
          class="border border-gray-900 rounded align-middle p-1 m-1"
        >
          <svg
            version="1.1"
            viewBox="0 0 24 24"
            class="w-5 p-1 svg-icon svg-fill"
          >
            <path
              pid="0"
              d="M22.608.161a.5.5 0 0 0-.545.108L19.472 2.86a.25.25 0 0 1-.292.045 12.537 12.537 0 0 0-12.966.865A12.259 12.259 0 0 0 6.1 23.632a1.25 1.25 0 0 0 1.476-2.018 9.759 9.759 0 0 1 .091-15.809 10 10 0 0 1 9.466-1.1.25.25 0 0 1 .084.409l-1.85 1.85a.5.5 0 0 0 .354.853h6.7a.5.5 0 0 0 .5-.5V.623a.5.5 0 0 0-.313-.462z"
            ></path>
          </svg>
        </button>
      </div>
    </EditorMenuBar>

    <div class="p-2">
      <editor-content :editor="editor" class="p-1 w-full prose xl:prose-xl">
      </editor-content>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  HorizontalRule,
} from 'tiptap-extensions';

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  props: {
    value: {
      type: String,
    },
    editable: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  watch: {
    value(val) {
      this.editor.content = val;
    },
  },

  data() {
    return {
      editor: new Editor({
        editable: this.editable,
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3, 4] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new HorizontalRule(),
        ],
        content: this.value,
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
          this.$emit('input', this.html);
        },
      }),
      html: '',
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
