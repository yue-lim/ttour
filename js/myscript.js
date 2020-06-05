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
   //ScrollEvent 2. 양사이드에서 나오는 스크롤이벤트
   //sct값은 scrollTop값 먼저 구해보고 적당한 값
   if (sct >1000) {
      $('.appbbs_box').addClass('on')
   } else {
      $('.abbbbs_box').removeClass('on')
   }
})

$('.to_top').on("click", function(){
   $('body, html').animate({
      scrollTop:"0px"
   },600)  
})

//8-(1) 전역변수로 바꿔주기
var winWidth
//5-(5)-2 함수 만들기
function init() {
      winWidth = $(this).width()
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
   $('.loadingAni').delay(500).fadeOut(500)
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


var lieg; //popArow 3-(2) 전역변수로 선언
//7-(4)-1 a를 click했을 때, 링크로 이동안하게 e.preventDefault();
$('.place_list >li >a').on("click", function(e){
   e.preventDefault();
   // popArow 3-(1) 변경해야하니까 a list 의 번호를 부름
   lieq = $(this).parent().index()
   //7-(4)-2 변수는 이름 그대로 속성은 attr 내용은 text로
   var href = $(this).attr("href")
   var src = $(this).attr("data-src")
   var text = $(this).find("h3").text()
   var info = $(this).find("p").text()
   var alt = $(this).find("img").attr("alt")
   //7-(5) 팝업창 띄우고 각각 추출값넣기
   $('.popupBox').addClass("on")
   //8-(2) 799이하일 때 팝업창 위치
   if (winWidth <= 799) {
      var litop = $(this).parent().offset().top;
      //8-(3) 위치, 넓이  등 스타일 추가 및 삭제
      $('.popupBox .inner').css ({
         top: litop,
         width :"80%",
         left:"0%",
         transform:"translate(0%)",
         margin:"0 10%"
      })
   }
   $('.popupBox .inner h3').text(text)
   $('.popupBox .inner p').text(info)
   $('.popupBox .inner div a').attr("href", href)
   //8-(4) 더 줄였을 때 img가 튀어나오니,,, attr("width","")값을 추가로 잡아줌
   $('.popupBox .inner div img').attr("src", src).attr("alt", alt).attr("width", "100%")
   
})

//7-(6) 닫기버튼 활성화 
$('.popupBox button.close').on("click", function(){
   $(this).parents(".popupBox").removeClass("on")
})

//popArow 4 -(1) lieq 2 1 0 -1 음수 되지않고 다시 2로 돌아오기 if로 
$('.popupBox button.prev').on("click", function(){
   --lieq;
   if (lieq <0 ) {
      lieq = 2;
   }
   //popArow 4 - (2) 변수 이름은 안에서만 선언했기때문에 굳이 변경 안해도 됨
   var href = $(".place_list >li").eq(lieq).find("a").attr("href")
   var src = $(".place_list >li").eq(lieq).find("a").attr("data-src")
   var text = $(".place_list >li").eq(lieq).find("a").find("h3").text()
   var info = $(".place_list >li").eq(lieq).find("a").find("p").text()
   var alt = $(".place_list >li").eq(lieq).find("a").find("img").attr("alt")

   $('.popupBox .inner h3').text(text)
   $('.popupBox .inner p').text(info)
   $('.popupBox .inner div a').attr("href", href)
   $('.popupBox .inner div img').attr("src", src).attr("alt", alt).attr("width", "100%")
})

//popArow 5 반대쪽도 해줌 .length 속성이라 ()안씀
$('.popupBox button.next').on("click", function(){
   ++lieq;
   if (lieq == $('.place_list >li').length ) {
      lieq = 0;
   }
   
   var href = $(".place_list >li").eq(lieq).find("a").attr("href")
   var src = $(".place_list >li").eq(lieq).find("a").attr("data-src")
   var text = $(".place_list >li").eq(lieq).find("a").find("h3").text()
   var info = $(".place_list >li").eq(lieq).find("a").find("p").text()
   var alt = $(".place_list >li").eq(lieq).find("a").find("img").attr("alt")

   $('.popupBox .inner h3').text(text)
   $('.popupBox .inner p').text(info)
   $('.popupBox .inner div a').attr("href", href)
   $('.popupBox .inner div img').attr("src", src).attr("alt", alt).attr("width", "100%")
})



//S 3 슬라이더박스
$('.visualRoll').slick({
   autoplay: true, //기본값 false
   autoplaySpeed: 3000, //슬라이드 지연시간 
   dots: true, // 기본값 false, 슬라이드 번호 버튼;동그라미버튼
   speed: 600, // 바뀌는 시간(생략가능)
   slidesToShow: 1, // 보여질 슬라이드 수(생략가능) ;여러개의 작은 이미지 에서 화살표 클릭하면 다음 이미지로 넘어가는 데 처음 보여지는 슬라이드 수
   slidesToScroll:1, // 이동 슬라이드 수(생략가능) ;위에 넘어갈 때 이미지를 몇개씩 이동하는 지 
   pauseOnHover: true, //마우스 오버시 슬라이드 멈추지 않게 (스마트폰이용시 우선false)(생략가능) 
   pauseOnDotsHover: true, //슬라이드 번호 버튼 위에 마우스 오버시 멈춤여부
   pauseOnFocus: false, // 슬라이드 버튼 클릭 시 자동실행 멈춤여부
   cssEase: 'linear', //슬라이드 움직임에 대한 가속도 함수값(생략가능) 
   draggable: true, //마우스 드래그로 움직이는 거 -> true(생략가능) 
   fade: false, // true이면 밀고 들어오는 형태가 아닌 제자리에서 사라지고 나타남(생략가능) 
   arrows: true, //기본값 true (Previous//Next버튼)(생략가능) 
   prevArrow: '<button class="prevArrow marrow"><i class="fas fa-angle-left"></i></button>',
   nextArrow: '<button class="nextArrow marrow"><i class="fas fa-angle-right"></i></button>',
})

//PBtn 1. 여러 이벤트를 수행시킬 경우, toggle() 사용
// $('.plpa').toggle(
//    function(){
//       $('.visualRoll').slick('slickPause')
//       //PBt 2. i font바꾸기
//       $(this).find("i").removeClass("fa-pause").addClass('fa-play')
//    },
//    function(){
//       $('.visualRoll').slick('slickPlay')
//       $(this).find("i").removeClass("fa-play").addClass('fa-pause')
//    }
// )

//PBtn 3. toggle PlugIn 외 방법
$('.main_rolling_pc .plpa').on("click", function(){
   if($(this).find("i").hasClass('fa-pause')) {
      $('.visualRoll').slick('slickPause')
      $(this).find("i").removeClass("fa-pause").addClass('fa-play')
   } else {
      $('.visualRoll').slick('slickPlay')
      $(this).find("i").removeClass("fa-play").addClass('fa-pause')
   }
})

//PlayRoll2 - 2 위에꺼 복붙하고 slideToShow갯수 등 수정
$('.multi_rolling .multi_visual').slick({
   autoplay: true, 
   autoplaySpeed: 3000, 
   dots: false, 
   speed: 600, 
   //PlayRoll3 - 2 centerMode , centerPadding 추가
   centerMode: true,
   centerPadding:'80px', //끄트머리 조각의 넓이
   slidesToShow: 3, 
   slidesToScroll:1, 
   pauseOnHover: true, 
   pauseOnDotsHover: true, 
   pauseOnFocus: false, 
   cssEase: 'linear', 
   draggable: true, 
   fade: false, 
   arrows: true, 
   prevArrow: '<button class="prevArrow marrow"><i class="fas fa-angle-left"></i></button>',
   nextArrow: '<button class="nextArrow marrow"><i class="fas fa-angle-right"></i></button>',
   //PlayRoll3 - 3 반응형 수정
   responsive:[{
      breakpoint:800, //799기준이니까 1px더한 값
      settings:{
         centerMode: true,
         centerPadding:'100px',
         slidesToShow: 1
      }
   }]
})
