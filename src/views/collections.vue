<template>
  <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          :expand-row-keys="expands"
          @row-click="rowClick">
      <el-table-column type="expand">
          <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="序号">
                      <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="位置">
                      <span>{{ props.row.position }}</span>
                  </el-form-item>
                  <el-form-item label="户型">
                      <span>{{ props.row.type }}</span>
                  </el-form-item>
                  <el-form-item label="价格">
                      <span>{{ props.row.price }}</span>
                  </el-form-item>
                  <el-form-item label="联系方式">
                      <span>{{ props.row.phone }}</span>
                  </el-form-item>
                  <el-form-item label="照片">
                    <span>{{ props.row.photo }}</span>
                  </el-form-item>
                  <el-form-item label="装修程度">
                      <span>{{ props.row.degree }}</span>
                  </el-form-item>
                  <el-form-item label="面积">
                      <span>{{ props.row.area }}</span>
                  </el-form-item>
                  <el-form-item label="可入住时间">
                      <span>{{ props.row.time }}</span>
                  </el-form-item>
                  <el-form-item label="家电配置">
                    <span>{{ props.row.electric }}</span>
                  </el-form-item>
                  <el-form-item label="租赁情况">
                    <span>{{ props.row.rent }}</span>
                  </el-form-item>
                  <br>
                  <el-form-item label="介绍">
                    <span>{{ props.row.descryption }}</span>
                  </el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column
              label="序号"
              prop="id">
      </el-table-column>
      <el-table-column
              label="位置"
              prop="position">
      </el-table-column>
      <el-table-column
              label="户型"
              prop="type">
      </el-table-column>
      <el-table-column
              label="价格"
              prop="price">
      </el-table-column>
      <el-table-column
              label="联系方式"
              prop="phone">
      </el-table-column>
      <el-table-column label="操作" prop='oper'>
        <template slot-scope="scope">
          <el-button type="primary" @click.stop="delClick(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
      font-size: 0;
  }
  .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
  }
  .demo-table-expand-desc{
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
  }
</style>

<script>
  export default {
      data() {
          return {
              tableData: [{
                  id: 1,
                  position:'上海闵行',
                  type:'三室一厅',
                  price:'6万/平方米',
                  phone:13333333333,
                  photo:'http://www.baidu.com',
                  degree:'精装',
                  area:'120平方米',
                  time:'1年',
                  electric:'空调、电视、冰箱',
                  rent:'整租',
                  descryption:'这是一套位于上海闵行区的一套精装房，靠近地铁，具有升值空间。'
              }, {
                  id: 2,
                  position:'北京',
                  type:'二室一厅',
                  price:'7万/平方米',
                  phone:13888888888,
                  photo:'http://www.qq.com',
                  degree:'毛坯',
                  area:'130平方米',
                  time:'2年',
                  electric:'空调、电视、冰箱',
                  rent:'合租/整租',
                  descryption:'这是一套位于北京三环的毛坯房。'
              }, {
                  id: 3,
                  position:'上海闵行',
                  type:'三室一厅',
                  price:'6万/平方米',
                  phone:13333333333,
                  photo:'http://www.baidu.com',
                  degree:'精装',
                  area:'120平方米',
                  time:'1年',
                  electric:'空调、电视、冰箱',
                  rent:'整租',
                  descryption:'这是一套位于上海闵行区的一套精装房，靠近地铁'
              }, {
                  id: 4,
                  position:'上海闵行',
                  type:'三室一厅',
                  price:'6万/平方米',
                  phone:13333333333,
                  photo:'http://www.baidu.com',
                  degree:'精装',
                  area:'120平方米',
                  time:'1年',
                  electric:'空调、电视、冰箱',
                  rent:'整租',
                  descryption:'这是一套位于上海闵行区的一套精装房，靠近地铁'
              }],


              // 要展开的行，数值的元素是row的key值
              expands: []
          }
      },
      methods:{
       //在<table>里，我们已经设置row的key值设置为每行数据id：row-key="id"
          rowClick(row, event, column) {
              Array.prototype.remove = function (val) {
                  let index = this.indexOf(val);
                  if (index > -1) {
                      this.splice(index, 1);
                  }
              };

              if (this.expands.indexOf(row.id) < 0) {
                this.expands = []  
                this.expands.push(row.id);
              } else {
                  this.expands.remove(row.id);
              }
          },

          delClick(index, rows){
            rows.splice(index, 1);
          },

      }

  }
</script>