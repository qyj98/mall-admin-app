<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="{ span: 5 }"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category">
      <a-select v-model="form.category" @change="changeCategory">
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select
        ref="item"
        v-model="form.c_items"
        prop="items"
        placeholder="请添加子类目"
      >
        <a-select-option :value="item" v-for="item in itemsList" :key="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" prop="tags">
      <a-select
        mode="tags"
        style="width: 100%"
        v-model="form.tags"
        placeholder="请选择标签"
        :default-value="['包邮，最晚次日达']"
      >
        <a-select-option value="包邮，最晚次日达">
          包邮，最晚次日达
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-button type="primary" @click="next"> 下一步 </a-button>
    <a-button style="margin: 20px 10px" @click="resetForm"> 重置 </a-button>
  </a-form-model>
</template>
<script>
import * as api from '../api/product';

export default {
  data() {
    return {
    //   labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      categoryList: [],
      itemsList: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入商品标签',
            trigger: 'blur',
          },
        ],
        desc: [
          {
            required: false,
          },
        ],
        category: [
          {
            required: true,
            message: '请选择类目',
            trigger: 'blur',
          },
        ],
        items: [
          {
            required: false,
          },
        ],
        tags: [
          {
            required: true,
            message: '请添加标签',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  props: ['form'],
  async created() {
    const resp = await api.getCategory();
    this.categoryList = resp.data;
  },
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('handleNext', this.form);
          return true;
        }
        console.log('error next!!');
        return false;
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.itemsList = this.categoryList[i].c_items;
        }
      }
    },
  },
};
</script>
