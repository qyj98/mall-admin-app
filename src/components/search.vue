<template>
  <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <!-- 商品信息搜索框 -->
    <a-form-model-item lable="检索关键字">
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
      </a-input>
    </a-form-model-item>
    <!-- 商品类目选择框 -->
    <a-form-model-item lable="商品类目">
      <a-select
        allowClear
        show-search
        placeholder="请选择商品类目"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- 搜索按钮 -->
    <a-form-model-item>
      <a-button type="primary" html-type="submit"> 搜索 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import * as api from '@/api/product';

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    //   console.log('提交了');
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
  created() {
    //   获取类目信息
    api.getCategory().then((r) => {
      this.categoryList = r.data;
    });
  },
};
</script>
