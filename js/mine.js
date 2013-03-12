//detect capsLock
var capsLock = "unkown";
var typingManager = new function() {
	this.startTyping = function() {
		$("body").trigger("startTimer");
		$('body').on('keypress', function(e) {
			if (capsLock == "unkown")
				check_caps_lock(e);
		});
		$('body').on('keyup', function(e) {
			moveText(e);
		});
		$('body').on('keydown', function(e) {
			clickKey(e);
		});
		timer();
	};
	this.stop = function() {
		$("body").off("keypress");
		$("body").off("keyup");
		$("body").off("keypdown");
		$("body").trigger("stopTimer");
	};

	this.resume = function() {
		$("body").on("keypress", function(e) {
			if (capsLock == "unkown")
				check_caps_lock(e);
		});
		$("body").on("keyup", function(e) {
			moveText(e);
		});
		$("body").on("keypdown", function(e) {
			clickKey(e);
		});
		$("body").trigger("startTimer");
	};
};

$(document)
		.ready(
				function() {
					function go(val){
						$(".textboxbar").val(val + ".");
						$(".modal").slideUp("slow");
						monopolFocus();
						typingManager.startTyping();
					}
					
					$("body").on("endTyping", function() {
						$(".displayResult").html($(".sideBar").html());
						$(".displayResult").slideDown('slow');
						$(".result").slideDown('slow');
						typingManager.stop();
					});
					$(".start").on("click", function() {
						go($(".inputbox").val());
					});

					$(".default")
							.on(
									"click",
									function() {
										go("L'informatique est le domaine d'activité scientifique, technique et industriel concernant le traitement automatique de l'information par des machines : des systèmes embarqués, des ordinateurs, des robots, des automates, etc. Ces champs d'application peuvent être séparés en deux branches, l'une, de nature théorique, qui concerne la définition de concepts et modèles, et l'autre, de nature pratique, qui s'intéresse aux techniques concrètes d'implantation et de mise en oeuvre sur le terrain. Certains domaines de l'informatique peuvent être très abstraits, comme la complexité algorithmique, et d'autres peuvent être plus proches d'un public profane : par exemple, la théorie des langages demeure un domaine davantage accessible aux professionnels formés (description des ordinateurs et méthodes de programmation), tandis que les métiers liés aux interfaces homme-machine sont");
									});
					$(".back").on("click", function() {
						location.reload();
					});
					$(".charbox").on("keydown", function(e) {
						escape(e);
					});
				});

function escape(e) {
	if (e.which == 27) {
		typingManager.stop();
	}
	if (e.which == 13) {
		typingManager.resume();
	}
}

// read char and move text
function moveText(e) {
	var textboxbar = $(".textboxbar");
	var typedboxbar = $(".typedboxbar");
	var text = textboxbar.val();
	var charboxbar = text.charAt(0);
	var charbox = $(".charbox");
	var char = charbox.val();
	var length = charbox.val().length;
	var miss, hit;
	var val;

	if (text.substring(0, char.length) == char) {
		if (length) {
			textboxbar.val(text.substring(length));
			val = function() {
				var value = typedboxbar.val() + text.substring(0, length);
				var l = value.length;
				return value.substring(l - 22, l);
			};
			typedboxbar.val(val());
			console.log(typedboxbar.val().length);
			hit = $("#hit");
			hit.html(parseInt(hit.html(), 10) + 1);
		}
	} else {
		miss = $("#miss");
		miss.html(parseInt(miss.html(), 10) + 1);
		mustClickKey(charboxbar);
	}
	for ( var i = 0; i < char.length; i++)
		clickOtherKeys(char[i]);
	charbox.val("");
	if (text.length == 1) {
		$("body").trigger("endTyping");
	}
}

// hightlight keys that must be clicked
function mustClickKey(char) {
	var id = mustCharToId(char);
	setTimeout(function() {
		$(id).addClass("mustbepressed");
		setTimeout(function() {
			$(id).removeClass("mustbepressed");
		}, 120);
	}, 100);

}

// hightlight keys that has been clicked
function clickKey(e) {
	var id = charToId(e);
	setTimeout(function() {
		$(id).addClass("pressed");
		setTimeout(function() {
			$(id).removeClass("pressed");
		}, 120);
	}, 100);
}
function clickOtherKeys(char) {
	var id = otherCharToId(char);
	setTimeout(function() {
		$(id).addClass("pressed");
		setTimeout(function() {
			$(id).removeClass("pressed");
		}, 120);
	}, 100);
}

function otherCharToId(char) {
	var ids = (mapKeys[char]), id = "";

	ids = (ids + "").split(" ");
	if (ids != undefined) {
		$.each(ids, function(i, v) {
			id += ",#key_" + v;
		});
	}
	return id.substring(1);
}

function charToId(e) {
	var id = "";
	var char = String.fromCharCode(e.which).toLowerCase();
	var code = char.charCodeAt(0);
	if (code >= 97 && code <= 122) {
		id = "#key_" + char;
		if (e.shiftKey)
			id += " , #key_left_shift , #key_right_shift";
		return id;
	}
	if (e.which == 20)
		switchCapsLock();
	return mapSpecialKeys[e.which];
}

function switchCapsLock() {
	if (capsLock == "unkown")
		return;
	if (capsLock == "on") {
		capsLock = "off";
		$("#key_caps_lock").removeClass("pressed");
	} else {
		capsLock = "on";
		$("#key_caps_lock").addClass("pressed");
	}
}

function mustCharToId(char) {
	var code = char.charCodeAt(0), id = "";
	var lchar = char.toLowerCase();
	var manageCapsLockForLetters = function(status) {
		if (capsLock == status) {
			if ($.inArray(lchar, shiftRight) != -1)
				id += " , #key_right_shift";
			else
				id += " , #key_left_shift";
		}
	};
	if (code >= 65 && code <= 90) {
		id += "#key_" + lchar;
		manageCapsLockForLetters("off");
		return id;
	}
	if (code >= 97 && code <= 122) {
		id += "#key_" + lchar;
		manageCapsLockForLetters("on");
		return id;
	}
	// TODO manage capslock for other char
	id = otherCharToId(char);
	if (capsLock == "on")
		id = id.replace(",#key_left_shift,#key_right_shift", "").replace(
				"noshift", ",#key_left_shift,#key_right_shift");
	return id;
}

function monopolFocus() {
	var hbox = $(".charbox");
	hbox.focus();
	hbox.on("blur", function() {
		hbox.focus();
	});
	$("body").on("click", function() {
		hbox.focus();
	});
}

// Display timer on page
function timer() {
	var currentSeconds = 0, currentMinutes = 0;
	var callback = function() {
		currentSeconds = (currentSeconds < 9 ? "0" : "")
				+ (parseInt(currentSeconds, 10) + 1);
		if (currentSeconds >= 60) {
			currentMinutes = (currentMinutes < 9 ? "0" : "")
					+ (parseInt(currentMinutes, 10) + 1);
			currentSeconds = 0;
		}
		var currentTimeString = currentMinutes + ":" + currentSeconds;

		$("#clock").html(currentTimeString);
		var hiddenWPM = (parseInt($("#hit").html(), 10) - parseInt($("#miss")
				.html(), 10)) / 5;
		var wpm = $("#WPM");
		if (hiddenWPM <= 0)
			wpm.html(0);
		else
			wpm.html(Math.round(hiddenWPM
					/ (parseInt(currentMinutes, 10) + (currentSeconds / 60))));
	};
	callback();
	var interval = function() {
		var id = setInterval(callback, 1000);
		$("body").on("stopTimer", function() {
			clearInterval(id);
		});
	};
	interval();
	$("body").on("startTimer", interval);
}

function windowsKeyboard() {
	$("#key_left_alt .left").text("win");
	$("#key_right_alt .right").text("win");

	$("#key_left_cmd .left").text("alt");
	$("#key_right_cmd .right").text("alt");
}

shiftRight = [ "a", "z", "e", "r", "t", "q", "s", "d", "f", "g", "w", "x", "c",
		"v", "b" ];
mapSpecialKeys = {
	13 : ".key_enter",
	16 : "#key_left_shift, #key_right_shift",
	9 : "#key_tab",
	17 : "#key_left_ctrl, #key_right_ctrl",
	18 : "#key_left_alt, #key_right_alt",
	8 : "#key_backspace",
	91 : "#key_left_win, #key_right_win"
};

mapKeys = {
	"œ" : "power2",
	"&" : "one",
	"é" : "two",
	"\"" : "three",
	"\'" : "four",
	"(" : "five",
	"-" : "six",
	"è" : "seven",
	"_" : "eight",
	"ç" : "nine",
	"à" : "zero",
	")" : "hyphen",
	"=" : "equals",

	"´" : "one right_alt",
	"~" : "two right_alt",
	"#" : "three right_alt",
	"{" : "four right_alt",
	"[" : "five right_alt",
	"|" : "six right_alt",
	"`" : "seven right_alt",
	"\\" : "eight right_alt",
	"^" : "nine right_alt",
	"@" : "zero right_alt",
	"]" : "hyphen right_alt",
	"}" : "equals right_alt",

	"$" : "dollar",
	"ù" : "uu",
	"," : "comma",
	";" : "semicolon",
	":" : "colon",
	"!" : "exclamationmark",
	"<" : "chevron",
	"*" : "star",

	" " : "space",

	"£" : "dollar left_shift right_shift",
	"%" : "uu left_shift right_shift",
	"µ" : "star left_shift right_shift",
	"?" : "comma left_shift right_shift",
	"." : "semicolon left_shift right_shift",
	"/" : "colon left_shift right_shift",
	"§" : "exclamationmark left_shift right_shift",
	">" : "chevron left_shift right_shift",

	"1" : "one left_shift right_shift",
	"2" : "two left_shift right_shift",
	"3" : "three left_shift right_shift",
	"4" : "four left_shift right_shift",
	"5" : "five left_shift right_shift",
	"6" : "six left_shift right_shift",
	"7" : "seven left_shift right_shift",
	"8" : "eight left_shift right_shift",
	"9" : "nine left_shift right_shift",
	"0" : "zero left_shift right_shift",
	"°" : "hyphen left_shift right_shift",
	"+" : "equals left_shift right_shift",
};
