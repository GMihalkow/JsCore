function CalculateArea(w, h, W, H){
    let maxW = Math.max(w, W);

    let maxH = Math.max(h, H);

    let totalArea = maxH * maxW;

    let minW = maxW - Math.min(w, W);

    let minH = maxH - Math.min(h, H);

    let notNeededArea = minW * minH;

    let resultArea = totalArea - notNeededArea;

    return resultArea;
}

console.log(CalculateArea(13, 2, 5, 8));