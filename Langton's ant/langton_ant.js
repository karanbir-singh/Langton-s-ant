//numero celle per riga
const GRID_SIZE = 101

//dimensioni canvas
const canvasX = 500
const canvasY = 500

//grandezza di ogni cella
const cellSize = canvasX/GRID_SIZE

//matrice di celle
let grid

//formica
let ant, ant1

//direzioni
const ANT_UP = 0
const ANT_RIGHT = 1
const ANT_DOWN = 2
const ANT_LEFT = 3

//cella
class Cell{
    constructor(y,x){
        this.isColored = false
        this.x = x
        this.y = y
    }

    drawCell(color){
        if(this.isColored){
            fill(color)
        }else{
            fill(255)
        }
        stroke(240)
        rect(this.x*cellSize,this.y*cellSize,cellSize,cellSize)
    }

    changeColor(){
        if(this.isColored)
            this.isColored = false
        else
            this.isColored = true
    }
}

class Ant{
    constructor(){
        this.x = (int)(random(GRID_SIZE-1))
        this.y = (int)(random(GRID_SIZE-1))
        this.R = random(255)
        this.G = random(255)
        this.B = random(255)
        this.dir = random(3) 
    }

    drawAnt(){
        fill(this.R,this.G,this.B)
        rect(this.x*cellSize,this.y*cellSize,cellSize,cellSize)
    }

    move(){
        if(this.dir === ANT_UP){
            this.y--
        }else if(this.dir === ANT_RIGHT){
            this.x++
        }else if(this.dir === ANT_DOWN){
            this.y++
        }else
            this.x--

        if(this.x >= GRID_SIZE)
            this.x = 0
        if(this.x < 0)
            this.x = GRID_SIZE-1
        if(this.y >= GRID_SIZE)
            this.y = 0
        if(this.y < 0)
            this.y = GRID_SIZE-1
    }

    turnRight(){
        //cambio la direzione a mo' di orologio, SENSO ORARIO
        this.dir++
        if(this.dir > ANT_LEFT)
            this.dir = ANT_UP
    }

    turnLeft(){
        //SENSO ANTIORARIO
        this.dir--
        if(this.dir < ANT_UP)
            this.dir = ANT_LEFT
    }

    getColor(){
        let c = color(this.R,this.G,this.B)
        return c
    }

}

function setup(){
    createCanvas(canvasX,canvasY)

    //partenza formica
    ant = new Ant()

    //riempimento griglia
    grid = []
    fillGrid()

    
}
function draw(){
    background(220)

    //visualizzazione griglia
    drawGrid(ant.getColor())

    //visualizzazione formica
    ant.drawAnt()

    //aggiorno
    updateCell(ant)
}

function fillGrid(){
    for(let i = 0; i<GRID_SIZE; i++){
        let row = []
        for(let j = 0; j<GRID_SIZE; j++){
            row.push(new Cell(i,j))
        }
        grid.push(row)
    }
}

function drawGrid(color){
    for(let i = 0; i<GRID_SIZE; i++){
        for(let j = 0; j<GRID_SIZE; j++){
            grid[i][j].drawCell(color)
        }
    }
}

function updateCell(form){
    if(grid[form.y][form.x].isColored){
        grid[form.y][form.x].changeColor()
        form.turnRight()
    }else{
        grid[form.y][form.x].changeColor()
        form.turnLeft()
    }
    form.move()
}