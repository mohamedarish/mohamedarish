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

	const body = document.querySelector("body");

	if (!body) return;

	console.log(body.classList);

	const linksDiv = body.querySelector(".links");

	if (!linksDiv) return;

	if (body.classList.contains("dark")) {
		const github = document.createElement("img");
		github.setAttribute("src", "./icons/github-dark.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		github.setAttribute("alt", "github-icon");

		const gitlab = document.createElement("img");
		github.setAttribute("src", "./icons/gitlab-dark.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		gitlab.setAttribute("alt", "gitlab-icon");

		const linkedin = document.createElement("img");
		github.setAttribute("src", "./icons/linkedin-dark.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		linkedin.setAttribute("alt", "linkedin-icon");
	} else if (body.classList.contains("light")) {
		const github = document.createElement("img");
		github.setAttribute("src", "./icons/github-light.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		github.setAttribute("alt", "github-icon");

		const gitlab = document.createElement("img");
		github.setAttribute("src", "./icons/gitlab-light.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		gitlab.setAttribute("alt", "gitlab-icon");

		const linkedin = document.createElement("img");
		github.setAttribute("src", "./icons/linkedin-light.png");
		github.setAttribute("height", "32px");
		github.setAttribute("width", "32px");
		linkedin.setAttribute("alt", "linkedin-icon");
	}
});