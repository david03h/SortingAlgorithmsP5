// UTIL

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function isSorted(arr){
    let done = true;
    for(let i = 0;i<arr.length;i++){
        if(arr[i]>arr[i+1]){
            done = false;
        }
    }
    return done;
}

module.exports = [sleep,isSorted];