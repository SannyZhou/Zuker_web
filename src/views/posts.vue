<template>
    <el-main>
    <el-table
            :data="tableData"
            style="width: 100%"
            row-key="name"
            :expand-row-keys="expands"
            @row-click="rowClick">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="描述">
                        <span>{{ props.row.description }}</span>
                    </el-form-item>
                    <el-form-item label="位置">
                        <span>{{ props.row.location }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{ props.row.phoneNumber }}</span>
                    </el-form-item>
                    <el-form-item label="价格下限">
                        <span>{{ props.row.minPrice }}</span>
                    </el-form-item>
                    <el-form-item label="价格上限">
                      <span>{{ props.row.maxPrice }}</span>
                    </el-form-item>
                    <el-form-item label="入住开始">
                        <span>{{ props.row.availableTime_start }}</span>
                    </el-form-item>
                    <el-form-item label="入住结束">
                        <span>{{ props.row.availableTime_end }}</span>
                    </el-form-item>
                    <el-form-item label="可用面积">
                        <span>{{ props.row.acreage}}</span>
                    </el-form-item>
                    <el-form-item label="家电配置">
                      <span>{{ props.row.decoration }}</span>
                    </el-form-item>
                    <el-form-item label="租赁方式">
                      <span>{{ props.row.method }}</span>
                    </el-form-item>
                    <el-form-item label="几厅">
                      <span>{{ props.row.hall }}</span>
                    </el-form-item>
                    <el-form-item label="几室">
                      <span>{{ props.row.room }}</span>
                    </el-form-item>
                    <el-form-item label="几卫">
                      <span>{{ props.row.bath }}</span>
                    </el-form-item>
                    <el-form-item label="图片链接">
                      <span>{{ props.row.imageUrl }}</span>
                    </el-form-item>
                    <el-form-item label="其他">
                      <span>{{ props.row.others }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="名字"
                prop="name">
        </el-table-column>
        <el-table-column
                label="位置"
                prop="location">
        </el-table-column>
        <el-table-column
                label="可用面积"
                prop="acreage">
        </el-table-column>
        <el-table-column
                label="最低价格"
                prop="minPrice">
        </el-table-column>
        <el-table-column
                label="联系方式"
                prop="phoneNumber">
        </el-table-column>
        <el-table-column label="操作" prop='oper'>
          <template slot-scope="scope">
            <el-button type="primary" @click.stop="delClick(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button @click="toForm" type="primary" style="margin: 5px">新发布</el-button>
    </el-main>
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
  </style>
  
  <script>
    export default {
        data() {
            return {
                tableData: [{
                  name: '上海精装学区房',                    //String, 名称
                  description: '这是一套上海的精装学区房',             //String, 描述
                  location: '上海徐汇区',                //String, 位置（目前还是字符串表示）
                  phoneNumber: '18888888888',             //String, 联系电话
                  minPrice: '6万/平米',                //String, 价格下限
                  maxPrice: '7万/平米',                //String, 价格上限
                  availableTime_start: '2018-11-26T08:00:00.000Z',     //Date, 可入住时间-开始，格式为2018-11-26T08:00:00.000Z
                  availableTime_end: '2019-11-26T08:00:00.000Z',       //Date, 可入住时间-结束，格式为2018-11-26T08:00:00.000Z
                  acreage: '110平米',                 //String, 可用面积
                  decoration: '3',              //String, 装修程度：'1'-毛坯，'2'-简装，'3'-精装，'4'-豪华装
                  method: '1',                  //String, 租赁方式：'1'-整租，'2'-合租，'3'-短租，'4'-办公
                  hall: '1',                    //String, 几厅：'0'-零厅, '1'-一厅，'2'-两厅，'3'-三厅, '4'-四厅
                  room: '2',                    //String, 几室：'0'-零室, '1'-一室，'2'-两室，'3'-三室, '4'-四室
                  bath: '1',                    //String, 几卫：'0'-零卫, '1'-一卫，'2'-两卫，'3'-三卫, '4'-四卫
                  imageUrl: ['www.baidu.com','www.qq.com'],                //Array，上传图片链接列表
                  others: ['WIFI', '冰箱', '洗衣机','空调'],                  //Array, 家电等，例：['WIFI', '冰箱', '洗衣机']
                }, {
                  name: '北京三环毛坯房',                    //String, 名称
                  description: '这是一套北京三环的毛坯房',             //String, 描述
                  location: '北京',                //String, 位置（目前还是字符串表示）
                  phoneNumber: '13333333333',             //String, 联系电话
                  minPrice: '8万/平米',                //String, 价格下限
                  maxPrice: '10万/平米',                //String, 价格上限
                  availableTime_start: '2018-12-26T08:00:00.000Z',     //Date, 可入住时间-开始，格式为2018-11-26T08:00:00.000Z
                  availableTime_end: '2019-12-26T08:00:00.000Z',       //Date, 可入住时间-结束，格式为2018-11-26T08:00:00.000Z
                  acreage: '123平米',                 //String, 可用面积
                  decoration: '1',              //String, 装修程度：'1'-毛坯，'2'-简装，'3'-精装，'4'-豪华装
                  method: '1',                  //String, 租赁方式：'1'-整租，'2'-合租，'3'-短租，'4'-办公
                  hall: '1',                    //String, 几厅：'0'-零厅, '1'-一厅，'2'-两厅，'3'-三厅, '4'-四厅
                  room: '2',                    //String, 几室：'0'-零室, '1'-一室，'2'-两室，'3'-三室, '4'-四室
                  bath: '2',                    //String, 几卫：'0'-零卫, '1'-一卫，'2'-两卫，'3'-三卫, '4'-四卫
                  imageUrl: ['www.baidu.com','www.qq.com'],                //Array，上传图片链接列表
                  others: ['冰箱', '洗衣机','空调'],                  //Array, 家电等，例：['WIFI', '冰箱', '洗衣机']
                }],
  
  
                // 要展开的行，数值的元素是row的key值
                expands:[]
            }
        },
        created(){
            this.getPosts();
        },
        methods:{
         //在<table>里，已经设置row的key值设置为每行数据id：row-key="name"
            rowClick(row, event, column) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
  
                if (this.expands.indexOf(row.name) < 0) {
                  this.expands = []  
                  this.expands.push(row.name);
                } else {
                    this.expands.remove(row.name);
                }
            },
  
            delClick(index){
              this.tableData.splice(index, 1);
  
              //发送要删除的序号
              var obj = this;
              this.$axios.post('/api/usercenter/housing/edit/', index).then(function(res) {
                  obj.$message.success('删除成功');
              }).catch(function(err) {
                  obj.$message.error('删除失败');
              })
            },
            getPosts() {
              var obj = this;
              this.$axios.get('/api/usercenter/housing/view').then(function(res) {
                  obj.tableData = res.data;
                  obj.$message.success('载入成功');
              }).catch(function(err) {
                  obj.$message.error('载入失败');
              })
            },
            toForm() {
                this.$router.push('/form')
            }
        }
  
    }
  </script>