import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "../scss/style.scss";
import "font-awesome/css/font-awesome.css";

import renderUtil from "./RenderUtil.js";
import router from "./Router.js";

$(document).ready(function () {

  //initialize left nav (pass this to class)
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  function hamburger_close() {

    if (trigger.hasClass('is-open')) {
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = true;
    }
}

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });

  //initialize routes and templates

  var spaRoutes = {

      // Default route (home page)
      "#root": function(url) {
          console.log('root was called...');
          renderUtil.renderPageTemplate("#root-page-template");
      },
      "#home": function(url) {
          console.log('home was called...');
          renderUtil.renderPageTemplate("#home-page-template");
          hamburger_close();
      },
      "#about": function(url) {
          console.log('about was called...');
          renderUtil.renderPageTemplate("#about-page-template");
          hamburger_close();
      }
  };

  // Create a new instance of the router
  var spaRouter = $.extend({}, router, {
      routes: spaRoutes
  });

  spaRouter.init();
  //window.location.hash = "#home";

});
