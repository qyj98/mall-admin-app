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
    // async getTableData(){
    //     const resp = await api.getProducts(
    //     page.current,
    //     page.pageSize,
    //     this.searchFormList.searchWord,
    //     this.searchFormList.category,
    //   );
    //   this.formList = resp.data;
    //   // ?每次获取数据后都要进行处理
    //   this.formList = this.formList.map((item) => ({
    //     ...item,
    //     categoryName: this.categoryObj[item.category].name,
    //   }));
    //   this.pageInfo.total = resp.total;
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
      // ?处理传递给子组件的formData数据，给每个对象添加categoryName属性，修改列表显示数据-类目
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name, // ?给传递过去的表格数据每一项都添加类目名字
      }));
      this.pageInfo.total = resp.total;
      this.searchFormList = searchForm;
      this.pageInfo.current = 1;
      callback(false);
    },
    async handleChangePage(page) {
      // 页码变化时重新获取数据
      this.pageInfo = page;
      const resp = await api.getProducts(
        page.current,
        page.pageSize,
        this.searchFormList.searchWord,
        this.searchFormList.category,
      );
      this.formList = resp.data;
      // ?每次获取数据后都要进行处理
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pageInfo.total = resp.total;
      // 在事件总线上触发一个事件，告诉Home组件翻页了，滚动条要回到顶部
      this.$bus.$emit('scrollToTop', 0);
    },
    async handleDelete(id) {
      await api.deleteProduct(id);
      const resp = await api.getProducts(
        this.pageInfo.current,
        this.pageInfo.pageSize,
        this.searchFormList.searchWord,
        this.searchFormList.category,
      );
      this.formList = resp.data;
      // ?每次获取数据后都要进行处理
      this.formList = this.formList.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.pageInfo.total = resp.total;
    },
    handleEidt(rowInfo) {
      this.$router.push({
        name: 'ProductEidt',
      });
      console.log(rowInfo);
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
    const allData = await api.getProducts();
    this.formList = allData.data;
    this.pageInfo.total = allData.total;
    // ?每次获取数据后都要进行处理
    this.formList = this.formList.map((item) => ({
      ...item,
      categoryName: this.categoryObj[item.category].name,
    }));
  },
};
</script>
