<spil-comp>
	<style>
		#spil {
			background-image: url('spil.png');
			background-repeat: repeat;
			top: 10;
			width: 200%;
			height: 80;
		}
	</style>

	<div id="spil"></div>

	<script>
		this.on('mount', function(){
			console.log('m')
			var width = 200, speed = 15, //pixels per second
			duration = width / speed
			var leftPosition = - width + (speed / 60) //adjust the end position assuming 60fps - per Jack of gsap
			var rightPosition =  width - (speed / 60)
			tr = TweenMax.to($('#spil'), duration, {css: { backgroundPosition:rightPosition + "px 0"}, ease:Linear.easeNone, repeat:-1})
			tl = TweenMax.to($('#spil'), duration, {css: { backgroundPosition:leftPosition +  "px 0"}, ease:Linear.easeNone, repeat:-1})
			tr.pause()
			tl.play()
		})

		this.left = function() {
			tr.pause()
			tl.play()
			TweenMax.fromTo($('#spil'), 3, {
				opacity: 0.01
			}, {opacity: 1})
		}
		this.right = function() {			tl.pause()
			tr.play()
			TweenMax.fromTo($('#spil'), 3, {
				opacity: 0.01
			}, {opacity: 1})
		}
	</script>

</spil-comp>
