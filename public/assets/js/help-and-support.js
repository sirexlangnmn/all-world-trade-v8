// document.getElementById("btnCreateHelpAndSupportCommunicatorLink").addEventListener("click", createHelpAndSupportCommunicatorLink);

function goToHelpSuggestionPage() {
    // // const URL = 'https://meet2.allworldtrade.com/groupcall/ae7d6180-1078-4ed9-aabd-d7e50935a3d3-all-world-trade-help-suggestion';
    // const URL = 'https://meet.allworldtrade.com/join/ae7d6180-1078-4ed9-aabd-d7e50935a3d3-all-world-trade-help-suggestion';
    // window.open(URL, '_blank');

    $.ajax({
        url: '/api/post/go-to-help-and-suggestion-page',
        type: 'POST',
        success: function (data) {
            console.log('create-help-and-support-communicator-link', data[0].communicator_link);
            const URL = 'https://meet.allworldtrade.com/join/' + data[0].communicator_link;
                window.open(URL, '_blank');
        },
    });
}

