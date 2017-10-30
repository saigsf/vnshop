<template>
<el-container>
<el-header>
<el-row :gutter="40" type="flex" justify="center">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="1">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="2">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="3">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="4">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="5">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="6">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item>
            <!-- <el-menu-item class="el-col el-col-24 el-col-xs-3 el-col-sm-3 el-col-md-3 el-col-lg-3 el-col-xl-3" index="7">
                <el-row :gutter="20" type="flex" justify="center">处理1</el-row>
            </el-menu-item> -->
            <!-- <el-menu-item index="7">处理中心</el-menu-item> -->
        
    </el-menu>
</el-row>
</el-header>
</el-container>
</template>

<script>
export default {
    name: 'NavMy',
    data () {
        return {
        activeIndex: '1'
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
