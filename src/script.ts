import { Github } from "./types/github";

let arrayOfRepos: HTMLDivElement[] = [];
let def = 0;

document.addEventListener('DOMContentLoaded', async function () {
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

	const theme = localStorage.getItem("theme");

	const docBody = document.body;
	const githubImage = document.getElementById("github");
	const gitlabImage = document.getElementById("gitlab");
	const mailImage = document.getElementById("mail");
	const themeSwitcher = document.getElementById("themeSwitcher");

	if (!githubImage) return;
	if (!gitlabImage) return;
	if (!mailImage) return;
	if (!themeSwitcher) return;

	if (theme) {
		if (!docBody.classList.contains(theme)) {
			if (theme == "dark") {
				docBody.classList.remove("light");
				docBody.classList.add("dark");
			} else if (theme == "light") {
				docBody.classList.remove("dark");
				docBody.classList.add("light");
			}
		}
	} else {
		docBody.classList.add("light");
	}

	if (docBody.classList.contains("dark")) {
		githubImage.setAttribute("src", "./icons/github-dark.png");
		gitlabImage.setAttribute("src", "./icons/gitlab-dark.png");
		mailImage.setAttribute("src", "./icons/email-dark.png");
		themeSwitcher.setAttribute("src", "./icons/moon.png");
	} else if (docBody.classList.contains("light")) {
		githubImage.setAttribute("src", "./icons/github-light.png");
		gitlabImage.setAttribute("src", "./icons/gitlab-light.png");
		mailImage.setAttribute("src", "./icons/email-light.png");
		themeSwitcher.setAttribute("src", "./icons/sun.png");
	}

	let githubRepos = await (await fetch("https://api.github.com/users/mohamedarish/repos")).json() as Github[];

	if (!githubRepos) return;

	console.log(githubRepos);

	githubRepos = githubRepos.filter(element => { return !element.fork });

	githubRepos.forEach(repo => {
		const headLink = document.createElement("div");
		headLink.classList.add("album-item");

		const detailSpan = document.createElement("span");
		detailSpan.classList.add("album-details");

		const linkToRepo = document.createElement("a");
		linkToRepo.setAttribute("target", "_blank");
		linkToRepo.setAttribute("href", repo.html_url);

		const titleSpan = document.createElement("span");
		titleSpan.classList.add("title");
		titleSpan.innerText = repo.name;

		linkToRepo.appendChild(titleSpan);

		const descSpan = document.createElement("span");
		descSpan.classList.add("subtitle");
		descSpan.innerText = repo.description || "";

		detailSpan.appendChild(linkToRepo);
		detailSpan.appendChild(descSpan);

		headLink.appendChild(detailSpan);

		arrayOfRepos.push(headLink);
	});

	console.log(arrayOfRepos);

	const scroller = document.getElementById("album-rotator-holder");

	if (!scroller) return;

	arrayOfRepos.forEach(repo => {
		scroller.appendChild(repo);
	});
});


const themeSwitcher = document.getElementById("themeSwitcher");

if (themeSwitcher) {

	themeSwitcher.onclick = () => {
		const bodyElement = document.body;

		const githubImage = document.getElementById("github");
		const gitlabImage = document.getElementById("gitlab");
		const mailImage = document.getElementById("mail");

		if (!bodyElement) return;
		if (!githubImage) return;
		if (!gitlabImage) return;
		if (!mailImage) return;

		if (bodyElement.classList.contains("dark")) {
			bodyElement.classList.remove("dark");
			bodyElement.classList.add("light");

			githubImage.setAttribute("src", "./icons/github-light.png");
			gitlabImage.setAttribute("src", "./icons/gitlab-light.png");
			mailImage.setAttribute("src", "./icons/email-light.png");
			themeSwitcher.setAttribute("src", "./icons/sun.png");
		} else if (bodyElement.classList.contains("light")) {
			bodyElement.classList.remove("light");
			bodyElement.classList.add("dark");
			githubImage.setAttribute("src", "./icons/github-dark.png");
			gitlabImage.setAttribute("src", "./icons/gitlab-dark.png");
			mailImage.setAttribute("src", "./icons/email-dark.png");
			themeSwitcher.setAttribute("src", "./icons/moon.png");
		}

		localStorage.setItem("theme", bodyElement.classList.contains("light") ? "light" : "dark");
	}
};

