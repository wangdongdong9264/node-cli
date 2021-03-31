module.exports = {
  vue3Template: compoenntName => {
    return `<template>
  <div class="${compoenntName}">
    test
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup(prosp, ctx) {
    const router = useRouter();
    const route = useRoute();
    const queryID = (route.params as any).id;
    const id = ref(queryID);

    const formData = reactive({
      status: 7
    });
    watch(
      () => formData.status,
      (count, prevCount) => {
      //  code
      });
    const onClickLeft = () => {
      router.back();
    };
    const onSubmit = () => {
      const data = {
        name: formData.status
      };
      ctx.emit("sub", data);
    };
    return {
      onClickLeft,
      id,
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped></style>`
  }
}
