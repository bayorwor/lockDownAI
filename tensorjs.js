const URL = "https://teachablemachine.withgoogle.com/models/BVUtHVeA-/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("h4"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = prediction[i].className; //+ ": " + prediction[i].probability.toFixed(2);
    if (prediction[i].probability.toFixed(2) >= 0.5) {
      labelContainer.childNodes[i].innerHTML = classPrediction;
      switch (classPrediction) {
        case "cup":
          document.getElementById("name").innerHTML = "cup";
          var x = document.getElementById("img1");
          x.setAttribute("src", "./c7.jpeg");
          x.setAttribute("width", "100");
          x.setAttribute("height", "100");
          x.setAttribute("alt", "The Pulpit Rock");
          document.getElementById("id").innerHTML = `${7} pcs`;
          document.getElementById("price").innerHTML = `GHC ${45.0}`;
          break;
        case "iron":
          document.getElementById("name").innerHTML = "iron";
          var x = document.getElementById("img1");
          x.setAttribute("src", "./i1.png");
          x.setAttribute("width", "100");
          x.setAttribute("height", "100");
          x.setAttribute("alt", "The Pulpit Rock");
          document.getElementById("id").innerHTML = `${14} pcs`;
          document.getElementById("price").innerHTML = `GHC ${60.0}`;
          break;
        case "remote":
          document.getElementById("name").innerHTML = "remote";
          var x = document.getElementById("img1");
          x.setAttribute("src", "./r1.jpg");
          x.setAttribute("width", "100");
          x.setAttribute("height", "100");
          x.setAttribute("alt", "The Pulpit Rock");
          document.getElementById("id").innerHTML = `${21} pcs`;
          document.getElementById("price").innerHTML = `GHC ${80.0}`;
          break;
        case "toothbrush":
          document.getElementById("name").innerHTML = "tooth brush";
          var x = document.getElementById("img1");
          x.setAttribute("src", "./t1.jpg");
          x.setAttribute("width", "100");
          x.setAttribute("height", "100");
          x.setAttribute("alt", "The Pulpit Rock");
          document.getElementById("id").innerHTML = `${30} pcs`;
          document.getElementById("price").innerHTML = `GHC ${50.0}`;
          break;
      }
    } else {
      labelContainer.childNodes[i].innerHTML = "";
    }
  }
}
