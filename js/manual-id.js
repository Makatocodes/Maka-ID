// ==========================
// MANUAL ID VARIABLES
// ==========================

let frontImage = "";
let backImage = "";


// ==========================
// SHOW VIRTUAL FORM
// ==========================

function showVirtualForm() {

    const selectOption =
        document.getElementById("selectOption");

    const virtualSection =
        document.getElementById("virtualSection");

    if (selectOption) {
        selectOption.classList.add("hidden");
    }

    if (virtualSection) {
        virtualSection.classList.remove("hidden");
    }
}

// ==========================
// SHOW MANUAL FORM
// ==========================

function showManualForm() {

    const selectOption =
        document.getElementById("selectOption");

    const manualSection =
        document.getElementById("manualSection");

    if (selectOption) {
        selectOption.classList.add("hidden");
    }

    if (manualSection) {
        manualSection.classList.remove("hidden");
    }
}

// ==========================
// FRONT IMAGE PREVIEW
// ==========================

function previewFront(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function (e) {

        frontImage =
            e.target.result;

        const preview =
            document.getElementById(
                "frontPreview"
            );

        if (preview) {
            preview.src = frontImage;
        }
    };

    reader.readAsDataURL(file);
}

// ==========================
// BACK IMAGE PREVIEW
// ==========================

function previewBack(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function (e) {

        backImage =
            e.target.result;

        const preview =
            document.getElementById(
                "backPreview"
            );

        if (preview) {
            preview.src = backImage;
        }
    };

    compressImage(file)
.then(result=>{
    frontImage = result;
    backInage = result;
});
}

// ==========================
// FLIP CARD
// ==========================

function flipCard() {

    const card =
        document.getElementById(
            "previewCard"
        );

    if (card) {
        card.classList.toggle(
            "flipped"
        );
    }
}

// ==========================
// REMOVE FRONT
// ==========================

function removeFront() {

    frontImage = "";

    const preview =
        document.getElementById(
            "frontPreview"
        );

    const input =
        document.getElementById(
            "frontInput"
        );

    if (preview) {
        preview.src = "";
    }

    if (input) {
        input.value = "";
    }
}

// ==========================
// REMOVE BACK
// ==========================

function removeBack() {

    backImage = "";

    const preview =
        document.getElementById(
            "backPreview"
        );

    const input =
        document.getElementById(
            "backInput"
        );

    if (preview) {
        preview.src = "";
    }

    if (input) {
        input.value = "";
    }
}

// ==========================
// SAVE MANUAL ID
// ==========================

function saveManualID() {

    if (!frontImage) {

        alert(
            "Please upload front image."
        );

        return;
    }

    const walletData =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || [];

    const newID = {

        id:
            "manual_" +
            Date.now(),

        type:
            document.getElementById(
                "manual-type"
            ).value,

        front:
            frontImage,

        back:
            backImage,

        isManual:
            true

    };

    walletData.unshift(
        newID
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            walletData
        )
    );

    // If modal exists
    if (
        typeof showSuccessModal ===
        "function"
    ) {

        showSuccessModal(
            "ID saved successfully."
        );

    } else {

        alert(
            "ID saved successfully."
        );

        location.href =
            "index.html";
    }
}

// ==========================
// DEBUG CHECK
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "manual-id.js loaded successfully"
        );

    }
);