<template>
	<div>
		<el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0;overflow: hidden;">
			<el-header class="d-flex align-items-center" style="background: #545c64;">
				<!-- -->
				<!-- <a class="h5 text-light mb-0 mr-auto">{{$conf.logo}}</a> -->
				<!-- 顶部导航栏 -->
				<el-menu :default-active="navBar.active" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-menu-item :index="index|numToString" v-for="(item,index) in navBar.list" :key="index">
						{{item.name}}
					</el-menu-item>
					<el-submenu index="100">
						<template slot="title">
							<!-- 头像 -->
							<el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
							</el-avatar>
							silas
						</template>
						<el-menu-item index="100-1">修改</el-menu-item>
						<el-menu-item index="100-2">退出</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-header>
			<el-container style="height: 100%;">
				<!-- 侧边布局 -->
				<el-aside width="200px">
					<el-menu :default-active="slideMenuActive" @select="asideSelect" style="height: 100%;">
						<el-menu-item :index="index|numToString" v-for="(item,index) in slideMenus" :key="index">
							<i :class="item.icon"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<!-- 主布局 -->
				<el-main>
					<!-- 面包屑导航 -->
					<div class="border-bottom mb-3" style="padding: 20px;margin: -20px;" v-if="bran.length>0">
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in bran" :key="index">
								{{item.title}}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</div>
					<!-- 主内容 -->
                         <el-table
                            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                            style="width: 100%">
                            <el-table-column label="Date" prop="id"> </el-table-column>
                            <el-table-column label="Name" prop="name"> </el-table-column>
                            <el-table-column
                            align="right">
                            <template slot="header" slot-scope="scope">
                                <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                @click="handleEdit(scope.row.id, scope.row)">Edit</el-button>
								<el-dialog title="添加" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="80%">
								<comfirmBox-c></comfirmBox-c>
								</el-dialog>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row.id, scope.row)">Delete</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import common from '../common/mixins/common.js';
	import ComfirmBox from '../views/comfirm/ComfirmBox'
	export default {
		mixins: [common],
		components:{
			"comfirmBox-c": ComfirmBox
		},
		data() {
			return {
				navBar: [],
                bran: [],
                tableData: [],
				search: '',
				dialogTableVisible: false
			};
        },
        // inject:['reload'],
		created() {
			//初始化菜单
			this.navBar = this.$conf.navBar;
			//初始化面包屑导航
			this.getRouterBran();
			//初始化选中菜单
            this._initNavBar();
            this.$axios({
                    url:'http://127.0.0.1:8000/prices',
                    method:'get',
                }).then(response=>{
                    this.tableData=response.data.data
                }).catch(error =>{
                    window.console.log(error)
                })
		},
		watch: {
			'$route'(to, from) { //监听器，跳转页面时触发
				//本地存储
				localStorage.setItem('navActive', JSON.stringify({
					top: this.navBar.active,
					left: this.slideMenuActive
				}))
				//重新加载面包屑导航栏
				
			}
		},
		computed: {
			slideMenuActive: {
				get() {
					return this.navBar.list[this.navBar.active].subActive || '0'
				},
				set(val) {
					this.navBar.list[this.navBar.active].subActive = val
				}
			},
			slideMenus() {
				return this.navBar.list[this.navBar.active].submenu || [];
			}
		},
		methods: {
			_initNavBar() {
				//
				let r = localStorage.getItem('navActive');
				if(r){
					r = JSON.parse(r);
					this.navBar.active = r.top;
					this.slideMenuActive = r.left;
				}
			},
			//获取面包屑导航
			getRouterBran() {
				//过滤，有name值的才保留 
				let b = this.$route.matched.filter(v => v.name);
				let arr = [];
				b.forEach((v, k) => {
					//过滤 layout和index
					if (v.name == 'layout' || v.name == 'index') return;
					arr.push({
						name: v.name,
						path: v.path,
						title: v.meta.title
					})
				})
				//追加首页
				if (arr.length > 0) {
					arr.unshift({
						name: "index",
						path: "/index",
						title: "后台首页"
					})
				}
				//保存到面包屑数组
				this.bran = arr;
			},
			handleSelect(key, keyPath) {
				this.navBar.active = key;
				//跳转到当前激活的页面
				this.$router.push({
					name: this.slideMenus[this.slideMenuActive].pathname
				});
            },
            handleEdit(index, row) {
				// dialogTableVisible 主要是弹出页面作用
				this.dialogTableVisible = true
                console.log(index, row);
            },
            handleDelete(index, row) {
            console.log(index, row.date)
            this.$axios({
                url:'http://127.0.0.1:8000/price/' + index,
                method: 'delete',
            }).then(response=>{
                window.location.reload();
                console.log("返回结果",response)
                // alert(response.data.msg)
            }).catch(error=>{
                alert(erro)
            })
            
            },
            
			asideSelect(key, keyPath) {
				this.slideMenuActive = key
				//跳转到指定页面
				this.$router.push({
					name: this.slideMenus[key].pathname
				});
			}
		}
	}
</script>

<style>

</style>
