/* Bubble Sort */
var Arr,
    done = false,
    stop = false;

var sleepTime;

async function BubbleSort(){
    stop = false;
    done = false;
    while(!done && Arr){
        done = true;
        if(!Arr){return;}
        for(let i = 0;Arr && i<Arr.length;i++){
            if(Arr[i]>Arr[i+1]){
                let last = Arr[i+1];
                Arr[i+1] = Arr[i];
                Arr[i] = last;
                done = false;
            }
        }
        await sleep(sleepTime);
        Arr ? postMessage(Arr) : null;
    }
}

onmessage = async (arr) => {
    if(typeof arr.data == "object"){
        Arr = arr.data[0];
        sleepTime = arr.data[1]
        var sorted = isSorted(Arr);
        if(!sorted){
            let time = performance.now();    
            await BubbleSort();
            let time2 = performance.now() - time;
            console.log(time2/1000);
        }else{
            console.log("Array sorted already");
        }
    }else{
        Arr = undefined;
    }
}

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