
const inputVal = document.querySelector('#genera-password__range-value');
const inputRange = document.querySelector('#genera-password__range');
const copia = document.querySelector('#genera-password__copia');
const risultato = document.querySelector('.genera-password__risultato');
const changePass = document.querySelector('#genera-password__change-pass');
const colorLine = document.querySelector('.genera-password__color-line');
const pswPlus = document.querySelector('.genera-password__range-plus');
const pswMinus = document.querySelector('.genera-password__range-minus');


const caratteriMinuscoli = document.querySelector('#genera-password__caratteri-minuscoli');
const caratteriMaiuscoli = document.querySelector('#genera-password__caratteri-maiuscoli');
const caratteriSpeciali = document.querySelector('#genera-password__caratteri-speciali');
const caratteriNumerici = document.querySelector('#genera-password__caratteri-numerici');
const checkBox = document.querySelectorAll('.genera-password__checkbox');

const listaMinuscoli = 'abcdefghijklmnopqrstuvwxyz';
const listaMaiuscoli = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const listaNumeri = '0123456789';
const listaSpeciali = `~!@#$%^&*()-_=+[]{}|;:'",.>/?°£^\\€`;


generaPassword(inputRange.value);

pswMinus.addEventListener('click', () => {
  if(inputVal.value > 1){
    inputRange.value--; 
    inputVal.value--;
  }
  generaPassword(inputRange.value);
  changeLineColor(inputRange.value);
});
pswPlus.addEventListener('click', () => {
  if(inputVal.value < 50){
    inputRange.value++;
    let valUpd = inputVal.value++;
    changeLineColor(valUpd);
  }
  generaPassword(inputRange.value);
});
copia.addEventListener('click', copiaPassword);
changePass.addEventListener('click', () => generaPassword(inputRange.value));

inputRange.addEventListener('input', (e) =>{
  inputVal.value = e.target.value;
  changeLineColor(e);
  generaPassword(parseInt(e.target.value));
});
inputVal.addEventListener('input', (e) => {
  e.target.value < 1 ? e.target.value = 1 : e.target.value;
  e.target.value > 50 ? e.target.value = 50 : e.target.value;
  inputRange.value = e.target.value;
  changeLineColor(e);
  generaPassword(parseInt(e.target.value));
});


checkBox.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const checkedCheckboxes = document.querySelectorAll('.genera-password__checkbox:checked');
    if (checkedCheckboxes.length === 0) checkbox.checked = true;
    changeLineColor({ target: inputRange });
  });
});


function changeLineColor(e){
  if (inputVal.value <= 4) {
    setColorLine('rgb(220, 10, 10)', '15%');
  } else if (inputVal.value <= 8) {
    setColorLine('rgb(220, 220, 10)', '40%');
  } else if (inputVal.value <= 14) {
    setColorLine('rgb(130, 220, 10)', '75%');
  } else {
    setColorLine('rgb(30, 220, 10)', '100%');
  }
  generaPassword(inputVal.value);
}
function setColorLine(background, width) {
  colorLine.style.background = background;
  colorLine.style.width = width;
}


function generaPassword(lunghezza){
  const stringaIniziale = [
    caratteriMaiuscoli.checked && listaMaiuscoli,
    caratteriMinuscoli.checked && listaMinuscoli,
    caratteriNumerici.checked && listaNumeri,
    caratteriSpeciali.checked && listaSpeciali
  ].filter(Boolean).join('');

  let stringaRisultato = '';

  for(let i = 0; i < lunghezza; i++){
    let random = Math.floor(Math.random() * stringaIniziale.length)
    stringaRisultato += stringaIniziale[random];
  }
  return risultato.innerHTML = stringaRisultato;
}


function copiaPassword(){
  const passwordText = risultato.innerHTML;
  const textarea = document.createElement('textarea');
  textarea.value = passwordText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  risultato.style.color = '#FFD600'
  risultato.innerHTML = 'Password copiata';
  setTimeout(() => {risultato.innerHTML = passwordText; risultato.style.color = '#fff'}, 1000);
}