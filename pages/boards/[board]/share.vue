<script setup lang="ts">
import { Maintainer } from "~/lib/services/user/types";
import { useUserStore } from "~/lib/store/user";

const config = useRuntimeConfig();
const { auth_token, user } = useUserStore();

const route = useRoute();

const { data: maintainers, refresh } = useFetch<Maintainer[]>(
  `board/${route.params.board}/maintainers`,
  {
    method: "GET",
    baseURL: config.public.baseURL,
    headers: {
      authorization: auth_token || "",
    },
  }
);

definePageMeta({
  middleware: ["auth"],
});
</script>

<script lang="ts">
export default {
  data() {
    return {
      email: "",
      can_edit: false,
    };
  },
  methods: {
    async invite() {
      const route = useRoute();
      const config = useRuntimeConfig();
      const { auth_token } = useUserStore();

      await useFetch(`board/${route.params.board}/share`, {
        method: "POST",
        body: {
          userEmail: this.email,
          canEdit: this.can_edit,
        },
        baseURL: config.public.baseURL,
        headers: {
          authorization: auth_token || "",
        },
      });
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col mx-14 gap-8 items-center justify-center w-full h-full pb-72"
  >
    <div class="flex flex-col w-80 gap-3">
      <h3 class="ml-2">Invite Users</h3>
      <form
        class="flex flex-col gap-2"
        @submit.prevent="
          async () => {
            await invite();
            email = '';
            refresh();
          }
        "
      >
        <div class="flex gap-2">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="E-Mail"
          />
          <button type="submit" class="bg-primary rounded-md w-14 btn-hover">
            <span class="i-mdi-add text-base-50" />
          </button>
        </div>
        <div class="ml-2 flex gap-2">
          <input id="can_edit" type="checkbox" v-model="can_edit" />
          <label for="can_edit">Can Edit</label>
        </div>
      </form>
      <hr class="w-full" />
      <ul class="flex flex-col gap-2 mb-4">
        <li
          class="flex items-center gap-2 p-1"
          v-for="maintainer in maintainers"
          :key="maintainer.id"
        >
          <span v-if="maintainer.userId === user?.id" class="i-mdi-crown" />
          <span v-else-if="maintainer.canEdit" class="i-mdi-pencil" />
          <span v-else="maintainer.canEdit" class="i-mdi-eye" />
          {{ maintainer.email }}
        </li>
      </ul>
      <NuxtLink :to="`/boards/${route.params.board}`">
        <button
          class="w-full flex items-center justify-center gap-2 p-3 bg-base-200 hover:brightness-95 active:brightness-90 rounded-md transition-all"
        >
          <span class="i-mdi-arrow-left" />
          Back
        </button>
      </NuxtLink>
    </div>
  </div>
</template>
