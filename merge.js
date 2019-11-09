var Util = require("./util.js");

/* Merge Sort */

var Arr,left,right,sleepTime;

async function Merge(arr,l,m,r){

    if(!Arr){return}
    var i,j,k;
    var n1 = m-l+1,
        n2 = r-m;

    var L = [],
        R = [];

    for(let a = 0;a<n1;a++){
        L[a] = arr[l+a];
    }
    for(let b = 0;b<n2;b++){
        R[b] = arr[m+1+b];
    }

    i = 0;
    j = 0;
    k = l;
    while(i < n1 && j < n2 && Arr){
        if(L[i]<=R[j]){
            arr[k] = L[i];
            k++;
            i++;
        }else{
            arr[k] = R[j];
            k++;
            j++;
        }
    }
    while(i < n1 && Arr){
        arr[k] = L[i];
        k++;
        i++;
    }
    while(j < n2 && Arr){
        arr[k] = R[j];
        k++;
        j++;
    }
    postMessage(Arr);
    await Util.sleep(sleepTime);
}

async function MergeSort(arr,l,r){
    if(l<r && Arr){
        var m = Math.floor(l+(r-l)/2);
    
        await MergeSort(arr,l,m);
        await MergeSort(arr,m+1,r);
    
        await Merge(arr,l,m,r);
    }
}

onmessage = async (arr) => {
    if(typeof arr.data[0] == "object"){
        Arr = arr.data[0];
        left = arr.data[1];
        right = arr.data[2];
        sleepTime = arr.data[3];
        var isSorted = Util.isSorted(arr);
        if(!isSorted){
            let time = performance.now();    
            await MergeSort(Arr,left,right);
            let time2 = performance.now() - time;
            console.log(time2/1000);
        }else{
            console.log("Array sorted already");
        }
    }else{
        Arr = undefined;
    }
}