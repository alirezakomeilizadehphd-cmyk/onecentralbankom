// DEMO ONLY — all values are static/simulated. No real trading, transfers, or KYC review occurs.

requireLogin();
document.getElementById('userEmail').textContent = localStorage.getItem('demo_user_email') || 'user';

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    goSection(item.dataset.section);
  });
});

function goSection(name){
  document.querySelectorAll('.main > section').forEach(s => s.classList.add('hidden'));
  document.getElementById('sec-' + name).classList.remove('hidden');
  navItems.forEach(i => i.classList.toggle('active', i.dataset.section === name));
}

function openTrade(symbol){
  goSection('trade');
  const select = document.getElementById('tradePair');
  for(const opt of select.options){
    if(opt.value.startsWith(symbol)) select.value = opt.value;
  }
}

let orderSide = 'buy';
function setOrderTab(el, side){
  orderSide = side;
  document.querySelectorAll('#sec-trade .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const pair = document.getElementById('tradePair').value.split('/')[0];
  document.getElementById('orderSubmitBtn').textContent = (side === 'buy' ? 'Buy ' : 'Sell ') + pair;
  document.getElementById('orderSubmitBtn').style.background = side === 'buy' ? '' : 'var(--red)';
}

function placeOrder(){
  const amount = document.getElementById('tradeAmount').value || '0';
  const pair = document.getElementById('tradePair').value;
  const msg = document.getElementById('orderConfirm');
  msg.textContent = `Simulated ${orderSide.toUpperCase()} order for ${amount} ${pair} placed (demo only, not a real trade).`;

  const table = document.getElementById('orderHistoryTable');
  const row = table.insertRow(1);
  row.innerHTML = `<td>${pair}</td><td><span class="tag tag-${orderSide}">${orderSide.toUpperCase()}</span></td><td>${amount}</td><td>Filled</td>`;
}

let transferType = 'deposit';
function setTransferTab(el, type){
  transferType = type;
  document.querySelectorAll('#sec-transfer .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('transferBtn').textContent = type === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal';
  document.getElementById('addressField').classList.toggle('hidden', type !== 'deposit');
}

function confirmTransfer(){
  const msg = document.getElementById('transferConfirm');
  msg.textContent = `Simulated ${transferType} confirmed. No real funds were moved — demo prototype only.`;
}

function convert(){
  const rateMap = {1: 64000, 3400: 3400, 64000: 1};
  const base = parseFloat(document.getElementById('convFrom').value);
  const amt = parseFloat(document.getElementById('convAmount').value) || 0;
  document.getElementById('convResult').value = (amt * base).toFixed(2);
}
window.addEventListener('DOMContentLoaded', () => { if(document.getElementById('convResult')) convert(); });
