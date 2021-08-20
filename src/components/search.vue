<template>
  <div class="secrch-container">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <!-- 商品信息搜索框 -->
      <a-form-model-item class="searchInp" label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <!-- 商品类目选择框 -->
      <a-form-model-item label="商品类目">
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
        <a-button type="primary" html-type="submit">
          {{ isLoading ? "搜索中..." : "搜索" }}
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
      isLoading: false,
    };
  },
  props: {
    categoryList: {
      require: true,
      default: [],
    },
  },
  methods: {
    handleChange(val) {
      this.searchForm.category = val;
    },
    // 提交后表单搜索信息保存到仓库中
    handleSubmit() {
      this.isLoading = true;
      this.$emit('submit', this.searchForm, (res) => {
        this.isLoading = res;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.secrch-container {
  margin-left: 40px;
  .searchInp {
    margin-right: 40px;
  }
}
</style>
