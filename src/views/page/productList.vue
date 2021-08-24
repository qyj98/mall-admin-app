<template>
  <div class="product-list-container" ref="container">
    <!-- 内联检索表单 -->
    <Search @submit="handleSubmit" :categoryList="categoryList" />
    <!-- 商品列表table -->
    <ProductTable
      :formData="formList"
      :page="pageInfo"
      @changePage="handleChangePage"
      @delete="handleDelete"
      @edit="handleEidt"
    />
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import Search from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import * as api from '@/api/product';

export default {
  data() {
    return {
      formList: [],
      pageInfo: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      searchFormList: {
        searchWord: '',
        category: '',
      },
      categoryList: [], // ?[{id:1, name:水果},{id:1, name:水果}, ...]
      categoryObj: {}, // ?映射, {1: {id:1, name:水果}, 2: {id:1, name:水果}, ...}
    };
  },
  components: {
    Search,
    ProductTable,
  },
  methods: {
    async getTableData() {
      // ?获取表单数据
      const resp = await api.getProducts(
        this.pageInfo.current,
        this.pageInfo.pageSize,
        this.searchFormList.searchWord,
        this.searchFormList.category,
      );
      this.formList = resp.data;
      // ?获取数据后要进行处理 给每一项数据加上categoryName属性,修改表格的类目列
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pageInfo.total = resp.total;
    },
    async handleSubmit(searchForm, callback) {
      //  点击搜索后重新获取数据,传递过来仓库中的关键字
      this.pageInfo.current = 1;
      this.pageInfo.pageSize = 10;
      this.searchFormList = searchForm;
      this.getTableData();
      callback(false);
    },
    async handleChangePage(page) {
      // 页码变化时重新获取数据
      this.pageInfo = page;
      await this.getTableData();
      this.$bus.$emit('scrollToTop', 0);
    },
    async handleDelete(id) {
      await api.deleteProduct(id);
      // 获取表格数据
      this.getTableData();
    },
    handleEidt(rowInfo) {
      // 表格编辑
      this.$router.push({
        name: 'ProductEidt',
        params: {
          id: rowInfo.id,
        },
      });
      // console.log(rowInfo);
    },
  },
  // 进入页面获取全部数据
  async created() {
    // ?先获取类目数据,作为search组件的属性传递给她
    const resp = await api.getCategory();
    this.categoryList = resp.data;
    // console.log(this.categoryList);
    // ?获取了类目数据后做映射，把类目数组转化成对象，属性名为一个类目数据对象的id，值为一个类目数据对象整体
    resp.data.forEach((item) => {
      this.categoryObj[item.id] = item;
    });
    // console.log(this.categoryObj);
    // 获取表格数据
    this.getTableData();
  },
};
</script>
