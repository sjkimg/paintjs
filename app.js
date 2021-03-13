// 그리기를 할 것임.
// ref : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

// 상수canvas 객체에 jsCanvas 문서 삽입
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")

// canvas size
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"
ctx.lineWidth = 2.5;

// default=false 하지만 마우스를 클릭(onMouseDown)하는 동안은 true
let painting = false;



function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    // console.log(event);
    //수많은 결과값들이 나오는데, 그 중 우리는 offsetX,Y값만 원할 것. 그림판과 관련있는 숫자기 때문.
    //예를들어 client x,y는 이 창 전체 범위 내에서의 마우스 위치값을 나타냄. 그런 값은 필요 없음.

    // 마우스 움직임 감지
    const x = event.offsetX;
    const y = event.offsetY;

    // 클릭하지 않고 있을 때 작업을 하지 않는게 아님.
    // path( = 선)를 만들면서 대기함.
    // 클릭 시 그 클릭한 위치가 path의 끝나는 지점으로써 선택될 것.
    if (!painting) {
        // 확인용
        //console.log("creating path in", x, y);

        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // 확인용
        //console.log("creating line in", x, y);


        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function onMouseUp(event) {
    stopPainting();
}


function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    // ctx.color를 바꿔야 선 색이 바뀌므로 ctx.color을 override
    ctx.strokeStyle=color;

    //확인용
    //console.log(color);
}




if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color=>
    //여기서의 color은 div의 개념. 그냥 묶는 개념이므로 어떤 단어를 쓰든 의미 및 영향 없음.
    color.addEventListener("click",handleColorClick
    )
);