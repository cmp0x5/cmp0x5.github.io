const BACKGROUND = "#101010"
const FOREGROUND = "cyan"
const FPS = 60;

console.log(game)
game.width = 800
game.height = 800

const ctx = game.getContext("2d")
console.log(ctx)

function clear() 
{
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function point({x, y})
{
    const s = 20;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function line(p1, p2)
{
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(p)
{
    return {
        x: (p.x + 1)/2*game.width,
        y: (1 - (p.y + 1)/2)*game.height,
    }
}

function project({x, y, z})
{
    return {
        x: x/z, 
        y: y/z,
    }
}

const vertices = [
    {x: 0.25, y: 0.25, z: 0.25},
    {x: -0.25, y: 0.25, z: 0.25},
    {x: -0.25, y: -0.25, z: 0.25},
    {x: 0.25, y: -0.25, z: 0.25},

    {x: 0.25, y: 0.25, z: -0.25},
    {x: -0.25, y: 0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x: 0.25, y: -0.25, z: -0.25},
]

const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
]
function translate_z({x, y, z}) {
    return {x, y, z: z + dz};
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - z*s,
        y,
        z: x*s + z*c,
    }; 
}

let dz = 1;
let angle = 0;

function frame() 
{ 
    const dt = 1/FPS;
    //dz += 1 * dt;
    angle += Math.PI * dt;
    clear()
    for (const v of vertices) {
        point(screen(project(translate_z(rotate_xz(v, angle), dz))))

    }
    for (const f of faces) {
        for (let i = 0; i < f.length; ++i)
        {
            const a = vertices[f[i]];
            const b = vertices[f[(i+1)%f.length]];
            line(
                screen(project(translate_z(rotate_xz(a, angle), dz))),
                screen(project(translate_z(rotate_xz(b, angle), dz)))
        )
        }
    }
    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);