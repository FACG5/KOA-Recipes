

//  Select Elements 
const submit = document.getElementById('btn');
const content = document.getElementById('content');
const sign_out = document.getElementById('sign_out');
const bad = document.getElementById('bad');
const good = document.getElementById('good');
const timeline = document.getElementsByClassName('timeline')[0];


//  Submit Event  Add Post 
submit.addEventListener('click', (e) => {
    const post = JSON.stringify({ "content": content.value });

    fetch(post, 'POST', '/add_post', (err, result) => {

        if (err) {
            alert('There Is Error in Adding Post Check Your Connection');
        } else {
            addPost(null);
        }
    });

});
//Sign out Btn 
sign_out.addEventListener('click', () => {
    deleteAllCookies();
    window.location = "/sign_in"
})

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    console.log(cookie);
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}




// Add Post To Current Page
const addPost = (response) => {

    // Create The Elements Of Post Element
    const username = document.createElement('h2');
    const postContent = document.createElement('p');
    const rating = document.createElement('div');
    const bad = document.createElement('span');
    const good = document.createElement('span');
    const goodTag = document.createElement('a');
    const badTag = document.createElement('a');

    const result = document.createElement('div');

    //Add Classes To Elements 
    rating.classList.add('rating');
    bad.classList.add('red');
    good.classList.add('green');
    result.classList.add('result');

    //add Content To Elements 

    if (response) {
        username.textContent = response["user_id"];
        postContent.textContent = response["content"];
    } else {
        username.textContent = "kannanHassouna";
        postContent.textContent = content.value;
    }
    // Append Elements 

    //Append to rating div
    rating.appendChild(bad);
    rating.appendChild(good);
    badTag.textContent = "Bad";
    bad.appendChild(badTag);
    goodTag.textContent = 'Good';
    good.appendChild(goodTag);

    //Append to result div
    result.appendChild(username);
    result.appendChild(postContent);
    result.appendChild(rating);
    timeline.appendChild(result);

}


window.onload = () => {

    fetch(null, 'GET', '/add_post', (err, result) => {
        if (err) {
            alert('Please Check Your Connection');
        } else {
            const rows = result;
            for (let i = 0; i < result.length; i++) {
                addPost(result[i]);
            }
        }
    });
}