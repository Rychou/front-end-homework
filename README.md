
# Rychou

* [homeWork](./myhomework/) WEB作业
	* [首页](./myhomework/index.html) 
	* [详细页](./myhomework/video.html)
    * [登录界面](./myhomework/logIn.html) 
    * [注册界面](./myhomework/signUp.html) 
    * [自我介绍](./myhomework/myinf.html) 
# 开发报告 
## 1.策划思路

**策划思路**来自于**豆瓣**以及**IMDb**等影评网站，以及一个外国的在线观影网站 **[goMovie](https://gomovies.to/)**(本站被墙)。最初的思路是本人在这个网站看过几部电影后，当时我还苦恼于不知道期末大作业要设计成什么主题的网站，想了一下，发现自己的基础足够做出一个页面效果不错的网站，于是思路就来了。

**期望达到的效果**是大致做出**豆瓣影评**的效果以及**goMovie**里的主页效果
![Markdown](http://i4.buimg.com/1949/2ef94566699d1ef8.png)
![Markdown](http://i2.muimg.com/1949/971d8204fec06661.png)

内容来源也基本是豆瓣与goMovie这两个网站，详细页中的预告片是来自于优酷的视频框架，也有一部分是根据自己最近所学添加进去的，比如简单的选项卡：

![Markdown](http://i2.muimg.com/1949/548fa97effb54977.png)
![Markdown](http://i2.muimg.com/1949/765af1042b856750.png)

## 2.页面结构说明

页面由五个界面组成，包括

* [首页](./myhomework/index.html) 首页作用
* [影评页面](./myhomework/video.html) 即为详细页
* [登录界面](./myhomework/logIn.html) 根据自己所学制作，可作为表单界面
* [注册界面]() 作为表单页面，目前尚未完成(5/16)
* [自我介绍页](./myhomework/myinf.html) 可作为列表页

## 3.技术指标

* 兼容主流浏览器，IE8+
* 使用HTML4,CSS2,Javascript
* 开发工具：Chrome,Sublime Text及其插件

## 4.技术点说明

**4.1.首页热门电影动态切换效果 [链接](./myhomework/index.html)**

该动态效果基于CSS3的transition与transform两个属性以及opacity这个属性，技术难点在于对这几个属性的掌握程度

**transform 基本介绍**


>**none 表示不进行变换**；

>**rotate 旋转**；  transform:rotate(20deg) 旋转角度可以为负数。需要先有transform-origin定义旋转的基点可为left top center right bottom 或坐标值（50px 70px）。

>**skew  扭曲**        transform:skew(30deg,30deg)  skew(相对x轴倾斜,相对y轴倾斜)

>**scale  缩放**      transform:scale(2,3) 横向放大2倍，纵向放大3倍。如等比放大写一个参数即可。

**transition 基本介绍**

W3C标准中对CSS3的transition这是样描述的:“CSS的transition允许CSS的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。

transition 主要包含四个属性值：

>transition-property： 执行变换的属性；

>transition- duration：      变换延续的时间：

>transition-timing-function：    在延续时间段，变换的速率变化；

>transition- delay ：变换延迟时间

	
**opacity 基本介绍**

opacity是透明度的意思，通过可以设置元素的透明度。比如说一个元素的opacity属性设置为opacity(0.3)，那该元素透明度为70%。opacity(1)代表不透明。

**最终解决方案**

以下为简要思路说明，一共两个div.

**一开始**

图片的div(class="video")的opacity(1)(可无)，动态变换后的div(class="mask")的opacity(0),transform:scale(0.3);

**.video:hover 后**

图片Div的transform:scale(0.3);opacity(0);

.mask{transform:scale(1);opacity(1);}

**关键代码**

	 .mask{
		transform: scale(0.3);
		transition: all 0.5s ease;
		filter: alpha(opacity=0);
	 	opacity: 0;
	 }
	.video img{
	 transform: scaleY(1);
	 transition: all 0.7s ease-in-out;
 	}
	.video:hover img{
	  transform: scale(0.1);
	  filter: alpha(opacity=0);
	  opacity: 0;
	 }
	.video:hover .mask{
	  transform: scale(1);
	  filter: alpha(opacity=100);
	  opacity: 1;
	 }


**4.2 详细页的二维码选项卡效果 [链接](./myhomework/video.html)**

该效果主要运用了js的点击事件来改变css样式实现


**Js部分说明**

实现原理其实挺简单的，如下。一共两个div，一个wechat，一个zhifubao。一开始影藏zhifubao(display:none;)；当发生点击事件后，将wechat隐藏(display:none;),将zhifubao显示(display:block;)

关键代码

	<span class="on" id="wechat">微信</span>
	<span class="off" id="zhifubao">支付宝</span>
	<div class="QR_cont">
		<img src='http://i4.buimg.com/1949/48e44e9ad74be097.png' width="250" height="250" id="img1">
		<img src='http://i2.muimg.com/1949/50e198ca7616899e.png' width="250" height="250" id="img2">
	</div>
	<script>
		var oWc = document.getElementById("wechat");
		var oZfb = document.getElementById("zhifubao");
		oWc.onclick = function(){
			oWc.className = "on";
			oZfb.className = "off";		
			document.getElementById("img1").style.display = "block";
			document.getElementById("img2").style.display = "none";	
			oZfb.style.background = "#B2AEAE";
		};
		oZfb.onclick = function(){
			oZfb.className = "on";
			oWc.className = "off";
			document.getElementById("img1").style.display = "none";
			document.getElementById("img2").style.display = "block";
			document.getElementById("img2").style.borderColor = "#32A5E7";
			oZfb.style.background = "#32A5E7";

		};
	</script>

**4.3登录界面样式以及简单的密码验证 [链接](./myhomework/logIn.html)**

样式主要通过css的样式设计完成，还使用了两个矢量图标。简单的密码验证通过js。


**js代码**

	<script>
	
		var oA1 = document.getElementById('a1');
		var oText = document.getElementById('id');
		var oPw = document.getElementById('password');
		var oDel1 = document.getElementById('del1');
		var oDel2 = document.getElementById('del2');
		var oUser = document.getElementById('user');
		oA1.onclick = function(){
			if (oText.value == '' || oPw.value == '') {
				alert('用户名和密码不能为空');
				
			}
			else if(oPw.value.length<6){
				alert("密码长度不得低于六位");
			}
		};
		oDel1.onclick = function(){
			oText.value = '';
		};
		oDel2.onclick = function(){
			oPw.value = '';
		};
	
	</script>

### 开发心得 ###


### 开发过程中的总结 ###

整个网站开发的过程估计花了6个星期，第一个星期用来构思，当时还没有一个好的思路该做一个怎样的网站。最终的在看电影的过程中突发奇想，就有了这个网站的一个设计思路了。后来花了好几个星期一点一点的完善自己的网站，从中也提升了很多。

### 对本课程的感想与展望 ###

这门课和老师教给我很多很多实用的东西，让我对计算机以及web前端开发有了更深刻的理解，这门课也是我最上心的一门课，这门课和老师真的很棒。希望以后老师能教我更多的东西。
