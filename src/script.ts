document.addEventListener('DOMContentLoaded', function (event) {
	const dataText = ["Hello, I'm Arish"];

	function typeWriter(text: string, i: number, fnCallback: () => void) {
		if (i < (text.length)) {
			let vissibleArea = document.querySelector("h1");

			if (!vissibleArea) return;

			if (i > 10) {
				vissibleArea.innerHTML = text.substring(0, 11) + "<div id='name' style='color: #CFB278;' >&nbsp;" + text.substring(11, i + 1) + "</div><span aria-hidden='true'></span>";

			} else {
				vissibleArea.innerHTML = text.substring(0, i + 1) + "<span aria-hidden='true'></span>";
			}
			setTimeout(function () {
				typeWriter(text, i + 1, fnCallback);
			}, 100);
		}
		else if (typeof fnCallback == 'function') {
			setTimeout(fnCallback, 700);
		}
	}
	function StartTextAnimation(i: number) {
		if (typeof dataText[i] == 'undefined') {
			setTimeout(function () {
				StartTextAnimation(0);
			}, 20000);
		}
		if (i < dataText.length) {
			typeWriter(dataText[i], 0, function () {
				StartTextAnimation(i + 1);
			});
		}
	}
	StartTextAnimation(0);

	const docBody = document.body;
	const githubImage = document.getElementById("github");
	const gitlabImage = document.getElementById("gitlab");
	const mailImage = document.getElementById("mail");

	if (!githubImage) return;
	if (!gitlabImage) return;
	if (!mailImage) return;

	if (docBody.classList.contains("dark")) {
		githubImage.setAttribute("src", "./icons/github-dark.png");
		gitlabImage.setAttribute("src", "./icons/gitlab-dark.png");
		mailImage.setAttribute("src", "./icons/email-dark.png");
	} else if (docBody.classList.contains("light")) {
		githubImage.setAttribute("src", "./icons/github-light.png");
		gitlabImage.setAttribute("src", "./icons/gitlab-light.png");
		mailImage.setAttribute("src", "./icons/email-light.png");
	}
});