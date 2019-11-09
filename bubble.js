

/* Bubble Sort */
var Arr,
    done = false,
    stop = false;

var sleepTime;

async function BubbleSort(){
    stop = false;
    done = false;
    while(!done && Arr){
        await Util.sleep(sleepTime);
        done = true;
        if(!Arr){return;}
        for(let i = 0;i<Arr.length;i++){
            if(Arr[i]>Arr[i+1]){
                let last = Arr[i+1];
                Arr[i+1] = Arr[i];
                Arr[i] = last;
                done = false;
            }
        }
        postMessage(Arr);
    }
}

onmessage = async (arr) => {
    if(typeof arr.data == "object"){
        Arr = arr.data[0];
        sleepTime = arr.data[1]
        var isSorted = Util.isSorted(arr);
        if(!isSorted){
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