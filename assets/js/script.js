const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const fotoPreview = document.getElementById('foto');
let principal = document.querySelector('.principal');
let pdf = document.querySelector('.pdf');


let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

// Ajustar imagem dentro do círculo
function adjustImageInCircle(image) {
  image.style.width = 'auto';
  image.style.height = '100%';

  if (image.offsetWidth < imagePreview.offsetWidth || image.offsetWidth < fotoPreview.offsetWidth) {
    image.style.width = '100%';
    image.style.height = 'auto';
  }
}

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = '';
      fotoPreview.innerHTML = ''; 
      const img = document.createElement('img');
      const img2 = document.createElement('img');
      
      img.src = e.target.result;
      img2.src = e.target.result;
      
      imagePreview.appendChild(img);
      fotoPreview.appendChild(img2);

      // Ajusta o tamanho inicial da imagem
      adjustImageInCircle(img);
      adjustImageInCircle(img2);

      img2.addEventListener('mousedown', startDrag);
      img2.addEventListener('touchstart', startDrag);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', stopDrag);
      window.addEventListener('mousemove', dragImage);
      window.addEventListener('touchend', dragImage);
    };
    reader.readAsDataURL(file);

  }
});

function sendData() {
    let musico, instrumento,data_nasc,endereco,filiacao_pai,filiacao_mae;
    musico = document.querySelector('#musico');
    document.querySelector('.musico').innerText = musico.value;
    instrumento = document.querySelector('#instrumento');
    document.querySelector('.instrumento').innerText = instrumento.value;
    data_nasc = document.querySelector('#nasc').value.split('-');
    document.querySelector('.data_nasc').innerText = `${data_nasc[2]}/${data_nasc[1]}/${data_nasc[0]}`;
    endereco = document.querySelector('#endereco');
    document.querySelector('.endereco').innerText = endereco.value;
    filiacao_pai = document.querySelector('#pai');
    filiacao_mae = document.querySelector('#mae');
    document.querySelector('.filiacao').innerText = `${filiacao_pai.value} e \n ${filiacao_mae.value}`;


    principal.style.display = 'none';
    pdf.style.display = 'block';
}

function gerarPDF() {
    window.print();
}

function limpar() {
    principal.style.display = 'block';
    pdf.style.display = 'none';

    document.querySelector('#musico').value = '';
    document.querySelector('#instrumento').value = '';
    document.querySelector('#nasc').value = '';
    document.querySelector('#endereco').value = '';
    document.querySelector('#pai').value = '';
    document.querySelector('#mae').value = '';
    document.querySelector('#fileInput').value = '';

    imagePreview.innerHTML = ''
    imagePreview.textContent = 'Sem Foto';

    isDragging = false;
    startX = 0, startY = 0;
    currentX = 0, currentY = 0;
}


function startDrag(event) {
  isDragging = true;
 /*  startX = event.clientX;
  startY = event.clientY; */

  if (event.type === 'mousedown') {
    startX = event.clientX;
    startY = event.clientY;
    console.log('veio')
  } else if (event.type === 'touchstart') {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }

  const img = event.target;
  currentX = parseInt(img.style.left) || fotoPreview.offsetWidth / 2;
  currentY = parseInt(img.style.top) || fotoPreview.offsetHeight / 2;
}

// Fim do arraste
function stopDrag() {
  isDragging = false;
}

// Movimenta a imagem
function dragImage(event) {
  if (!isDragging) return;

  const img = fotoPreview.querySelector('img');
  let deltaX, deltaY;
  
  if (event.type === 'mousemove') {
    deltaX = event.clientX - startX;
    deltaY = event.clientY - startY;
  } else if (event.type === 'touchmove') {
    deltaX = event.touches[0].clientX - startX;
    deltaY = event.touches[0].clientY - startY;
  }

  img.style.left = `${currentX + deltaX}px`;
  img.style.top = `${currentY + deltaY}px`;
  img.style.transform = 'translate(-50%, -50%)';
}

function verificarData() {
  if (document.querySelector('#musico').value != '' && 
  document.querySelector('#instrumento').value != '' &&
  document.querySelector('#nasc').value != '' &&
  document.querySelector('#endereco').value != '' &&
  document.querySelector('#pai').value != '' &&
  document.querySelector('#mae').value != '' &&
  document.querySelector('#fileInput').value != '' ) {
    sendData();
    return;
  }

  Swal.fire({
    title: "Atenção",
    text: "Precisa preencher todos os campos.",
    icon: "error"
  });
}
