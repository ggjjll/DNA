let ctx = null;
let canvasW = 0;
let canvasH = 0;
const POINT = 100;

window.onload = () => {
  initCanvas();
  drawDNA();
};

// 画布初始化
function initCanvas() {
  let canvas = document.getElementById('canvas');
  canvasW = canvas.width = canvas.offsetWidth;
  canvasH = canvas.height = canvas.offsetHeight * 2;
  ctx = canvas.getContext('2d');
}

// 绘制函数
function drawDNA() {
  const TIMER = 30;
  const COLOR0 = '#009966';
  const COLOR1 = '#3399CC';

  let p = 0;
  let type = true;
  setInterval(() => {
    ctx.clearRect(0, 0, canvasW, canvasH);
    if (p >= 2) {
      p = 0;
      type = !type;
    }
    p += 0.01;
    ctx.lineWidth = 10;
    if (p < 1) {
      ctx.strokeStyle = COLOR0;
      drawSin(p, -1);
      ctx.strokeStyle = COLOR1;
      drawSin(p);
    } else {
      ctx.strokeStyle = COLOR1;
      drawSin(p);
      ctx.strokeStyle = COLOR0;
      drawSin(p, -1);
    }
  }, TIMER);
}

/**
 * 绘制SIN函数
 * 参数：
 * p  [0, 1]  起点在 2 * Math.PI 中的比例
 * d
 * */
function drawSin(p = 0, d = 1, dx = 0) {
  let num = p * POINT;
  for (let i = 0; i <= POINT; i ++) {
    let {x, y} = getPoint(i, d);
    if (0 === i) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  ctx.closePath();

  // 画竖线
  let DISTANCE = 10;
  let DH = canvasH / 10;
  for (let i = DISTANCE, count = 0; i < POINT; i += DISTANCE, ++ count) {
    if (d < 0 && count % 2) {
      continue ;
    }
    if (d > 0 && !(count % 2)) {
      continue ;
    }
    let {x, y} = getPoint(i, d);
    // 画圆
    let r = ctx.lineWidth * 1.5;
    ctx.beginPath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    // 竖线
    ctx.beginPath();
    ctx.moveTo(x, y);
    let point = getPoint(i, -d);
    let dis = 0;
    if (y - point.y >= DH) {
      dis = DH;
    } else if (y - point.y <= -DH){
      dis = - DH;
    } else {
      dis = 0;
    }
    ctx.lineTo(point.x, dis ? point.y + dis : y);
    ctx.stroke();
    ctx.closePath();
  }

  // 得到坐标
  function getPoint(i, d) {
    let x = dx + canvasW * i / POINT;
    let h = canvasH / 2;
    let r = Math.PI * ((i + num) / POINT);    // 角度
    let y = 0.8 * d * h * Math.sin(r) + h;
    return {x, y};
  }
}


