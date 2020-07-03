<template>
    
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="编号" prop="num">
    <el-input  v-model="ruleForm.num" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="价格名" prop="name">
    <el-input v-model.number="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          num: '',
          name: ''
        },
        rules: {
          num: [
            //   {requied: true, message: "请输入编号", trigger: "blur",validator: isIntgeter, trigger: "blue"}
          ],
          name: [
            //   {requied: true, message: "请输入价格名称", trigger: "blur"}
          ]
          
        }
      };
    },

    methods: {

      submitForm(formName) {
        // 做数据请求
        this.$axios({
            url:'http://127.0.0.1:8000/price/' + this.ruleForm.num,
            method:'put',
            data: {
                'id': Number(this.ruleForm.num),
                'name': this.ruleForm.name.toString()
            }
        }).then(response=>{
            window.location.reload()
            // 这里可以做返回值显示处理
            alert(response.data.status)
        }).catch(error=>{
          // 请求的异常展示处理
            alert(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>