const STORAGE_KEY = 'ph_digital_wallet_data';
        let walletData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        // --- NAVIGATION ---
        function switchScreen(screenId) {
            document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
            document.getElementById(`screen-${screenId}`).classList.add('active');
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-target="${screenId}"]`);
            if(activeBtn) activeBtn.classList.add('active');
            
            if(screenId === 'wallet') renderWallet();
        }

        // --- ID CONFIGURATIONS (Colors & Icons) ---
        const typeConfig = {
            national: { title: "REPUBLIKA NG PILIPINAS", subtitle: "PHILIPPINE IDENTIFICATION", bg: "from-slate-100 to-slate-200", text: "text-slate-800", headerBg: "bg-blue-800", headerText: "text-white", icon: "fa-flag", border: "border-slate-300" },
            philhealth: { title: "PHILHEALTH", subtitle: "MEMBER ID CARD", bg: "from-green-500 to-emerald-700", text: "text-white", headerBg: "bg-transparent", headerText: "text-white", icon: "fa-briefcase-medical", border: "border-green-600" },
            sss: { title: "SOCIAL SECURITY SYSTEM", subtitle: "UNIFIED MULTI-PURPOSE ID", bg: "from-blue-600 to-blue-800", text: "text-white", headerBg: "bg-transparent", headerText: "text-white", icon: "fa-building-columns", border: "border-blue-500" },
            tin: { title: "BUREAU OF INTERNAL REVENUE", subtitle: "TIN ID CARD", bg: "from-amber-400 to-orange-500", text: "text-slate-900", headerBg: "bg-transparent", headerText: "text-slate-900", icon: "fa-file-invoice-dollar", border: "border-amber-300" },
            work: { title: "CORPORATE IDENTITY", subtitle: "EMPLOYEE BADGE", bg: "from-slate-800 to-slate-900", text: "text-white", headerBg: "bg-transparent", headerText: "text-white", icon: "fa-id-badge", border: "border-slate-700" },
            school: { title: "STUDENT IDENTITY", subtitle: "CAMPUS CARD", bg: "from-indigo-600 to-purple-700", text: "text-white", headerBg: "bg-transparent", headerText: "text-white", icon: "fa-graduation-cap", border: "border-indigo-500" }
        };

        // --- FILE UPLOAD TO BASE64 ---
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        // --- GENERATE AND SAVE ID ---
        async function generateAndSaveID() {
            const type = document.getElementById('id-type').value;
            const name = document.getElementById('id-name').value || 'John Doe';
            const number = document.getElementById('id-number').value || '0000-0000-0000';
            const extra = document.getElementById('id-extra').value || 'Issued: ' + new Date().toLocaleDateString();
            const photoInput = document.getElementById('id-photo');
            
            let photoBase64 = null;
            if (photoInput.files && photoInput.files[0]) {
                try {
                    photoBase64 = await getBase64(photoInput.files[0]);
                } catch (e) {
                    alert("Error processing image.");
                }
            }

            const newId = {
                id: 'card_' + Date.now(),
                type: type,
                name: name,
                number: number,
                extra: extra,
                photo: photoBase64
            };

            walletData.unshift(newId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(walletData));
            
            // Reset form
            document.getElementById('id-name').value = '';
            document.getElementById('id-number').value = '';
            document.getElementById('id-extra').value = '';
            document.getElementById('id-photo').value = '';

            switchScreen('wallet');
        }

        // --- RENDER WALLET CARDS ---
        function renderWallet() {
            const container = document.getElementById('wallet-cards-container');
            container.innerHTML = '';

            if(walletData.length === 0) {
                container.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-slate-300 rounded-2xl bg-white mt-10">
                        <i class="fa-solid fa-wallet text-4xl text-slate-300 mb-3"></i>
                        <p class="text-slate-500 text-sm font-medium">Your wallet is empty.</p>
                        <button onclick="switchScreen('add')" class="mt-4 text-brand-700 font-bold text-sm bg-brand-50 px-4 py-2 rounded-lg">Add an ID</button>
                    </div>`;
                return;
            }

            walletData.forEach((card) => {
                const config = typeConfig[card.type] || typeConfig['work'];
                const photoSrc = card.photo ? card.photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(card.name)}&background=random&color=fff&size=150`;

                // HTML structure for the physical card look
                const cardHTML = `
                    <div class="relative group">
                        <div id="${card.id}" class="bg-gradient-to-br ${config.bg} ${config.text} rounded-2xl shadow-xl border ${config.border} overflow-hidden aspect-[1.58/1] w-full flex flex-col relative font-sans">
                            
                            <div class="${config.headerBg} ${config.headerText} py-2 px-4 flex items-center gap-2 border-b border-black/10">
                                <i class="fa-solid ${config.icon}"></i>
                                <div>
                                    <h4 class="text-[10px] font-black tracking-widest leading-none">${config.title}</h4>
                                    <p class="text-[8px] opacity-80 uppercase tracking-widest mt-0.5">${config.subtitle}</p>
                                </div>
                            </div>

                            <div class="flex-1 flex p-4 gap-4 items-center">
                                <div class="w-20 h-24 bg-white/20 backdrop-blur-sm rounded-lg border-2 border-white/40 overflow-hidden shadow-inner flex-shrink-0">
                                    <img src="${photoSrc}" alt="ID Photo" class="w-full h-full object-cover">
                                </div>
                                
                                <div class="flex-1 space-y-3">
                                    <div>
                                        <p class="text-[8px] opacity-70 uppercase tracking-wider mb-0.5">ID Number</p>
                                        <p class="font-mono text-sm font-bold tracking-widest bg-white/20 inline-block px-2 py-0.5 rounded">${card.number}</p>
                                    </div>
                                    <div>
                                        <p class="text-[8px] opacity-70 uppercase tracking-wider mb-0.5">Full Name</p>
                                        <p class="font-bold text-base leading-tight uppercase">${card.name}</p>
                                    </div>
                                    <div>
                                        <p class="text-[8px] opacity-70 uppercase tracking-wider mb-0.5">Information</p>
                                        <p class="text-xs font-medium">${card.extra}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="absolute right-[-10%] bottom-[-20%] text-9xl opacity-[0.03] pointer-events-none">
                                <i class="fa-solid ${config.icon}"></i>
                            </div>
                        </div>

                        <div class="flex gap-2 mt-3 mb-6">
                            <button onclick="downloadCard('${card.id}')" class="flex-1 bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                                <i class="fa-solid fa-download"></i> Download Image
                            </button>
                            <button onclick="deleteCard('${card.id}')" class="w-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        // --- DOWNLOAD VIRTUAL ID AS IMAGE ---
        function downloadCard(elementId) {
            const cardElement = document.getElementById(elementId);
            if(!cardElement) return;

            // Optional: Provide visual feedback
            const btn = event.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

            html2canvas(cardElement, { 
                scale: 3, // High resolution download
                backgroundColor: null,
                useCORS: true // Attempt to load cross-origin images (like UI avatars)
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Virtual_ID_${elementId}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                btn.innerHTML = originalText;
            }).catch(err => {
                alert("Failed to generate image. " + err);
                btn.innerHTML = originalText;
            });
        }

        // --- DELETE LOGIC ---
        function deleteCard(id) {
            if(confirm("Delete this ID from your wallet?")) {
                walletData = walletData.filter(card => card.id !== id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(walletData));
                renderWallet();
            }
        }

        function clearWallet() {
            if(confirm('Are you sure you want to delete all saved IDs? This cannot be undone.')) {
                walletData = [];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(walletData));
                renderWallet();
            }
        }

        // Initialize App
        window.onload = () => { switchScreen('home'); };
        
function rateApp() {
    const rating = prompt("Rate MyWallet PH (1-5 Stars):");
    if(rating){
        alert("Thank you for rating us " + rating + " ⭐");
    }
}

function logoutApp() {
    if(confirm("Are you sure you want to logout?")) {
        location.reload();
    }
}


const profileName =
localStorage.getItem("walletProfileName");

const profileImage =
localStorage.getItem("walletProfileImage");

if(profileName){
document.getElementById(
"profileName"
).textContent = profileName;
}

if(profileImage){
document.getElementById(
"profileImage"
).src = profileImage;
}
localStorage.setItem("walletProfileName", name);
localStorage.setItem("walletProfileImage", imageBase64);

walletPin
walletLockEnabled

changePin()
toggleLock()
resetWallet()

const STORAGE_KEY =
'ph_digital_wallet_data';

let walletData =
JSON.parse(
localStorage.getItem(
STORAGE_KEY
)
) || [];

let frontImage = "";
let backImage = "";

function previewFront(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

frontImage =
e.target.result;

document
.getElementById(
'frontPreview'
)
.src =
frontImage;

};

reader.readAsDataURL(file);

}

function previewBack(event){

const file =
event.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload = function(e){

backImage =
e.target.result;

document
.getElementById(
'backPreview'
)
.src =
backImage;

};

reader.readAsDataURL(file);

}

function flipCard(){

document
.getElementById(
'previewCard'
)
.classList.toggle(
'flipped'
);

}

function removeFront(){

frontImage = "";

document
.getElementById(
'frontPreview'
)
.src = "";

}

function removeBack(){

backImage = "";

document
.getElementById(
'backPreview'
)
.src = "";

}

function saveManualID(){

if(!frontImage){

alert(
'Please upload front image.'
);

return;

}

const newID = {

id:
'manual_' +
Date.now(),

type:
document.getElementById(
'manual-type'
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

alert(
'ID saved successfully.'
);

location.href =
'index.html';

}
function showVirtualForm() {

    document
        .getElementById("selectOption")
        .classList.add("hidden");

    document
        .getElementById("virtualSection")
        .classList.remove("hidden");
}

function showManualForm() {

    document
        .getElementById("selectOption")
        .classList.add("hidden");

    document
        .getElementById("manualSection")
        .classList.remove("hidden");
}
previewFront()
previewBack()
flipCard()
removeFront()
removeBack()
saveManualID()
generateAndSaveID()
