<template>
    <div class="pagination">
        <el-row>
            <el-col :span="24">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:{paginations:Object},
        methods: {
            handleSizeChange(page_size) {
                this.$emit('handleSizeChange',page_size);
            },
            handleCurrentChange(page) {
                this.$emit('handleCurrentChange',page);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .pagination
        float right
        padding 20px

</style>