export const editProfileObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const editProfileBtn = document.querySelector(".edit-profile-btn");
    const editProfileForm = document.querySelector(".update-profile");
    editProfileBtn.addEventListener("click", () => {
      editProfileForm.style.cssText = "display:block;";
      editProfileBtn.style.cssText = "display:none;";
    });
  });
});
