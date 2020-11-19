import api from '../Constants/api_url';

export function signup(data){
    return new Promise(function(resolve, reject){
        fetch(`${api}/users`, {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
              },
        })
    .then(res => {
        if(res.status == 201){
            resolve(res)
        }else{
            reject(res)
        }
    })
    .catch(err => {
        reject(err)
    })
    })
} 