/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

var fs = require('fs')
//加载student.js进来
var Student = require('./student')

//这样封装函数的方法也不方便
// module.exports=function(app){
// 	console.log(app);
// }

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
//1.创建一个路由容器
var router = express.Router()
//2.把路由都挂载到路由容器中
/**
 * 所有路由配置
 */
/************************************获取所有学生列表***********************************/
router.get('/students',function(req,res){
	//测试代码
	// fs.readFile('./db.json',function(err,data){
	// 	if (err) {
	// 	      return res.status(500).send('Server error.')
	// 	    }
	// 	 res.render('index.html',{
	// 	 	items: [
	// 	 		'成绩信息',
	// 	 		'课程安排',
	// 	 		'教师安排',
	// 	 		'就业信息',
	// 	 		'学生服务'
	// 	 	],
	// 	 	students:JSON.parse(data.toString()).students
	// 	 })		
	// })
	
	//若需要获取一个函数中的异步操作的结果，则必须通过 回调函数 来获取
	Student.find(function(err,students){
		if (err) {
		      return res.status(500).send('Server error.')
		    }
		 res.render('index.html',{
		 	items: [
		 		'成绩信息',
		 		'课程安排',
		 		'教师安排',
		 		'就业信息',
		 		'学生服务'
		 	],
		 	students:students
		 })		
	})
})

/*******************************添加学生***********************************/
//渲染添加学生页面
router.get('/students/new',function(req,res){
	res.render('new.html')
})

//处理添加学生请求
router.post('/students/new',function(req,res){
 // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化  	
  // 3. 发送响应
  // console.log(req.body);
  // 调用save方法
  Student.save(req.body,function(err){
	if (err) {
		return res.status(500).send('Server error.')
	 }
	 //没有问题返回首页
	 res.redirect('/students')  		
  })
})

/*******************************编辑学生***********************************/
//渲染编辑页面 
router.get('/students/edit',function(req,res){
	//1.在客户端列表页设置链接问题（需要有 id 参数）
	//2.获取要编辑的学生id
	//3.渲染编辑页面
	
	//调用者，调用了findById方法
	Student.findById(parseInt(req.query.id),function(err,student){
		if(err){
			 return res.status(500).send('Server error.')
		}
		// console.log(student)
		res.render('edit.html',{
			student:student
		})
	})
})


//处理编辑请求
router.post('/students/edit',function(req,res){
	//1.先获取表单数据 ———— body-parser包作用
	//		req.body
	//2.保存更新
	//		Student.updateById()方法
	//3.发送响应
	// console.log(req.body)
	
	Student.updateById(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})


/*******************************删除学生***********************************/
//处理删除请求
router.get('/students/delete',function(req,res){
	// 1. 获取要删除的 id
  // 2. 根据 id 执行删除操作
  // 3. 根据操作结果发送响应数据	
	Student.deleteById(req.query.id,function(err){
		if(err){
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

//把router导出
module.exports = router  //谁加载谁得到router 

