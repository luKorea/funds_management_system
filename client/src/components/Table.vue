<template>
    <div>
        <el-table
                v-if="list.length > 0"
                :data='list'
                max-height="600"
                border
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="收支类型"
                    align='center'
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="describe"
                    label="收支描述"
                    align='center'
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="income"
                    label="收入"
                    align='center'
                    width="170">
                <template slot-scope="scope">
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="expend"
                    label="支出"
                    align='center'
                    width="170">
                <template slot-scope="scope">
                    <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cash"
                    label="账户现金"
                    align='center'
                    width="170">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="220">
            </el-table-column>
            <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="180">
                <template slot-scope='scope'>
                    <el-button
                            type="warning"
                            icon='edit'
                            size="small"
                            @click='onEditMoney(scope.row)'
                    >编辑</el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="small"
                            @click='onDeleteMoney(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props:{
            list: Array,
            dialog: Object,
            form: Object
        },
        methods:{
            /* 获取数据 */
            getProfile() {
                this.$axios.get('/api/profile')
                    .then(response=>{
                        this.list= response.data;
                    })
                    .catch(error=>console.log(error))
            },
            /* 添加数据 */
            handleAdd() {
                this.dialog ={
                    show: true,
                    title:'添加资金信息',
                    option:'add'
                };
                this.form={
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                };
            },
            /* 编辑数据 */
            onEditMoney(row) {
                // 编辑
                this.dialog = {
                    show: true,
                    title: "修改资金信息",
                    option: "edit"
                };
                this.form = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                };
            },
            /* 删除数据 */
            onDeleteMoney(row,index) {
                this.$confirm('您确定要删除此数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/api/profile/delete/${row._id}`)
                        .then(response => {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            // 刷新页面
                            this.getProfile();
                        })
                })
            }
        },
        created() {
            this.getProfile();
        }
    }
</script>

<style scoped>

</style>