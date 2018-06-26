
// NAVBAR

var didScroll, lastScrollTop = 0;

var navbar = {
  duration: 300,
  delta: 50,
  transitioning: false,
  minimize: function () {
    if (this.el.hasClass('is-maximized')) {
      this.transition();
    }

    this.el.removeClass('is-maximized').addClass('is-minimized');
  },
  maximize: function () {
    if (this.el.hasClass('is-minimized')) {
      this.transition();
    }
    this.el.removeClass('is-minimized').addClass('is-maximized');
  },
  transition: function () {
    var _this = this;





    _this.el.find('.top-section').css('visibility', 'visible');


    _this.transitioning = true;
    _this.el.css({
      '-webkit-transform': 'transform ' + _this.duration + 'ms',
      '-moz-transform': 'transform ' + _this.duration + 'ms',
      '-ms-transform': 'transform ' + _this.duration + 'ms',
      '-o-transform': 'transform ' + _this.duration + 'ms',
      'transition': 'transform ' + _this.duration + 'ms'
    });


    setTimeout(function () {
      _this.el.css('transition', 'none');
      _this.transitioning = false;

      if (_this.el.hasClass('is-minimized')) {
        _this.el.find('.top-section').css('visibility', 'hidden');
      }
    }, _this.duration)

  },
  handleScroll: function () {

    var st = $(window).scrollTop();
    var navbar_height = this.el.outerHeight();


    if (Math.abs(lastScrollTop - st) <= this.delta || this.transitioning)
      return;


    if (st > lastScrollTop && st > navbar_height) {
      this.minimize();
    }

    else if (st + $(window).height() < $(document).height()) {
      this.maximize();
    }

    lastScrollTop = st;
  },
  handleLogoClick: function (e) {
    e.preventDefault();
    this.maximize();
  },
  init: function (id) {

    var _this = this;
    _this.el = $(id);


    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        _this.handleScroll();
        didScroll = false;
      }
    }, 50);

    var logo = _this.el.find('.bottom-section .navbar-logo');
    logo.on('click', function (e) {
      _this.handleLogoClick(e);
    });
  }
};

navbar.init('#navbar');




// NAVBAR 2

$(document).ready(function () {
  $('html').on('DOMMouseScroll mousewheel', function (e) {
    if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
      //scroll down
      console.log('Down');
      $("#header-nav").addClass("hide-nav-bar");
    } else {

      console.log('Up');
      $("#header-nav").removeClass("hide-nav-bar");
    }

  });



  $('body').addClass('js');
  var $menu = $('#menu'),
    $menulink = $('.menu-link');

  $menulink.click(function () {
    $menulink.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });

  var toggled = 0;

  $('.menu-link').click(function () {
    if (toggled == 0) {
      $('.bar3').stop().transition({ rotate: "45", "margin-top": "13px" });
      $('.bar2').stop().transition({ opacity: "0" }, "fast");
      $('.bar1').stop().transition({ rotate: "-45", "margin-top": "13px" });
      toggled++;
      console.log("toggled down")
    }
    else {

      $('.bar3').stop().transition({ rotate: "+=135", "margin-top": "3px" });
      $('.bar2').transition({ opacity: "1" }, "fast");
      $('.bar1').stop().transition({ rotate: "-=135", "margin-top": "23px" });
      toggled--;
      console.log("Togged Up")
    }

  });
});





// $('#toggle').click(function () {
//   $(this).toggleClass('active');
//   $('#overlay').toggleClass('open');
// });

// $('#toggle').click(function () {
//   $(this).toggleClass('active');
//   $('#name').toggleClass('open');
// });



// CHANGE SITE COLOR

$(document).ready(function () {
  $('.section').click(function () {
    $('.wrap > div').removeClass('highlight');

    $('#' + $(this).data('color')).addClass("highlight");
  });
});


// ANIMATION PROJECTS

$(document).ready(function () {
  $('div').mouseover(function () {
    $(this).addClass($(this).data('class') + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
    });
  })
})


// TEXT EFFECT UPDATE

$('[data-text]').on('keyup', function () {
  $(this).attr('data-text', $(this).text());
});


//   CONTACT FORM

function captchaCode() {
  var Numb1, Numb2, Numb3, Numb4, Code;
  Numb1 = (Math.ceil(Math.random() * 10) - 1).toString();
  Numb2 = (Math.ceil(Math.random() * 10) - 1).toString();
  Numb3 = (Math.ceil(Math.random() * 10) - 1).toString();
  Numb4 = (Math.ceil(Math.random() * 10) - 1).toString();

  Code = Numb1 + Numb2 + Numb3 + Numb4;
  $("#captcha span").remove();
  $("#captcha input").remove();
  $("#captcha").append("<span id='code'>" + Code + "</span><input type='button' onclick='captchaCode();'>");
}

$(function () {
  captchaCode();

  $('#contactForm').submit(function () {
    var captchaVal = $("#code").text();
    var captchaCode = $(".captcha").val();
    if (captchaVal == captchaCode) {
      $(".captcha").css({
        "color": "#609D29"
      });
    }
    else {
      $(".captcha").css({
        "color": "#CE3B46"
      });
    }

    var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})+$/;
    var emailText = $(".email").val();
    if (emailFilter.test(emailText)) {
      $(".email").css({
        "color": "#609D29"
      });
    }
    else {
      $(".email").css({
        "color": "#CE3B46"
      });
    }

    var nameFilter = /^([a-zA-Z \t]{3,15})+$/;
    var nameText = $(".name").val();
    if (nameFilter.test(nameText)) {
      $(".name").css({
        "color": "#609D29"
      });
    }
    else {
      $(".name").css({
        "color": "#CE3B46"
      });
    }

    var messageText = $(".message").val().length;
    if (messageText > 50) {
      $(".message").css({
        "color": "#609D29"
      });
    }
    else {
      $(".message").css({
        "color": "#CE3B46"

      });
    }

    if ((captchaVal !== captchaCode) || (!emailFilter.test(emailText)) || (!nameFilter.test(nameText)) || (messageText < 50)) {
      return false;
    }
    if ((captchaVal == captchaCode) && (emailFilter.test(emailText)) && (nameFilter.test(nameText)) && (messageText > 50)) {
      $("#contactForm").css("display", "none");
      $("#form").append("<h2>Wiadomość została wysłana!</h2>");
      return false;
    }
  });
});






// CONTACT FORM 

$(document).ready(function (e) {
  $("#frmContact").on('submit', (function (e) {
    e.preventDefault();
    $("#mail-status").hide();
    $('#send-message').hide();
    $('#loader-icon').show();
    $.ajax({
      url: "../php/contact.php",
      type: "POST",
      dataType: 'json',
      data: {
        "name": $('input[name="name"]').val(),
        "email": $('input[name="email"]').val(),
        "phone": $('input[name="phone"]').val(),
        "content": $('textarea[name="content"]').val(),
        "g-recaptcha-response": $('textarea[id="g-recaptcha-response"]').val()
      },
      success: function (response) {
        $("#mail-status").show();
        $('#loader-icon').hide();
        if (response.type == "error") {
          $('#send-message').show();
          $("#mail-status").attr("class", "error");
        } else if (response.type == "message") {
          $('#send-message').hide();
          $("#mail-status").attr("class", "success");
        }
        $("#mail-status").html(response.text);
      },
      error: function () { }
    });
  }));
});



// SCROLL DOWN

$(function () {
  $('a[href*=#]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
  });
});



// OVERLAY MENU

(function () {

  var Menu = (function () {

    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');

    var active = false;

    var toggleMenu = function () {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }

        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }

        active = false;
      }
    };



    var bindActions = function () {
      burger.addEventListener('click', toggleMenu, false);
    };
    var bindActions = function () {
      burger.addEventListener('click', toggleMenu, false);
      menuList.addEventListener('click', toggleMenu, false);
    };
    var init = function () {
      bindActions();
    };

    return {
      init: init
    };



  }());



  Menu.init();

}());





// SMOOTH SCROLL

$('.js-anchor-link').click(function(e){
  e.preventDefault();
  var target = $($(this).attr('href'));
  if(target.length){
    var scrollTo = target.offset().top;
    $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
  }
});