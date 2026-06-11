const STORAGE_KEY = "ph_digital_wallet_data";

function getWalletData(){
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];
}

function saveWalletData(data){
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

function getBase64(file){
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();

        reader.onload = () =>
            resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

async function generateAndSaveID(){

    const type =
    document.getElementById("id-type").value;

    const name =
    document.getElementById("id-name").value.trim();

    const number =
    document.getElementById("id-number").value.trim();

    const extra =
    document.getElementById("id-extra").value.trim();

    if(!name){

        alert("Please enter full name.");

        return;
    }

    let photo = "";

    const photoInput =
    document.getElementById("id-photo");

    if(
        photoInput &&
        photoInput.files &&
        photoInput.files.length > 0
    ){

        photo =
        await compressImage(
            photoInput.files[0]
        );

    }

    const walletData =
    getWalletData();

    walletData.unshift({

        id:
        "card_" + Date.now(),

        type:
        type,

        name:
        name,

        number:
        number,

        extra:
        extra,

        photo:
        photo,

        isManual:
        false

    });

    saveWalletData(walletData);

    showSuccessModal(
        "Virtual ID saved successfully!"
    );

}
function showSuccessModal(message){

    const modal =
    document.getElementById(
        "successModal"
    );

    const msg =
    document.getElementById(
        "successMessage"
    );

    if(!modal){

        console.error(
            "successModal not found"
        );

        location.href =
        "index.html";

        return;
    }

    if(msg){

        msg.textContent =
        message;

    }

    modal.classList.remove(
        "hidden"
    );
}

function goToWallet(){

    window.location.href =
    "index.html";

}
async function compressImage(file){

    return new Promise((resolve)=>{

        const reader = new FileReader();

        reader.onload = function(e){

            const img = new Image();

            img.onload = function(){

                const canvas =
                document.createElement("canvas");

                const MAX_WIDTH = 500;

                const scale =
                MAX_WIDTH / img.width;

                canvas.width = MAX_WIDTH;
                canvas.height =
                img.height * scale;

                const ctx =
                canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                resolve(
                    canvas.toDataURL(
                        "image/jpeg",
                        0.6
                    )
                );

            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

    });

}