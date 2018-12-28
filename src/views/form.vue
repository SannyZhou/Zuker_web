<template>
    <div class="NewHouse">
        <div class="tip">
			<router-link to="/">
	            <img class="logo-img" src='../assets/logo.png'>
	            <span class="logo-text">Zuker</span>
	        </router-link>
        </div>

        <div class="form">
            <el-form ref="ruleForm" :model="House" :rules="rules" label-width="150px">
                <el-form-item label="房源名称：" prop="name">
                    <el-input v-model="House.name" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item label="房源位置：" prop="location">
                    <el-input v-model="House.location" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item label="房源详细描述：" prop="description">
                    <el-input v-model="House.description" style="width: 80%" type="textarea" rows="5" ></el-input>
                </el-form-item>
                <el-form-item label="房源照片：" prop="image">
                    <!-- el-upload 中的action参数为处理图片上传的后端接口 -->
                    <el-upload 
                        ref="upload"
                        action="/upload" 
                        name="picture"
                        list-type="picture-card"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        :on-preview="handlePreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="House.imageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="联系电话：" prop="phoneNumber">
                    <el-input v-model.number="House.phoneNumber" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item label="租金（范围）：">
                    <el-col :span="10"> 
                        <el-input-number prop="price_min" v-model="House.minPrice" :min="100" :max="50000" label="价格范围"></el-input-number>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="10">
                        <el-input-number prop="price_max" v-model="House.maxPrice" :min="100" :max="50000" label="价格范围"></el-input-number>
                    </el-col>
                </el-form-item>
                <el-form-item label="可入住时间：" >
                    <el-col :span="10"> 
                        <el-date-picker prop="availableTime_start" type="date" placeholder="开始时间" v-model="House.availableTime_start" style="width: 80%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="10">
                        <el-date-picker prop="availableTime_end" type="date" placeholder="结束时间" v-model="House.availableTime_end" style="width: 80%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="可用面积（m^2）：" prop="acreage">
                    <el-input v-model="House.acreage" style="width: 30%"></el-input>
                </el-form-item>
                <el-form-item label="装修程度：" prop="decoration">
                    <el-radio v-model="House.decoration" label="1">毛坯</el-radio>
                    <el-radio v-model="House.decoration" label="2">简装</el-radio>
                    <el-radio v-model="House.decoration" label="3">精装</el-radio>
                    <el-radio v-model="House.decoration" label="4">豪华装</el-radio>
                </el-form-item>
                <el-form-item label="租赁方式：" prop="method">
                    <el-radio v-model="House.method" label="1">整租</el-radio>
                    <el-radio v-model="House.method" label="2">合租</el-radio>
                    <el-radio v-model="House.method" label="3">短租</el-radio>
                    <el-radio v-model="House.method" label="4">办公</el-radio>
                </el-form-item>
                <el-form-item label="户型:" >
                    <el-select prop="style_room" v-model="House.room" placeholder="几室" style="width: 25%">
                    <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select prop="style_hall" v-model="House.hall" placeholder="几厅" style="width: 25%">
                    <el-option v-for="item in hallOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select prop="style_bath" v-model="House.bath" placeholder="几卫" style="width: 25%">
                    <el-option v-for="item in bathOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="其他信息：" prop="others">
                    <el-select v-model="House.others" multiple filterable allow-create default-first-option placeholder="请选择标签" style="width: 80%">
                        <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="buttons">
                <el-form-item>
                    <el-button type="primary" @click="submit('ruleForm')" style="width:35%">提交</el-button>
                    <el-button @click="resetForm('ruleForm')" style="width:35%">取消</el-button>
                </el-form-item>
                </div>
               
        </el-form>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                fileList: [],
                House: {
                    name: '',
                    description: '',
                    location: '',
                    phoneNumber: '',
                    minPrice: '',
                    maxPrice: '',
                    availableTime_start: '',
                    availableTime_end: '',
                    acreage: '',
                    decoration: '',
                    method: '',
                    hall: '',
                    room: '',
                    bath: '',
                    imageUrl: '', 
                    others: [],
                },
                dialogVisible: false,
                rules: {
                    name: [
                            { required: true, message: '请输入房源名称', trigger: 'blur' },
                            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                        ],
                    location: [
                        { required: true, message: '请输入房源位置', trigger: 'blur'},
                        { min: 3, message: '长度至少为3个字符', trigger: 'blur'}
                    ],
                    phoneNumber: [
                        { required: true, message: '请输入联系方式', trigger: 'blur'},
                        { type: 'number', min: 9999999999, max: 20000000000,  message: '请输入正确的联系方式'}
                    ],
                    price_min: [
                        { required: true, message: '请输入价格下限', trigger: 'blur'}
                    ],
                    price_max: [
                        { required: true, message: '请输入价格上限', trigger: 'blur'}
                    ],
                    availableTime_start: [
                        { required: true, message: '请输入可入住时间（开始）', trigger: 'change'}
                    ],
                    availableTime_end: [
                        { required: true, message: '请输入可入住时间（结束）', trigger: 'change'}
                    ],
                    acreage: [
                        { required: true, message: '请输入可用面积', trigger: 'blur'}
                    ],
                    decoration: [
                        { required: true, message: '请输入装修程度', trigger: 'change'}
                    ],
                    method: [
                        { required: true, message: '请输入租赁方式', trigger: 'change'}
                    ],
                    style_room: [
                        { required: true, message: '请输入户型信息', trigger: 'change'}
                    ],
                    style_hall: [
                        { required: true, message: '请输入户型信息', trigger: 'change'}
                    ],
                    style_bath: [
                        { required: true, message: '请输入户型信息', trigger: 'change'}
                    ],
                },
                hallOptions: [
                    {
                        value: '0',
                        label: '零厅'
                    }, {
                        value: '1',
                        label: '一厅'
                    }, {
                        value: '2',
                        label: '两厅'
                    }, {
                        value: '3',
                        label: '三厅'
                    }, {
                        value: '4',
                        label: '四厅'
                    }],
                roomOptions: [
                    {
                        value: '0',
                        label: '零室'
                    }, {
                        value: '1',
                        label: '一室'
                    }, {
                        value: '2',
                        label: '两室'
                    }, {
                        value: '3',
                        label: '三室'
                    }, {
                        value: '4',
                        label: '四室'
                    }],
                bathOptions: [
                    {
                        value: '0',
                        label: '零卫'
                    }, {
                        value: '1',
                        label: '一卫'
                    }, {
                        value: '2',
                        label: '两卫'
                    }, {
                        value: '3',
                        label: '三卫'
                    }, {
                        value: '4',
                        label: '四卫'
                    }],
                    options: [
                    {
                        value: 'WIFI',
                        label: 'WIFI'
                    }, {
                        value: '冰箱',
                        label: '冰箱'
                    }, {
                        value: '洗衣机',
                        label: '洗衣机'
                    }, {
                        value: '热水器',
                        label: '热水器'
                    }, {
                        value: '燃气灶',
                        label: '燃气灶',
                    }, {
                        value: '电视机',
                        label: '电视机',
                    }, {
                        value: '空调',
                        label: '空调',
                    }, {
                        value: '大阳台',
                        label: '大阳台',
                    }, {
                        value: '电梯房',
                        label: '电梯房',
                    }],
          
            };
        },
    methods: {
        handleRemove(file, fileList) {
            this.$message({
                type: 'info',
                message: '已删除原有图片',
                duration: 6000
            });
        },
        handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;
 
            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        }, 
        handleSuccess(res, file) {
            this.$message({
                type: 'info',
                message: '图片上传成功',
                duration: 6000
            });
            if (file.response.success) {
                this.editor.picture = file.response.message; //将返回的文件储存路径赋值picture字段
                this.house.imageUrl.append(file.response.message)
            } else {
                this.$message.warning("图片上传失败！")
            }
        },    
        submit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var house = {
                        name: this.House.name, 
            	        description: this.House.description,
                        location: this.House.location,
                        phoneNumber: this.House.phoneNumber,
                        minPrice: this.House.minPrice,
                        maxPrice: this.House.maxPrice,
                        availableTime_start: this.House.availableTime_start,
                        availableTime_end: this.House.availableTime_end,
                        acreage: this.House.acreage,
                        decoration: this.House.decoration,
                        type: this.House.type,
                        method: this.House.method,
                        hall: this.House.hall,
                        room: this.House.room,
                        bath: this.House.bath,
                        imageFile: this.House.imageFile,
                        others: this.House.others,
                    }
                    this.$axios.post('/api/usercenter/housing', house).then((res) => {
                        this.$message.success("房源已发布！")
                        this.$router.push('/my/posts')
                    }).catch(function(err){
                        this.$message.error("房源发布失败");
            	    })}
                else {
                    alert('信息有误，请按提示重新填写！')
                    /* console.log('Error');*/
                    /*
                    console.log(this.House.availableTime_start);
                    console.log(this.House.availableTime_end);
                    console.log(this.House.acreage);
                    console.log(this.House.decoration);
                    console.log(this.House.type);
                    console.log(this.House.method);
                    console.log(this.House.hall);
                    console.log(this.House.room);
                    console.log(this.House.bath);
                    console.log(this.House.imageFile);
                    console.log(this.House.others);*/
                
          }
        });
            },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      uploadImageMethod() {

      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/styl" scoped>
.NewHouse
	background #FFF
	.tip{
		height: 80px;
		text-align:center;
		line-height: 80px;
		font-size: 40px;
		font-weight: bold;
		background: #000;
		color: #8f8f8f;
		vertical-align: middle;
		.logo-img {
        	margin: 2px 2px;
        	vertical-align: middle;
        	width: 45px;
        	height: 45px;
    	};
	    .logo-text {
	        margin: 2px;
	        color: white;
	        font-size: x-max;
	        vertical-align: middle;
	    }
	}
    .form{
        margin: 50px
    }
</style>
