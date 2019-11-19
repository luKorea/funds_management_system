<template>
    <div class="fillContain">
        <div>
            <!--筛选添加功能-->
            <el-row>
                <el-col :span="12"><!--筛选-->
                    <el-form
                            :inline="true"
                            :model='search_data' >
                        <el-form-item label="投标时间筛选:">
                            <el-date-picker
                                    v-model="search_data.startTime"
                                    type="datetime"
                                    placeholder="选择开始时间">
                            </el-date-picker> --
                            <el-date-picker
                                    v-model="search_data.endTime"
                                    type="datetime"
                                    placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size ="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <!--添加-->
                    <el-form :inline="true" ref="add_data">
                        <el-form-item class="btnRight">
                            <el-button type='primary' size="small" icon="view" @click="handleAdd()"  v-if="user.identity === 'boss'">添加</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!--table表格-->
        <div class="table_container">
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
                        v-if="user.identity === 'boss'"
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
            <!--分页-->
            <Pagination :paginations="paginations"
                        @handleSizeChange="handleSizeChange"
                        @handleCurrentChange="handleCurrentChange"
            ></Pagination>
        </div>
        <!--对话框-->
        <Dialog :dialog="dialog"
                :form="form"
                @update="getProfile"
        ></Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog'
    import Pagination from '../components/Pagination'
    export default {
        name: "FundList",
        components:{Dialog,Pagination},
        computed:{
            /* 用户权限配置 */
            user() {
                return this.$store.getters.user;
            }
        },
        data() {
            return {
                search_data:{
                    startTime: '',
                    endTime: ''
                },
                filterTableData:[], // 筛选表格数据
                list:[],
                tableData:[],
                form:{
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
                dialog: {show: false,title:'',option: 'edit'},
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                }
            }
        },
        methods:{
            /* 获取数据 */
            getProfile() {
                this.$axios.get('/api/profile')
                    .then(response=>{
                        this.tableData= response.data;
                        this.filterTableData = response.data;
                        // 设置分页数据
                        this.setPaginations();
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
            onDeleteMoney(row) {
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
            },
            /*当前页的改变 */
            handleCurrentChange(page) {
                // 当前页
                let sortnum = this.paginations.page_size * (page - 1);
                let table = this.tableData.filter((item, index) => {
                    return index >= sortnum;
                });
                // 设置默认分页数据
                this.list = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            /* 改变每页条数 */
            handleSizeChange(page_size) {
                // 切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.list = this.tableData.filter((item, index) => {
                    return index < page_size;
                });
            },
            /*设置分页*/
            setPaginations() {
                // 总页数
                this.paginations.total = this.tableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                // 设置默认分页数据
                this.list = this.tableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            /* 筛选 */
            onScreeoutMoney() {
                // 筛选
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getProfile();
                    return;
                }
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();
                this.tableData = this.filterTableData.filter(item => {
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                });
                // 分页数据
                this.setPaginations();
            }

        },
        created() {
            this.getProfile();
        }
    }
</script>

<style scoped lang="stylus">
    .fillContain
        width 100%
        height 100%
        padding 16px
        box-sizing border-box
        .btnRight
            float right
</style>