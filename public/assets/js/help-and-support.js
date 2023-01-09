// document.getElementById("btnCreateHelpAndSupportCommunicatorLink").addEventListener("click", createHelpAndSupportCommunicatorLink);

function goToHelpSuggestionPage() {
    // // const URL = 'https://meet2.allworldtrade.com/groupcall/ae7d6180-1078-4ed9-aabd-d7e50935a3d3-all-world-trade-help-suggestion';
    // const URL = 'https://meet.allworldtrade.com/join/ae7d6180-1078-4ed9-aabd-d7e50935a3d3-all-world-trade-help-suggestion';
    // window.open(URL, '_blank');

    $.ajax({
        url: '/api/post/go-to-help-and-suggestion-page',
        type: 'POST',
        success: function (data) {
            if (data.length > 0) {
                const URL = 'https://meet.allworldtrade.com/join/' + data[0].communicator_link;
                window.open(URL, '_blank');
                occupied(data[0].communicator_link, data[0].support_accounts_uuid);
            } else {
                
                let emailifHelpAndSuggestLinkNotAvailableModal = UIkit.modal('#email-if-help-and-suggest-link-not-available-modal');
                emailifHelpAndSuggestLinkNotAvailableModal.show();
                //$('#email-if-help-and-suggest-link-not-available-modal').modal('show');
            }
        },
    });
}

function occupied(communicator_link, support_accounts_uuid) {
    $.ajax({
        url: '/api/post/update-as-occupied',
        type: 'POST',
        data: {
            communicator_link: communicator_link,
            support_accounts_uuid: support_accounts_uuid,
        },
        success: function (data) {
            console.log(data);
        },
    });
}
