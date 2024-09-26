import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smarthr';
  urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };
  constructor(private router: Router) { 
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const body = document.getElementsByTagName('body')[0];
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
        if (url[1] === "" || url[1] === "login" || url[1] === "login" || url[2] === "register" || url[2] === "forgot" || url[2] === "otp" || url[2] === "lockscreen") {
          body.classList.add('account-page');
        } else {
          body.classList.remove('account-page');
        }
        if (url[2] === "error404" || url[2] === "error500") {
          body.classList.add('error-page');
        } else {
          body.classList.remove('error-page');
        }
      }
    });
  }
  ngOnInit() {

    // Minified Sidebar

    $(document).on('click', '#toggle_btn', () => {
      if ($('body').hasClass('mini-sidebar')) {
        $('body').removeClass('mini-sidebar');
        $('.subdrop + ul').slideDown();
      } else {
        $('body').addClass('mini-sidebar');
        $('.subdrop + ul').slideUp();
      }
      return false;
    });

    $(document).on('mouseover', (e) => {
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
        const targ = $(e.target).closest('.sidebar').length;
        if (targ) {
          $('body').addClass('expand-menu');
          $('.sidebar-right').addClass('d-block');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp();
          $('.sidebar-right').removeClass('d-block');
        }
        return false;
      }
    });

    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', function() {
      var $wrapper = $('.main-wrapper');
      $wrapper.toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      $('#task_window').removeClass('opened');
      return false;
    });
    
    $(".sidebar-overlay").on("click", function () {
      var $wrapper = $('.main-wrapper');
        $('html').removeClass('menu-opened');
        $(this).removeClass('opened');
        $wrapper.removeClass('slide-nav');
        $('.sidebar-overlay').removeClass('opened');
        $('#task_window').removeClass('opened');
    });
    
    $(function () {
      $("[rel='tooltip']").tooltip();
  });
    
  }
}
