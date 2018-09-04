<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <el-col :span="24">
        <role-edit ref="roleEdit" v-on:save-finished="getRoleList()"></role-edit>
        <role-permission ref="rolePermission"></role-permission>
        <el-row class="search-row">
          <el-col :span="12">
            <el-input placeholder="角色名称" size="small" v-model="search.name">
              <el-button slot="append" icon="el-icon-search" @click="getRoleList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" icon="el-icon-plus" size="small"
                       v-show="permission.add" @click="handleCreateRole()">添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="roleList" border size="mini" header-cell-class-name="header-row">
              <el-table-column prop="roleName" label="角色名称" header-align="center"></el-table-column>
              <el-table-column prop="locked" label="状态" header-align="center" align="center">
                <template slot-scope="scope">
                  <span v-bind:class="{ 'role-locked': scope.row.locked, 'role-not-locked': !scope.row.locked }">{{ scope.row.locked ? "禁用" : "可用" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="260">
                <template slot-scope="scope">
                  <el-button v-show="permission.edit" type="primary" size="mini"
                             @click="handleEditRole(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-show="permission.edit && permission.add" type="primary" size="mini"
                             @click="handleSetPermission(scope.$index, scope.row)">权限设置</el-button>
                  <el-button v-show="permission.remove" type="danger" size="mini"
                             @click="handleDeleteRole(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="roleTotal">
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RoleEdit from '@/views/role/roleEdit'
import RolePermission from '@/views/role/rolePermission'
import {listRole, removeRole} from '@/api/role'
import {getPermissionList} from '@/api/auth'
export default {
  name: 'roleMgr',
  components: {RoleEdit, RolePermission},
  data () {
    return {
      loading: true,
      roleList: [],
      roleTotal: 0,
      permission: {
        add: false,
        edit: false,
        remove: false
      },
      search: {
        name: '',
        pageNum: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    async pageInit () {
      this.loading = true
      try {
        let [searchUserResp, getPermissionResp] = await Promise.all([
          listRole(this.search),
          getPermissionList({routerId: this.$route.meta.routerId})
        ])
        this.roleList = searchUserResp.data.dataList
        this.roleTotal = searchUserResp.data.count
        // 权限
        this.permission.add = getPermissionResp.data.find(item => {
          console.log(item)
          return item === 'role:create'
        })
        this.permission.edit = getPermissionResp.data.find(item => {
          return item === 'role:update'
        })
        this.permission.remove = getPermissionResp.data.find(item => {
          return item === 'role:delete'
        })
        this.loading = false
      } catch (error) {
        this.outputError(error)
      }
    },
    getRoleList () {
      this.loading = true
      listRole(this.search)
        .then(response => {
          this.roleList = response.data.dataList
          this.roleTotal = response.data.count
          this.loading = false
        })
    },
    handleCreateRole () {
      this.$refs.roleEdit.$emit('openAddRoleDialog')
    },
    handleEditRole (index, row) {
      let params = {id: row.id, roleName: row.roleName, locked: row.locked}
      this.$refs.roleEdit.$emit('openEditRoleDialog', params)
      this.loading = false
    },
    handleSetPermission (index, row) {
      this.$refs.rolePermission.$emit('openSetPermissionDialog', row)
    },
    handleDeleteRole (index, row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          removeRole({id: row.id})
            .then(response => {
              this.loading = false
              if (response.status) {
                this.$message({
                  showClose: true,
                  message: response.msg,
                  type: 'warning'
                })
              } else {
                this.getRoleList()
              }
            })
            .catch(error => {
              this.outputError(error)
            })
        })
        .catch(() => {})
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.searchUser()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.searchUser()
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
  .search-row{
    padding-bottom: 10px;
    .el-input{
      width: 250px;
    }
  }
</style>
