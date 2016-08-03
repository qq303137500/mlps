 var toast = {
		 intervalCounter : 0,  
		 hideToast : function(){     
			 var alert = document.getElementById("toast");   
			 alert.style.opacity = 0;   
			 clearInterval(toast.intervalCounter);
		 },  
 		 drawToast : function(message){   
			 var alert = document.getElementById("toast");
			 if (alert == null){   
			 var toastHTML = '<div id="toast">' + message + '</div>';   
			 document.body.insertAdjacentHTML('beforeEnd', toastHTML);   
			 }   
			 else{   
				 alert.innerHTML = message;
				 alert.style.opacity = .9;  
			 }   
			 toast.intervalCounter = setInterval("toast.hideToast()", 1000);   
		 },
		 alert : function(message){   
			 toast.drawToast(message);   
		 },
		 alert_begin:function(message){   
			 var alert = document.getElementById("toast");
			 if (alert == null){   
			 var toastHTML = '<div id="toast">' + message + '</div>';   
			 document.body.insertAdjacentHTML('beforeEnd', toastHTML);   
			 }   
			 else{   
				 alert.innerHTML = message;
				 alert.style.opacity = 0.9;  
			 }     
		 },
		 alert_end:function()
		 {
			 var alertObj=document.getElementById('toast');
			 alertObj.parentNode.removeChild(alertObj); 
		 }
 }