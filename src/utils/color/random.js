export function getRandomColor() {
    let r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    let b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}