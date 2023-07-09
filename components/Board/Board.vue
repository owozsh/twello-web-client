<template>
  <div>
    <h3 class="ml-6 text-lg font-bold mb-6">My Board</h3>
    <ClientOnly>
      <div class="flex">
        <Container
          @drop="onDrop"
          @drag-enter="onDragEnter"
          @drag-leave="onDragEnter"
          orientation="horizontal"
          group-name="columns"
          :get-child-payload="getChildPayload"
        >
          <Draggable
            v-for="(column, i) in columns"
            :key="column.id"
            group-name="columns"
          >
            <div
              class="group/column bg-base-100 mr-4 pt-4 rounded-lg outline-1 outline outline-base-50 -outline-offset-2 shadow-sm border border-solid border-base-300 cursor-pointer active:cursor-grabbing"
            >
              <p class="text-sm ml-6 mb-3 text-base-800">
                {{ column.title }}
              </p>
              <Container @drop="onDrop" group-name="cards">
                <Draggable
                  v-for="(card, i) in column.cards"
                  :key="card.id"
                  group-name="cards"
                  class="p-2 pt-0"
                >
                  <div
                    class="group flex items-center justify-between text-base-800 text-sm shadow-sm cursor-pointer active:cursor-grabbing w-60 rounded-lg bg-base-50 border border-solid border-base-300 p-4 mb-1 max-h-12"
                  >
                    <p class="truncate ... overflow-hidden">
                      {{ card.title }}
                    </p>
                    <button
                      class="hover:bg-base-100 hidden group-hover:flex items-center p-2 border border-solid border-transparent hover:border-base-200 rounded-md translate-x-2"
                    >
                      <span class="i-mdi-favorite-border"></span>
                    </button>
                  </div>
                </Draggable>
              </Container>
              <div class="hidden group-hover/column:flex p-2 pt-0">
                <button
                  class="text-base-600 flex items-center transition-all pl-4 text-sm cursor-pointer w-60 rounded-lg hover:bg-base-200 border border-solid border-transparent hover:border-base-300 p-2 mb-1"
                >
                  <span class="i-mdi-plus mr-3"> </span>
                  Add Card
                </button>
              </div>
            </div>
          </Draggable>
        </Container>
        <button
          class="text-base-600 h-12 flex items-center pl-4 transition-all text-sm cursor-pointer w-60 rounded-lg p-2 mb-1 hover:bg-base-200 border border-solid border-transparent hover:border-base-300"
        >
          <span class="i-mdi-plus mr-3"> </span>
          Add Column
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts">
import { Container, Draggable } from "vue3-smooth-dnd";
import { getBoard } from "~/lib/services/boards";

export default {
  name: "app",
  components: { Container, Draggable },
  data() {
    const board = getBoard("0");

    return {
      title: board.title,
      columns: board.columns,
    };
  },
  methods: {
    onDrop(dropResult) {
      console.log(dropResult);

      this.columns = this.applyDrag(this.columns, dropResult);
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
  },
};
</script>
../../lib/services/boards.js
