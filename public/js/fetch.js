

//get file and requestType and url and callback and return response
const fetch = (file, requestType, url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4)
            if (xhr.status === 200) {

                const response = JSON.parse(xhr.responseText);
                if (response['result']) {

                    callback(null, response['result']);
                } else {
                    callback(new TypeError('There Is No Response'));
                }
            } else {
                callback(new TypeError('There Is Error in Server'));

            }
    }

    xhr.open(requestType, url, true);
    xhr.send(JSON.stringify(file));

}