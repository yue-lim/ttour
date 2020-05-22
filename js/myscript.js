// $(function(){
// 껍데기 body영역 맨끝에 넣었으니까 굳이 없어도 됨
// })

//1-(2)서브메뉴2개이상이벤트:포커스 이벤트 한정요소이기 때문에 a 요소 지목
$('.depth1 >li >a').on("mouseover focus", function(){
   $(this).next().stop().fadeIn(400)
   //1-(3)전에 것이 겹쳐서 나오니까 this와의 관계따져서 
   $(this).parent().siblings().find('.dep2box').stop().fadeOut(400)
})

//1-(4)서브메뉴로 오버했을 때 사라지지 않게. . .focus 아닌 이상 a 지목X
$('.depth1 >li').on("mouselesve", function(){
   $(this).children('.dep2box').stop().fadeOut(400)
})

//1-(5)마지막 것 focus벗어나기(다른애들은 (3)siblings에서 슬라이드업해서 괜춘)
$('.depth1 >li:last .depth2 >li:last >a').on("blur", function(){
   $(this).parents('.dep2box').stop().fadeOut(400)
})


//2-(1) 햄버거 메뉴박스 열리고 
$('#header .openMOgnb').on("click", function(){
   $(this).parents('#header').addClass("on")
})

//2-(2) 엑스 버튼누르면 접히고
$('#header .closeMOgnb').on("click", function(){
   $(this).parents('#header').removeClass("on")
})

