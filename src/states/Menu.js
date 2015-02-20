var menu = function(game){
	this.menuSpace = 160;
	maxPlayers = 7;
  maxMods = 1;
  keys = [
    Phaser.Keyboard.W,
    Phaser.Keyboard.P,
    Phaser.Keyboard.B,
    Phaser.Keyboard.Z,
    Phaser.Keyboard.M,
    Phaser.Keyboard.C,
    Phaser.Keyboard.R,
    Phaser.Keyboard.U,]
  numberPlayers = 0;
  mod = 0;
  bestScore = 0;
  bestSurvScore = 0;
  ballsScore = 0;
  deathScore = 0;
  menuMusic = null;
  this.ui = {};
  this.orientation = null;
}

menu.prototype = {
  init: function(){
    Cocoon.Device.setOrientation(Cocoon.Device.Orientations.BOTH);
    this.orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
      mod = 0;
  },

  create: function(){
    if (changeColor) {
      chosenColor = this.game.rnd.integerInRange(0, 3);
      colorHex = bgColors[chosenColor];
      colorHexDark = bgColorsDark[chosenColor];
      document.body.style.background = colorHex;
      this.stage.backgroundColor = colorHex;
      changeColor = false;
    }

    bgColor = Phaser.Color.hexToColor(colorHex);
  	this.stage.backgroundColor = colorHex;
    document.body.style.background = colorHex;

    if (numberPlayers == 0) {
      if (!menuMusic && !mute) {
        menuMusic = this.add.audio('dream');
        menuMusic.loop = true;
        menuMusic.play();
      } else if (!menuMusic.isPlaying && !mute){
        menuMusic.loop = true;
        menuMusic.play();
        menuMusic.volume = 1;
      }
    }

  	bestScore = parseInt(localStorage.getItem("highScore"));
  	if(isNaN(bestScore)) {
  		bestScore = 0;
  	}

    bestSurvScore = parseInt(localStorage.getItem("survivalScore"));
    if(isNaN(bestSurvScore)) {
      bestSurvScore = 0;
    }

    ballsScore = parseInt(localStorage.getItem("ballsScore"));
    if(isNaN(ballsScore)) {
      ballsScore = 0;
    }

    deathScore = parseInt(localStorage.getItem("deathScore"));
    if(isNaN(deathScore)) {
      deathScore = 0;
    }

    var ui = this.ui;

		//Game Title
		ui.title = this.add.text(0,0, "curvatron", {
      font: "200px dosis",
      fill: "#ffffff",
      align: "center"
  	});
  	ui.title.anchor.setTo(0.5,0.5);

    ui.beta = this.add.text(0,0, "BETA", {
      font: "50px dosis",
      fill: "#ffffff",
      align: "center"
    });
    ui.beta.anchor.setTo(0.5,0.5);

    //Single Player
		ui.spButton = this.add.button(0,0,"singleplayer_button",this.singlePlayer,this);
		ui.spButton.anchor.setTo(0.5,0.5);
    ui.spButton.input.useHandCursor=true;

    //Multiplayer
		ui.mpButton = this.add.button(0,0,"multiplayer_button",this.multiplayer,this);
		ui.mpButton.anchor.setTo(0.5,0.5);
    if (mobile) {
      ui.mpButton.alpha = 0.2;
    }
    ui.mpButton.input.useHandCursor=true;

    //SetKeys
    if(!mobile){
      ui.keysButton = this.add.button(0,0,"setkeys_button",this.setKeys,this);
      ui.keysButton.anchor.setTo(0.5,0.5);
      ui.keysButton.input.useHandCursor=true;
    }

  	//Stats
  	ui.statsButton = this.add.button(0,0,"stats_button",this.stats,this);
		ui.statsButton.anchor.setTo(0.5,0.5);
    ui.statsButton.input.useHandCursor=true;

  	//Audio
    if(mute){
    	ui.audioButton = this.add.button(0,0,"audiooff_button",this.muteSound,this);
  		ui.audioButton.anchor.setTo(0.5,0.5);
      ui.audioButton.input.useHandCursor=true;
    }
    else{
      ui.audioButton = this.add.button(0,0,"audio_button",this.muteSound,this);
      ui.audioButton.anchor.setTo(0.5,0.5);
      ui.audioButton.input.useHandCursor=true;
    }

    this.scale.refresh();
    //Place the menu buttons and labels on their correct positions
    this.setPositions();
	},

	singlePlayer: function(){
		this.state.start("SinglePlayer",true,false);
	},

	multiplayer: function(){
    if (!mobile) {
      this.state.start("Multiplayer");
    }
	},

	setKeys: function() {
    if (!mobile) {
      this.state.start("SetKeys");
    }
	},

  stats: function() {
    this.state.start("Stats");
  },

  muteSound: function(){
    var ui = this.ui;
    
    if(mute){
      ui.audioButton.loadTexture('audio_button');
      //this.game.sound.mute = false;
      mute = false;
      if (!menuMusic) {
        menuMusic = this.add.audio('dream');  
      }
      menuMusic.loop = true;
      menuMusic.play();
      menuMusic.volume = 1;
    }
    else{
      ui.audioButton.loadTexture('audiooff_button');
      //this.game.sound.mute = true;
      mute = true;
      if (menuMusic && menuMusic.isPlaying) {
        menuMusic.stop();
      }
    }
  },

  backPressed: function() {
    //exit game?
  },

  setPositions: function() {
    this.orientation = Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
    var ui = this.ui;

    ui.title.position.set(w2,h2*0.3);
    if(this.orientation == "portrait" && mobile){
      ui.title.scale.set(0.7,0.7);
    }else{
      ui.title.scale.set(1,1);
    }

    if(this.orientation == "portrait" && mobile){
      ui.beta.position.set(w2+160,h2*0.3+100);
    }else{
      ui.beta.position.set(w2+360,h2*0.3+100);
    }

    ui.spButton.position.set(w2-170,h2);


    ui.mpButton.position.set(w2+170,h2);

    if(!mobile){
      ui.keysButton.position.set(w2+w2/2,1.6*h2);
    }

    ui.statsButton.position.set(w2,1.6*h2);
    if (mobile) {
      ui.statsButton.x = w2+120;
    }

    ui.audioButton.position.set(w2/2,1.6*h2);
    if (mobile) {
      ui.audioButton.x = w2-120;
    }

  }
}