/* Bubble Sort */
var Arr,Util,
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
        await Util.sleep(sleepTime);
        Arr ? postMessage(Arr) : null;
    }
}

onmessage = async (arr) => {
    if(typeof arr.data == "object"){
        Arr = arr.data[0][0];
        sleepTime = arr.data[0][1];
        Util = arr.data[1];
        console.log(arr.data);
        console.log(Util);
        var sorted = Util.isSorted(Arr);
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