let notifications = (() => {
    function handleError2(reason) {
        console.log(reason);
        showError(reason.responseJSON.description);
    }

    function handleError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        // errorBox.on('click', (event)=> {
        //     $(event.target).hide();
        // });
         setTimeout(() => errorBox.fadeOut(), 30000);
    }

    $(document).on({
        ajaxStart: function () {$('#loadingBox').show()},
        ajaxStop: function () {$('#loadingBox').hide()}
    });

    $('#infoBox').on('click', function () {
        $(this).fadeOut();
    });
    $('#errorBox').on('click', function () {
        $(this).fadeOut();
    });

    return {
        handleError,
        showInfo,
        showError
    };
})();