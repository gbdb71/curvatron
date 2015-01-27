var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(this.game.world.centerX,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //Load das cenas todas do menu
		this.game.load.image("gametitle","assets/gametitle.png");
		this.game.load.image("play","assets/play.png");
		this.game.load.image("auxBar","assets/auxBar.png");
		this.game.load.image("arrow","assets/arrows.png");
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}