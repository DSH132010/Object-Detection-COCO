img = ''
Status = ''
food = `🍕🍔🍟🌭🍿🧂🥓`
objects = []
canvas_size1 = 430 + 500
canvas_size2 = 630 + 150 - 100
Color = '#ff0000'
windowSize = window.innerWidth - window.innerWidth + 300
function preload() {
    img = loadImage('../Images/dog_cat2.jpg')
}

console.log()
function setup() {
    canvas = createCanvas(canvas_size1, canvas_size2)
    canvas.position(canvas_size1 - 650, 20);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById('status').innerText = `Status: Detecting Objects`
}

function modelLoaded() {
    console.log(`CocoSSD Is Loaded !! Here Is Some Food Enjoy!! ${food}`)
    Status = true
    objectDetector.detect(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    }else {
        console.log(results)
        objects = results
    }
}

function draw() {
    image(img, 0, 0, canvas_size1, canvas_size2)
    // fill('#fff')
    // text('Dog', 45, 75)
    // noFill()
    // stroke('#fff')
    // rect(30, 60, 450, 350)
    // fill('#fff')
    // text('Cat', 320, 120)
    // noFill()
    // stroke('#fff')
    // rect(300, 90, 270, 320)
    console.table(objects)
    if(Status != "") {
        for (let i = 0; i < objects.length; i++) {
            document.getElementById('status').innerText = `Status: Object Detected`

            fill(Color)
            let percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke(Color)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}