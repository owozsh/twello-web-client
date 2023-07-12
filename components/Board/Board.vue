<script setup lang="ts">
import { BoardRes } from "~/lib/store/board";
import { useUserStore } from "~/lib/store/user";

const store = useBoardStore();

store.get_board();

const bgColor = store.$state.board?.metadata?.background_color || "#F7F7F7";
</script>

<script lang="ts">
import { Container, Draggable } from "vue3-smooth-dnd";
import { useBoardStore } from "~/lib/store/board";
import { Board } from "~/lib/types/board";
export default {
  name: "app",
  components: { Container, Draggable },
  data() {},
  methods: {
    onDrop(dropResult: any) {
      const store = useBoardStore();

      store.update_board({
        ...store.$state.board,
        columns: this.applyDrag(store.$state.board.columns, dropResult),
      });
    },
    onCardDrop(dropResult: any, columnId: string) {
      const store = useBoardStore();

      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const _board = {
          ...store.$state.board,
        };
        const _column = _board.columns.filter((p) => p.id === columnId)[0];
        const columnIndex = _board.columns.indexOf(_column);

        const newColumn = {
          ..._column,
        };

        newColumn.cards = this.applyDrag(newColumn.cards, dropResult);
        _board.columns.splice(columnIndex, 1, newColumn);

        store.update_board(_board);
      }
    },

    applyDrag(
      arr: any,
      dropResult: {
        removedIndex: number | null;
        addedIndex: number | null;
        payload?: {
          columnId: string;
          cardId: string;
          cardIndex: number;
        };
      }
    ) {
      const { addedIndex, removedIndex, payload } = dropResult;

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

<style>
.board_bg_color {
  background-color: v-bind(bgColor);
}
</style>

<template>
  <div class="flex board_bg_color">
    <Container @drop="onDrop" orientation="horizontal" group-name="columns">
      <Draggable
        v-for="(column, i) in store.board.columns"
        :key="column.id"
        group-name="columns"
      >
        <div
          class="w-72 group/column bg-base-100 mr-4 pt-4 rounded-lg outline-1 outline outline-base-50 -outline-offset-2 shadow-sm border border-solid border-base-300 cursor-pointer active:cursor-grabbing"
        >
          <div class="flex items-center justify-between px-4 mb-2">
            <input
              class="bg-transparent text-sm px-1 text-base-800"
              :value="column.title"
              @input="
                (e) => store.update_column_title(column.id, e.target.value)
              "
              @keydown.esc="($event.target as HTMLInputElement).blur()"
            />
            <button
              class="cursor-default rounded-md hover:bg-base-200 p-2"
              v-on:click="() => store.delete_column(column.id)"
            >
              <span class="i-mdi-trash-can"></span>
            </button>
          </div>

          <Container
            @drop="onCardDrop($event, column.id)"
            group-name="cards"
            :get-child-payload="(e) => store.$state.board.columns[i].cards[e]"
          >
            <Draggable
              v-for="(card, i) in column.cards"
              :key="card?.id"
              group-name="cards"
              class="p-2 pt-0"
            >
              <div
                class="w-full group flex items-center justify-between text-base-800 text-sm shadow-sm cursor-pointer active:cursor-grabbing rounded-lg bg-base-50 border border-solid border-base-300 p-4 mb-1 max-h-12"
              >
                <input
                  class="bg-transparent text-sm px-1 text-base-800 truncate ... overflow-hidden w-full cursor-pointer focus:cursor-text active:cursor-grabbing"
                  :value="card?.title"
                  @input="
                    (e) =>
                      store.update_card_title(
                        column.id,
                        card.id,
                        e.target.value
                      )
                  "
                  @keydown.esc="($event.target as HTMLInputElement).blur()"
                />
              </div>
            </Draggable>
          </Container>
          <div class="hidden group-hover/column:flex p-2 pt-0">
            <button
              v-on:click="() => store.add_card(column.id)"
              class="w-full cursor-default text-base-600 flex items-center transition-all pl-4 text-sm rounded-lg hover:bg-base-200 border border-solid border-transparent hover:border-base-300 p-2 mb-1"
            >
              <span class="i-mdi-plus mr-3"> </span>
              Add Card
            </button>
          </div>
        </div>
      </Draggable>
    </Container>
    <button
      v-on:click="store.add_column"
      class="cursor-default text-base-600 h-12 flex items-center pl-4 transition-all text-sm w-60 rounded-lg p-2 mb-1 hover:bg-base-200 border border-solid border-transparent hover:border-base-300"
    >
      <span class="i-mdi-plus mr-3"> </span>
      Add Column
    </button>
  </div>
</template>
