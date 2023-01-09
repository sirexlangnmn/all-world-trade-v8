document.getElementById("btnCreateHelpAndSupportCommunicatorLink").addEventListener("click", createHelpAndSupportCommunicatorLink);

function createHelpAndSupportCommunicatorLink() {
    $.ajax({
        url: '/api/get/create-help-and-support-communicator-link',
        type: 'POST',
        success: function (data) {
            if (data.communicator_link) {
                // const domainLink = 'https://meet2.allworldtrade.com/groupcall/' //old
                const domainLink = 'https://meet.allworldtrade.com/join/'; //new
                window.open(domainLink + data.communicator_link, '_blank');
            } else {
                Swal.fire('Warning', 'Something went wrong. Please contact the administrator.', 'warning');
            }
        },
    });
}