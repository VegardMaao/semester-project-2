const myUserName = localStorage.getItem("userName");

export function makeUserProfileSummary(domElement, profileInfo) {
  const {
    banner = {
      alt: "",
      url: "",
    },
    avatar = {
      url: "/src/image-resources/user.png",
      alt: "placeholder image",
    },
    email,
    name,
    bio,
  } = profileInfo;

  domElement.innerHTML = `
      <div class="user-banner" style="background-image:url(${banner.url})"></div>
            <div class="user-summary">
              <div><img class="user-avatar"src="${avatar.url}" alt="${avatar.alt}"></div>
              <div class="user-text">
                <h1>${name}</h1>
                <a href="email:${email}"<p>${email}</p></a>
                <p class="bio">${bio || ""}</p>
              </div>
            </div>
      `;

  if (name === myUserName) {
    domElement.insertAdjacentHTML(
      "afterend",
      `
        <div class="edit-profile-div">
        <p class="edit-profile-btn">Edit profile <i class="far fa-edit"></i></p>
        </div>      
        `
    );
  }
}

export function makeUserListings(listingDomElement, profileInfo) {
  const { listings } = profileInfo;
  if (listings.length === 0) {
    listingDomElement.style.cssText = "grid-template-columns: 1fr";
    listingDomElement.innerHTML = "<p>User has not made any listings yet</p>";
  }
  for (let i = 0; i < listings.length; i++) {
    const { id, description, endsAt, media, tags, title } = listings[i];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");
    let shorterDescription;
    if (description) {
      shorterDescription = description.substring(0, 50);
    }

    if (media.length === 0) {
      media.push({
        alt: "placeholder",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
      });
    }
    listingDomElement.innerHTML += `
        <div class="single-listing">
        <a href="/pages/single-listing.html?id=${id}"><img
        src="${media[0].url || ""}" alt="${media[0].alt || ""}"
      /></a>
  
      <div>
      <a href="/pages/single-listing.html?id=${id}">
        <h3 class="item-title">${title}</h3>
        </a>
        <p class="item-description">${shorterDescription || ""}</p>
        <p>Bidding ends the ${endDate} at ${endTime}</p>
        </div>
        <p>tags: ${tags || ""}</p>
      </div>
      </div>
          
        `;
  }
}

export function makeUserWins(winsDomElement, profileInfo) {
  const { wins } = profileInfo;
  if (wins.length === 0) {
    winsDomElement.style.cssText = "grid-template-columns: 1fr";
    winsDomElement.innerHTML = "<p>User has not won any bids yet</p>";
  }
  for (let i = 0; i < wins.length; i++) {
    const { id, description, endsAt, media, tags, title } = wins[i];
    const endsDate = endsAt.replaceAll("-", ".");
    const slicedEndsDateAndTime = endsDate
      .slice(0, endsDate.length - 4)
      .split("T");
    const endDate = slicedEndsDateAndTime[0].split(".").reverse().join(".");
    const endTime = slicedEndsDateAndTime[1].replaceAll(".", "");
    let shorterDescription;
    if (description) {
      shorterDescription = description.substring(0, 50);
    }

    if (media.length === 0) {
      media.push({
        alt: "placeholder",
        url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
      });
    }
    winsDomElement.innerHTML += `
        <div class="single-listing">
        <a href="/pages/single-listing.html?id=${id}"><img
        src="${media[0].url || ""}" alt="${media[0].alt || ""}"
      /></a>
  
      <div>
      <a href="/pages/single-listing.html?id=${id}">
        <h3 class="item-title">${title}</h3>
        </a>
        <p class="item-description">${shorterDescription || ""}</p>
        <p>Bidding ends the ${endDate} at ${endTime}</p>
        </div>
        <p>tags: ${tags || ""}</p>
      </div>
      </div>
        `;
  }
}
