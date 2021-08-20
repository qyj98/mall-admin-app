<template>
  <div class="product-list-container">
    <!-- 内联检索表单 -->
    <Search @submit="handleSubmit" :categoryList="categoryList" />
    <!-- 商品列表table -->
    <ProductTable
      :formData="formList"
      :page="pageInfo"
      @changePage="handleChangePage"
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
      categoryList: [],
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductTable,
  },
  methods: {
    // async getTableData(){
    // },
    //  点击搜索后重新获取数据,传递仓库中的关键字
    async handleSubmit(searchForm, callback) {
      const resp = await api.getProducts(
        1,
        10,
        searchForm.searchWord,
        searchForm.category,
      );
      this.formList = resp.data;
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pageInfo.total = resp.total;
      this.searchFormList = searchForm;
      this.pageInfo.current = 1;
      callback(false);
    },
    // 页码变化时重新获取数据
    async handleChangePage(page) {
      this.pageInfo = page;
      const resp = await api.getProducts(
        page.current,
        page.pageSize,
        this.searchFormList.searchWord,
        this.searchFormList.category,
      );
      this.formList = resp.data;
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pageInfo.total = resp.total;
    },
  },
  // 进入页面获取全部数据
  async created() {
    // ?先获取类目数据,作为search组件的属性传递给她
    const resp = await api.getCategory();
    this.categoryList = resp.data;
    resp.data.forEach((item) => {
      this.categoryObj[item.id] = item;
    });
    const allData = await api.getProducts();
    this.formList = allData.data;
    this.pageInfo.total = allData.total;
    // ?将类目名映射后传递过来添加到产品列表的每一项数据中
    this.formList = this.formList.map((item) => ({
      ...item,
      categoryName: this.categoryObj[item.category].name,
    }));
  },
};
</script>
