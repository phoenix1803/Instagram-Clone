function toggleLike(button) {
    const likesCount = button.nextElementSibling;
    let count = parseInt(likesCount.textContent);

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        button.style.color = "#999";
        count -= 1;
    } else {
        button.classList.add("liked");
        button.style.color = "#ed4956";
        count += 1;
    }

    likesCount.textContent = `${count} likes`;
}
