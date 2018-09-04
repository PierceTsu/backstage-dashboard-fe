<template>
  <el-dialog :title="dialogProps.title" :visible.sync="dialogProps.visible" width="500px"
    v-loading="loading">
    <div slot="title" class="dialog-header">{{ dialogProps.title }}</div>
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="permission-container">
          <el-tree ref="permissionTree"
                   node-key="id"
                   accordion
                   show-checkbox
                   :data="permissionTreeNodes"
                   :props="treeProps"
                   :highlight-current=true
                   :default-expand-all=false
                   :default-checked-keys="permissionKeys">
          </el-tree>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose()">取 消</el-button>
      <el-button type="primary" size="small" @click="doSavePermission()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listAvailableResourceTree } from '@/api/resource'
import { listPermissions, savePermission } from '@/api/role'

export default {
  name: 'role-permission',
  data () {
    return {
      loading: false,
      treeProps: {
        children: 'children',
        label: 'name'
      },
      permissionTreeNodes: [],
      permissionKeys: [],
      role: {
        id: 0,
        name: ''
      },
      dialogProps: {
        visible: false,
        title: ''
      }
    }
  },
  methods: {
    handleDialogClose () {
      this.dialogProps.visible = false
    },
    async componentInit (role) {
      this.loading = true
      this.role = role
      this.dialogProps.title = '权限设置 - ' + this.role.roleName
      this.permissionKeys = []

      try {
        let [ listResourceTreeResp, listPermissionsResp ] = await Promise.all([
          listAvailableResourceTree(),
          listPermissions({id: role.id})
        ])

        this.permissionTreeNodes = listResourceTreeResp.data
        this.permissionKeys = listPermissionsResp.data

        this.loading = false
        this.dialogProps.visible = true
      } catch (error) {
        this.outputError(error)
      }
    },
    doSavePermission () {
      // this.loading = true
      // 资源权限id
      let permissionIds = this.$refs.permissionTree.getCheckedKeys(true)
      // 所有选中的id
      let allCheckedIds = this.$refs.permissionTree.getCheckedKeys().concat(
        this.$refs.permissionTree.getHalfCheckedKeys()
      )
      console.log('allCheckedIds', allCheckedIds)
      // 路由id
      let routerIds = allCheckedIds.concat(permissionIds).filter(
        v => !allCheckedIds.includes(v) || !permissionIds.includes(v)
      )

      let permission = {
        roleId: this.role.id,
        routerIds: routerIds,
        permissionIds: permissionIds
      }
      savePermission(permission)
        .then(response => {
          this.loading = false
          this.dialogProps.visible = false

          if (response.status) {
            this.$message({
              showClose: true,
              message: response.msg,
              type: 'warning'
            })
          }
        })
        .catch(error => {
          this.outputError(error)
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
      this.$on('openSetPermissionDialog', function (role) {
        this.componentInit(role)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .permission-container {
    margin-top: -8px;
    height: 360px;
    overflow-y: auto;
  }
</style>
