const form = document.getElementById('medicine-form');
const nameInput = document.getElementById('medicine-name');
const timeInput = document.getElementById('medicine-time');
const list = document.getElementById('medicine-list');

// localStorage'tan ilaclari yukle
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];

// Sayfa acildiginda ilaclari listele
renderList();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const time = timeInput.value;

    if (!name || !time) return;

    const newMedicine = {
        id: Date.now(),
        name,
        time,
        taken:false
    };

    medicines.push(newMedicine);
    saveAndRender();

    nameInput.value = '';
    timeInput.value = '';

});

// Listeyi ekrana yaz

function renderList() {
    list.innerHTML = '';

    medicines.forEach((med) => {
        const li = document.createElement('li');
        li.innerHTML = ` 
        <strong>${med.name})</strong> - ${med.time}
        <button data-id="${med.id}" class="${med.taken ? 'taken' : ''}">
            ${med.taken ? 'Alindi' : 'Alinmadi'}
        </button>
        `;
        list.appendChild(li);
    });
}

// Veriyi kaydet ve listeyi guncelle
function saveAndRender() {
    localStorage.setItem('medicines', JSON.stringify(medicines));
    renderList();    
}

// Butona tiklayinca "alindi" olarak isaretle
list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const id = Number(e.target.dataset.id);
        medicines = medicines.map((m)=>{
            if (m.id === id) m.taken = !m.taken;
            return m;
        });
        saveAndRender();
    }
});
