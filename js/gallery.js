"use strict";
(function () {
  // Global variables
  var
    userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),
    $body = $("body"),

    isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    windowReady = false,

    plugins = {
      bootstrapTooltip:        $( '[data-toggle="tooltip"]' ),
      bootstrapModal:          $( '.modal' ),
      bootstrapTabs:           $( '.tabs-custom' ),
      captcha:                 $( '.recaptcha' ),
      campaignMonitor:         $( '.campaign-mailform' ),
      copyrightYear:           $( '.copyright-year' ),
      checkbox:                $( 'input[type="checkbox"]' ),
      lightGallery:            $( '[data-lightgallery="group"]' ),
      lightGalleryItem:        $( '[data-lightgallery="item"]' ),
      lightDynamicGalleryItem: $( '[data-lightgallery="dynamic"]' ),
      materialParallax:        $( '.parallax-container' ),
      mailchimp:               $( '.mailchimp-mailform' ),
      popover:                 $( '[data-toggle="popover"]' ),
      preloader:               $( '.preloader' ),
      rdNavbar:                $( '.rd-navbar' ),
      rdMailForm:              $( '.rd-mailform' ),
      rdInputLabel:            $( '.form-label' ),
      regula:                  $( '[data-constraints]' ),
      radio:                   $( 'input[type="radio"]' ),
      search:                  $( '.rd-search' ),
      searchResults:           $( '.rd-search-results' ),
      statefulButton:          $( '.btn-stateful' ),
      viewAnimate:             $( '.view-animate' ),
      wow:                     $( '.wow' ),
      maps:                    $( '.google-map-container' ),
      selectFilter:            $("select"),
      slick:                   $('.slick-slider'),
      swiper:                  document.querySelectorAll( '.swiper-container' ),
      counter:                 document.querySelectorAll( '.counter' ),

    };

  /**
   * @desc Check the element was been scrolled into the view
   * @param {object} elem - jQuery object
   * @return {boolean}
   */
  function isScrolledIntoView ( elem ) {
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }

    // lightGallery
    if (plugins.lightGallery.length) {
        for (var i = 0; i < plugins.lightGallery.length; i++) {
          initLightGallery(plugins.lightGallery[i]);
        }
      }
  
      // Select 2
      if ( plugins.selectFilter.length ) {
        for ( var i = 0; i < plugins.selectFilter.length; i++ ) {
          var select = $( plugins.selectFilter[ i ] );
  
          select.select2( {
            dropdownParent:          $( '.page' ),
            placeholder:             select.attr( 'data-placeholder' ) || null,
            minimumResultsForSearch: select.attr( 'data-minimum-results-search' ) || Infinity,
            containerCssClass:       select.attr( 'data-container-class' ) || null,
            dropdownCssClass:        select.attr( 'data-dropdown-class' ) || null
          } );
        }
      }
  
      // lightGallery item
      if (plugins.lightGalleryItem.length) {
        // Filter carousel items
        var notCarouselItems = [];
  
        for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
          if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
            !$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
            !$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
            notCarouselItems.push(plugins.lightGalleryItem[z]);
          }
        }
  
        plugins.lightGalleryItem = notCarouselItems;
  
        for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
          initLightGalleryItem(plugins.lightGalleryItem[i]);
        }
      }
  
      // Dynamic lightGallery
      if (plugins.lightDynamicGalleryItem.length) {
        for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
          initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
        }
      }
  
      // Countdown
      if ( plugins.countdown.length ) {
        for ( var i = 0; i < plugins.countdown.length; i++) {
          var
            node = plugins.countdown[i],
            countdown = aCountdown({
              node:  node,
              from:  node.getAttribute( 'data-from' ),
              to:    node.getAttribute( 'data-to' ),
              count: node.getAttribute( 'data-count' ),
              tick:  100,
            });
        }
      }
  
  
      // Slick carousel
      if (plugins.slick.length) {
        for (var i = 0; i < plugins.slick.length; i++) {
          var $slickItem = $(plugins.slick[i]);
  
          $slickItem.on('init', function (slick) {
            initLightGallery($('[data-lightgallery="group-slick"]'), 'lightGallery-in-carousel');
            initLightGallery($('[data-lightgallery="item-slick"]'), 'lightGallery-in-carousel');
          });
  
          $slickItem.slick({
            slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll'), 10) || 1,
            asNavFor: $slickItem.attr('data-for') || false,
            dots: $slickItem.attr("data-dots") === "true",
            infinite: $slickItem.attr("data-loop") === "true",
            focusOnSelect: true,
            arrows: $slickItem.attr("data-arrows") === "true",
            swipe: $slickItem.attr("data-swipe") === "true",
            autoplay: $slickItem.attr("data-autoplay") === "true",
            vertical: $slickItem.attr("data-vertical") === "true",
            centerMode: $slickItem.attr("data-center-mode") === "true",
            centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
            mobileFirst: true,
            responsive: [
              {
                breakpoint: 0,
                settings: {
                  slidesToShow: parseInt($slickItem.attr('data-items'), 10) || 1
                }
              },
              {
                breakpoint: 575,
                settings: {
                  slidesToShow: parseInt($slickItem.attr('data-sm-items'), 10) || 1
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: parseInt($slickItem.attr('data-md-items'), 10) || 1
                }
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: parseInt($slickItem.attr('data-lg-items'), 10) || 1
                }
              },
              {
                breakpoint: 1199,
                settings: {
                  slidesToShow: parseInt($slickItem.attr('data-xl-items'), 10) || 1
                }
              }
            ]
          })
            .on('afterChange', function (event, slick, currentSlide, nextSlide) {
              var $this = $(this),
                childCarousel = $this.attr('data-child');
  
              if (childCarousel) {
                $(childCarousel + ' .slick-slide').removeClass('slick-current');
                $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
              }
            });
  
        }
      }
  
      // Material Parallax
      if ( plugins.materialParallax.length ) {
        if ( !isIE && !isMobile) {
          plugins.materialParallax.parallax();
        } else {
          for ( var i = 0; i < plugins.materialParallax.length; i++ ) {
            var $parallax = $(plugins.materialParallax[i]);
  
            $parallax.addClass( 'parallax-disabled' );
            $parallax.css({ "background-image": 'url('+ $parallax.data("parallax-img") +')' });
          }
        }
      }
    });
  