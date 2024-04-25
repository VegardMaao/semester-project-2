export const logoutObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const navList = document.querySelector(".nav_ul");
    const logOutBtn = navList.lastChild;
    logOutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/index.html";
    });
  });
});
