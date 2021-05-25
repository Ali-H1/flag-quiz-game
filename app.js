var timer = 1;
var j = 0;

const app = Vue.createApp({
  data() {
    return {
      image: "",
      correctopt: "",
      options: [],
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      displaybtn: "",
      displayoptions: "",
      resultstyle: ["", "", "", ""],
      clicked: false,
      livesstyle: ["", "", ""],
      livesanimate: ["", "", ""],
      lives: 3,
      score: 0,
      nextbtn: "",
    };
  },
  methods: {
    startgame() {
      fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
          var selected = data[Math.floor(Math.random() * 191)];
          this.image = selected.flag;
          this.correctopt = selected.name;
          this.options[0] = this.correctopt;
          this.options[1] = data[Math.floor(Math.random() * 191)].name;
          this.options[2] = data[Math.floor(Math.random() * 191)].name;
          this.options[3] = data[Math.floor(Math.random() * 191)].name;
          var index = Math.floor(Math.random() * 4);
          this.opt1 = this.options[index];
          this.options.splice(index, 1);
          index = Math.floor(Math.random() * 3);
          this.opt2 = this.options[index];
          this.options.splice(index, 1);
          index = Math.floor(Math.random() * 2);
          this.opt3 = this.options[index];
          this.options.splice(index, 1);
          index = Math.floor(Math.random() * 1);
          this.opt4 = this.options[index];
          this.options.splice(index, 1);
        });
      this.nextbtn = "none";
      this.displaybtn = "none";
      this.displayoptions = "block";
      this.clicked = false;
      this.resultstyle = ["", "", "", ""];
      timer = 1;
      this.progressBar();
    },
    answer() {
      var opt1 = document.getElementById("opt1txt").innerHTML;
      var opt2 = document.getElementById("opt2txt").innerHTML;
      var opt3 = document.getElementById("opt3txt").innerHTML;
      var opt4 = document.getElementById("opt4txt").innerHTML;
      var opts = [opt1, opt2, opt3, opt4];
      var indexopt = -1;
      for (i = 0; i < 3; i++) {
        if (opts[i] === this.correctopt) {
          indexopt = i;
        }
      }
      this.resultstyle[indexopt] = "rgb(5, 151, 5)";
    },
    progressBar() {
      if (j == 0) {
        j = 1;
        elem = document.getElementById("myBar");
        width = 1;
        id = setInterval(this.frame, 10);
        elem.style.backgroundColor = "#2732ce";
      }
    },
    frame() {
      if (width >= 100 || !timer) {
        clearInterval(id);
        j = 0;
        if (width >= 100) {
          this.answer();
          this.clicked = true;
          this.nextbtn = "block";
          timer = 0;
          this.livesleft();
  
        }
      } else if (timer) {
        width += 0.2;
        elem.style.width = width + "%";
        if (width >= 55) {
          elem.style.backgroundColor = "#dcdf35";
        }
        if (width >= 80) {
          elem.style.backgroundColor = "#cf2e2e";
        }
      }
    },
    livesleft() {
      this.livesstyle[0] = "rgb(218, 218, 218)";
      this.livesstyle[1] = "lost 600ms infinite";
      this.lives--;
      if (this.lives == 3) {
        this.livesstyle[0] = this.livesstyle[1] = this.livesstyle[2] = "";
      } else if (this.lives == 2) {
        this.livesstyle[0] = "rgb(190, 190, 190)";
        this.livesanimate[0] = "lost 400ms 1 ease-in-out";
      } else if (this.lives == 1) {
        this.livesstyle[0] = this.livesstyle[1] = "rgb(190, 190, 190)";
        this.livesanimate[0] = this.livesanimate[1] =
          "lost 400ms 1 ease-in-out";
      } else if (this.lives == 0) {
        this.livesstyle[0] =
          this.livesstyle[1] =
          this.livesstyle[2] =
            "rgb(190, 190, 190)";
        this.livesanimate[0] =
          this.livesanimate[1] =
          this.livesanimate[2] =
            "lost 400ms 1 ease-in-out";
      }
      if (this.lives <= 0) {
        this.nextbtn = "none";
        alert(
          "Game Over \n Score : " + this.score + "\n Better Luck Next Time :)"
        );
      }
    },
    result(optelement, index) {
      timer = 0;
      if (!this.clicked && this.lives > 0) {
        this.clicked = true;
        this.nextbtn = "block";
        if (document.getElementById(optelement).innerHTML == this.correctopt) {
          this.resultstyle[index] = "rgb(5, 151, 5)";
          this.score++;
        } else {
          this.resultstyle[index] = "rgba(212, 33, 33, 0.959)";
          this.livesleft();
        }
        this.answer();
      }
    },
    opt1clicked() {
      this.result("opt1txt", 0);
    },
    opt2clicked() {
      this.result("opt2txt", 1);
    },
    opt3clicked() {
      this.result("opt3txt", 2);
    },
    opt4clicked() {
      this.result("opt4txt", 3);
    },
  },
});

app.mount(".page");
