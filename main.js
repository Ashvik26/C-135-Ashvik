song="";
status="";
objects=[];
function preload(){
    song=loadSound("normal_dual_alarm.mp3");
}

function setup(){
canvas=createCanvas(380, 380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";

}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    
        console.log(results);
        objects=results;

}
function draw(){
image(video, 0,0, 380, 380);
if(status!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResults);
    for(var i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="status: object detected";
   
fill(r,g,b);
percent=floor(objects[i].confidence * 100);
text(objects[i].label+" "+percent+"%",objects[i].x+50,objects[i].y+50);
noFill();
stroke(r,g,b);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);   
if(objects[i].label=="person"){
document.getElementById("object_status").innerHTML="baby found";
song.stop();
}
else{
    document.getElementById("number_of_objects").innerHTML="baby not found";
song.play();
}
}

}
}