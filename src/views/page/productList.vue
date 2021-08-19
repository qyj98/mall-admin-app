<template>
  <div class="product-list-container">
    <!-- 内联检索表单 -->
    <Search @submit="handleSubmit"/>
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import * as api from '@/api/product';

export default {
  data() {
    return {
      formList: {},
    };
  },
  components: {
    Search,
  },
  methods: {
    async handleSubmit(searchForm) {
      console.log(searchForm);
      const resp = await api.getProducts(
        searchForm.searchWord,
        searchForm.category,
      );
      console.log(resp);
    },
  },
};
</script>
