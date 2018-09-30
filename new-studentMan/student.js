/**
 * student.js
 * 封装了（增删查改的方法）
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 *
 * 这里才是我们学习 Node 的精华部分：奥义之所在
 * 封装异步 API
 */
//引包fs
var fs = require('fs')

//文件路径
var dbPath = './db.json' 

/**
 * 获取所有学生列表
 * 这里callback传两个参数()
 * 		第一个参数 null
 * 			成功： null
 * 			错误： 错误对象
 * 		第二个参数 结果
 * 			成功： 数组
 * 			错误： undefined
 * return[]
 */
exports.find = function(callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		//这里callback传两个参数()
		callback(null,JSON.parse(data).students)//学生数组
	})
}

/**
 * 根据id获取学生对象
 * @param  {[number]}   id       [学生id]
 * @param  {Function} callback [回调函数]
 */
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
			if(err){
				return callback(err)
			}
			var students = JSON.parse(data).students
			var ret = students.find(function(item){
				return item.id === parseInt(id)
			})
			//这里callback传两个参数()
			callback(null,ret)
	})	
}
/**
 * 添加保存学生
 *	 //先读取文件，转成对象
 *	  //往对象里push数据
 *	  //把对象转成字符串
 *	  //把字符串再次写入文件 		 
 * 	
 */
exports.save = function(student,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
			if(err){
				return callback(err)
			}
			//先读取文件，转成对象
			var students=JSON.parse(data).students

			//处理id唯一不重复
			student.id = students[students.length-1].id+1

			//往对象里push数据,用户传递的对象保存到数组中
			students.push(student)
			//把对象转成字符串
			var fileData = JSON.stringify({
				students:students
			})
			//把字符串再次保存写入文件 
			fs.writeFile(dbPath,fileData,function(err){
				if(err){
					//错误就是把错误对象传递给它
					return callback(err)
				}
				//成功就没错，所以错误对象是null
				callback(null)
			})

	})	
}

/**
 * 编辑更新学生
 */
exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
			if(err){
				return callback(err)
			}
			//先读取文件，转成对象
			var students=JSON.parse(data).students

			//这里记得把id统一转换为int属性（解决了无法多次改变的问题）
			 student.id = parseInt(student.id)

			//修改谁，通过id寻找到谁
			//EcmaScript 6中的一个数组方法：find
			//需要接受函数作为一个参数
			//当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
			var stu = students.find(function(item){
				return item.id == student.id  //return一个布尔值
			})

			// 遍历拷贝对象
			for(var key in student){
				stu[key]=student[key]
			}

			//把对象转成字符串
			var fileData = JSON.stringify({
				students:students
			})

			//把字符串再次保存写入文件 
			fs.writeFile(dbPath,fileData,function(err){
				if(err){
					//错误就是把错误对象传递给它
					return callback(err)
				}
				//成功就没错，所以错误对象是null
				callback(null)
			})			
			
	})	
}

/**
 * 删除学生
 */
exports.deleteById = function(id,callback){
	fs.readFile(dbPath,'utf-8',function(err,data){
			if(err){
				return callback(err)
			}
			//先读取文件，转成对象
			var students=JSON.parse(data).students

			//findIndex方法专门用于根据条件查找元素下标 ecmaScript
			var deleteId = students.findIndex(function(item){
				return item.id === parseInt(id)
			})
			// 根据下标从数组中删除对应的学生对象
			students.splice(deleteId,1)  //splice(删除的参数，删除个数)

			//把对象转成字符串
			var fileData = JSON.stringify({
				students:students
			})

			//把字符串再次保存写入文件 
			fs.writeFile(dbPath,fileData,function(err){
				if(err){
					//错误就是把错误对象传递给它
					return callback(err)
				}
				//成功就没错，所以错误对象是null
				callback(null)
			})						
	})		
}