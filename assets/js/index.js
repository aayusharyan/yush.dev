//Configuration Parameters
let canvas      = document.querySelector("#main_canvas");
let ww          = window.innerWidth;
let wh          = window.innerHeight;
let slowBrowser = false;
let isTested    = false;
let scaleToFit  = 3;
let ctx         = canvas.getContext("2d");
let particles   = [];
let amount      = 0;
let mouse       = {x: -9999, y: -9999};
let colors      = ["#695AA6","#444444", "#9370DB","#BA55D3"];
let text        = "< Aayush Sinha />";

let radius      = 150;
//Conditions for Responsiveness
if(ww <= 320)       { radius = 15;  }
else if(ww <= 375)  { radius = 20;  } 
else if(ww <= 768)  { radius = 40;  } 
else if(ww <= 1024) { radius = 50;  }  
else if(ww <= 1440) { radius = 75;  }
else if(ww <= 2048) { radius = 100; }

//Main Particle Class
//Cannot use class because IE does not support that. 🤦🏻‍♂️
function Particle(x, y) {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.vx   = (Math.random() - 0.5) * 10;
    this.vy   = (Math.random() - 0.5) * 10;
    let rand  = Math.random();
    this.dest = {x: x, y: y};
        
    //Condition for Responsiveness
    if (ww <= 425) {
        this.r = 1;
    } else if (ww <= 1024) {
        this.r = rand + 2;
    } else if (ww <= 2048) {
        this.r = (rand * 3) + 3;
    } else {
        this.r = (rand * 4) + 6;
    }

    if(slowBrowser) {
        if (ww <= 2048) {
            this.r = 1;
        } else if(ww <= 3000) {
            this.r = (rand * 1) + 2;
        } else {
            this.r = (rand * 2) + 2;
        }        
    }
        

    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.9;
    if(slowBrowser) {
        this.friction /= 1.1;
    }

    this.color = colors[Math.floor(Math.random() * 4)];
}


//Rended method
Particle.prototype.render = function() {
    this.accX = (this.dest.x - this.x) / 100;
    this.accY = (this.dest.y - this.y) / 100;
    if(slowBrowser) {
        this.accX *= 8;
        this.accY *= 8;
    }
    this.vx  += this.accX;
    this.vy  += this.accY;
    this.vx  *= this.friction;
    this.vy  *= this.friction;
    this.x   += this.vx;
    this.y   += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.r), Math.PI * 2, false);
    ctx.fill();

    //Exploding logic on Mouse Move
    let a = this.x - mouse.x;
    let b = this.y - mouse.y;
    var distance  = Math.sqrt(a * a + b * b);
    if (distance  < (radius)) {
        this.accX = (this.x - mouse.x) / 10;
        this.accY = (this.y - mouse.y) / 10;
        if(slowBrowser) {
            this.accX *= 4;
            this.accY *= 4;
        }
        this.vx  += this.accX;
        this.vy  += this.accY;
    }

}


//Change mouse pointers on mouse movement
function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if(slowBrowser) {
        mouse.x /= scaleToFit;
        mouse.y /= scaleToFit;
    }
}

//Handling for touch inputs. Take only first touch. (For multi touch devices)
function onTouchMove(e){
    if(e.touches.length > 0 ){
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        if(slowBrowser) {
            mouse.x /= scaleToFit;
            mouse.y /= scaleToFit;
        }
    }
}

//For touch devices - Need to reset when finger is lifted.
function onTouchEnd(e){
    mouse.x = -9999;
    mouse.y = -9999;
}

//Initialization Function
function initScene(){
    ww = window.innerWidth;
    wh = window.innerHeight;
    if(slowBrowser) {
        canvas.width = ww/scaleToFit;
        canvas.height = wh/scaleToFit;
    } else {
        canvas.width = ww;
        canvas.height = wh;
    }    

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Fill canas with text (Temporarily!)
    ctx.font = "bold "+(canvas.width/10)+"px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width/2, canvas.height/2);

    //Take snapshot and clear canvas
    let data  = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    //Let the fun games begin!
    particles = [];
    for(var i=0;i<canvas.width;i+=Math.round(canvas.width/150)){
        for(var j=0;j<wh;j+=Math.round(canvas.width/150)){
            if(data[ ((i + j*canvas.width)*4) + 3] > 150){
                    particles.push(new Particle(i,j));
            }
        }
    }
    amount = particles.length; //For easy tracking and looping
}

//Event Looooooooooooop
function render(a) {
    requestAnimationFrame(render);

    let t0 = 0;
    if(!isTested) {
        t0 = performance.now();
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }

    let t1 = 0;
    if(!isTested) {
        t1 = performance.now();
        if(t1-t0>15) {
            slowBrowser = true;
            browserIsSlow();
        }
        isTested = true;
    }
        
    
};

function browserIsSlow() {
    if(slowBrowser) {
        if(ww <= 320) {
            scaleToFit = 1;
        }
        canvas.width                    = ww/scaleToFit;
        canvas.height                   = wh/scaleToFit;
        canvas.style.transformOrigin    = '0 0'; //Scale from the Top left corner
        canvas.style.transform          = 'scale(' + scaleToFit + ')';
        radius                          = 170/(2*scaleToFit);
        ctx                             = canvas.getContext("2d");
        particles                       = [];
        amount                          = 0;

        //Conditions for Responsiveness
        if(ww <= 320)       { radius = 25/(scaleToFit*2);  }
        else if(ww <= 375)  { radius = 20/(scaleToFit*2);  } 
        else if(ww <= 768)  { radius = 60/(scaleToFit*2);  } 
        else if(ww <= 1024) { radius = 80/(scaleToFit*2);  }  
        else if(ww <= 1440) { radius = 100/(scaleToFit*2); }
        else if(ww <= 2048) { radius = 140/(scaleToFit*2); }

        document.getElementById('slowBrowserMessage').style.display = "initial";

        initScene();
    }
}

//Initialize and Render
window.addEventListener("resize",    initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend",  onTouchEnd);
initScene();
requestAnimationFrame(render);


//Daamn, cannot even use Arrow functions in IE.
document.getElementById('sendEmail').onclick = function() {
    window.open("mailto:aayush.aryan@me.com");
}
document.getElementById('viewLinkedin').onclick = function() {
    window.open('https://www.linkedin.com/in/aayushsinha');
}
document.getElementById('viewGithub').onclick = function() {
    window.open('https://github.com/aayusharyan/yush.dev');
}
document.getElementById('viewMainSite').onclick = function() {
    window.open('https://aayushsinha.com');
}
document.getElementById('downloadResume').onclick = function() {
    window.open('https://aayushsinha.com/resume');
}


if(!console.table) {
    throw new Error('This is probably Internet Explorer and the magic I am trying to do here just isn\'t supported by it, try using Chrome, Firefox or any other Chromium based browser');
}

//Add some fun messages to Console.
function workExperience() {
    this['1. Sr. Engineer @ KEMURI Technology'] = {
        "2017-Present": [
            "Worked on building a CMS with Multi national clientbase including owning E2E functionality of modules such as SSO, GCS, etc.",
            "Worked on implementing client custom requirements on top our main product",
            "Handled a multiverse of things from APIs to Auth Codes",
            "Even worked on Development of iOS Application and Deep Learning models for Cancer Detection in Brain 🧠",
            "Now moving to headless and working on explsing API for our B2B clients."
        ],
    };
    this['2. Instrucor and Mentor @ Newton School'] = {
        "2021-Present": [
            "Teach and Mentor students on the MERN Stack.",
            "Helped many students in getting a job!",
            "Some of them were not even from a CS background"
        ],
    };
    this['3. Mentor @ Udacity'] = {
        "2019-2020": [
            "Mentored students for the Android Development Nanodegree",
            "Guided them with the projects",
            "Helped them understand the concepts well",
        ],
    };
    this['4. FullStack Web Developer @ EKutur'] = {
        "2017-2018": [
            "Worked on an E-commerce platform built on custom PHP",
            "Brought it up to the trends with respect to Security, UI/UX, even coding standards",
            "Added functionalities like OTP Based Account Verification, On hold orders, integrated delivery statuses, etc",
        ],
    };
    this['5. Web Developer Internship @ Bike Street Boys'] = {
        "2016-2017": [
            "Worked on Developing website on Shopify",
            "Customized the templates, Oh those liquid files. 💧",
        ],
    };
    this['6. Web Developer Intern @ Offstep'] = {
        "2016-2016": [
            "Singlehandedly developed the complete frontend of the website and the platform (including UI/UX)",
        ],
    };
}

function Education(collegeName, degree, dates) {
    this.collegeName = collegeName;
    this.degree = degree;
    this.dates = dates;
}

console.log("%cHi👋🏻", "font-size: 48px;");
console.log("%cHice to meet you in this back alley.", "font-size: 24px;");
console.log('\n');
console.log('%c👇🏻 Profile', 'font-size: 24px');

console.dir(new workExperience());
console.log('\n\n');


let edu = [];
edu.push(new Education("BITS Pilani", "M.Tech (Security)", "2019-Present"));
edu.push(new Education("Udacity", "Deep Learning Nanodegree", "2018-2018"));
edu.push(new Education("Udacity", "Android Developer Nanodegree", "2018-2018"));
edu.push(new Education("Pune University", "B.E. (Computer Science)", "2015-2019"));
edu.push(new Education("ICSE", "High School and Intermediate", "2012-2015"));
  
console.log('Education:');
console.table(edu);
  
let tagStyle = 'font-size: 20px; color: #FFFFFF; background-color: #6C757D; padding: 2px 10px 0px 10px; border-radius: 5px; margin: 5px 0px;';
let noStyle  = '';

console.log('\n%cTech Stack\n\n%cDSA%c  %cJava%c  %cPHP%c  %cNodeJS%c  %cHTML/CSS/JS%c  %cReactJS + VueJS%c  %cAndroid%c  %cMongoDB%c  %cFirebase%c  %cAWS + GCP%c  %cPostgreSQL%c  %cmySQL + SQLite', 'font-size: 30px; color: green', 
tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle, noStyle, tagStyle);

console.log('\n');
console.log('%c(Note: There is an image below which might not work in non-chromium browsers)', 'font-size: 16px; color: orange');
console.image("https://yush.dev/assets/images/not_sure.jpg");