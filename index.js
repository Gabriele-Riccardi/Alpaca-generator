
function on_off(part){
    const buttons = document.querySelectorAll('.box-container.special');
    buttons.forEach(button => {
        button.classList.add('hidden');
    });

    const activebuttons = document.querySelectorAll( `.box-container.special.${part}`);

    activebuttons.forEach(button => {
        button.classList.remove('hidden');
    });


    document.getElementsByClassName('styled-button active')[0].classList.remove('active');
   //console.log(document.getElementsByClassName('styled-button special active')[0])
    document.getElementsByClassName('styled-button special active')[0].classList.remove('active');

    document.getElementById(`${part}Button`).classList.add('active');
    document.getElementById(`def${part}`).classList.add('active')
      
}




// inizio

let combo = [
    {id: 'backgrounds', image:"./assets/images/backgrounds/def.png"},
    {id: 'ears', image:"./assets/images/ears/def.png"},
    {id: 'neck', image:"./assets/images/neck/def.png"},
    {id: 'hair', image:"./assets/images/hair/def.png"},
    {id:'nose', image:"./assets/images/nose.png"},
    {id: 'leg', image:"./assets/images/leg/def.png"},
    {id: 'accessories', image:"./assets/images/accessories/def.png"},
    {id: 'mouth', image:"./assets/images/mouth/def.png"},
    {id: 'eyes', image:"./assets/images/eyes/def.png"}
]

// This function updates or inserts a new image in the specified layer
function updateLayer(layerId, newImageSrc) {
    // Find the index of the layer by its id
    const layerIndex = combo.findIndex(layer => layer.id === layerId);

    // Update the image source of the specified layer
    combo[layerIndex].image = newImageSrc;
    
    // Re-render the canvas to reflect the new image
    loadAndRenderLayers();
}

function loadAndRenderLayers() {
    let loadedImages = 0;

    // Track each image and render canvas only when all images are loaded
    combo.forEach(layer => {
        const img = new Image();
        img.src = layer.image;
        img.onload = () => {
            layer.imgElement = img; // Store the loaded image element in the layer
            loadedImages++;

            // Only render when all images are loaded
            if (loadedImages === combo.length) {
                renderCanvas();
            }
        };
    });
}


// Function to render the canvas based on layer order
function renderCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each layer in order
    combo.forEach(layer => {
        const img = new Image();
        img.src = layer.image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    });
}

function loadInitialImage() {
    renderCanvas();

    document.getElementById("hairButton").classList.add('active');

    document.querySelectorAll('.box-container.special').forEach(button => {
        button.classList.add('hidden');
    });

    document.querySelectorAll( `.box-container.special.hair`).forEach(button => {
        button.classList.remove('hidden');
    });

    document.getElementById(`defhair`).classList.add('active')
};


loadInitialImage(combo)






const bodyparts = ["ears","hair","eyes", "mouth", "neck", "leg", "accessories", "backgrounds"]

bodyparts.forEach(part => {
    document.getElementById(`${part}Button`).addEventListener("click", changeButtons);
});

function changeButtons(event) {
    
    if (event.target.id === "earsButton"){
        on_off("ears")
    }else if(event.target.id === "hairButton"){
        on_off("hair")
    }else if(event.target.id === "mouthButton"){
        on_off("mouth")
    }else if(event.target.id === "eyesButton"){
        on_off("eyes")
    }else if(event.target.id === "neckButton"){
        on_off("neck")
    }else if(event.target.id === "legButton"){
        on_off("leg")
    }else if(event.target.id === "accessoriesButton"){
        on_off("accessories")
    }else if(event.target.id === "backgroundsButton"){
        on_off("backgrounds")
    }
}





//change part
function changebackground(bodypart,color){

    let newsrc = `./assets/images/${bodypart}/${color}.png`
    updateLayer(bodypart,newsrc)
    
    

    //switch off the old button 
    document.getElementsByClassName('styled-button special active')[0].classList.remove('active');
    document.getElementById(`${color}${bodypart}`).classList.add('active');

}



function downloadCanvas() {
    const canvas = document.getElementById("canvas");

    // Convert canvas to a Data URL
    const imageDataURL = canvas.toDataURL("image/png"); // or "image/jpeg" for JPEG format

    // Create a temporary link to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataURL;
    downloadLink.download = "canvas_image.png"; // Filename for the download

    // Simulate a click on the link
    downloadLink.click();
}

function randomcombination(){
    let y = [
        { id:"backgrounds", datas: ["def.png", "green.png", "grey.png", "lightblue.png", "orange.png","yellow.png",]},
        { id:"ears", datas: ["def.png", "tilt-backward.png", "tilt-forward.png"]},
        { id:"neck", datas: ["def.png", "thick.png", "bend-backward.png", "bend-forward.png"]},
        { id:"hair", datas: ["def.png", "bang.png", "curls.png", "elegant.png", "fancy.png", "quiff.png", "short.png"]},
        { id:"leg", datas: ["def.png", "cookie.png", "bubble-tea.png", "game-console.png", "tilt-backward.png","tilt-forward.png",]},
        { id:"accessories", datas: ["def.png", "flower.png", "glasses.png", "headphone.png"]},
        { id:"mouth", datas: ["def.png", "astonished.png", "eating.png", "laugh.png", "tongue.png"]},
        { id:"eyes", datas: ["def.png", "angry.png", "naughty.png", "panda.png", "smart.png", "star.png"]},
    ]

    y.forEach( part => {
        
        updateLayer(part["id"], `./assets/images/${part["id"]}/${part["datas"][(Math.floor(Math.random() *  part["datas"].length))]}`)
    })
    
}