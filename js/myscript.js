// $(function(){
// 껍데기 body영역 맨끝에 넣었으니까 굳이 없어도 됨
// })

//5.스크롤 이벤트
//5-(6)-2
$(window).scroll(function(){
   var sct = $(this).scrollTop();
   if ($('html').hasClass('moblie') ) {
      if (sct > 50) {
         $('.to_top').show()
      } else {
         $('.to_top').hide()
      }
   } else {
      $('.to_top').show()
   }
})

$('.to_top').on("click", function(){
   $('body, html').animate({
      scrollTop:"0px"
   },600)  
})


//5-(5)-2 함수 만들기
function init() {
   var winWidth = $(this).width()
   if ( winWidth > 799 ) {
      $('#header').removeClass("on")
      //5-(4) html에 클래스 더해주기
      $('html').addClass('minTb').removeClass('moblie')
      //5-(6)-1 큰버전일 때, to_top버튼 보이게
      $('.to_top').show()
   } else {
      $('html').addClass('moblie').removeClass('minTb')
   }
}

//4. 리사이즈 이벤트
$(window).resize(function(){
   init()
}) 

//5-(5)-1 load 메소드 : 읽는 순간 강제 이벤트
$(window).load(function(){
   //6-(3) loadingAni박스를 사라지게 하기
   $('.loadingAni').delay(1000).fadeOut(500)
   init()
})

//1-(2)서브메뉴2개이상이벤트:포커스 이벤트 한정요소이기 때문에 a 요소 지목
$('.depth1 >li >a').on("mouseover focus", function(){
   //3. 모바일화면상에서 헤더에 클래스 on을 가지고 있으면 dep2box가 안보이도록 if문 시용
   // on이 아닌경우에 이전에 썼던 내용은 else안에 잘라넣기!!
   if ( $(this).parents('#header').hasClass("on")){
      $(this).next().css({display:"none"})
   } else {
      $(this).next().stop().fadeIn(200)
      //1-(3)전에 것이 겹쳐서 나오니까 this와의 관계따져서 
      $(this).parent().siblings().find('.dep2box').stop().fadeOut(200)
   }
   
})

//1-(4)서브메뉴로 오버했을 때 사라지지 않게. . .focus 아닌 이상 a 지목X
$('.depth1 >li').on("mouseleave", function(){
   $(this).children('.dep2box').stop().fadeOut(400)
})

//1-(5)마지막 것 focus벗어나기(다른애들은 (3)siblings에서 슬라이드업해서 괜춘)
$('.depth1 >li:last .depth2 >li:last >a').on("blur", function(){
   $(this).parents('.dep2box').stop().fadeOut(400)
})


//2-(1) 햄버거 메뉴박스 열리고 
$('#header .openMOgnb').on("click", function(){
   if ( !$(this).parents('#header').hasClass("on") ) {
      $(this).parents('#header').addClass("on")
   }
})

//2-(2) 엑스 버튼누르면 접히고
$('#header .closeMOgnb').on("click", function(){
   $(this).parents('#header').removeClass("on")
})

