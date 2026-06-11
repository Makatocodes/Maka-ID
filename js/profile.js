document.addEventListener(
"DOMContentLoaded",
function(){

    const profileName =
        localStorage.getItem(
            "walletProfileName"
        );

    const profileImage =
        localStorage.getItem(
            "walletProfileImage"
        );

    const nameElement =
        document.getElementById(
            "settingsProfileName"
        );

    const imageElement =
        document.getElementById(
            "profileImage"
        );

    if(profileName && nameElement){
        nameElement.textContent =
            profileName;
    }

    if(profileImage && imageElement){
        imageElement.src =
            profileImage;
    }
});