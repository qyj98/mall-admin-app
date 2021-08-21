<template>
  <a-table
    :columns="columns"
    :data-source="list"
    :pagination="page"
    @change="handleChangePage"
  >
    <template slot="operation" slot-scope="text, record">
      <div>
        <button class="btn" @click="editProduct(text, record)">编辑</button>
        <button class="btn" @click="showConfirm(text, record)">删除</button>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: '_id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status', // ?该列下的数据索引自data-source中的status属性的值
    key: 'status',
    customRender: (text, record) => (record.status === 1 ? '上架' : '下架'), // ?修改列渲染
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  props: {
    formData: {
      type: Array,
      require: true,
    },
    page: {
      require: true,
    },
  },
  data() {
    return {
      columns,
    };
  },
  computed: {
    list() {
      return this.formData.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    handleChangePage(page) {
      this.$emit('changePage', page);
    },
    showConfirm(text, record) {
      // console.log(text, record);
      this.$confirm({
        title: `确认删除商品${record.id}？`,
        content: `${record.title}`,
        onOk: () => {
          this.$emit('delete', record.id);
        },
        onCancel() {},
      });
    },
    editProduct(text, record) {
      this.$emit('edit', record);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  cursor: pointer;
}
</style>
