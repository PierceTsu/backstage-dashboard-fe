<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <el-col :span="24">
        <user-edit ref="userEdit" v-on:save-finished="searchUser"></user-edit>
        <change-password ref="changePassword"></change-password>
        <el-row class="search-row">
          <el-col :span="12">
            <el-input placeholder="用户名" size="small" v-model="search.username">
              <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" icon="el-icon-plus" size="small"
                       v-show="permission.add" @click="handleCreateUser()">添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="userList" border size="mini" header-cell-class-name="header-row">
              <el-table-column prop="username" label="用户名" header-align="center"></el-table-column>
              <el-table-column prop="nickname" label="昵称" header-align="center"></el-table-column>
              <el-table-column prop="locked" label="状态" header-align="center" align="center">
                <template slot-scope="scope">
                  <span v-bind:class="{ 'user-locked': scope.row.locked, 'user-not-locked': !scope.row.locked }">{{ scope.row.locked ? "禁用" : "可用" }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="260">
                <template slot-scope="scope">
                  <el-button v-show="permission.edit" type="primary" size="mini"
                             @click="handleEditUser(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-show="permission.edit && permission.add" type="primary" size="mini"
                             @click="handleChangePassword(scope.$index, scope.row)">修改密码</el-button>
                  <el-button v-show="permission.remove" type="danger" size="mini"
                             @click="handleDeleteUser(scope.$index, scope.row)">删除</el-button>
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
              :total="userTotal">
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserEdit from '@/views/user/userEdit'
import ChangePassword from '@/views/user/changePassword'
import {listUser, getUser, removeUser} from '@/api/user'
import {getPermissionList} from '@/api/auth'
import { listAllRole } from '@/api/role'

export default {
  name: 'userMgr',
  components: { UserEdit, ChangePassword },
  data () {
    return {
      loading: true,
      userList: [],
      permission: {
        add: false,
        edit: false,
        remove: false
      },
      userTotal: 0,
      search: {
        username: '',
        pageNum: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    async handleCreateUser () {
      this.loading = true
      try {
        let [allRoleResp] = await Promise.all([
          listAllRole()
        ])
        this.$refs.userEdit.$emit('openAddUserDialog', allRoleResp.data)
        this.loading = false
      } catch (error) {
        this.outputError(error)
      }
    },
    async handleEditUser (index, row) {
      this.loading = true
      try {
        let [ userResp, allRoleResp ] = await Promise.all([
          getUser(row.id),
          listAllRole()
        ])
        this.$refs.userEdit.$emit('openEditUserDialog', userResp.data, allRoleResp.data)
        this.loading = false
      } catch (error) {
        this.outputError(error)
      }
    },
    handleChangePassword (index, row) {
      this.$refs.changePassword.$emit('openChangePasswordDialog', row)
    },
    handleDeleteUser (index, row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          removeUser({id: row.id})
            .then(response => {
              this.loading = false
              this.searchUser()
            })
            .catch(error => {
              this.outputError(error)
            })
        })
        .catch(() => {})
    },
    searchUser () {
      this.loading = true
      listUser(this.search)
        .then(response => {
          this.userList = response.data.dataList
          this.userTotal = response.data.count
          this.loading = false
        })
        .catch(error => {
          this.outputError(error)
        })
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.searchUser()
    },
    handleCurrentChange (val) {
      this.search.pageNum = val
      this.searchUser()
    },
    async pageInit () {
      this.loading = true
      try {
        let [searchUserResp, getPermissionResp] = await Promise.all([
          listUser(this.search),
          getPermissionList({routerId: this.$route.meta.routerId})
        ])
        this.userList = searchUserResp.data.dataList
        this.userTotal = searchUserResp.data.count
        // 权限
        this.permission.add = getPermissionResp.data.find(item => {
          return item === 'user:create'
        })
        this.permission.edit = getPermissionResp.data.find(item => {
          return item === 'user:update'
        })
        this.permission.remove = getPermissionResp.data.find(item => {
          return item === 'user:delete'
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
.search-row{
  padding-bottom: 10px;
  .el-input{
    width: 250px;
  }
}
</style>
