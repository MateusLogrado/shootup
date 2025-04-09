document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        window.location.href = "index.html"
    }
    if (event.key.toLowerCase() === "h") {
        window.location.href = "instrucoes.html"
    }
})
