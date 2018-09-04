<template>
  <div class="app-container">
    <el-container v-loading="loading">
      <el-aside width="200px">
        <el-tree :data="routerTreeNodes" :props="defaultProps" :highlight-current=true :default-expand-all=true @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <el-row class="function-button-row">
          <el-col :span="24" style="text-align: right;">
            <el-button type="primary" icon="el-icon-plus" size="small"
                       v-show="permission.add" @click="handleCreateResource()">添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <resource-edit ref="resourceEdit" v-on:save-finished="listResource"></resource-edit>
            <el-table :data="resourceList" border size="mini" header-cell-class-name="header-row">
              <el-table-column prop="permissionName" label="权限名称" header-align="center"></el-table-column>
              <el-table-column prop="permissionCode" label="权限代码" header-align="center"></el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="200">
                <template slot-scope="scope">
                  <el-button v-show="permission.edit" type="primary" size="mini"
                             @click="handleEditResource(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-show="permission.remove" type="danger" size="mini"
                             @click="handleDeleteResource(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { listAllRouter } from '@/api/router'
import { listResource, removeResource } from '@/api/resource'
import { getPermissionList } from '@/api/auth'
import ResourceEdit from '@/views/resource/resourceEdit'
export default {
  name: 'resourceMgr',
  components: {ResourceEdit},
  data () {
    return {
      loading: false,
      routerTreeNodes: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      permission: {
        add: false,
        edit: false,
        remove: false
      },
      currentRouter: {
        id: 0,
        name: ''
      },
      resourceList: []
    }
  },
  methods: {
    handleNodeClick (data) {
      this.currentRouter.id = data.id
      this.currentRouter.name = data.name
      this.listResource()
    },
    handleCreateResource () {
      if (this.currentRouter.id === 0) {
        this.$message({
          showClose: true,
          message: '请选择路由！',
          type: 'error'
        })
        return
      }
      this.$refs.resourceEdit.$emit('openAddResourceDialog', this.currentRouter)
    },
    handleEditResource (index, row) {
      this.loading = true
      let resource = {
        id: row.id,
        permissionCode: row.permissionCode,
        permissionName: row.permissionName,
        routerId: this.currentRouter.id,
        routerName: this.currentRouter.name
      }
      this.$refs.resourceEdit.$emit('openEditResourceDialog', resource)
      this.loading = false
    },
    handleDeleteResource (index, row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          removeResource({id: row.id})
            .then(response => {
              this.loading = false
              this.listResource()
            })
            .catch(error => {
              this.outputError(error)
            })
        })
        .catch(() => {})
    },
    listResource () {
      this.loading = true
      listResource({routerId: this.currentRouter.id})
        .then(response => {
          this.resourceList = response.data
          this.loading = false
        })
        .catch(error => {
          this.outputError(error)
        })
    },
    async pageInit () {
      try {
        let [listAllRouterResp, getPermissionResp] = await Promise.all([
          listAllRouter(),
          getPermissionList({routerId: this.$route.meta.routerId})
        ])

        this.routerTreeNodes = listAllRouterResp.data

        // 权限
        this.permission.add = getPermissionResp.data.find(item => {
          return item === 'resources:create'
        })
        this.permission.edit = getPermissionResp.data.find(item => {
          return item === 'resources:update'
        })
        this.permission.remove = getPermissionResp.data.find(item => {
          return item === 'resources:delete'
        })
        this.loading = false
      } catch (error) {
        this.outputError(error)
      }
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
  created () {
    this.pageInit()
  }
}
</script>

<style lang="scss" scoped>
  .router-container {
    width: 100px;
    font-weight: bold;
  }

  .el-main {
    padding-top: 5px;
  }

  .function-button-row {
    padding-bottom: 8px;
  }

  .data-locked {
    color: red;
  }
  .data-not-locked {
    color: green;
  }
</style>
