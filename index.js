/* Page Util */

var checks = document.getElementsByClassName('checkbox-btn');
var active = checks[0];
var index = 0;

function CheckButton(i){
    index = i;
    active.classList.remove('active');
    active.removeAttribute("disabled");
    active = checks[i];
    active.classList.add('active');
    active.setAttribute("disabled","");
    if(i == 0){
        lastWorker = activeWorker;
        activeWorker = undefined;
    }else{
        lastWorker = activeWorker;
        activeWorker = workers[i-1];
    }
    Sort();
}

/* App */

const width = 800,
      height = 600,
    NUMBERS_COUNT = 1000,
    RANGE = [0,100],
    CHART_HEIGHT = 400,
    CHART_WIDTH = 700;

const ALHORYTHMS_SLEEP = 0;

var Arr = [];
var isSorted = false;

function setup(){
    let cnv = createCanvas(width,height);
    cnv.parent('content');
    let canvas = document.getElementById('defaultCanvas0');
    let content = document.getElementById('content');
    let button = document.getElementById('btn-container');
    content.insertBefore(canvas,button);

    background(51);
    noLoop();

    for(let i = 0;i<NUMBERS_COUNT;i++){
        Arr[i] = ((Math.random()*1000000)%(RANGE[1]-RANGE[0]))+RANGE[0];
    }

}

var ChartX = (width-CHART_WIDTH)/2,
    ChartY = (height-CHART_HEIGHT)/2,
    strokeW = (CHART_WIDTH/NUMBERS_COUNT)-1,
    X = ChartX+(strokeW/2),
    Y = ChartY+CHART_HEIGHT;

function draw(){
    background(51);
    X = ChartX+(strokeW/2);
    stroke(220);
    strokeWeight(strokeW);
    for(let i = 0;i<NUMBERS_COUNT;i++){
        line(X,Y,X,Y-(CHART_HEIGHT*(Arr[i]/100)));
        X += strokeW+1;
    }
}

var workers = [bubble = new Worker("./bubble.js"),
               merge = new Worker("./merge.js")];
var activeWorker;
var lastWorker;

for(let i = 0;i<workers.length;i++){
    workers[i].onmessage = (arr) => {
        Arr = arr.data;
        redraw();
    }
}

function Sort(){
    lastWorker ? lastWorker.postMessage("stop") : null;
    switch(index){
        case 1:
            activeWorker.postMessage([Arr,ALHORYTHMS_SLEEP]);
            break;
        case 2:
            activeWorker.postMessage([Arr,0,NUMBERS_COUNT-1,ALHORYTHMS_SLEEP]);
            break;
        case 3:
            break;
        case 4:
            break;
    }
}

/* Random Array */

async function randomizeArr(){
    for(let i = 0;i<NUMBERS_COUNT;i++){
        Arr[i] = ((Math.random()*1000000)%(RANGE[1]-RANGE[0]))+RANGE[0];
    }
    redraw();
    activeWorker ? activeWorker.postMessage("stop") : null;
    document.getElementById("rand").setAttribute("disabled","");
    setTimeout(() => {
        document.getElementById("rand").removeAttribute("disabled");
    }, 1000);
    await sleep(1000);
    Sort();
}

// UTIL

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}