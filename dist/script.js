let arrayOfRepos = [];
let def = 0;
document.addEventListener('DOMContentLoaded', async function () {
    const dataText = ["Hello, I'm Arish"];
    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            let vissibleArea = document.querySelector("h1");
            if (!vissibleArea)
                return;
            if (i > 10) {
                vissibleArea.innerHTML = text.substring(0, 11) + "<div id='name' style='color: #CFB278;' >&nbsp;" + text.substring(11, i + 1) + "</div><span aria-hidden='true'></span>";
            }
            else {
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
    function StartTextAnimation(i) {
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
    if (!githubImage)
        return;
    if (!gitlabImage)
        return;
    if (!mailImage)
        return;
    if (!themeSwitcher)
        return;
    if (theme) {
        if (!docBody.classList.contains(theme)) {
            if (theme == "dark") {
                docBody.classList.remove("light");
                docBody.classList.add("dark");
            }
            else if (theme == "light") {
                docBody.classList.remove("dark");
                docBody.classList.add("light");
            }
        }
    }
    else {
        docBody.classList.add("dark");
    }
    if (docBody.classList.contains("dark")) {
        githubImage.setAttribute("src", "./icons/github-dark.png");
        gitlabImage.setAttribute("src", "./icons/gitlab-dark.png");
        mailImage.setAttribute("src", "./icons/email-dark.png");
        themeSwitcher.setAttribute("src", "./icons/moon.png");
    }
    else if (docBody.classList.contains("light")) {
        githubImage.setAttribute("src", "./icons/github-light.png");
        gitlabImage.setAttribute("src", "./icons/gitlab-light.png");
        mailImage.setAttribute("src", "./icons/email-light.png");
        themeSwitcher.setAttribute("src", "./icons/sun.png");
    }
    let githubRepos = await (await fetch("https://api.github.com/users/mohamedarish/repos")).json();
    if (!githubRepos)
        return;
    console.log(githubRepos);
    githubRepos = githubRepos.filter(element => { return !element.fork; });
    githubRepos.forEach(repo => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("repo");
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", repo.html_url);
        titleLink.setAttribute("target", "_blank");
        const headTitle = document.createElement("h3");
        headTitle.innerText = repo.name;
        titleLink.appendChild(headTitle);
        const descPara = document.createElement("p");
        descPara.classList.add("description");
        descPara.innerText = repo.description || "";
        containerDiv.appendChild(titleLink);
        containerDiv.appendChild(descPara);
        arrayOfRepos.push(containerDiv);
    });
    console.log(arrayOfRepos);
    const scroller = document.getElementById("holder");
    if (!scroller)
        return;
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
        if (!bodyElement)
            return;
        if (!githubImage)
            return;
        if (!gitlabImage)
            return;
        if (!mailImage)
            return;
        if (bodyElement.classList.contains("dark")) {
            bodyElement.classList.remove("dark");
            bodyElement.classList.add("light");
            githubImage.setAttribute("src", "./icons/github-light.png");
            gitlabImage.setAttribute("src", "./icons/gitlab-light.png");
            mailImage.setAttribute("src", "./icons/email-light.png");
            themeSwitcher.setAttribute("src", "./icons/sun.png");
        }
        else if (bodyElement.classList.contains("light")) {
            bodyElement.classList.remove("light");
            bodyElement.classList.add("dark");
            githubImage.setAttribute("src", "./icons/github-dark.png");
            gitlabImage.setAttribute("src", "./icons/gitlab-dark.png");
            mailImage.setAttribute("src", "./icons/email-dark.png");
            themeSwitcher.setAttribute("src", "./icons/moon.png");
        }
        localStorage.setItem("theme", bodyElement.classList.contains("light") ? "light" : "dark");
    };
}
;
export {};
