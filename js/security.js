function toggleLock(){

    const enabled =
        localStorage.getItem(
            "walletLockEnabled"
        ) === "true";

    localStorage.setItem(
        "walletLockEnabled",
        !enabled
    );

    alert(
        !enabled
        ? "Wallet lock enabled."
        : "Wallet lock disabled."
    );
}

function changePin(){

    const pin =
        prompt(
            "Enter new 4-digit PIN"
        );

    if(
        pin &&
        /^\d{4}$/.test(pin)
    ){

        localStorage.setItem(
            "walletPin",
            pin
        );

        alert(
            "PIN updated successfully."
        );
    }
}

function resetWallet(){

    if(
        confirm(
            "Delete all wallet data?"
        )
    ){

        localStorage.clear();

        location.reload();
    }
}