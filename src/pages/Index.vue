
<template>
	<div class="index container">
		<!-- <header class="bar" > -->

		<aside class="left-bar" id="leftBar" :style="{left: isLeftbar ? 0 : '-249px'}">
			<div class="title">
				<p>币圈小金库</p>
			</div>
			<nav class="nav">
				<!-- <div class="item active"><a href=""><i class="iconfont icon-daohang2"></i>币圈最牛导航</a><i class="line"></i></div> -->
				<ul class="nav-item" id="navItem">
					<li v-for="(item,index) in data" :key="index"  @click="jump(index)">
						<a :class="{active: index == selfIndex}">
							<i :class="item.icon" class="icon"></i>
							{{item.classify}}
						</a>
					</li>
				</ul>
			</nav>
		</aside>
		<!-- </header> -->
		<section class="main">
			<div id="mainContent">
				<!-- 手机端菜单 -->
				<div id="menu-box">
					<div id="menu">
						<input type="checkbox" id="menu-form">
						<label for="menu-form" class="menu-spin" @click="isLeftbar=!isLeftbar">
							<div class="line diagonal line-1"></div>
							<div class="line horizontal"></div>
							<div class="line diagonal line-2"></div>
						</label>
					</div>
				</div>
				<!-- 开发社区 -->
				<div class="box" v-for="(item,index) in data" :key="index">
					<a href="#" :name="item.classify"></a>
					<div class="sub-category">
						<div><i :class="item.icon" class="icon"></i>{{item.classify}}</div>
					</div>
					
					<div v-for="(sub,idx) in item.sites" :key="'sub-'+idx">
						<div v-if="sub">
							<a target="_blank" :href="sub.href">
								<div class="item">
									<div class="logo"><img :src="sub.logo" :alt="sub.name">{{sub.name}}</div>
								  <div class="desc">{{sub.desc}}</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
	
		</section>
		<footer class="footer">
				<div class="copyright">
					<div>
						Copyright © 2018- 2050
						<a href="https://www.yaozihao.com">姚子豪博客</a>  
						<a style="margin:20px" href="https://www.bidingtou.com">币定投</a>
					</div>
				</div>
			</footer>
			
			<img class="comment" src="../assets/img/jiahao.png" @click="dialogFormVisible = true">
			<img v-if="btnFlag" class="go-top" src="../assets/img/top.jpg" @click="backTop">

		<el-dialog title="添加网站" :visible.sync="dialogFormVisible" width="320">
			<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
				<el-form-item label="网站名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="网站分类" prop="classify">
					<el-select v-model="form.classify" placeholder="请选择网站分类">
						<el-option :label="classfiys.classify" :value="classfiys.classify" v-for="classfiys in data" :key="classfiys._id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="网站链接" prop="href">
					<el-input v-model="form.href"></el-input>
				</el-form-item>
				<el-form-item label="网站描述" prop="desc">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('form')">立即创建</el-button>
					<el-button @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: [],
				selfIndex: 0,
				dialogTableVisible: false,
				dialogFormVisible: false,
				isLeftbar: false,
				btnFlag: false,
				scrollTop:0,
				form: {
					classify: "",
					icon: "el-icon-edit",
					name: "",
					href: "",
					desc: "",
					logo: ""
				},
				rules: {
					classify: [{
						required: true,
						message: '请选择网站分类',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请填写网站名称',
						trigger: 'change'
					}]
				}
			}
		},
		computed: {
			
		},
		// vue的两个生命钩子，这里不多解释。
		// window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
		mounted () {
			window.addEventListener('scroll', this.scrollToTop)
		},
		destroyed () {
			window.removeEventListener('scroll', this.scrollToTop)
		},
		methods: {
			jump(idx) {
				this.selfIndex = idx;
				
				// 跳转
				let allSite = document.querySelectorAll('.box')
				let selfOffsetTop = allSite[idx].offsetTop -10
				// 判断是否是在手机上
				window.screenWidth = document.body.clientWidth
				if(window.screenWidth<481) {
					selfOffsetTop-=50
				}
				// Chrome
        document.body.scrollTop = selfOffsetTop;
        // Firefox
        document.documentElement.scrollTop = selfOffsetTop;
        // Safari
        window.pageYOffset = selfOffsetTop;
			},
			submitForm(formName) {
				// var that = this
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.form.time = new Date().getTime()
						this.$message('提交成功，后台审核通过后才会显示');
						this.dialogFormVisible = false
						this.addNav(this.form)
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			async addNav(data) {
				const res = await this.$api.addAudit(data)
				return res;
			},
			async getData() {
				const res = await this.$api.getHome()
				this.data = res.data
				console.log(this.data);
			},
			backTop () {
				let that = this
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5)
					document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
					if (that.scrollTop === 0) {
						clearInterval(timer)
					}
				}, 16)
			},
			// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
			scrollToTop () {
				let that = this
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				that.scrollTop = scrollTop
				if (that.scrollTop > 0) {
					that.btnFlag = true
				} else {
					that.btnFlag = false
				}
			}
		},
		created() {
			const that = this
			this.getData()
			// window.addEventListener('scroll', this.dataScroll);
			window.onresize = () => {
					return (() => {
							window.screenWidth = document.body.clientWidth
							if(window.screenWidth<481) {
								that.isLeftbar = false
							}else {
								that.isLeftbar = true
							}
					})()
			}
			window.onresize()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-dialog {
	min-width: 320px
}
</style>
