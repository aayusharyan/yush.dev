//Configuration Parameters
let canvas      = document.querySelector("#main_canvas");
let ww          = canvas.width = window.innerWidth;
let wh          = canvas.height = window.innerHeight;
let ctx         = canvas.getContext("2d");
let particles   = [];
let amount      = 0;
let mouse       = {x: -9999, y: -9999};
let radius      = 150;
let colors      = ["#695aa6","#444444", "#9370DB","#BA55D3"];
let text        = "< Aayush Sinha />";

//Conditions for Responsiveness
if(ww <= 320)       { radius = 15;  }
else if(ww <= 375)  { radius = 20;  } 
else if(ww <= 768)  { radius = 40;  } 
else if(ww <= 1024) { radius = 50;  }  
else if(ww <= 1440) { radius = 75;  }
else if(ww <= 2048) { radius = 100; }

//Main Particle Class
class Particle {
    constructor(x, y) {
        this.x    = Math.random() * ww;
        this.y    = Math.random() * wh;
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

        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random() * 0.05 + 0.9;

        this.color = colors[Math.floor(Math.random() * 5)];
    }

    //Rended method
    render() {
        this.accX = (this.dest.x - this.x) / 100;
        this.accY = (this.dest.y - this.y) / 100;
        this.vx  += this.accX;
        this.vy  += this.accY;
        this.vx  *= this.friction;
        this.vy  *= this.friction;
        this.x   += this.vx;
        this.y   += this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        //Exploding logic on Mouse Move
        let a = this.x - mouse.x;
        let b = this.y - mouse.y;
        var distance  = Math.sqrt(a * a + b * b);
        if (distance  < (radius)) {
            this.accX = (this.x - mouse.x) / 10;
            this.accY = (this.y - mouse.y) / 10;
            this.vx  += this.accX;
            this.vy  += this.accY;
        }

    }
}

//Change mouse pointers on mouse movement
function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

//Handling for touch inputs. Take only first touch. (For multi touch devices)
function onTouchMove(e){
    if(e.touches.length > 0 ){
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}

//For touch devices - Need to reset when finger is lifted.
function onTouchEnd(e){
    mouse.x = -9999;
    mouse.y = -9999;
}

//Initialization Function
function initScene(){
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Fill canas with text (Temporarily!)
    ctx.font = "bold "+(ww/10)+"px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, ww/2, wh/2);

    //Take snapshot and clear canvas
    let data  = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    //Let the fun games begin!
    particles = [];
    for(var i=0;i<ww;i+=Math.round(ww/150)){
        for(var j=0;j<wh;j+=Math.round(ww/150)){
            if(data[ ((i + j*ww)*4) + 3] > 150){
                particles.push(new Particle(i,j));
            }
        }
    }
    amount = particles.length; //For easy tracking and looping
}

//Event Looooooooooooop
function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

//Initialize and Render
window.addEventListener("resize",    initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend",  onTouchEnd);
initScene();
requestAnimationFrame(render);


//Add some fun messages to Console.
class workExperience {
    constructor(role, companyName, dates, work) {
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
}

class Education {
constructor(collegeName, degree, dates) {
    this.collegeName = collegeName;
    this.degree = degree;
    this.dates = dates;
}
}
console.log("%cHi👋🏻", "font-size: 48px;");
console.log("%cHice to meet you in this dark alley.", "font-size: 24px;");
console.log('');
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

  console.log('');
  console.log('%c(Note: There is an image below which might not work in non-modern browsers)', 'font-size: 16px; color: orange');
  console.image("https://raw.githubusercontent.com/aayusharyan/yush.dev/main/not_sure.jpg");



document.getElementById('sendEmail').onclick = () => {
    window.open("mailto:aayush.aryan@me.com");
}
document.getElementById('viewProfile').onclick = () => {
    window.open('https://www.linkedin.com/in/aayushsinha');
}