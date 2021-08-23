<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="折扣价格" prop="price_off">
        <a-input v-model="form.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" />
      </a-form-model-item>
      <!-- 图片上传 -->
      <a-form-model-item label="商品相册" prop="images">
        <!-- name="avatar对应图片上传接口必传参数中的avatar字段 -->
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.login.user.appkey
          "
          name="avatar"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-model-item>
      <a-button type="primary" @click="prev"> 上一步 </a-button>
      <a-button style="margin: 20px 10px" @click="next"> 提交 </a-button>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      rules: {},
    };
  },
  props: ['form'],
  // 处理图片列表对象，添加一些其他属性
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    // ?{ file, fileList，event }是change事件返回的数据，一个对象
    // 上传图片后触发事件，将图片保存到images中
    handleChange({ file, fileList }) {
    //   console.log(file, fileList, event);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      //  已上传的文件列表
      this.fileList = fileList;
    },
    handleCancel() {
      this.previewVisible = false;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form);
          console.log('提交了');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    prev() {
      this.$emit('handlePrev', this.form);
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
  },
};
</script>
