var preloadMenu = function(game){}

preloadMenu.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(0,0,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //Load all stuf from menu
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("auxBar","assets/auxBar.png");
		this.game.load.image("arrow","assets/arrows.png");
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}