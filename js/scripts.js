window.addEventListener("DOMContentLoaded", function () {

    AOS.init();

    let scrollInv = document.querySelector('.scroll-inv');

    let sectionApropos = document.querySelector('.a-propos');
    let boutonPrec = sectionApropos.querySelector(".bouton-prec");

    let menuSticky = document.querySelector('.sticky-header');
    let menuTop = document.querySelector("header");
    let menuMobileInTop = menuTop.querySelector(".menu-mobile");
    let menuMobileInSticky = menuSticky.querySelector(".menu-mobile");

    let colorAccent = "#EB6659";






    // CONTROLE DU SCROLL -------------------------------------------------------

    scrollInv.addEventListener("click", scrollProjets);
    document.querySelector('.projets-in-menu').addEventListener("click", scrollProjets);
    document.querySelector('.projets-in-menu-sticky').addEventListener("click", scrollProjets);
    document.querySelector('.contact-in-menu').addEventListener("click", scrollContact);
    document.querySelector('.contact-in-menu-sticky').addEventListener("click", scrollContactStickyMenu);


    function scrollProjets(e) {

        if(e.target.offsetParent.classList.contains("menu-mobile")){
            let headerParent = e.path[5];
            let boutFermerMenu = headerParent.querySelector(".animation-mms p");
            $(boutFermerMenu).click();
        }

        if (!sectionApropos.classList.contains("hide")){
            affichageSectionAPropos();
        }
        $('html, body').animate({
            scrollTop: ($('.projets').offset().top-100)
        }, 700);

        effetsMenuOnScroll(e);
    }


    function scrollContact(e) {
        if(e.target.offsetParent.classList.contains("menu-mobile")){
            let headerParent = e.path[5];
            let boutFermerMenu = headerParent.querySelector(".animation-mms p");
            $(boutFermerMenu).click();
        }

        $.scrollify.instantNext();
        $('html, body').animate({
            scrollTop: ($('.contact').offset().top-100)
        }, 700);
    }


    function scrollContactStickyMenu(e) {
        if(e.target.offsetParent.classList.contains("menu-mobile")){
            let headerParent = e.path[5];
            let boutFermerMenu = headerParent.querySelector(".animation-mms p");
            $(boutFermerMenu).click();
        }

        if (!sectionApropos.classList.contains("hide")){
            affichageSectionAPropos();
        }
        $('html, body').animate({
            scrollTop: ($('.contact').offset().top-100)
        }, 700);
    }


    //Scrollify
    $(function() {
        $.scrollify({
            section : ".scrollify",
            interstitialSection : "header",
            offset : -100,
            setHeights: false,
            touchScroll: false
        });
    });



    // VALIDATION ET ENVOIE FORMULAIRE ----------------------------------------------------------------

    document.querySelector(".submit").addEventListener("click", function (e) {

        let nom = $("#nom").val();
        let courriel = $("#courriel").val();
        let message = $("#message").val();


        if(nom == ""){
            e.preventDefault();

            $("#nom").next().text("Merci de renseigner le champ.");
            $("#nom").next().addClass("show");
            $("#nom").addClass("error");
        }
        else{
            if($("#nom").next().hasClass("show")){
                $("#nom").next().removeClass("show");
                $("#nom").removeClass("error");
            }
        }

        if(courriel == ""){
            e.preventDefault();

            $("#courriel").next().text("Merci de renseigner le champ.");
            $("#courriel").next().addClass("show");
            $("#courriel").addClass("error");
        }
        else if(!validateEmail(courriel)){
            e.preventDefault();

            $("#courriel").next().text("Votre adresse courriel ne semble pas être valide.");
            $("#courriel").next().addClass("show");
            $("#courriel").addClass("error");
        }else{
            if($("#courriel").next().hasClass("show")){
                $("#courriel").next().removeClass("show");
                $("#courriel").removeClass("error");
            }
        }

        if(message == ""){
            e.preventDefault();

            $("#message").next().css("bottom", "-13px");
            $("#message").next().text("Merci de renseigner le champ.");
            $("#message").next().addClass("show");
            $("#message").addClass("error");
        }
        else{
            if($("#message").next().hasClass("show")){
                $("#message").next().removeClass("show");
                $("#message").removeClass("error");
            }
        }

    });


    function validateEmail(email)
    {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }



    // STICKY HEADER ----------------------------------------------------------------

    window.addEventListener("scroll", stickyHeader);

    function stickyHeader() {

        if (sectionApropos.classList.contains("hide")){
            if (window.scrollY > $(window).height()){
                if($(".sticky-header").hasClass("hide")){
                    $(".sticky-header").removeClass('hide');
                }
            }
            else{
                if(!$(".sticky-header").hasClass("hide")){
                    $(".sticky-header").addClass('hide');

                }
            }
        }

    }






    // AFFICHAGE DES DÉTAILS D'UN PROJETS AU CLICK DU BOUTON ----------------------------------------------------------------

    let projets = document.querySelector(".projets").getElementsByTagName("ARTICLE");

    for(let i=0; i<projets.length; i++){
        projets[i].querySelector('article button').addEventListener("click", affichageDetailsProjet);
    }


    function affichageDetailsProjet(e) {
        let pathFirefox = e.composedPath();
        let articleParent = pathFirefox[3] || e.path[3];
        let ulHidden = articleParent.querySelector("ul");
        let pHidden = articleParent.querySelector(".infos-supp");

        articleParent.classList.toggle("show-details");
        ulHidden.classList.toggle("hide");
        pHidden.classList.toggle("hide");

        if(articleParent.classList.contains("show-details")){
            articleParent.querySelector("button").innerHTML = "Cacher les détails";

            setTimeout(function () {
                if(window.innerWidth < 1080 && window.innerWidth > 550){
                    $('html, body').animate({
                        scrollTop: ($(articleParent).offset().top + ($(articleParent).innerHeight() - $(window).height()))
                    }, 800);
                }
                else if(window.innerWidth <= 550){
                    $('html, body').animate({
                        scrollTop: ($(articleParent).offset().top + $(articleParent).find("img").height()-105)
                    }, 800);
                }
                else{
                    console.log($(articleParent).find("div").height())
                    $('html, body').animate({
                        scrollTop: ($(articleParent).offset().top + ($(articleParent).innerHeight() - $(window).height() - $(articleParent).find("div").height()/2) + 20)
                    }, 800);
                }
            },600)


        }
        else {
            articleParent.querySelector("button").innerHTML = "Voir les détails";

            $('html, body').animate({
                scrollTop: ($(articleParent).offset().top-70)
            }, 500);
        }
    }




    // EFFETS MENU ON SECTION ----------------------------------------------------------------

    $(window).on("scroll", effetsMenuOnScroll);

    function effetsMenuOnScroll() {

        if($(window).scrollTop() < $(".projets").offset().top -100){
            if($(".projets-in-menu-sticky").hasClass("menu-focused")){
                $(".projets-in-menu-sticky").removeClass("menu-focused");
            }
        }


        if($(window).scrollTop() >= $(".projets").offset().top -100 && $(window).scrollTop() <= $(".contact").offset().top - 300){
            if($(".contact-in-menu-sticky").hasClass("menu-focused")){
                $(".contact-in-menu-sticky").removeClass("menu-focused");
            }
            setTimeout(function () {
                $(".projets-in-menu-sticky").addClass("menu-focused");
            },500);

        }

        if($(window).scrollTop() >= $(".contact").offset().top - 300){
            setTimeout(function () {
                if($(".projets-in-menu-sticky").hasClass("menu-focused")){
                    $(".projets-in-menu-sticky").removeClass("menu-focused");
                }
            },500);
            $(".contact-in-menu-sticky").addClass("menu-focused");
        }
    }






    // AFFICHAGE DE LA SECTION À PROPOS ----------------------------------------------------------------

    setTimeout(function () {
        sectionApropos.style.opacity = 1;
    }, 1000);



    document.querySelector('.apropos-in-menu').addEventListener("click", affichageSectionAPropos);
    document.querySelector('.apropos-in-menu-sticky').addEventListener("click", affichageSectionAPropos);
    menuMobileInTop.querySelector('.apropos-in-menu').addEventListener("click", affichageSectionAPropos);
    menuMobileInSticky.querySelector('.apropos-in-menu-sticky').addEventListener("click", affichageSectionAPropos);

    boutonPrec.addEventListener("click", affichageSectionAPropos);

    function affichageSectionAPropos(e){

        sectionApropos.classList.toggle("hide");

        if(!sectionApropos.classList.contains("hide")){

            if($(".projets-in-menu-sticky").hasClass("menu-focused")){
                $(".projets-in-menu-sticky").removeClass("menu-focused")
            }
            if($(".contact-in-menu-sticky").hasClass("menu-focused")){
                $(".contact-in-menu-sticky").removeClass("menu-focused")
            }

            if(e.target.offsetParent.classList.contains("menu-mobile")){
                let headerParent = e.path[5];
                let boutFermerMenu = headerParent.querySelector(".animation-mms p");
                $(boutFermerMenu).click();
            }

            menuSticky.querySelector('.apropos-in-menu-sticky').removeEventListener("click", affichageSectionAPropos);
            menuSticky.querySelector('.apropos-in-menu-sticky').classList.add("menu-focused");
            // disable_scroll();
            $.scrollify.disable();

            createjs.Tween.get(sectionApropos.querySelector(".bouton-prec"))
                .to({x: 1200}, 1000, createjs.Ease.quadOut);

            if(menuSticky.classList.contains("hide")){
                menuSticky.classList.remove("hide");
            }
        }
        else{
            menuSticky.querySelector('.apropos-in-menu-sticky').addEventListener("click", affichageSectionAPropos);
            menuSticky.querySelector('.apropos-in-menu-sticky').classList.remove("menu-focused");
            // enable_scroll();
            $.scrollify.enable();

            if(window.scrollY == 0){
                menuSticky.classList.add("hide");
            }

            effetsMenuOnScroll()

        }
    }





    // RÉTRACTION BOUT CV ----------------------------------------------------------------

    document.querySelector(".conteneur-bout-cv i").addEventListener("click", function () {
        document.querySelector(".conteneur-bout-cv").classList.toggle("fermer-bout-cv");
    });







    // ANIMATION MENU MOBILE ----------------------------------------------------------------

    document.querySelector(".menu-mobile-selector").addEventListener("click", animationMenuMobile);

    function animationMenuMobile(e) {
        document.querySelector("header").classList.toggle("open-menu");
        document.querySelector(".menu-mobile-selector").classList.toggle("animation-mms");

        if(document.querySelector("header").classList.contains("open-menu")){
            e.target.innerHTML = "fermer";

            $.scrollify.disable();
            $("header").css("touch-action", "none");
            disable_scroll()
        }
        else{
            e.target.innerHTML = "menu";

            $.scrollify.enable();
            $("header").css("touch-action", "auto");
            enable_scroll();
        }
    }

    document.querySelector(".menu-mobile-sticky-selector").addEventListener("click", animationMenuMobileSticky);

    function animationMenuMobileSticky(e){
        document.querySelector(".sticky-header").classList.toggle("open-menu");
        document.querySelector(".menu-mobile-sticky-selector").classList.toggle("animation-mms");

        if(document.querySelector(".sticky-header").classList.contains("open-menu")){
            e.target.innerHTML = "fermer";

            $.scrollify.disable();
            $(".sticky-header").css("touch-action", "none");
            disable_scroll();
        }
        else{
            e.target.innerHTML = "menu";

            $.scrollify.enable();
            $(".sticky-header").css("touch-action", "auto");
            enable_scroll();
        }
    }







    // FONCTIONNEMENT MENU MOBILE ----------------------------------------------------------------

    menuMobileInTop.querySelector('.projets-in-menu').addEventListener("click", scrollProjets);
    menuMobileInSticky.querySelector('.projets-in-menu-sticky').addEventListener("click", scrollProjets);
    menuMobileInTop.querySelector('.contact-in-menu').addEventListener("click", scrollContact);
    menuMobileInSticky.querySelector('.contact-in-menu-sticky').addEventListener("click", scrollContactStickyMenu);



    // SCROLL DISABLING FUNCTIONS -----------------------------------------------------------------
    let keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function keydown(e) {
        for (let i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function wheel(e) {
        preventDefault(e);
    }

    function disable_scroll() {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        disable_scroll_mobile();
    }

    function enable_scroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
        enable_scroll_mobile();
    }

    // MOBILE
    function disable_scroll_mobile(){
        document.addEventListener('touchmove',preventDefault, false);
    }
    function enable_scroll_mobile(){
        document.removeEventListener('touchmove',preventDefault, false);
    }

    // -------------------------------------------------------------------------------------



});