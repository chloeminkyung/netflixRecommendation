$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
            allPrevBtn = $('.prevBtn');

    allWells.hide();

    $.get('../dataset/netflix_titles.csv', function callCSV(data) {
        console.log("fetching csv file...");
        var build = '<table border="1" cellpadding="2" cellspacing="0" style="border-collapse: collapse" width="100%">\n';
        var rows = data.split("\n");
        rows.forEach( function getvalues(thisRow) {
            build += "<tr>\n";
            var columns = thisRow.split(",");
            for (var i=0; i<columns.length; i++){
                build += "<td>" + columns[i] + "</td>\n";
            }
        })
        build += "</table>";
        $('#wrap').append(build);
     });

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
        if(e.keyCode == 13){
            e.preventDefault();
            document.getElementById('name_next').click();
        }
    }

    // document.getElementById('ok').click(function(){
    //     var rowForValues = Math.floor(Math.random() * ($data.length - 1)) + 1;
    //     var $row = $data[rowForValues];
    //     enterInformation($row[0], $row[1], $row[2], $row[3]);
    // });

});