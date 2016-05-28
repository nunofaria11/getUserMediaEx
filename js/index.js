(function(getUserMedia) {

    navigator._getUserMedia = getUserMedia;

    var constraints = {
        audio: false,
        video: true
    };



    var video = document.querySelector('#videoEl');
    var error = document.querySelector('#errorEl');

    function onStream(stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Get media:', constraints);
        console.log('Video device:', videoTracks[0].label);
        stream.onended = function() {
            console.log('Stream ended!');
        };
        video.src = window.URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
            video.play();
        };
        window.stream = stream;
    }

    function onError(err) {
        switch (err.name) {
            case 'PermissionDeniedError':
                errorMessage('Permissions denied!', err);
                break;
            case 'ConstraintNotSatisfiedError':
                errorMessage('Constraints not satisfied!', err);
                break;
            default:
                errorMessage('An error occurred!');
        }
    }

    function errorMessage(message, err) {
        error.innerHTML += '<p>' + message + '</p>';
        if (err) {
            console.error('Error occurred:', err);
        }
    }
    if (navigator._getUserMedia) {
        navigator._getUserMedia(constraints, onStream, onError);
    } else {
        errorMessage('getUserMedia API not available');
    }
}(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia));
