(function () {
    // Clear the current page
    document.body.innerHTML = '';

    function createFloatingDiv(text) {
        const div = document.createElement("div");
        div.classList.add("list-item");
        div.textContent = text;
        div.style.position = "fixed";
        div.style.left = Math.random() * window.innerWidth + "px";
        div.style.top = Math.random() * window.innerHeight + "px";
        div.style.background = "rgba(0, 0, 0, 0.7)";
        div.style.color = "#fff";
        div.style.padding = "10px 15px";
        div.style.borderRadius = "8px";
        div.style.zIndex = 9999;
        div.style.fontFamily = "sans-serif";
        div.style.fontSize = "24px";

        const closeBtn = document.createElement("span");
        closeBtn.textContent = "×";
        closeBtn.style.position = "absolute";
        closeBtn.style.top = "4px";
        closeBtn.style.right = "6px";
        closeBtn.style.cursor = "pointer";
        closeBtn.style.color = "#fff";
        closeBtn.style.fontWeight = "bold";
        closeBtn.style.fontSize = "14px";
        closeBtn.style.zIndex = 10000;
        closeBtn.onclick = () => div.remove();

        div.appendChild(closeBtn);


        document.body.appendChild(div);
        animateDiv(div);
    }

    function animateDiv(div) {
        let x = parseFloat(div.style.left);
        let y = parseFloat(div.style.top);
        let dx = (Math.random() - 0.5) * 0.5;
        let dy = (Math.random() - 0.5) * 0.5;

        function move() {
            x += dx;
            y += dy;
            if (x < 0 || x > window.innerWidth - div.offsetWidth) dx *= -1;
            if (y < 0 || y > window.innerHeight - div.offsetHeight) dy *= -1;
            div.style.left = x + "px";
            div.style.top = y + "px";
            requestAnimationFrame(move);
        }

        move();
    }



    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.background = "white";
    container.style.padding = "10px";
    container.style.borderRadius = "8px";
    container.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    container.style.zIndex = 10000;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter word";
    input.style.padding = "6px";
    input.style.marginRight = "6px";
    input.style.borderRadius = "4px";
    input.style.border = "1px solid #ccc";
    input.style.fontSize = "24px";



    const button = document.createElement("button");
    button.textContent = "Add";
    button.style.padding = "6px 12px";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.background = "#007bff";
    button.style.color = "white";
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.marginLeft = "6px";
    saveButton.style.padding = "6px 12px";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "4px";
    saveButton.style.background = "#28a745";
    saveButton.style.color = "white";
    saveButton.style.cursor = "pointer";
    saveButton.style.fontSize = "14px";

    const loadButton = document.createElement("button");
    loadButton.textContent = "Load";
    loadButton.style.marginLeft = "6px";
    loadButton.style.padding = "6px 12px";
    loadButton.style.border = "none";
    loadButton.style.borderRadius = "4px";
    loadButton.style.background = "#6c757d";
    loadButton.style.color = "white";
    loadButton.style.cursor = "pointer";
    loadButton.style.fontSize = "14px";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.appendChild(button);
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(loadButton);


    function submitInput() {
        const text = input.value.trim();
        if (text) {
            createFloatingDiv(text);
            input.value = "";
        }
    }

    button.onclick = submitInput;

    saveButton.onclick = () => {
        const texts = Array.from(document.querySelectorAll("div.list-item"))
            .map(el => el.firstChild.textContent.trim());
        localStorage.setItem("mindmap-ASDFQ@$RWFG-list", JSON.stringify(texts));
        alert("Saved!");
    };

    loadButton.onclick = () => {
        const stored = localStorage.getItem("mindmap-ASDFQ@$RWFG-list");
        if (stored) {
            const words = JSON.parse(stored);
            words.forEach(createFloatingDiv);
        } else {
            alert("Nothing saved.");
        }
    };


    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitInput();
        }
    });

    container.appendChild(input);
    container.appendChild(buttonsContainer);

    document.body.appendChild(container);

    input.focus(); // 👈 Auto-focus
})();
