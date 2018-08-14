const fetch = (file,requestType,url,callback)=>{

    const xhr = new XMLHttpRequest();

 xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4)
            if(xhr.status===200){

                const response = xhr.responseText;
                if(response){
                    callback(null,JSON.parse(response));
                }else{
                    callback(new TypeError('There Is No Response'));
                }
            }else{
                callback(new TypeError('There Is Error in Server'));
            }
    }

    xhr.open(requestType,url,true);
    xhr.send(JSON.stringify(file));

}