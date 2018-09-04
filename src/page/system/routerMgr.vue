<template>
  <div class="app-container">
    <el-row v-loading="loading">
      <el-col :span="24">
        <router-edit ref="routerEdit" :parentRouterList="parentRouterList" v-on:save-finished="getRouterList()"></router-edit>
        <el-row class="search-row">
          <el-col :span="12">
            <el-input placeholder="路由名称" size="small" v-model="search.name">
              <el-button slot="append" icon="el-icon-search" @click="getRouterList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" icon="el-icon-plus" size="small"
                       v-show="permission.add" @click="handleCreateRouter()">添加</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="routerList" border size="mini" header-cell-class-name="header-row">
              <el-table-column prop="name" label="名称" header-align="center"></el-table-column>
              <el-table-column prop="code" label="代码" header-align="center"></el-table-column>
              <el-table-column prop="level" label="层级" header-align="center" align="center"></el-table-column>
              <el-table-column prop="displayOrder" label="显示序号" header-align="center" align="center"></el-table-column>
              <el-table-column prop="locked" label="状态" header-align="center" align="center">
                <template slot-scope="scope">
                  <span v-bind:class="{ 'user-locked': scope.row.locked, 'user-not-locked': !scope.row.locked }">{{ scope.row.locked ? "禁用" : "可用" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" header-align="center" align="center" width="200">
                <template slot-scope="scope">
                  <el-button v-show="permission.edit" type="primary" size="mini"
                             @click="handleEditRouter(scope.$index, scope.row)">编辑</el-button>
                  <el-button v-show="permission.remove" type="danger" size="mini"
                             @click="handleDeleteRouter(scope.$index, scope.row)">删除</el-button>
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
              :total="routerTotal">
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RouterEdit from '@/views/router/routerEdit'
import {getPermissionList} from '@/api/auth'
import {listRouter, listParentRouter, removeRouter} from '@/api/router'
export default {
  name: 'routerMgr',
  components: {RouterEdit},
  data () {
    return {
      loading: true,
      permission: {
        add: false,
        edit: false,
        remove: false
      },
      search: {
        name: '',
        pageNum: 0,
        pageSize: 10
      },
      routerTotal: 0,
      routerList: [],
      parentRouterList: []
    }
  },
  methods: {
    getRouterList () {
      this.loading = true
      listRouter(this.search)
        .then(response => {
          this.routerTotal = response.data.count
          this.routerList = response.data.dataList
          this.loading = false
        })
        .catch(error => {
          this.outputError(error)
        })
    },
    handleCreateRouter () {
      this.loading = true
      this.$refs.routerEdit.$emit('openAddRouterDialog')
      this.loading = false
    },
    handleEditRouter (index, row) {
      this.loading = true
      this.$refs.routerEdit.$emit('openEditRouterDialog', row)
      this.loading = false
    },
    handleDeleteRouter (index, row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          removeRouter({id: row.id})
            .then(response => {
              this.loading = false
              this.getRouterList()
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
    async pageInit () {
      this.loading = true
      try {
        let [listRouterResp, getPermissionResp, listParentRouterResp] = await Promise.all([
          listRouter(this.search),
          getPermissionList({routerId: this.$route.meta.routerId}),
          listParentRouter()
        ])
        this.routerList = listRouterResp.data.dataList
        this.routerTotal = listRouterResp.data.count
        this.parentRouterList = listParentRouterResp.data
        // 权限
        this.permission.add = getPermissionResp.data.find(item => {
          console.log(item)
          return item === 'routers:create'
        })
        this.permission.edit = getPermissionResp.data.find(item => {
          return item === 'routers:update'
        })
        this.permission.remove = getPermissionResp.data.find(item => {
          return item === 'routers:delete'
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
