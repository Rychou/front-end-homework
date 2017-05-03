var oOut = document.getElementById('out');
		var oText = document.getElementById('text');
		var oSend = document.getElementById('send');
		var oId = document.getElementById('id');
		var oChat = document.getElementById('chat');
		var oCall = document.getElementById('callMe');
		var arrImg = ['img/smile.png','img/cool.png'];
		var num = 0;
		oId.onclick = function(){
			num ++;
			if (num == 2) {
				num=0;
			}
			oId.src = arrImg[num];	
		};
		oSend.onclick = function(){	
		if (num ==0) {
			oOut.innerHTML = oOut.innerHTML +  '<div style="float:left; clear:both;">' + '<img src='+ arrImg[num] +'>' + ':' + oText.value + '<br/>' +'</div>' ;
			oText.value = '';
		}
		else{
			oOut.innerHTML = oOut.innerHTML + '<div style="float:right; clear:both; ">' + '<div style = "background:#2fdb2f;  border-radius:5px; float:left;height:33px; line-height:33px; padding:0 5px; margin-right:5px;" >' +  oText.value +'</div>' + '<img src='+ arrImg[num] +'>' + '</div>' + '<br/>' + '</div>' ;
			oText.value = '';	
			
		}
		};
		oCall.onclick = function(){
			oChat.style.display = 'block';
		};
	};