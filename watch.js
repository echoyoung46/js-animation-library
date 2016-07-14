function Watch(_canvas) {
    this.canvas = document.getElementById(_canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
}

Watch.prototype.init = function() {
    this.drawSecond();
    this.drawCenter();
}

Watch.prototype.drawSecond = function() {
    var self = this,
        ctx1 = ctx2 = self.ctx,
        xpos = self.canvasWidth / 2,
        ypos1 = self.canvasHeight / 2,
        ypos2 = self.canvasHeight / 2,
        yspeed1 = 4,
        yspeed2 = 1;

    (function draw() {
        if(ypos1 >= 370) {
            window.requestAnimationFrame(draw);
            self.rotateSecond();
        }


        ctx1.beginPath();
        ctx1.moveTo(xpos, ypos1);
       
        ypos1 -= yspeed1;
        ctx1.lineTo(xpos, ypos1);
        ctx1.strokeStyle="#f8f8f8";
        ctx1.stroke();

        ctx2.beginPath();
        ctx2.moveTo(xpos, ypos2);
        ypos2 += yspeed2;
        ctx2.lineTo(xpos, ypos2);
        ctx2.strokeStyle="#f8f8f8";
        ctx2.stroke();
    }());

}

Watch.prototype.rotateSecond = function() {
    console.log('rotateSecond');
}

Watch.prototype.drawCenter = function() {
    var self = this,
        ctx = self.ctx,
        radiusArr = [
            {minr:0.06, maxr: 6, color: "#f8f8f8", speed: 0.2},
            {minr:0.02, maxr: 2, color: "#000", speed: 0.07}
        ];
        centerX = self.canvasWidth/2,
        centerY = self.canvasHeight/2;


    (function draw() {
        if( radiusArr[0].minr < radiusArr[0].maxr ){
            var r = radiusArr[0].minr;
            ctx.clearRect((centerX-r),(centerY-r),r,r);
            window.requestAnimationFrame(draw);
        }else{
            console.log(radiusArr[0].minr);
            console.log(radiusArr[1].minr);
        }

        for( var i = 0; i < radiusArr.length; i++ ) {
            ctx.beginPath();
            ctx.arc(centerX,centerY,radiusArr[i].minr,0,2*Math.PI,true);
            ctx.fillStyle = radiusArr[i].color;
            ctx.fill();
            ctx.closePath();
            radiusArr[i].minr += radiusArr[i].speed;
        }

    }());
}

Watch.prototype.clear = function() {
    this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight)
}

