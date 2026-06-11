function switchScreen(screenId){
    document.querySelectorAll('.app-screen')
        .forEach(s=>s.classList.remove('active'));

    const screen =
        document.getElementById(`screen-${screenId}`);

    if(screen){
        screen.classList.add('active');
    }

    document.querySelectorAll('.nav-btn')
        .forEach(btn=>btn.classList.remove('active'));

    const activeBtn =
        document.querySelector(
            `[data-target="${screenId}"]`
        );

    if(activeBtn){
        activeBtn.classList.add('active');
    }

    if(screenId === 'wallet'){
        renderWallet();
    }
}

function logoutApp(){
    if(confirm("Are you sure you want to logout?")){
        location.reload();
    }
}

function rateApp(){
    const rating =
        prompt("Rate MyWallet PH (1-5 Stars):");

    if(rating){
        alert(
            `Thank you for rating us ${rating} ⭐`
        );
    }
}