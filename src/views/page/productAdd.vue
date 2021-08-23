<template>
  <div class="product-add-container">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicForm v-if="current === 0" :form="form" @handleNext="next" />
      <SaleForm
        v-else-if="current === 1"
        :form="form"
        @handlePrev="prev"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>
<script>
import BasicForm from '@/components/basicForm.vue';
import SaleForm from '@/components/saleForm.vue';
import * as api from '@/api/product';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Last-content',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
        status: 1,
      },
    };
  },
  components: {
    BasicForm,
    SaleForm,
  },
  methods: {
    next(basicFormInfo) {
      this.current += 1;
      // form更新
      this.form = {
        ...this.form,
        ...basicFormInfo,
      };
    },
    prev() {
      this.current -= 1;
    },
    async handleSubmit(allForm) {
      await api.addProduct(allForm);
      this.$router.push({
        name: 'ProductList',
      });
    //   console.log(allForm);
    },
  },
};
</script>
<style scoped>
.product-add-container {
  width: 50%;
  margin: 20px auto;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>
