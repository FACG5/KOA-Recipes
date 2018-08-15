const fetch = (file, requestType, url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4)
            if (xhr.status === 200) {

                const response = JSON.parse(xhr.responseText);
                if (response) {
                    callback(null, response['result']);
                } else {
                    console.log("2");
                    callback(new TypeError('There Is No Response'));
                }
            } else {
                console.log("3");
                callback(new TypeError('There Is Error in Server'));

            }
    }
    xhr.open(requestType, url, true);
    xhr.send(JSON.stringify(file));

}