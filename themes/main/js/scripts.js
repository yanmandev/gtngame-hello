function scaleCaptcha() {
    var reCaptchaWidth = 304;
    var containerWidth = $('.re-captcha').width();

    if(reCaptchaWidth > containerWidth) {
        var captchaScale = containerWidth / reCaptchaWidth;
        $('.g-recaptcha').css({
            'transform':'scale('+captchaScale+')'
        });
    }
}

function structureTreeList(){

    document.querySelectorAll('.structure-tree-list').forEach(function(el){

        el.querySelectorAll('.leaf-button').forEach(function (button){

            button.onclick = function(e){
                e.preventDefault();

                if (!this.classList.contains('disabled') && !this.hasAttribute('disabled')) {

                    this.classList.toggle('open');

                    this.closest('.structure-tree-list--item').classList.toggle('open');

                }
            }

        });

    });

}

(function ($) {
    'use strict';

    $('.open-menu').click(function(e){
        e.preventDefault();
        $($(this).data('target')).addClass('show');
        document.body.classList.add('menu-open');
    });
    $('.close-menu').click(function(e){
        e.preventDefault();
        $($(this).data('target')).removeClass('show');
        document.body.classList.remove('menu-open');
    });

    let showPassButtons = document.querySelectorAll('.show-pass-button');
    if (showPassButtons) {
        for (let item of showPassButtons) {
            item.onclick = function(e){
                e.preventDefault();
                this.classList.toggle('show');
                var target = this.closest('.form-group').querySelector('input');
                if (target.getAttribute('type') == 'password') {
                    target.type = 'text';
                } else if (target.getAttribute('type') == 'text') {
                    target.type = 'password';
                }
                var oldTitle = this.getAttribute('title');
                var newTitle = this.getAttribute('data-title');
                this.setAttribute('title', newTitle);
                this.setAttribute('data-title', oldTitle);
                this.innerHTML = newTitle;
                target.focus();
            }
        }
    }

    let copyButtons = document.querySelectorAll('.copy-btn').forEach(function(el){
        el.onclick = function(e){
            e.preventDefault();
        };
    });
    // copy to clipboard
    var clipboard = new ClipboardJS('.copy-btn');

    clipboard.on('success', function(e) {
        e.clearSelection();
        e.trigger.classList.add('copied');
        setTimeout(
            function(){
                e.trigger.classList.remove('copied');
            },
            3000);
    });

    document.querySelectorAll('.tree-to-top').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            $(this).closest('.structure-tree-list').closest('.structure-tree-list--item').children('.structure-tree-item').find('.leaf-button').trigger('click');
            // offset 100
            $('html, body').animate({scrollTop: $(this).closest('.structure-tree-list').closest('.structure-tree-list--item').offset().top - 100 }, 'slow');
        });
    });

    scaleCaptcha();
    structureTreeList();

    fitty('.case-item--name', { maxSize: 24, minSize: 14, multiLine: true });

}(jQuery));



