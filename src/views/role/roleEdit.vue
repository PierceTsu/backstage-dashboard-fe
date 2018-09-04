<template>
  <el-dialog :title="dialogProps.title" :visible.sync="dialogProps.visible" width="560px"
    @open="handleDialogOpen()" v-loading="loading">
    <div slot="title" class="dialog-header">{{ dialogProps.title }}</div>
    <el-form :model="roleModel" :rules="formRules"
      ref="roleForm" label-width="80px" label-position="right" size="small">
      <el-form-item label="角色名称" prop="roleName">
        <el-col :span="16">
          <el-input ref="roleName" :maxlength="16" v-model="roleModel.roleName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="roleModel.locked"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm('roleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/role'

export default {
  name: 'role-edit',
  data () {
    return {
      loading: false,
      roleModel: {
        id: 0,
        roleName: '',
        locked: false
      },
      dialogProps: {
        visible: false,
        action: '',
        title: ''
      },
      formRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogProps.action === 'add') {
            this.doSaveRole()
          } else {
            this.doUpdateRole()
          }
        } else {
          return false
        }
      })
    },
    doUpdateRole () {
      this.loading = true
      updateRole(this.roleModel)
        .then(response => {
          this.loading = false
          this.dialogProps.visible = false
          if (response.status) {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'warning'
            })
          } else {
            this.$emit('save-finished')
          }
        })
        .catch(error => {
          this.outputError(error)
        })
    },
    doSaveRole () {
      this.loading = true
      addRole(this.roleModel)
        .then(response => {
          this.loading = false
          this.dialogProps.visible = false
          if (response.status) {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'warning'
            })
          } else {
            this.$emit('save-finished')
          }
        })
        .catch(error => {
          this.outputError(error)
        })
    },
    handleDialogClose () {
      this.dialogProps.visible = false
    },
    handleDialogOpen () {
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
        this.$refs['roleName'].focus()
      })
    },
    outputError (error) {
      console.log(error.response ? error.response : error.message)
      this.loading = false
      this.$message({
        showClose: true,
        message: '出错了',
        type: 'error'
      })
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$on('openEditRoleDialog', function (role) {
        this.roleModel = role
        this.dialogProps.action = 'edit'
        this.dialogProps.title = '修改角色'
        this.dialogProps.visible = true
      })
      this.$on('openAddRoleDialog', function () {
        this.dialogProps.action = 'add'
        this.dialogProps.title = '添加角色'
        this.roleModel = {
          locked: false
        }
        this.dialogProps.visible = true
      })
    })
  }
}
</script>
