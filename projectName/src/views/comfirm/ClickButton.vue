<template>  
    <div>
     <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser()" :disabled="disp()">添加</el-button>
     <el-dialog title="添加 or 更新" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="80%">
     <comfirmBox-c></comfirmBox-c>
     </el-dialog>
     </div>
</template>

<script>
import ComfirmBox from './ComfirmBox.vue'
export default {
    data() {
      return {
        dialogTableVisible: false,
        }
    },
    components: {
        "comfirmBox-c": ComfirmBox
    },
    methods: {
        addUser(){
            this.dialogTableVisible=true;//默认页面不显示为false,点击按钮将这个属性变成true
        },
        disp(){
        }
    }
}
</script>

<style>

</style>