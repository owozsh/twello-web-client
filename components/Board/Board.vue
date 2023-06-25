<template>
  <div>
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
    <ClientOnly>
      <Container
        @drop="onDrop"
        orientation="horizontal"
        group-name="columns"
        :get-child-payload="getChildPayload"
      >
        <Draggable
          v-for="(column, i) in columns"
          :key="column.id"
          group-name="columns"
        >
          <div class="mr-4">
            {{ column.title }}
            <Container @drop="onDrop" group-name="cards">
              <Draggable
                v-for="(card, i) in column.cards"
                :key="card.id"
                group-name="cards"
              >
                <div class="bg-base-50 border border-solid border-base-300 p-4">
                  {{ card.title }}
                </div>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
    </ClientOnly>
  </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { getBoard } from "../../lib/api/boards.ts";

export default {
  name: "app",
  components: { Container, Draggable },
  data() {
    const board = getBoard(0);

    console.log(board.columns);

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
