// JavaScript for Hamburger Menu
function toggleMenu() {
  const navList = document.querySelector(".nav_list");
  navList.classList.toggle("active");
}

// JavaScript for copying URL
function copyUrl() {
  const urlInput = document.getElementById("shortenedUrl");
  const copyMessage = document.getElementById("copyMessage");

  urlInput.select();
  urlInput.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");

  copyMessage.style.display = "block";
  setTimeout(() => {
    copyMessage.style.display = "none";
  }, 2000);
}

// JavaScript for showing/hiding logout block
function toggleLogout() {
  const logoutBlock = document.getElementById("logoutBlock");
  logoutBlock.style.display =
    logoutBlock.style.display === "block" ? "none" : "block";
}

// Close logout block if clicked outside
document.addEventListener("click", function (event) {
  const logoutBlock = document.getElementById("logoutBlock");
  const userIcon = document.querySelector(".user_icon");

  if (!userIcon.contains(event.target) && !logoutBlock.contains(event.target)) {
    logoutBlock.style.display = "none";
  }
});
