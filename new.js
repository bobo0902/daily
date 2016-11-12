var daily = {};

(function() {
	daily.list = function() {
		var limit = 0;

		function showList(i, data) {
			$(".huiju-list").append('<tr class=><td class="chufang-font5"><a href="index线索详情.html" class="huiju-title" style="display: -webkit-box;display: -moz-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 1;"><span></span></a></td><td class="huiju-author">  </td><td class="huiju-source"></td><td class="huiju-resourceDisplayTypes"></td><td><i class=" huiju-resourceStatus"></i><span class="huiju-resourceStatus-text"></span></td><td class="huiju-publishTime"></td><td><a class="huiju-old btn btn-default " style="text-decoration: none;color:#000;z-index:10000;" target="_blank">原文</a></td><td><div class="btn-group"><button data-toggle="dropdown" class="btn btn-default">分发<i class="fa fa-caret-down" style="color:#111"></i></button><ul class="dropdown-menu pull-right"><li> <a href="javascript:;"> 其他 </a> </li><li> <a href="javascript:;"> 其他 </a> </li><li> <a href="javascript:;"> 其他 </a> </li></ul></div></td></tr>')
			$(".huiju-author").closest("tr").eq(i).addClass(data.resources[i].classId);
			$(".huiju-title").eq(i).find("span").html("").html(data.resources[i].title).addClass(data.resources[i].resourceGuid);
			$(".huiju-author").eq(i).html("").html(data.resources[i].author);
			//$(".huiju-source").eq(i).html("").html(data.resources[i].classId);
			if(data.resources[i].classId == 1024) {
				$(".huiju-source").eq(i).html("").html("互联网热点");
			} else if(data.resources[i].classId == 2048) {
				$(".huiju-source").eq(i).html("").html("微信");
			} else if(data.resources[i].classId == 4096) {
				$(".huiju-source").eq(i).html("").html("微博");
			} else if(data.resources[i].classId == 8192) {
				$(".huiju-source").eq(i).html("").html("站点");
			} else if(data.resources[i].classId == 16384) {
				$(".huiju-source").eq(i).html("").html("外电");
			} else if(data.resources[i].classId == 32768) {
				$(".huiju-source").eq(i).html("").html("自建");
			};

			//$(".huiju-resourceDisplayTypes").eq(i).html("").html(data.resources[i].resourceDisplayType);
			if(data.resources[i].resourceDisplayType == 1) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("视频");
			} else if(data.resources[i].resourceDisplayType == 2) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("音频");
			} else if(data.resources[i].resourceDisplayType == 3) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("视频或音频");
			} else if(data.resources[i].resourceDisplayType == 4) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("图片");
			} else if(data.resources[i].resourceDisplayType == 8) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("文档");
			} else if(data.resources[i].resourceDisplayType == 128) {
				$(".huiju-resourceDisplayTypes").eq(i).html("").html("其它");
			}

			if(data.resources[i].resourceStatus == 1) {
				$(".huiju-resourceStatus").eq(i).addClass("fa fa-check-circle-o chufang-color5-1")
				$(".huiju-resourceStatus-text").eq(i).html("").html("已使用");
			} else if(data.resources[i].resourceStatus == 0) {
				$(".huiju-resourceStatus").eq(i).addClass("fa fa-power-off chufang-color8-1")
				$(".huiju-resourceStatus-text").eq(i).html("").html("未使用");
			} else if(data.resources[i].resourceStatus == 2) {
				$(".huiju-resourceStatus").eq(i).addClass("fa fa-hourglass-1 chufang-color7-1")
				$(".huiju-resourceStatus-text").eq(i).html("").html("待审");
			} else if(data.resources[i].resourceStatus == 3) {
				$(".huiju-resourceStatus").eq(i).addClass("fa fa-history chufang-color6-1")
				$(".huiju-resourceStatus-text").eq(i).html("").html("进行中");
			}

			$(".huiju-publishTime").eq(i).html("").html(data.resources[i].publishTime);
			$(".huiju-old").eq(i).attr("href", data.resources[i].sourceAddr);
		};

		function getList() {
			limit += 20;
			$.ajax({
				type: "post",
				url: "http://100.0.1.61:8080/ClueWeb/api/clue/resources",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				success: function(data) {
					console.log(data)
					var total = data.totalCount
					$(".huiju-total").html("").html(total);
					console.log(limit)
					console.log(total)
					if(limit < total) {
						console.log("还有")
						$(".huiju-list").html("");

						for(var i = 0; i < limit; i++) {
							showList(i, data);
						}
					} else {
						console.log("没有啦")
						$(".huiju-list").html("");
						for(var i = 0; i < (total); i++) {
							showList(i, data);
						}
						stop = false;
					};

					$(".huiju-title").click(function() {
						var listName = $(this).find("span").attr("class")
							//console.log(listName)
						sessionStorage.setItem("guild", listName);
					});
				}
			});
		};

		//left

		$(".sub-menu").find("li").click(function() {
			var name = $(this).find(".title").html();
			var lei = $(this).find(".title").attr("id");
			//console.log(lei)
			//console.log(name)
			$(".huiju-h2").html("").html(name);
			var data = {};
			data.classId = lei;
			$.ajax({
				type: "post",
				url: "http://100.0.1.61:8080/ClueWeb/api/clue/resources",
				dataType: "json",
				data: JSON.stringify(data),
				contentType: "application/json;charset=UTF-8",
				success: function(data) {
					//console.log(data)
					var total = data.totalCount
					$(".huiju-total").html("").html(total);
					console.log(limit)
					console.log(total)
					if(limit < total) {
						console.log("还有")
						$(".huiju-list").html("");
						for(var i = 0; i < limit; i++) {
							showList(i, data);
						}
					} else {
						console.log("没有啦")
						$(".huiju-list").html("");
						for(var i = 0; i < (total); i++) {
							showList(i, data);
						}
						stop = false;
					};

					$(".huiju-title").click(function() {
						var listName = $(this).find("span").attr("class");
						//console.log(listName)
						sessionStorage.setItem("guild", listName);
					});
				}
			});

		});

		//right
		getList();

		var stop = true;
		$(window).scroll(function() {
			totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
			if($(document).height() <= totalheight) {
				if(stop == true) {
					console.log("到底了");
					getList();
				}
			}
		});

		var arr1 = [];
		var arr2 = [];
		var arr3 = [];

		Array.prototype.unique = function() {
			var res = [];
			var json = {};
			for(var i = 0; i < this.length; i++) {
				if(!json[this[i]]) {
					res.push(this[i]);
					json[this[i]] = 1;
				}
			}
			return res;
		}

		/*$(".dianji").click(function() {
			for(var i = 0; i < $("#queryList").find(".left").length - 1; i++) {
				var name = $("#queryList").find(".left").eq(i).find("button").attr("title").split(",");
				arr1.push(name);
			}
			//console.log(arr1.join().split(",").unique())
		});*/

		$(".daily-author").click(function() {
			$(".daily-author-c").css("display", "block");
			$(".daily-close").click(function() {
				$(".daily-author-c").css("display", "none");
			});

			$(".daily-author-c").find("input").focus(function() {
				$(this).css({
					"outline": "0px",
					"background": "#fff8f8",
					"border": "1px solid #f95759"
				});
			});

			$(".daily-author-c").find("input").blur(function() {
				$(".daily-author-c").css("display", "none");
				var author = $(this).val();
				if(author == "") {
					$(".daily-author").find("span").html("").html("作者：全部");
				} else {
					$(".daily-author").find("span").html("").html(author);
					var data = {};
					data.author = author;
					$.ajax({
						type: "post",
						url: "http://100.0.1.61:8080/ClueWeb/api/clue/resources",
						dataType: "json",
						data: JSON.stringify(data),
						contentType: "application/json;charset=UTF-8",
						success: function(data) {
							//console.log(data)
							var total = data.totalCount
							$(".huiju-total").html("").html(total);
							console.log(limit)
							console.log(total)
							if(limit < total) {
								console.log("还有")
								$(".huiju-list").html("");
								for(var i = 0; i < limit; i++) {
									showList(i, data);
								}
							} else {
								console.log("没有啦")
								$(".huiju-list").html("");
								for(var i = 0; i < (total); i++) {
									showList(i, data);
								}
								stop = false;
							};

							$(".huiju-title").click(function() {
								var listName = $(this).find("span").attr("class");
								//console.log(listName)
								sessionStorage.setItem("guild", listName);
							});
						}
					});
				}
			});

		});

		$('.selectId1').change(function() {
			//console.log($(this).val())
			var list = $(this).val();
			var arr = [];
			for(var i in list) {
				arr.push(parseInt(list[i]));
				arr.splice(list.length, 1);
			}
			console.log(arr)
			var data = {};
			data.resourceDisplayTypeList = arr;
			$.ajax({
				type: "post",
				url: "http://100.0.1.61:8080/ClueWeb/api/clue/resources",
				contentType: "application/json;charset=UTF-8",
				data: {
					"resourceDisplayTypeList": arr
				},
				dataType: "json",
				data: JSON.stringify(data),
				success: function(data) {
					//console.log(data)
					var total = data.totalCount
					$(".huiju-total").html("").html(total);
					if(limit < total) {
						console.log("还有")
						$(".huiju-list").html("");
						for(var i = 0; i < limit; i++) {
							showList(i, data);
						}
					} else {
						console.log("没有啦")
						$(".huiju-list").html("");
						for(var i = 0; i < (total); i++) {
							showList(i, data);
						}
						stop = false;
					};

					$(".huiju-title").click(function() {
						var listName = $(this).find("span").attr("class");
						//console.log(listName)
						sessionStorage.setItem("guild", listName);
					});
				}
			});
		});

		$('.selectId2').change(function() {
			var mySelectedTopic = $(this).val().toString();
			console.log(mySelectedTopic)
			var data = {};
			data.selectedTopic = mySelectedTopic;
			$.ajax({
				type: "post",
				url: "http://100.0.1.61:8080/ClueWeb/api/clue/resources",
				dataType: "json",
				data: JSON.stringify(data),
				contentType: "application/json;charset=UTF-8",
				success: function(data) {
					//console.log(data)
					var total = data.totalCount
					$(".huiju-total").html("").html(total);
					if(limit < total) {
						console.log("还有")
						$(".huiju-list").html("");
						for(var i = 0; i < limit; i++) {
							showList(i, data);
						}
					} else {
						console.log("没有啦")
						$(".huiju-list").html("");
						for(var i = 0; i < (total); i++) {
							showList(i, data);
						}
						stop = false;
					};

					$(".huiju-title").click(function() {
						var listName = $(this).find("span").attr("class");
						//console.log(listName)
						sessionStorage.setItem("guild", listName);
					});
				}
			});
		});

		$(".daily-yes").click(function() {
			var arr = [];
			var date = new Date();
			console.log(date.getTime())
				//var newTime = new Date(1322195034001); //就得到普通的时间了  


			//console.log($(".iradio_minimal-grey").eq(2).attr("class").split(" ").splice(1, 1).toString())
			//console.log($(".form3").val())

			if($(".iradio_minimal-grey").eq(0).attr("class").split(" ").splice(1, 1).toString() == "checked") {
				if($(".form1").val() == "年") {
					var newTime = new Date(date.getTime() - $(".date1").val() * 31536000000)
					console.log(newTime.getFullYear())
				} else if($(".form1").val() == "月") {
					var newTime = new Date(date.getTime() - $(".date1").val() * 2628000000)
					console.log(newTime.getMonth()+1)
				} else if($(".form1").val() == "日") {
					var newTime = new Date(date.getTime() - $(".date1").val() * 86400000)
					console.log(newTime.getDate())
				}

			} else if($(".iradio_minimal-grey").eq(1).attr("class").split(" ").splice(1, 1).toString() == "checked") {
				if($(".form2").val() == "小时") {
					var newTime = new Date(date.getTime() - $(".date2").val() * 3600000)
					console.log(newTime.getHours())
				} else if($(".form2").val() == "分钟") {
					var newTime = new Date(date.getTime() - $(".date2").val() * 60000)
					console.log(newTime.getMinutes())
				}
			} else if($(".iradio_minimal-grey").eq(2).attr("class").split(" ").splice(1, 1).toString() == "checked") {
				console.log($(".form3").val().split("/").join("-"));
				console.log($(".form4").val().split("/").join("-"));
			}

		});
		
		
		var inputNum=0;
		$(".daily-addFile").click(function(){
			inputNum++;
			$(".input-box").append('<input type="file" class="daily-inp'+ inputNum+'" name="files[]" value=""/>');
			$(".daily-inp"+ inputNum+"").click();
			
			$(".daily-inp"+ inputNum+"").change(function(){
				//(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1")
				var name=$(this).val().replace(/^.+?\\([^\\]+?)?$/gi,"$1");
				//console.log(name)
				
				var size=($(this).prop("files")[0].size / 1048576).toFixed(2);
				//console.log(size)
				
				$(".tab-list").append('<tr style="border-bottom:1px solid #dcdcdc;" class="daily-inp'+ inputNum+'"><td width="50%" style="border-top:0px;display: -webkit-box;display: -moz-box;overflow: hidden;text-overflow: ellipsis;word-break: break-all;-webkit-box-orient: vertical;-webkit-line-clamp: 1;"><i class="fa fa-image margin-right-10" ></i><a style="line-height:24px;">'+ name +'</a></td><td width="20%" style="border-top:0px;">上传人</td><td width="20%" style="border-top:0px;">'+ size +'M</td><td width="10%" style="border-top:0px;" class="daily-inp'+inputNum+'"><i class="fa fa-trash chufang-style31 daily-del"></i></td></tr>')
				//console.log(inputNum);
				
				//console.log( $(".tab-list").find("tr").length);	
				
				/*for(var i=0;i<$(".daily-del").length;i++){
					
					(function(){  
		                $(".tab-list").find("tr")[i].onclick=function(){  
		                    console.log($(this).attr("class"))  
		                }  
		            })(i)
				}*/
				$(".daily-del").click(function(){
					var aaa=$(this).parent().attr("class");
					$("."+aaa +"").remove()
				});
						
						
				
			});
			
			
			
		});
		
		
		
		

	};

	/*------detail-------*/
	daily.detail = function() {
		var guild = sessionStorage.getItem("guild");
		$.ajax({
			type: "get",
			url: "http://100.0.1.61:8080/ClueWeb/api/clue/resource/" + guild,
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			success: function(data) {
				console.log(data)
				$(".huiju-resourceGuid").html("").html("线索来源-" + data.resource.author);
				$(".huiju-title").html("").html(data.resource.title);
				$(".huiju-publishTime").html("").html(data.resource.publishTime);
				$(".huiju-publishTime").next().html("").html(data.resource.author);
				$(".huiju-sourceAddr").attr("href", data.resource.sourceAddr)
				$(".huiju-content").html("").html(data.resource.content);
			}
		});
	};

})();
