export const editProfileObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function () {
    const editProfileBtn = document.querySelector(".edit-profile-btn");
    const editProfileForm = document.querySelector(".update-profile");
    const cancelEditBtn = document.querySelector(".cross-icon-profile-editor");
    editProfileBtn.addEventListener("click", () => {
      editProfileForm.style.cssText = "display:block;";
      editProfileBtn.style.cssText = "display:none;";
    });
    cancelEditBtn.addEventListener("click", () => {
      editProfileForm.style.cssText = "display:none;";
      editProfileBtn.style.cssText = "display:block;";
    });
  });
});
