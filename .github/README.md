<h1 align="center">PeepoChat</h1>

<p align="center">
    <a href="#"><img src="./assets/icon.png" width="15%" alt="Logo" /></a>
</p>

<p align="center">
    <b>A web-based, cross-platform alternative to Chatterino.</b>
    </br>
    Automatically links together Twitch, Kick, and Youtube streamer chats that you follow into one app. Supports 7tv emotes and customizations.
</p>

<p align="center">
    <a href="https://github.com/Dan-Mizu/PeepoChat/issues" target="_blank">
        <img src="https://img.shields.io/github/issues/Dan-Mizu/PeepoChat?color=red&style=for-the-badge" alt="Issues"/>
    </a>
    <a href="https://github.com/Dan-Mizu/PeepoChat/commits" target="_blank">
        <img src="https://img.shields.io/github/last-commit/Dan-Mizu/PeepoChat?color=darkgreen&style=for-the-badge" alt="Last Commit"/>
    </a>
</p>

## ⬇️ **Installing**

-   [Download From Our Website](http://preview.peepochat.com)
    </br>
    **OR**
-   [Download From Releases](https://github.com/Dan-Mizu/PeepoChat/releases)

**PeepoChat also works within a browser! Visit [peepochat.com](http://preview.peepochat.com)!**

## 🔠 **Languages**

-   [Typescript](https://www.typescriptlang.org/)
-   [Rust](https://www.rust-lang.org/)

## 🏗️ **Frameworks**

-   [Vue](https://vuejs.org/)

## 🧰 **Tools**

-   [Tauri](https://tauri.app/)
-   [Vite](https://vitejs.dev/)

## 🗳️ **Contribute**

There are two ways to contribute.

### **Donations**

I am currently working alone on this project. I develop on the side and dream of making it my main source of income. Any donations would be greatly appreciated.

<p align="center" style="display: flex; justify-content: center; align-items: center;">
    <a href="https://www.paypal.com/paypalme/DanMizu" target="_blank" style="padding: 1%">
        <img height="60rem" src="paypal-donate-button.webp" alt="Donations"/>
    </a>
</p>

### **Developing**

Typescript is easy to develop with, as it is essentially just Javascript with type-safety. This project uses the Vue javascript framework which is known to be one of, if not _THE_, easiest javascript frameworks out there. With the Tauri framework, we wrap web apps into a standalone cross-platform desktop app.

You can clone this repository, make changes, and then submit a pull request. Reach out to me on Discord (@DanMizu) if you are interested or have absolutely _ANY_ questions.

1. **Install npm, Rust, and Visual Studio Code**

You can install NPM (Node Package Manager) from: <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>. The LTS is fine.

You can install Rust from: <https://www.rust-lang.org/tools/install>

Visual Studio Code is a great editor for web development and is obtained from: <https://code.visualstudio.com/>

You can use any other editor, though this project is configured with tasks and run configurations for VSCode.

2. **Clone this Repo**

Theres a button for this at the top right of this repo. I personally use the Github Desktop app to clone repos easily.

3. **Open the Repo in Visual Studio Code and Install Dependencies**

You can open the repo directly from Github Desktop after its been cloned. Use the shortcut CTRL+SHIFT+P (CMD+SHIFT+P on MacOS) and type and/or select `Task: Run Tasks`, then `Install Dependencies`.

4. **Develop**

The source code for the front end is located within `/src/`, and assets are within `src/assets`.

5. **Debug**

If using VSCode, you can use the "Run and Debug" tab on the left to run different configurations. `Dev | Web` will start a Vite server that can be accessed from the URL it gives you in the console. `Dev | Tauri` will run the Vite server, build the app, then launch it.

If you want to build the app yourself, you can use the `Build` task.

6. **Submit Changes For Review and Merging**

When you're finished implementing a new feature, push your changes (it will prompt you to fork the main repository) then submit a pull request to the main repository. This process is detailed here: <https://github.com/firstcontributions/first-contributions>.
