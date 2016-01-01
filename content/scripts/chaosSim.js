/*
	ChaosSim
	© 2014 Michael Harrington
*/
$(document).ready(function() {
	$DSDebugger.hide();

	//	http://stackoverflow.com/a/894877
	function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }
	//function Property() { var prop = null; return function(arg) { return typeof arg !== 'undefined' ? prop = arg : prop; }; }	//	var test = Property();

	(function(chaosSim, undefined) {
		//	Self reference.
		var $game = chaosSim;
		$game.version = "0.0.1";
		$game.author = "Mike Harrington";

		function randomInt(max, min) {
			max = defaultFor(max, 100);
			min = defaultFor(min, 0);
			return Math.floor(Math.random() * (max - min)) + min;
		};

		var log = function(objToLog) {
			//	Limit length of the log.
			var $log = $("#gameLog");
			var logLen = $log.children("li").length;
			if (logLen >= 50)
				$log.children("li").first().remove();

			var date = $game.timing.currentRaw();
			var timestamp = date.toTimeString().split(" ")[0];// + ":" + date.getMilliseconds();
			$log.append("<li>" + timestamp + ":&nbsp;" + objToLog + "</li>");
		};

		//	Initialize game variables.
		//	Game timing object.
		$game.timing = {
			start: new Date().getTime(),
			currentRaw: function() {
				return new Date();
			},
			current: function() {
				return this.currentRaw().getTime();
			},
			lastFrame: null,
			fps: 30,	//	Target FPS
		};

		$game.agentFactory = (function() {
			function _generateAgent() {
				var agent = new SimAgent();
				agent.name = "";
				agent.maxHp = agent.curHp = 20000;
				return agent;
			};

			var specialCharacters = [
				"Admiral Oink",
				"Bob Bobbington",
				"Hugh Manatee",
			];

			function SimAgent() {
				return {
					maxHp: 0,
					curHp: 0,
					name: "",
					age: 0,
					survival: 50,
					intelligence: 50,
					combat: 50,
					senses: 50,
					gathering: 0,
					sex: "",
					trust: 50,
					communication: 50,
					hunger: 50,
					thirst: 50,
					sanity: 50,
					giveBirth: function() {
					},
					observe: function() {
					},
					act: function(action) {
					}
				}
			};

			//	Module Pattern
			return {
				generateAgent: _generateAgent,
			};
		}());

		//	Initialize game methods.
		$game.init = function() {
			//	Initialize game clock.
			$game.timing.lastFrame = $game.timing.current();

			//	Start game loop
			setInterval($game.update, 1/$game.timing.fps * 1000)
		};

		$game.update = function() {
			//var last = $game.timing.lastFrame;
			function _deltaT() {
				var prevLast = $game.timing.lastFrame;
				$game.timing.lastFrame = $game.timing.current();
				return $game.timing.lastFrame - prevLast;
			}

			var dT = _deltaT();
			//log("Last: " + last + " / Now: " + $game.timing.lastFrame + " (" + dT + ")");
			//log(dT);
			$game.updateUI();
		};

		$game.updateUI = function() {
		}

		//	Start the game up.
		$game.init();
	})(window.chaosSim = window.chaosSim || {});
});