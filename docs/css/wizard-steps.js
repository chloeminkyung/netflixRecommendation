$(document).ready(function () {
    loadData('1', '2');

    async function loadData(id1, id2) {
        try {
            const URL = 'https://netflix-recommendation.herokuapp.com/get_data';
            let responsePromise = $.ajax({
                method: 'POST',
                url: URL,
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            let response = await responsePromise;
            
            var keys = Object.keys(response);

            document.getElementById('movie-'+id1).innerHTML = '<img style="display: block; margin-left: auto; margin-right: auto; width: inherit !important; height: auto; box-shadow: 0 0 8px 8px white inset;" src="' + response.image_url_1 + '"><br><img style="display: block; margin-left: auto; margin-right: auto; width: inherit !important; height: auto;" src="' + response.logo_url_1 + '">';
            document.getElementById('movie-'+id2).innerHTML = '<img style="display: block; margin-left: auto; margin-right: auto; width: inherit !important; height: auto; box-shadow: 0 0 8px 8px white inset;" src="' + response.image_url_2 + '"><br><img style="display: block; margin-left: auto; margin-right: auto; width: inherit !important; height: auto;" src="' + response.logo_url_2 + '">';

            document.getElementById('movie-'+id1).title = response.title_1
            document.getElementById('movie-'+id2).title = response.title_2

        } catch (error) {
            // clearTimeout(timeoutHandle);
            console.log('Error: ', error);
        }

    }

    loadData('3', '4');
    loadData('5', '6');

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
            allShows = $('.show'),
            allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
        console.log("next");
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        var curNum = curStep[0].id.slice(5, 6);

        if (curNum == 1){
            var name = $('#name')[0].value;
            $('#output-name')[0].innerText = "Good to see you, " + name;
        }
    
        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });


    allPrevBtn.click(function(){
        console.log("prev");
        var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']");
        prevStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');

    document.getElementById('name').onkeyup=function(e){
        if((e.keyCode == 13) && $(this)[0].value != ''){
            e.preventDefault();
            document.getElementById('name_next').click();
        }
        else{

        }
    }

    document.getElementById('year').onkeyup=function(e){
        if((e.keyCode == 13) && $(this)[0].value != ''){
            e.preventDefault();
            document.getElementById('ok').click();
        }
        else{

        }
    }

    allShows.click(function() {
        console.log($(this)[0].title);

        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    })

});