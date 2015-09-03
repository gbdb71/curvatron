var Adventure = function(game) {
	this.sp = true;
	this.game = game;
	this.spawnPowers = true;
	this.leaderboardID = modesLB[0];
	this.score = 0;
	this.map = null;
	this.layer = null;
	this.width = 1344;
	this.height = 768;
	this.pointPositions = null;
	this.level = 4;
};

Adventure.prototype = {

	preload: function () {
		setScreenFixed(baseW, baseH, this.game);

		this.game.load.image('player0', 'assets/sprites/game/singleplayer/player.png');
		this.game.load.image('superPower', 'assets/sprites/game/singleplayer/powerHS.png');
		this.game.load.image('point', 'assets/sprites/game/singleplayer/point.png');
		this.game.load.spritesheet('shrink', 'assets/sprites/game/singleplayer/shrink.png', 100, 100);

		this.game.load.image('Pastel', 'assets/levels/Pastel.png'); // loading the tileset image
		this.game.load.tilemap('level', 'assets/levels/level' + this.level + '.json', null, Phaser.Tilemap.TILED_JSON); // loading the tilemap file
		this.game.load.json('points', 'assets/levels/points' + this.level + '.json');

	},

	create: function() {
		//redo bitmapData
		delete bmd;
		bmd = this.game.add.bitmapData(this.game.width, this.game.height);
		bmd.addToWorld();
		bmd.smoothed = false;

		w2 = this.game.world.width/2;
		h2 = this.game.world.height/2;

		bmd.width = 2*w2;
		bmd.height = 2*h2;

		players[0].x = w2;
		players[0].y = h2;

		this.score = 0;
		spawnPowers = true;

		this.map = this.game.add.tilemap('level'); // Preloaded tilemap
		this.map.addTilesetImage('Pastel'); // Preloaded tileset

    this.layer = this.map.createLayer('obstacles'); //layer[0]

		powerText = this.game.add.text(0, 0, "1", {
		font: "15px dosis",
				fill: colorHex,
				align: "center"
		});
		powerText.anchor.setTo(0.5,0.5);

		//this.map.setCollisionByExclusion([], true, this.layer);

		this.pointPositions = this.game.cache.getJSON('points');
	},

	update: function() {
		if(this.game.physics.arcade.collide(players[0].sprite, this.layer)){
			players[0].kill();
		}
	},

	erasesTrail: function () {
		return true;
	},

	getScore: function () {
		return this.score;
	},

	getHighScore: function () {
		var score = parseInt(localStorage.getItem("highScore"));
		if (isNaN(score)) {
			return 0;
		} else {
			return score;
		}
	},

	setScore: function (score) {
		this.score = score;
	},

	setHighScore: function (score) {
		localStorage.setItem("highScore", score);
	},

	submitScore: function () {
		if (this.score > this.getHighScore()) {
			this.setHighScore(this.score);
		}
	},

	collect: function (player, power) {

		this.score++;
		this.createPower();

		var ballsScore = parseInt(localStorage.getItem("ballsScore"));
		if (isNaN(ballsScore)) {
			ballsScore = 0;
		}
		localStorage.setItem("ballsScore", ballsScore+1);
	},

	createPower: function () {
		var powerup = new PowerUp(this.game, 'point', this, this.pointPositions[this.score].x, this.pointPositions[this.score].y);
		powerup.create();
	}

};